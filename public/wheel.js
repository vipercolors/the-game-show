// WheelCanvas factory — one instance per canvas element
// Requires window.WHEEL (set dynamically from game state)
window.makeWheel = function(canvasEl) {
  const SEG = () => window.WHEEL || [];
  const DPR = window.devicePixelRatio || 1;
  let rotation = 0, animating = false;
  let size, ctx;
  let highlightIdx = null;
  let offscreen    = null; // cached pre-rendered wheel — rebuilt only when segments change

  function init() {
    size = canvasEl.offsetWidth || parseInt(canvasEl.style.width) || 300;
    canvasEl.width  = size * DPR;
    canvasEl.height = size * DPR;
    canvasEl.style.width  = size + 'px';
    canvasEl.style.height = size + 'px';
    ctx = canvasEl.getContext('2d');
    draw(0);
  }

  // Render the full wheel at rot=0 onto an offscreen canvas — paid ONCE.
  // Shadows, labels, everything lives here. Animation just rotates this image.
  function buildOffscreen() {
    const segs = SEG();
    const n    = segs.length;
    if (!n || !size) return null;

    const oc = document.createElement('canvas');
    oc.width  = size * DPR;
    oc.height = size * DPR;
    const c   = oc.getContext('2d');
    c.scale(DPR, DPR);

    const cx = size / 2, cy = size / 2, r = cx - 14;
    const sa = (2 * Math.PI) / n;

    // Segment fills
    segs.forEach((seg, i) => {
      const s = -Math.PI / 2 + i * sa;
      c.beginPath(); c.moveTo(cx, cy);
      c.arc(cx, cy, r, s, s + sa);
      c.closePath();
      c.fillStyle = seg.color;
      c.fill();
    });

    // Thin divider borders
    c.strokeStyle = 'rgba(0,0,0,0.25)';
    c.lineWidth   = 0.5;
    segs.forEach((seg, i) => {
      const s = -Math.PI / 2 + i * sa;
      c.beginPath(); c.moveTo(cx, cy);
      c.arc(cx, cy, r, s, s + sa);
      c.closePath();
      c.stroke();
    });

    // Labels with shadows — expensive, but only runs once per wheel config
    const segArcW    = (2 * Math.PI * r) / n;
    const showLabels = segArcW >= 5;
    if (showLabels) {
      const fs = Math.max(6, Math.min(28, segArcW * 0.18));
      const tx = r - 8;

      segs.forEach((seg, i) => {
        const mid = -Math.PI / 2 + i * sa + sa / 2;
        const isMod = seg.type === 'modifier';
        c.save();
        c.translate(cx, cy);
        c.rotate(mid);
        c.shadowColor = 'rgba(0,0,0,0.9)';
        c.shadowBlur  = isMod ? 8 : 5;
        if (isMod) {
          // Modifier segments: bold, larger, star prefix
          c.font      = `900 ${Math.min(fs * 1.2, fs + 6)}px "DM Sans",system-ui,sans-serif`;
          c.fillStyle = '#fff';
          c.textAlign = 'right';
          const words = seg.label.split(' ');
          const half  = Math.ceil(words.length / 2);
          const l1    = words.slice(0, half).join(' ');
          const l2    = words.slice(half).join(' ');
          if (l2) { c.fillText(l1, tx, -3); c.fillText(l2, tx, fs + 1); }
          else      c.fillText(l1, tx, 2.5);
        } else {
          c.font      = `700 ${fs}px "DM Sans",system-ui,sans-serif`;
          c.textAlign = 'right';
          c.fillStyle = '#fff';
          if (n <= 50) {
            const words = seg.label.split(' ');
            const half  = Math.ceil(words.length / 2);
            const l1    = words.slice(0, half).join(' ');
            const l2    = words.slice(half).join(' ');
            if (l2) { c.fillText(l1, tx, -3); c.fillText(l2, tx, fs + 1); }
            else      c.fillText(l1, tx, 2.5);
          } else {
            c.fillText(seg.label, tx, 2.5);
          }
        }
        c.restore();
      });
    }

    return oc;
  }

  function draw(rot) {
    if (!ctx || !size) return;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    rotation = rot;

    const segs = SEG();
    const n    = segs.length;
    if (!n) return;

    const cx = size / 2, cy = size / 2, r = cx - 14;
    const sa = (2 * Math.PI) / n;

    ctx.clearRect(0, 0, size, size);

    // Outer glow ring — drawn once per frame, stays fixed (behind wheel)
    ctx.save();
    ctx.shadowColor = 'rgba(139,92,246,0.55)';
    ctx.shadowBlur  = 22;
    ctx.beginPath();
    ctx.arc(cx, cy, r + 7, 0, 2 * Math.PI);
    ctx.strokeStyle = 'rgba(139,92,246,0.3)';
    ctx.lineWidth   = 5;
    ctx.stroke();
    ctx.restore();

    // Rotate the pre-rendered offscreen — one drawImage per frame (very fast)
    if (!offscreen) offscreen = buildOffscreen();
    if (offscreen) {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rot);
      ctx.translate(-cx, -cy);
      ctx.drawImage(offscreen, 0, 0, size, size);
      ctx.restore();
    }

    // Winner highlight — glowing slice shown after spin stops
    if (highlightIdx !== null && segs[highlightIdx]) {
      const hs = rot - Math.PI / 2 + highlightIdx * sa;
      const he = hs + sa;
      ctx.save();
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, r, hs, he); ctx.closePath();
      ctx.fillStyle = 'rgba(255,255,255,0.22)';
      ctx.fill();
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, r, hs, he); ctx.closePath();
      ctx.strokeStyle   = '#fff';
      ctx.lineWidth     = Math.max(2.5, r * 0.014);
      ctx.shadowColor   = 'rgba(255,255,255,0.95)';
      ctx.shadowBlur    = 24;
      ctx.stroke();
      ctx.restore();
    }

    // Outer border ring
    ctx.save();
    ctx.shadowColor = 'rgba(139,92,246,0.4)';
    ctx.shadowBlur  = 6;
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, 2 * Math.PI);
    ctx.strokeStyle = '#8b5cf6'; ctx.lineWidth = 3; ctx.stroke();
    ctx.restore();

    // Center hub
    const g = ctx.createRadialGradient(cx - 3, cy - 3, 0, cx, cy, 18);
    g.addColorStop(0, '#c4b5fd'); g.addColorStop(1, '#7c3aed');
    ctx.beginPath(); ctx.arc(cx, cy, 17, 0, 2 * Math.PI);
    ctx.fillStyle = g; ctx.fill();
    ctx.strokeStyle = '#ddd6fe'; ctx.lineWidth = 2; ctx.stroke();

    // Gold pointer — large, unmissable
    const py = cy - r - 1;
    ctx.fillStyle   = '#fbbf24';
    ctx.strokeStyle = '#d97706';
    ctx.lineWidth   = 2.5;
    ctx.shadowColor = 'rgba(251,191,36,0.95)';
    ctx.shadowBlur  = 18;
    ctx.beginPath();
    ctx.moveTo(cx, py + 24);
    ctx.lineTo(cx - 14, py + 1);
    ctx.lineTo(cx + 14, py + 1);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.shadowBlur = 0;
  }

  function easeOutQuint(t) { return 1 - Math.pow(1 - t, 5); }

  function spin(targetIdx, durationMs, onDone, onTick) {
    if (animating) return;
    highlightIdx = null;
    animating    = true;

    const n  = SEG().length;
    const sa = (2 * Math.PI) / n;
    const T     = -(targetIdx + 0.5) * sa;
    const tNorm = ((T        % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
    const sNorm = ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
    let delta   = tNorm - sNorm;
    if (delta <= 0) delta += 2 * Math.PI;
    const total = 2 * Math.PI * 7 + delta;

    const startRot   = rotation;
    const startTime  = performance.now();
    let lastSegCount = Math.floor(startRot / sa);

    function frame(now) {
      const t      = Math.min((now - startTime) / durationMs, 1);
      const curRot = startRot + total * easeOutQuint(t);

      // At t=0.82 the remaining angular distance is ~0.47° — imperceptible.
      // Snap to the true final angle, show the glow, and stop the rAF loop now
      // so the wheel visually lands the instant it appears to stop.
      // onDone() is deferred to when the animation WOULD have ended so that
      // downstream timings (display slam delay etc.) are unaffected.
      if (t >= 0.82 && highlightIdx === null) {
        highlightIdx = targetIdx;
        rotation     = startRot + total;
        draw(rotation);
        const remainingMs = Math.max(0, durationMs - (now - startTime));
        setTimeout(() => { animating = false; if (onDone) onDone(); }, remainingMs);
        return;
      }

      draw(curRot);

      const segCount = Math.floor(curRot / sa);
      if (segCount !== lastSegCount) {
        lastSegCount = segCount;
        if (onTick) onTick(t);
      }

      if (t < 1) {
        requestAnimationFrame(frame);
      } else {
        rotation  = startRot + total;
        animating = false;
        draw(rotation);
        if (onDone) onDone();
      }
    }
    requestAnimationFrame(frame);
  }

  return {
    init,
    spin,
    redraw:      () => { offscreen = null; highlightIdx = null; draw(rotation); },
    getRotation: () => rotation,
    isAnimating: () => animating,
  };
};
