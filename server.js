'use strict';
const express = require('express');
const http    = require('http');
const { Server } = require('socket.io');
const path    = require('path');

const app    = express();
const server = http.createServer(app);
const io     = new Server(server);

app.use(express.static(path.join(__dirname, 'public'), { extensions: ['html'] }));
app.use(express.json());

// ── API ROUTES ─────────────────────────────────────────────────────────────
app.get('/api/history', (req, res) => {
  const summary = gameHistory.slice(-20).reverse().map((g, i) => ({
    id: gameHistory.length - i - 1,
    date: g.savedAt,
    round: g.round,
    contestants: Object.values(g.contestants || {}).map(c => ({ name: c.name, score: c.score })),
  }));
  res.json(summary);
});

app.get('/api/game/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (id >= 0 && id < gameHistory.length) {
    res.json(gameHistory[id]);
  } else {
    res.status(404).json({ error: 'Game not found' });
  }
});

// ── QUESTION BANK ──────────────────────────────────────────────────────────
const QUESTIONS = require('./questions-data.js');

// ── WHEEL CONFIG ───────────────────────────────────────────────────────────
const CAT_COLORS = [
  '#7c3aed','#6366f1','#2563eb','#0891b2','#059669',
  '#65a30d','#db2777','#e11d48','#0d9488','#ca8a04',
  '#d97706','#0284c7','#9333ea','#dc2626','#be185d',
];

const ALL_CATEGORIES = Object.keys(QUESTIONS)
  .map((id, i) => ({
    id,
    label: QUESTIONS[id].label,
    type: 'category',
    color: CAT_COLORS[i % CAT_COLORS.length],
  }));

const MODIFIER_SEGMENTS = [
  { id:'double',      label:'DOUBLE POINTS',   type:'modifier', color:'#fbbf24' },
  { id:'triple',      label:'TRIPLE POINTS',   type:'modifier', color:'#fb923c' },
  { id:'riskIt',      label:'RISK IT!',         type:'modifier', color:'#f43f5e' },
  { id:'golden',      label:'GOLDEN RECORD',   type:'modifier', color:'#fbbf24' },
  { id:'underdog',    label:'UNDERDOG BONUS',  type:'modifier', color:'#4ade80' },
  { id:'double',      label:'DOUBLE POINTS',   type:'modifier', color:'#fbbf24' },
  { id:'jackpot',     label:'AUDIENCE JACKPOT',type:'modifier', color:'#a855f7' },
  { id:'secondChance',label:'SECOND CHANCE',   type:'modifier', color:'#a78bfa' },
  { id:'triple',      label:'TRIPLE POINTS',   type:'modifier', color:'#fb923c' },
  { id:'bankrupt',    label:'BANKRUPT!',        type:'modifier', color:'#f43f5e' },
  { id:'platinum',    label:'PLATINUM RECORD', type:'modifier', color:'#94a3b8' },
  { id:'double',      label:'DOUBLE POINTS',   type:'modifier', color:'#fbbf24' },
];

function generateWheelSegments(categoryIds) {
  const source = categoryIds
    ? categoryIds.map(id => ALL_CATEGORIES.find(c => c.id === id)).filter(Boolean)
    : [...ALL_CATEGORIES];
  const cats = [...source];
  for (let i = cats.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cats[i], cats[j]] = [cats[j], cats[i]];
  }
  const result = [...cats];
  const mods   = MODIFIER_SEGMENTS.slice(0, Math.min(MODIFIER_SEGMENTS.length, Math.max(2, Math.floor(cats.length / 4))));
  const step   = Math.floor(cats.length / mods.length);
  mods.forEach((mod, i) => {
    const base = i * step;
    const pos  = base + Math.floor(Math.random() * Math.max(1, step));
    result.splice(Math.min(pos + i, result.length), 0, mod);
  });
  return result;
}

// ── GAME HISTORY ──────────────────────────────────────────────────────────
const fs       = require('fs').promises;
const fss      = require('fs');
const path_lib = require('path');
const HISTORY_FILE = path_lib.join(__dirname, 'game-history.json');
const PRESETS_FILE = path_lib.join(__dirname, 'game-presets.json');

let gameHistory = [];
let gamePresets = [];

async function loadHistory() {
  try {
    const data = await fs.readFile(HISTORY_FILE, 'utf-8');
    gameHistory = JSON.parse(data);
  } catch { gameHistory = []; }
}

async function saveGame(gameData) {
  const { authorizedVoters, ...rest } = gameData;
  gameHistory.push({ ...rest, savedAt: new Date().toISOString() });
  if (gameHistory.length > 100) gameHistory = gameHistory.slice(-100);
  try { await fs.writeFile(HISTORY_FILE, JSON.stringify(gameHistory, null, 2)); } catch (_) {}
}

async function loadPresets() {
  try {
    const data = await fs.readFile(PRESETS_FILE, 'utf-8');
    gamePresets = JSON.parse(data);
  } catch { gamePresets = []; }
}

async function savePresets() {
  try { await fs.writeFile(PRESETS_FILE, JSON.stringify(gamePresets, null, 2)); } catch (_) {}
}

loadHistory();
loadPresets();

function genCode() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

function genId() {
  return Math.random().toString(36).slice(2, 9);
}

// ── GAME STATE ─────────────────────────────────────────────────────────────
function freshGame(contestants = {}, round = 0, code = null, timerDuration = 60, answerCount = 4, maxRounds = 0, spinsPerGame = 0) {
  return {
    phase: 'lobby',
    round,
    code,
    timerDuration,
    timerStart: null,
    answerCount,
    maxRounds,
    spinsPerGame,
    spinsUsed: 0,
    qrHidden: false,
    wordmarkHidden: false,
    activePreset: null,
    authorizedVoters: new Set(),
    question: null,
    votes: {}, voterIds: {},
    predictions: {},
    contestants,
    results: null,
    modifier: null,
    scoreMultiplier: 1,
    riskItPlayers: [],
    secondChanceOpen: false,
    wheelSegmentIndex: null,
    wheelSegment: null,
    wheelSegments: generateWheelSegments(),
  };
}

let game = freshGame();
const contestantSockets = new Map();

function initRound() {
  game.votes = {}; game.voterIds = {}; game.predictions = {};
  game.results = null;
  game.secondChanceOpen = false;
  game.riskItPlayers = [];
  if (game.question) game.question.options.forEach(o => { game.votes[o] = 0; });
}

function calcResults() {
  const total = Object.values(game.votes).reduce((a, b) => a + b, 0);
  const res = {};
  game.question.options.forEach(opt => {
    const count = game.votes[opt] || 0;
    const pct   = total > 0 ? Math.round((count / total) * 100) : 0;
    res[opt] = { count, pct, points: pct };
  });
  return res;
}

const pubState = () => ({
  phase: game.phase, round: game.round, code: game.code,
  timerDuration: game.timerDuration, timerStart: game.timerStart,
  answerCount: game.answerCount,
  maxRounds: game.maxRounds, spinsPerGame: game.spinsPerGame, spinsUsed: game.spinsUsed,
  qrHidden: game.qrHidden, wordmarkHidden: game.wordmarkHidden,
  question: game.question, voterCount: Object.keys(game.voterIds).length,
  contestants: game.contestants, results: game.results,
  predictions: game.predictions,
  modifier: game.modifier, scoreMultiplier: game.scoreMultiplier,
  secondChanceOpen: game.secondChanceOpen,
  wheelSegmentIndex: game.wheelSegmentIndex, wheelSegment: game.wheelSegment,
  wheelSegments: game.wheelSegments,
  activePreset: game.activePreset,
});

const hostState = () => ({ ...pubState(), votes: game.votes });

function broadcast() {
  io.to('host').emit('state', hostState());
  const pub = pubState();
  ['audience','display','contestant'].forEach(r => io.to(r).emit('state', pub));
}

// ── SOCKETS ────────────────────────────────────────────────────────────────
io.on('connection', socket => {
  const role = socket.handshake.query.role || 'audience';
  socket.role = role;
  socket.join(role);
  socket.emit('state', role === 'host' ? hostState() : pubState());
  if (role === 'host') {
    socket.emit('question-bank', QUESTIONS);
    socket.emit('categories-list', ALL_CATEGORIES);
    socket.emit('presets-update', gamePresets);
  }

  // ── HOST: GENERATE CODE ─────────────────────────────────────────────────
  socket.on('host:gen-code', () => {
    if (socket.role !== 'host') return;
    game.code = genCode();
    game.authorizedVoters = new Set();
    broadcast();
  });

  // ── HOST: SET CONTESTANTS ──────────────────────────────────────────────
  socket.on('host:set-contestants', names => {
    if (socket.role !== 'host') return;
    const old = game.contestants;
    game.contestants = {};
    names.filter(n => n?.trim()).forEach(name => {
      const n = name.trim().slice(0, 24);
      game.contestants[n] = old[n] || { name: n, score: 0, streak: 0 };
    });
    broadcast();
  });

  // ── HOST: SET ANSWER COUNT ─────────────────────────────────────────────
  socket.on('host:set-answer-count', count => {
    if (socket.role !== 'host') return;
    game.answerCount = Math.max(4, Math.min(8, parseInt(count) || 4));
    io.to('host').emit('state', hostState());
  });

  // ── HOST: QR TOGGLE ───────────────────────────────────────────────────
  socket.on('host:toggle-qr', () => {
    if (socket.role !== 'host') return;
    game.qrHidden = !game.qrHidden;
    broadcast();
  });

  socket.on('host:toggle-wordmark', () => {
    if (socket.role !== 'host') return;
    game.wordmarkHidden = !game.wordmarkHidden;
    broadcast();
  });

  // ── HOST: SET MAX ROUNDS / SPINS ──────────────────────────────────────
  socket.on('host:set-max-rounds', n => {
    if (socket.role !== 'host') return;
    game.maxRounds = Math.max(0, parseInt(n) || 0);
    io.to('host').emit('state', hostState());
  });

  socket.on('host:set-spins-per-game', n => {
    if (socket.role !== 'host') return;
    game.spinsPerGame = Math.max(0, parseInt(n) || 0);
    io.to('host').emit('state', hostState());
  });

  // ── HOST: SET A CONTESTANT'S PREDICTION (host override) ───────────────
  socket.on('host:set-prediction', ({ name, option }) => {
    if (socket.role !== 'host') return;
    if (!game.contestants[name]) return;
    if (game.predictions[name] === option) {
      delete game.predictions[name];
    } else {
      game.predictions[name] = option;
    }
    io.to('host').emit('predictions-update', game.predictions);
    io.to('display').emit('locked-in', Object.keys(game.predictions));
    io.to('contestant').emit('locked-in', Object.keys(game.predictions));
  });

  // ── HOST: WHEEL SPIN ────────────────────────────────────────────────────
  socket.on('host:spin', () => {
    if (socket.role !== 'host') return;
    if (game.phase === 'spinning') return;
    game.spinsUsed = (game.spinsUsed || 0) + 1;
    if (game.wheelSegmentIndex !== null) {
      game.wheelSegments = game.wheelSegments.filter((_, i) => i !== game.wheelSegmentIndex);
      if (game.wheelSegments.length === 0) {
        const catIds = game.activePreset?.categories || null;
        game.wheelSegments = generateWheelSegments(catIds);
      }
    }
    const idx = Math.floor(Math.random() * game.wheelSegments.length);
    game.wheelSegmentIndex = idx;
    game.wheelSegment = game.wheelSegments[idx];
    game.phase = 'spinning';
    broadcast();
  });

  socket.on('host:spun', () => {
    if (socket.role !== 'host') return;
    if (game.phase !== 'spinning') return;
    game.phase = 'wheel-result';

    const seg = game.wheelSegment;
    if (seg?.type === 'modifier') {
      game.modifier = seg.id;
      if (seg.id === 'double')       game.scoreMultiplier = 2;
      else if (seg.id === 'triple')  game.scoreMultiplier = 3;
      else if (seg.id === 'riskIt')  game.riskItPlayers = [];
      else if (seg.id === 'secondChance') game.secondChanceOpen = false;
      else if (seg.id === 'golden' || seg.id === 'platinum') {
        const bonus = seg.id === 'golden' ? 50 : 100;
        Object.values(game.contestants).forEach(c => { c.score += bonus; });
        const deltas = Object.fromEntries(Object.keys(game.contestants).map(k => [k, bonus]));
        setTimeout(() => { io.emit('score-deltas', deltas); }, 600);
        game.modifier = null;
        game.scoreMultiplier = 1;
      }
    } else {
      game.modifier = null;
      game.scoreMultiplier = 1;
    }
    broadcast();
  });

  // ── HOST: START QUESTION ────────────────────────────────────────────────
  socket.on('host:start', ({ category, selectedAnswers, useAll }) => {
    if (socket.role !== 'host') return;
    const q = QUESTIONS[category];
    if (!q) return;
    const count = Math.min(game.answerCount || 4, 8);
    const pool = Array.isArray(selectedAnswers) && selectedAnswers.length >= 2
      ? selectedAnswers.filter(a => q.answers.includes(a))
      : [...q.answers];
    let options;
    if (useAll) {
      options = pool;
    } else {
      const shuffled = [...pool].sort(() => Math.random() - 0.5);
      options = shuffled.slice(0, Math.min(count, pool.length));
    }
    // Hot sauce easter egg: always include "I don't like hot sauce"
    if (category === 'hotSauce') {
      const egg = "I don't like hot sauce";
      if (!options.includes(egg) && q.answers.includes(egg)) {
        if (options.length >= 8) options[options.length - 1] = egg;
        else options.push(egg);
      }
    }
    game.question = { text: q.question, options, category };
    game.phase = 'voting';
    game.round = (game.round || 0) + 1;
    const effectiveDuration = game.timerDuration;
    game.timerStart = effectiveDuration > 0 ? Date.now() : null;
    initRound();
    if (game.wheelSegmentIndex !== null) {
      game.wheelSegments = game.wheelSegments.filter((_, i) => i !== game.wheelSegmentIndex);
      if (game.wheelSegments.length === 0) {
        const catIds = game.activePreset?.categories || null;
        game.wheelSegments = generateWheelSegments(catIds);
      }
      game.wheelSegmentIndex = null;
      game.wheelSegment      = null;
    }
    broadcast();
  });

  socket.on('host:set-timer', duration => {
    if (socket.role !== 'host') return;
    game.timerDuration = parseInt(duration) || 0;
    io.to('host').emit('state', hostState());
  });

  socket.on('host:close', () => {
    if (socket.role !== 'host') return;
    game.phase = 'closed'; broadcast();
  });

  socket.on('host:reveal', () => {
    if (socket.role !== 'host') return;
    if (game.phase !== 'closed') return;
    const prevScores = Object.fromEntries(Object.entries(game.contestants).map(([k, v]) => [k, v.score]));
    game.phase = 'revealed';
    game.results = calcResults();

    const maxPct = Math.max(...Object.values(game.results).map(r => r.pct), 0);
    const winnerOption = maxPct > 0 ? (game.question?.options.find(o => game.results[o]?.pct === maxPct) || null) : null;
    const totalVoters  = Object.keys(game.voterIds).length;

    if (game.modifier !== 'bankrupt') {
      Object.entries(game.predictions).forEach(([name, option]) => {
        const c = game.contestants[name];
        if (!c || !game.results[option]) return;
        let pts = game.results[option].points * game.scoreMultiplier;

        if (option === winnerOption) {
          const curStreak = c.streak || 0;
          pts += Math.min(curStreak, 5) * 10;
        }
        if (game.modifier === 'riskIt' && game.riskItPlayers.includes(name)) {
          pts = option === winnerOption ? pts * 2 : 0;
        }
        c.score += Math.round(pts);
      });

      if (game.modifier === 'underdog') {
        const minPct = Math.min(...Object.values(game.results).map(r => r.pct));
        const underdogOpt = game.question.options.find(o => game.results[o]?.pct === minPct);
        if (underdogOpt) {
          Object.entries(game.predictions).forEach(([name, opt]) => {
            if (opt === underdogOpt && game.contestants[name]) game.contestants[name].score += 20;
          });
        }
      }

      if (game.modifier === 'jackpot' && winnerOption) {
        const bonus = Math.max(5, Math.floor(totalVoters * 0.1));
        Object.entries(game.predictions).forEach(([name, opt]) => {
          if (opt === winnerOption && game.contestants[name]) game.contestants[name].score += bonus;
        });
      }
    }

    Object.values(game.contestants).forEach(c => {
      const pred = game.predictions[c.name];
      c.streak = pred === winnerOption ? (c.streak || 0) + 1 : 0;
    });

    const deltas = Object.fromEntries(Object.entries(game.contestants).map(([k, v]) => [k, v.score - (prevScores[k] || 0)]));
    broadcast();
    io.emit('score-deltas', deltas);
  });

  socket.on('host:next-round', () => {
    if (socket.role !== 'host') return;
    if (game.phase !== 'revealed') return;
    const saved     = { ...game.contestants };
    const round     = game.round;
    const code      = game.code;
    const auth      = game.authorizedVoters;
    const timer     = game.timerDuration;
    const ansCount  = game.answerCount;
    const preset    = game.activePreset;
    const wheelSegs = game.wheelSegments;
    const maxRounds = game.maxRounds;
    const spinsPerGame = game.spinsPerGame;
    const spinsUsed = game.spinsUsed;
    const qrHidden  = game.qrHidden;
    const wordmarkHidden = game.wordmarkHidden;
    game = freshGame(saved, round, code, timer, ansCount, maxRounds, spinsPerGame);
    game.authorizedVoters = auth;
    game.wheelSegments = wheelSegs;
    game.activePreset = preset;
    game.spinsUsed = spinsUsed;
    game.qrHidden = qrHidden;
    game.wordmarkHidden = wordmarkHidden;
    broadcast();
  });

  // ── HOST: MANUAL POINT AWARD ───────────────────────────────────────────
  socket.on('host:award-points', ({ name, points }) => {
    if (socket.role !== 'host') return;
    const c = game.contestants[name];
    if (!c) return;
    c.score = Math.max(0, c.score + points);
    broadcast();
  });

  socket.on('host:reset', () => {
    if (socket.role !== 'host') return;
    if (Object.keys(game.contestants).length > 0 && game.round > 0) {
      saveGame({ ...game, savedAt: new Date().toISOString() });
    }
    contestantSockets.clear();
    game = freshGame(); broadcast();
  });

  // ── HOST: OPEN SECOND CHANCE ────────────────────────────────────────────
  socket.on('host:open-second-chance', () => {
    if (socket.role !== 'host') return;
    if (game.modifier !== 'secondChance') return;
    game.secondChanceOpen = true;
    broadcast();
  });

  // ── HOST: PRESETS ──────────────────────────────────────────────────────
  socket.on('host:save-preset', ({ name, categories, answerCount, answerMap }) => {
    if (socket.role !== 'host') return;
    const preset = {
      id: genId(),
      name: (name || 'Untitled').trim().slice(0, 40),
      categories: Array.isArray(categories) ? categories : [],
      answerCount: Math.max(4, Math.min(8, parseInt(answerCount) || 4)),
      answerMap: (answerMap && typeof answerMap === 'object') ? answerMap : {},
      createdAt: new Date().toISOString(),
    };
    gamePresets.push(preset);
    if (gamePresets.length > 50) gamePresets = gamePresets.slice(-50);
    savePresets();
    io.to('host').emit('presets-update', gamePresets);
  });

  socket.on('host:load-preset', ({ id }) => {
    if (socket.role !== 'host') return;
    const preset = gamePresets.find(p => p.id === id);
    if (!preset) return;
    game.activePreset  = preset;
    game.answerCount   = preset.answerCount;
    game.wheelSegments = generateWheelSegments(preset.categories.length ? preset.categories : null);
    game.wheelSegmentIndex = null;
    game.wheelSegment      = null;
    io.to('host').emit('state', hostState());
  });

  socket.on('host:delete-preset', ({ id }) => {
    if (socket.role !== 'host') return;
    gamePresets = gamePresets.filter(p => p.id !== id);
    savePresets();
    io.to('host').emit('presets-update', gamePresets);
  });

  socket.on('host:get-presets', () => {
    if (socket.role !== 'host') return;
    socket.emit('presets-update', gamePresets);
  });

  socket.on('host:apply-categories', (categoryIds) => {
    if (socket.role !== 'host') return;
    const cats = Array.isArray(categoryIds) && categoryIds.length ? categoryIds : null;
    game.wheelSegments = generateWheelSegments(cats);
    game.wheelSegmentIndex = null;
    game.wheelSegment = null;
    io.to('host').emit('state', hostState());
    io.to('display').emit('state', pubState());
  });

  socket.on('host:clear-preset', () => {
    if (socket.role !== 'host') return;
    game.activePreset  = null;
    game.wheelSegments = generateWheelSegments();
    game.wheelSegmentIndex = null;
    game.wheelSegment      = null;
    io.to('host').emit('state', hostState());
  });

  // ── AUDIENCE: ENTER CODE ────────────────────────────────────────────────
  socket.on('audience:enter-code', code => {
    if (!game.code) {
      game.authorizedVoters.add(socket.id);
      socket.emit('code-accepted');
      socket.emit('state', pubState());
      return;
    }
    if (String(code).trim() === game.code) {
      game.authorizedVoters.add(socket.id);
      socket.emit('code-accepted');
      socket.emit('state', pubState());
    } else {
      socket.emit('code-rejected');
    }
  });

  // ── AUDIENCE VOTE ───────────────────────────────────────────────────────
  socket.on('vote', option => {
    if (game.phase !== 'voting') return;
    if (game.code && !game.authorizedVoters.has(socket.id)) return;
    if (game.voterIds[socket.id]) return;
    if (!game.question?.options.includes(option)) return;
    game.voterIds[socket.id] = option;
    game.votes[option] = (game.votes[option] || 0) + 1;
    socket.emit('vote-confirmed', option);
    const total = Object.keys(game.voterIds).length;
    io.to('host').emit('vote-tick', { votes: game.votes, total });
    io.to('display').emit('vote-tick', { votes: game.votes, total });
    io.to('audience').emit('vote-tick', { total });
  });

  // ── CONTESTANT: JOIN ───────────────────────────────────────────────────
  socket.on('contestant:join', name => {
    if (!name?.trim()) return;
    const n = name.trim().slice(0, 24);
    const isNew = !game.contestants[n];
    if (isNew) {
      game.contestants[n] = { name: n, score: 0, streak: 0 };
      broadcast();
      io.to('display').emit('contestant-joined', n);
    }
    contestantSockets.set(socket.id, n);
    socket.emit('joined', { name: n, score: game.contestants[n].score, streak: game.contestants[n].streak || 0 });
    socket.emit('state', pubState());
  });

  // ── CONTESTANT: PREDICT ────────────────────────────────────────────────
  socket.on('contestant:predict', option => {
    const name = contestantSockets.get(socket.id);
    if (!name || game.phase !== 'voting') return;
    if (!game.question?.options.includes(option)) return;
    if (game.predictions[name] && !game.secondChanceOpen) return;
    game.predictions[name] = option;
    socket.emit('predict-confirmed', option);
    io.to('host').emit('predictions-update', game.predictions);
    // Send locked-in names to display + other contestants (no options revealed)
    io.to('display').emit('locked-in', Object.keys(game.predictions));
    io.to('contestant').emit('locked-in', Object.keys(game.predictions));
  });

  // ── CONTESTANT: RISK IT ────────────────────────────────────────────────
  socket.on('contestant:riskIt', () => {
    const name = contestantSockets.get(socket.id);
    if (!name || game.modifier !== 'riskIt') return;
    if (!game.riskItPlayers.includes(name)) {
      game.riskItPlayers.push(name);
      socket.emit('riskIt-confirmed');
    }
  });

  socket.on('disconnect', () => {
    game.authorizedVoters.delete(socket.id);
    contestantSockets.delete(socket.id);
  });
});

const PORT = 5000;

try {
  const { execSync } = require('child_process');
  const out = execSync('ss -tlnp 2>/dev/null', { encoding: 'utf8' });
  const line = out.split('\n').find(l => l.includes(`:${PORT} `));
  if (line) {
    const m = line.match(/pid=(\d+)/);
    if (m) {
      try { process.kill(parseInt(m[1])); } catch (_) {}
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 700);
    }
  }
} catch (_) {}

server.listen(PORT, () => {
  console.log(`\n🎮 The Game Show — http://localhost:${PORT}`);
  console.log(`   Host:    http://localhost:${PORT}/host`);
  console.log(`   Display: http://localhost:${PORT}/display`);
  console.log(`   Vote:    http://localhost:${PORT}/vote`);
  console.log(`   Play:    http://localhost:${PORT}/play\n`);
});
