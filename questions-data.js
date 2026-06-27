'use strict';

// Each category: { label, question, answers[] }
// Numbers in the source file are for counting only — not rankings.
// The host picks how many answers to show (default 4).

const QUESTIONS = {

  cake: {
    label: 'Cake',
    question: 'What is the best type of cake?',
    answers: [
      "Chocolate Cake","Vanilla Cake","Red Velvet","Cheesecake","Ice Cream Cake",
      "Carrot Cake","Strawberry Shortcake","Birthday Cake","Funfetti","Tres Leches",
      "Lemon Cake","Coffee Cake","Pound Cake","German Chocolate Cake","Black Forest Cake",
      "Marble Cake","Bundt Cake","Angel Food Cake","Lava Cake","Pineapple Upside Down Cake",
      "Caramel Cake","Coconut Cake","Italian Cream Cake","Banana Cake","Apple Cake",
      "7Up Cake","Rum Cake","Funnel Cake","Cookie Cake","Cookies and Cream Cake",
      "Peanut Butter Cake","White Chocolate Cake","Salted Caramel Cake","Pistachio Cake",
      "Boston Cream","Tiramisu","Strawberry Crunch Cake","Oreo Cake","Snickers Cake",
      "KitKat Cake","Reese's Cake","Ube Cake","Matcha Cake","Hummingbird Cake",
      "Sweet Potato Cake","Pumpkin Cake","Gingerbread Cake","Confetti Cake","Rainbow Cake",
    ]
  },

  fastFoodPlace: {
    label: 'Fast Food Place',
    question: 'What is the best fast food place?',
    answers: [
      "McDonald's","Chick-fil-A","Raising Cane's","Taco Bell","In-N-Out",
      "Wendy's","Burger King","Popeyes","Chipotle","Subway",
      "Jack in the Box","Domino's","Pizza Hut","Little Caesars","Panda Express",
      "Sonic","Arby's","KFC","Wingstop","Shake Shack",
      "Jersey Mike's","Jimmy John's","Firehouse Subs","Del Taco","El Pollo Loco",
      "Five Guys","Carl's Jr.","Hardee's","Culver's","Dairy Queen",
      "Freddy's","Steak 'n Shake","Qdoba","Zaxby's","Church's Chicken",
      "Bojangles","Whataburger","White Castle","Dave's Hot Chicken","Jollibee",
      "Portillo's","Blaze Pizza","Papa John's","Panera Bread","Cook Out",
      "Checkers","Rally's","BurgerFi","Smashburger","Habit Burger",
    ]
  },

  pizzaChain: {
    label: 'Pizza Chain',
    question: 'What is the best pizza chain?',
    answers: [
      "Domino's","Pizza Hut","Little Caesars","Papa John's","Papa Murphy's",
      "Marco's Pizza","Blaze Pizza","MOD Pizza","Round Table Pizza","Mountain Mike's",
      "Jet's Pizza","Hungry Howie's","Sbarro","CiCi's Pizza","Pieology",
      "California Pizza Kitchen","Mellow Mushroom","Pizza Ranch","Pizza Inn","Donatos",
      "Lou Malnati's","Giordano's","Gino's East","Pequod's","Buddy's Pizza",
      "Pizzeria Uno","Chuck E. Cheese","Old Chicago","Bertucci's","Joe's Pizza",
      "Lombardi's","Grimaldi's","Patsy's","Roberta's","Di Fara",
      "Frank Pepe","Modern Apizza","Sally's Apizza","Prince Street Pizza","Lucali",
    ]
  },

  burgerChain: {
    label: 'Burger Chain',
    question: 'What is the best burger chain?',
    answers: [
      "In-N-Out","Five Guys","Shake Shack","Whataburger","McDonald's",
      "Burger King","Wendy's","Culver's","Smashburger","Habit Burger",
      "Carl's Jr.","Hardee's","BurgerFi","Steak 'n Shake","Freddy's",
      "Sonic","Jack in the Box","Cook Out","Krystal","White Castle",
      "Checkers","Rally's","A&W","Fatburger","Farmer Boys",
      "Hopdoddy","Mooyah","Red Robin","Johnny Rockets","Fuddruckers",
      "Bobby's Burgers","Wahlburgers","Umami Burger","Black Tap","Bareburger",
      "Au Cheval","The Counter","Roy Rogers","Mr Beast Burger","Burgerville",
    ]
  },

  friedChickenPlace: {
    label: 'Fried Chicken Spot',
    question: 'What is the best fried chicken place?',
    answers: [
      "Popeyes","KFC","Chick-fil-A","Raising Cane's","Bojangles",
      "Church's Chicken","Dave's Hot Chicken","Zaxby's","Jollibee","Slim Chickens",
      "Wingstop","Pollo Campero","El Pollo Loco","Hattie B's","Howlin' Ray's",
      "Gus's Fried Chicken","Bonchon","Krispy Krunchy Chicken","Lee's Famous Recipe",
      "Wing Zone","Roscoe's","Buffalo Wild Wings","Shaq's Big Chicken",
      "Harold's Chicken","Sweetgreen Chicken","PDQ","Cluck-U Chicken",
      "Prince's Hot Chicken","Honey Butter Fried Chicken","Yardbird","Federal Donuts",
      "Sweet Chick","Blue Ribbon Fried Chicken","Pies 'n' Thighs","Fuku",
      "Joella's Hot Chicken","Hot Chicken Takeover","Maryland Fried Chicken",
      "Lee's Famous","Brown's Chicken","The Crack Shack",
    ]
  },

  mexicanFastFood: {
    label: 'Mexican Fast Food',
    question: 'What is the best Mexican fast food place?',
    answers: [
      "Taco Bell","Chipotle","Qdoba","Moe's Southwest Grill","Del Taco",
      "El Pollo Loco","Rubio's","Taco John's","Taco Cabana","Costa Vida",
      "Baja Fresh","Cafe Rio","Taco Time","Pollo Tropical","Filiberto's",
      "Roberto's","Torchy's Tacos","Chronic Tacos","Fuzzy's Taco Shop",
      "On The Border","Chuy's","Don Pablo's","El Torito","Tijuana Flats",
      "Bubbakoo's Burritos","Hot Head Burritos","Tacos El Gordo","King Taco",
      "Tito's Tacos","La Taqueria","Pancho Villa","Tacombi","Los Tacos No. 1",
      "Guisados","Sonoratown","Taqueria Vallarta","Rosa Mexicano","Lupe Tortilla",
    ]
  },

  breakfastFood: {
    label: 'Breakfast Food',
    question: 'What is the best breakfast food?',
    answers: [
      "Pancakes","Waffles","French Toast","Bacon","Eggs",
      "Sausage","Hash Browns","Biscuits & Gravy","Breakfast Burrito","Donuts",
      "Bagels","Cinnamon Roll","Oatmeal","Scrambled Eggs","Eggs Benedict",
      "Avocado Toast","Breakfast Sandwich","Chicken & Waffles","Breakfast Tacos","Omelet",
      "Crepes","Croissant","Muffin","Sticky Bun","Sausage Biscuit",
      "Egg McMuffin","Bacon Egg & Cheese","Toaster Strudel","Eggo Waffles","Pop-Tarts",
      "Chilaquiles","Huevos Rancheros","Migas","Acai Bowl","Smoothie Bowl",
      "Grits","Shrimp & Grits","Dutch Baby","Belgian Waffle","Kolache",
      "Apple Fritter","Glazed Donut","Bear Claw","Beignet","Pan Dulce",
    ]
  },

  iceCreamFlavor: {
    label: 'Ice Cream Flavor',
    question: 'What is the best ice cream flavor?',
    answers: [
      "Chocolate","Vanilla","Strawberry","Cookies & Cream","Mint Chocolate Chip",
      "Cookie Dough","Rocky Road","Birthday Cake","Butter Pecan","Pistachio",
      "Chocolate Fudge Brownie","Cherry Garcia","Phish Food","Half Baked","Coffee",
      "Salted Caramel","Dulce de Leche","Cinnamon","French Vanilla","Vanilla Bean",
      "Banana Split","Peach","Mango","Strawberry Cheesecake","Red Velvet",
      "Lemon","Rainbow Sherbet","Neapolitan","Moose Tracks","Pralines and Cream",
      "Peanut Butter Cup","Reese's","Snickers","Twix","Oreo",
      "Brownie Batter","Cake Batter","Funfetti","Superman","Bubble Gum",
      "Cotton Candy","Tiramisu","Ube","Matcha","S'mores",
      "Cereal Milk","Toasted Marshmallow","Sweet Cream","Coconut","Mochi Ice Cream",
    ]
  },

  pizzaTopping: {
    label: 'Pizza Topping',
    question: 'What is the best pizza topping?',
    answers: [
      "Pepperoni","Sausage","Extra Cheese","Mushrooms","Bacon",
      "Pineapple","Ham","Jalapenos","Chicken","Black Olives",
      "Bell Peppers","Onions","Spinach","Sun-Dried Tomatoes","Basil",
      "Garlic","Buffalo Chicken","BBQ Chicken","Meatball","Ground Beef",
      "Steak","Anchovies","Salami","Prosciutto","Roasted Red Peppers",
      "Artichokes","Banana Peppers","Feta","Goat Cheese","Blue Cheese",
      "Ricotta","Pesto","Alfredo Sauce","Buffalo Sauce","Hot Honey",
      "Truffle Oil","Pulled Pork","Brisket","Chorizo","Chicken Tenders",
    ]
  },

  cheese: {
    label: 'Cheese',
    question: 'What is the best cheese?',
    answers: [
      "Cheddar","Mozzarella","Pepper Jack","Parmesan","American",
      "Swiss","Provolone","Gouda","Brie","Colby Jack",
      "Monterey Jack","Blue Cheese","Feta","Goat Cheese","Cream Cheese",
      "Ricotta","Mascarpone","Camembert","Gorgonzola","Manchego",
      "Asiago","Gruyere","Burrata","String Cheese","Velveeta",
      "Pimento Cheese","Beer Cheese","Smoked Gouda","Sharp Cheddar","White Cheddar",
      "Nacho Cheese","Queso Fresco","Cotija","Oaxaca","Havarti",
      "Muenster","Halloumi","Babybel","Laughing Cow","Tillamook",
    ]
  },

  fruit: {
    label: 'Fruit',
    question: 'What is the best fruit?',
    answers: [
      "Strawberry","Watermelon","Mango","Banana","Apple",
      "Pineapple","Grapes","Orange","Peach","Blueberries",
      "Cherries","Kiwi","Raspberry","Pear","Plum",
      "Pomegranate","Blackberry","Cantaloupe","Honeydew","Papaya",
      "Guava","Passion Fruit","Dragon Fruit","Lychee","Fig",
      "Coconut","Avocado","Grapefruit","Tangerine","Clementine",
      "Lime","Lemon","Apricot","Nectarine","Cranberry",
      "Honeycrisp Apple","Fuji Apple","Granny Smith","Acai",
    ]
  },

  candy: {
    label: 'Candy',
    question: 'What is the best candy?',
    answers: [
      "Reese's Peanut Butter Cups","M&M's","Kit Kat","Snickers","Sour Patch Kids",
      "Skittles","Twix","Starburst","Hershey's Kisses","Jolly Ranchers",
      "Gummy Bears","Nerds","Butterfinger","Swedish Fish","Twizzlers",
      "Milky Way","Almond Joy","Hershey Bar","Take 5","Whatchamacallit",
      "Heath Bar","Payday","Tootsie Pop","Blow Pop","Pop Rocks",
      "Warheads","Atomic Fireball","Lemonhead","Mike and Ike","Hot Tamales",
      "Whoppers","Milk Duds","Junior Mints","York Peppermint Patty","Reese's Pieces",
      "Laffy Taffy","Air Heads","Hi-Chew","Haribo","Ferrero Rocher",
      "Kinder Bueno","Toblerone","Lindt Lindor","Nerds Gummy Clusters","Trolli",
    ]
  },

  breakfastCereal: {
    label: 'Breakfast Cereal',
    question: 'What is the best cereal?',
    answers: [
      "Cinnamon Toast Crunch","Frosted Flakes","Lucky Charms","Fruity Pebbles","Cocoa Pebbles",
      "Honey Nut Cheerios","Froot Loops","Cocoa Puffs","Cap'n Crunch","Cap'n Crunch Berries",
      "Reese's Puffs","Frosted Mini-Wheats","Apple Jacks","Cheerios","Rice Krispies",
      "Golden Grahams","Cookie Crisp","Trix","Life","Raisin Bran",
      "Honey Bunches of Oats","Krave","Corn Flakes","Honey Smacks","Honeycomb",
      "Count Chocula","Boo Berry","Franken Berry","Cocoa Krispies","Kix",
      "Frosted Cheerios","Chocolate Cheerios","Apple Cinnamon Cheerios","French Toast Crunch",
      "Cinnamon Toast Crunch Churros","S'mores Crunch","Oreo O's","Lucky Charms Magical Clusters",
      "Magic Spoon","Three Wishes","Catalina Crunch","Honey Maid S'mores",
    ]
  },

  snackBrand: {
    label: 'Snack Brand',
    question: 'What is the best snack brand?',
    answers: [
      "Cheez-It","Goldfish","Ritz","Triscuit","Wheat Thins",
      "Oreo","Chips Ahoy!","Nutter Butter","Famous Amos","Pepperidge Farm",
      "Combos","Bugles","Snyder's of Hanover","Rold Gold","Chex Mix",
      "Gardetto's","Pirate's Booty","SkinnyPop","Boom Chicka Pop","Cracker Jack",
      "Pop-Tarts","Gushers","Fruit Roll-Ups","Fruit by the Foot","Little Debbie",
      "Hostess","Slim Jim","Jack Link's","Nature Valley","Kind Bars",
      "Clif Bar","RXBAR","Larabar","Rice Krispies Treats","Quaker Rice Cakes",
      "Planters","Blue Diamond Almonds","Wonderful Pistachios","David Sunflower Seeds",
      "Sargento String Cheese","Babybel","Welch's Fruit Snacks","Annie's","Belvita",
    ]
  },

  chipBrand: {
    label: 'Chip Brand',
    question: 'What is the best chip brand?',
    answers: [
      "Lay's","Doritos","Pringles","Cheetos","Ruffles",
      "Takis","Fritos","Kettle Brand","Tostitos","Sun Chips",
      "Funyuns","Cape Cod","Utz","Wise","Herr's",
      "Miss Vickie's","Lay's Wavy","Lay's Kettle Cooked","Doritos Cool Ranch","Doritos Nacho Cheese",
      "Doritos Flamas","Doritos Dinamita","Pringles Sour Cream","Cheetos Crunchy","Cheetos Flamin' Hot",
      "Cheetos Puffs","Ruffles Cheddar Sour Cream","Tostitos Hint of Lime","Tostitos Scoops",
      "Fritos Chili Cheese","Zapp's","Terra Chips","Stacy's Pita Chips","Popchips",
      "Veggie Straws","Calbee Shrimp Chips","Plantain Chips","Beet Chips","Kale Chips",
    ]
  },

  cookieBrand: {
    label: 'Cookie Brand',
    question: 'What is the best cookie brand?',
    answers: [
      "Oreo","Chips Ahoy!","Nutter Butter","Famous Amos","Pepperidge Farm Milano",
      "Nilla Wafers","Keebler Fudge Stripes","Lorna Doone","Biscoff","Tate's",
      "Grandma's Cookies","Walkers Shortbread","Tim Tam","McVitie's Digestives","Stroopwafel",
      "Oreo Double Stuf","Oreo Golden","Oreo Birthday Cake","Oreo Mint","Chips Ahoy! Chewy",
      "Crumbl","Insomnia Cookies","Mrs. Fields","Levain","Tiff's Treats",
      "Doubletree Cookies","Toll House","Pillsbury Cookies","Subway Cookies","Otis Spunkmeyer",
      "Annie's","Pepperidge Farm Brussels","Pepperidge Farm Bordeaux","Trader Joe's Speculoos",
      "Simple Mills","Goodie Girl","Sweet Loren's",
    ]
  },

  hotSauce: {
    label: 'Hot Sauce',
    question: 'What is the best hot sauce?',
    answers: [
      "Tabasco","Frank's RedHot","Cholula","Tapatio","Huy Fong Sriracha",
      "Valentina","Crystal","Louisiana Hot Sauce","El Yucateco","Texas Pete",
      "Yellowbird","Truff","Secret Aardvark","Melinda's","Marie Sharp's",
      "Da Bomb","Hot Ones Last Dab","Nando's Peri Peri","Sweet Chili Sauce",
      "Mango Habanero","Pineapple Habanero","Ghost Pepper Sauce","Sambal Oelek",
      "Gochujang","Harissa","Tajin","Salsa Macha","Tabasco Chipotle",
      "Tabasco Habanero","Cholula Chili Lime","Cholula Sweet Habanero","Frank's Buffalo",
      "Valentina Black Label","Yellowbird Habanero","Truff White","Bravado",
      "I don't like hot sauce",
    ]
  },

  cuisine: {
    label: 'Cuisine',
    question: 'What is the best cuisine?',
    answers: [
      "Italian","Mexican","American","Chinese","Japanese",
      "Indian","Korean","Thai","Mediterranean","BBQ",
      "Vietnamese","Greek","French","Soul Food","Middle Eastern",
      "Caribbean","Jamaican","Cajun","Creole","Tex-Mex",
      "Southern","Cuban","Puerto Rican","Peruvian","Brazilian",
      "Spanish","Portuguese","Moroccan","Nigerian","West African",
      "Lebanese","Turkish","Persian","Filipino","Hawaiian",
      "Fusion","German","Russian","Polish","Ukrainian",
      "Taiwanese","Cantonese","Sichuan","Colombian","Argentinian",
    ]
  },

  sauce: {
    label: 'Sauce',
    question: 'What is the best sauce?',
    answers: [
      "Ranch","BBQ Sauce","Ketchup","Mustard","Mayo",
      "Hot Sauce","Chick-fil-A Sauce","Buffalo Sauce","Honey Mustard","Sweet & Sour",
      "Alfredo","Marinara","Pesto","Tartar","Sriracha Mayo",
      "Spicy Mayo","Yum Yum","Garlic Aioli","Thousand Island","Tzatziki",
      "Chimichurri","Teriyaki","Soy Sauce","Hoisin","Mole",
      "Comeback Sauce","Cane's Sauce","Polynesian Sauce","Zax Sauce","Big Mac Sauce",
      "Adobo","Chipotle Mayo","Chipotle Ranch","Green Goddess","Caesar",
      "Beurre Blanc","Hollandaise","Bearnaise","Vodka Sauce","Bolognese",
      "Jerk Sauce","Garlic Butter","Au Jus","Brown Gravy","Sausage Gravy",
    ]
  },

  fries: {
    label: 'Best Fries',
    question: 'Which place has the best fries?',
    answers: [
      "McDonald's","Chick-fil-A","Five Guys","Arby's","Wendy's",
      "In-N-Out","Raising Cane's","Burger King","Jack in the Box","Taco Bell",
      "KFC","Carl's Jr.","Culver's","Sonic","Whataburger",
      "Shake Shack","Smashburger","Cook Out","Freddy's","Checkers",
      "Steak 'n Shake","Bojangles","Popeyes","Zaxby's","Wingstop",
      "White Castle","Fatburger","BurgerFi","Hopdoddy","Red Robin",
      "Waffle Fries","Curly Fries","Crinkle Fries","Sweet Potato Fries","Steak Fries",
      "Shoestring Fries","Hand Cut Fries","Tornado Fries","Boardwalk Fries","Cajun Fries",
    ]
  },

  cerealMascot: {
    label: 'Cereal Mascot',
    question: 'Who is the best cereal mascot?',
    answers: [
      "Tony the Tiger","Toucan Sam","Cap'n Crunch","Lucky the Leprechaun","Trix Rabbit",
      "Sonny the Cuckoo Bird","Count Chocula","Snap, Crackle & Pop","Dig'em Frog","Sugar Bear",
      "Cornelius the Rooster","Boo Berry Ghost","Franken Berry","BuzzBee (Honey Nut Cheerios)",
      "Quisp","Cinnamon Toast Crunch Chef","Cookie Crisp Wolf","Honey Smacks Frog",
      "King Vitaman","Linus the Lion","Mikey (Life Cereal)","Jean LaFoote",
      "Crunchberry Beast","Apple Jack & CinnaMon","Honey Bee","Wendell the Baker",
      "Quake","Sir Grapefellow","Honey Monster","Marky Maypo",
    ]
  },

  pizzaCrust: {
    label: 'Pizza Crust',
    question: 'What is the best pizza crust?',
    answers: [
      "Hand Tossed","Thin Crust","Stuffed Crust","Pan Pizza","Deep Dish",
      "New York Style","Sicilian","Cauliflower Crust","Detroit Style","Chicago Style",
      "Neapolitan","Grandma Style","Brooklyn Style","Brick Oven","Wood Fired",
      "Crispy Thin","Cracker Thin","Tavern Style","St. Louis Style","California Style",
      "Focaccia","Flatbread","Pita Crust","Naan Crust","French Bread",
      "Bagel Crust","Pretzel Crust","Cheese-Stuffed","Garlic Butter Crust","Sourdough",
      "Whole Wheat","Gluten-Free","Banza Chickpea","Caulipower","Hot Dog Stuffed",
    ]
  },

  countryFood: {
    label: 'Country Food',
    question: 'Which country has the best food?',
    answers: [
      "Italy","Mexico","Japan","United States","China",
      "Korea","India","France","Thailand","Greece",
      "Vietnam","Spain","Jamaica","Ethiopia","Nigeria",
      "Trinidad","Cuba","Puerto Rico","Brazil","Argentina",
      "Peru","Colombia","Lebanon","Turkey","Iran",
      "Morocco","Israel","Philippines","Malaysia","Indonesia",
      "Dominican Republic","Haiti","El Salvador","Portugal","Germany",
      "UK","Canada","Hawaii","Senegal","Ghana",
    ]
  },

  waterBrand: {
    label: 'Water Brand',
    question: 'What is the best water brand?',
    answers: [
      "Fiji","Smartwater","Dasani","Evian","Aquafina",
      "Liquid Death","Arrowhead","Kirkland","Poland Spring","Essentia",
      "Voss","Perrier","San Pellegrino","Mountain Valley","Saratoga",
      "Crystal Geyser","Topo Chico","LaCroix","Bubly","Spindrift",
      "Waiakea","Just Water","Boxed Water","Acqua Panna","Hint Water",
      "Vitamin Water","Propel","BodyArmor","Liquid IV","Nuun",
      "Brita Filter","ZeroWater","Alkaline Water","Coconut Water","Tap Water",
    ]
  },

  candyBar: {
    label: 'Candy Bar',
    question: 'What is the best candy bar?',
    answers: [
      "Snickers","Twix","Kit Kat","Reese's","Milky Way",
      "3 Musketeers","Almond Joy","Mounds","Hershey Bar","Hershey's Special Dark",
      "Crunch Bar","100 Grand","Take 5","Whatchamacallit","Mr. Goodbar",
      "Heath Bar","Skor","Payday","Zero Bar","Butterfinger",
      "Baby Ruth","5th Avenue","Oh Henry!","Caramello","Snickers Almond",
      "Snickers Peanut Butter","Twix Peanut Butter","Reese's Big Cup","Reese's Fast Break",
      "Milky Way Midnight","Toblerone","Kinder Bueno","Ferrero Rocher","Ghirardelli Bar",
      "Cadbury Dairy Milk","Aero Bar","Crunchie","Lindt Bar","Charleston Chew",
    ]
  },

  fountainDrink: {
    label: 'Fountain Drink',
    question: 'What is the best fountain drink?',
    answers: [
      "Coca-Cola","Pepsi","Dr Pepper","Sprite","Mountain Dew",
      "Root Beer","Cherry Coke","Vanilla Coke","Diet Coke","Coke Zero",
      "7UP","Starry","Fanta Orange","Fanta Grape","Big Red",
      "Sweet Tea","Lemonade","Strawberry Lemonade","Pink Lemonade","Arnold Palmer",
      "Brisk Iced Tea","Lipton Iced Tea","Peach Tea","Raspberry Tea","Cream Soda",
      "Orange Crush","Grape Crush","Mello Yello","Squirt","Cheerwine",
      "Mountain Dew Baja Blast","Mountain Dew Code Red","Cherry Pepsi","Dr Pepper Cream Soda",
      "Sprite Cranberry","Jarritos","Mexican Coke","Fresca","Barq's Root Beer",
    ]
  },

  drinkFlavor: {
    label: 'Drink Flavor',
    question: 'What is the best drink flavor?',
    answers: [
      "Cherry","Vanilla","Cherry Vanilla","Cola","Orange",
      "Grape","Strawberry","Apple","Peach","Mango",
      "Pineapple","Lime","Lemon","Root Beer","Cream Soda",
      "Lemon Lime","Watermelon","Tropical","Blue Raspberry","Green Apple",
      "Mountain Dew Baja Blast","Mountain Dew Code Red","Cherry Coke","Vanilla Coke",
      "Dr Pepper Cherry","Dr Pepper Cream Soda","Sprite Cranberry","Sprite Tropical",
      "Strawberry Lemonade","Peach Lemonade","Raspberry Tea","Peach Tea","Sweet Tea",
      "Arnold Palmer","Horchata","Thai Tea","Boba","Pina Colada",
      "Mango Lassi","Strawberry Banana","Pineapple Coconut",
    ]
  },

  coffeeChain: {
    label: 'Coffee Chain',
    question: 'What is the best coffee chain?',
    answers: [
      "Starbucks","Dunkin'","Tim Hortons","Peet's Coffee","Dutch Bros",
      "7Brew","Caribou Coffee","Coffee Bean & Tea Leaf","Philz Coffee","Blue Bottle Coffee",
      "Stumptown","La Colombe","Intelligentsia","McCafe","Krispy Kreme Coffee",
      "Scooter's","Black Rock Coffee","Caffe Nero","Second Cup","Joe & The Juice",
      "Bluestone Lane","Verve Coffee","Sightglass","Ritual Coffee","Compass Coffee",
      "Tatte Bakery","George Howell","Pavement Coffee","Diesel Cafe","Broadsheet Coffee",
    ]
  },

  restaurantChain: {
    label: 'Restaurant Chain',
    question: 'What is the best sit-down restaurant chain?',
    answers: [
      "Olive Garden","Applebee's","Chili's","Texas Roadhouse","Outback Steakhouse",
      "Cheesecake Factory","Red Lobster","LongHorn Steakhouse","TGI Fridays","Denny's",
      "IHOP","Cracker Barrel","Buffalo Wild Wings","Hooters","Twin Peaks",
      "Maggiano's","Carrabba's","Bonefish Grill","BJ's Restaurant","Yard House",
      "P.F. Chang's","Benihana","Red Robin","Golden Corral","Waffle House",
      "Bob Evans","Village Inn","Black Bear Diner","Texas de Brazil","Dave & Buster's",
      "Cooper's Hawk","Cheddar's","Cracker Barrel Old Country Store","Old Spaghetti Factory",
      "Ruth's Chris","Morton's","Capital Grille","Hard Rock Cafe","Planet Hollywood",
    ]
  },

  sport: {
    label: 'Sport',
    question: 'What is the best sport?',
    answers: [
      "Football","Basketball","Baseball","Soccer","MMA/UFC",
      "Boxing","Tennis","Golf","Hockey","Track & Field",
      "Volleyball","Wrestling","Swimming","NASCAR","Formula 1",
      "Gymnastics","Skateboarding","Surfing","Bowling","Softball",
      "Lacrosse","Rugby","Cricket","Field Hockey","Snowboarding",
      "Skiing","Figure Skating","Cycling","BMX","Triathlon",
      "Pickleball","Racquetball","Badminton","Table Tennis","Darts",
      "Pool/Billiards","Esports","Archery","Karate","Taekwondo",
    ]
  },

  sportsTeam: {
    label: 'Sports Team',
    question: 'What is the best sports team?',
    answers: [
      "Los Angeles Lakers","Dallas Cowboys","New York Yankees","Golden State Warriors","Kansas City Chiefs",
      "Boston Celtics","Los Angeles Dodgers","Chicago Bulls","San Francisco 49ers","New England Patriots",
      "Pittsburgh Steelers","Green Bay Packers","Philadelphia Eagles","Buffalo Bills","Miami Dolphins",
      "Baltimore Ravens","Cincinnati Bengals","Cleveland Browns","Denver Broncos","Las Vegas Raiders",
      "Seattle Seahawks","Tampa Bay Buccaneers","New Orleans Saints","Detroit Lions","Minnesota Vikings",
      "Chicago Bears","New York Giants","Washington Commanders","Real Madrid","Barcelona",
      "Manchester United","Manchester City","Liverpool","Bayern Munich","PSG",
      "Boston Red Sox","Chicago Cubs","Atlanta Braves","Houston Astros","Miami Heat",
      "Milwaukee Bucks","Phoenix Suns","Dallas Mavericks","Brooklyn Nets","Philadelphia 76ers",
    ]
  },

  famousAthlete: {
    label: 'Best Athlete',
    question: 'Who is the best athlete of all time?',
    answers: [
      "Michael Jordan","LeBron James","Kobe Bryant","Tom Brady","Muhammad Ali",
      "Serena Williams","Tiger Woods","Lionel Messi","Cristiano Ronaldo","Usain Bolt",
      "Mike Tyson","Floyd Mayweather","Simone Biles","Michael Phelps","Wayne Gretzky",
      "Roger Federer","Rafael Nadal","Novak Djokovic","Stephen Curry","Giannis Antetokounmpo",
      "Patrick Mahomes","Magic Johnson","Larry Bird","Bill Russell","Wilt Chamberlain",
      "Babe Ruth","Derek Jeter","Shohei Ohtani","Peyton Manning","Aaron Rodgers",
      "Pele","Neymar","Kylian Mbappe","Erling Haaland","Jack Nicklaus",
      "Ronda Rousey","Conor McGregor","Venus Williams","Naomi Osaka","Coco Gauff",
      "Deion Sanders","Bo Jackson","Lamar Jackson","Josh Allen","Scottie Scheffler",
    ]
  },

  olympicSport: {
    label: 'Olympic Sport',
    question: 'What is the best Olympic sport to watch?',
    answers: [
      "Basketball","Gymnastics","Swimming","Track & Field","Soccer",
      "Snowboarding","Skateboarding","Volleyball","Beach Volleyball","Figure Skating",
      "Wrestling","Surfing","Diving","Hockey","Skiing",
      "Tennis","Boxing","Judo","Taekwondo","Fencing",
      "Archery","Cycling","BMX","Triathlon","Marathon",
      "Pole Vault","High Jump","Long Jump","Shot Put","Sprinting",
      "Water Polo","Rowing","Sailing","Equestrian","Rhythmic Gymnastics",
      "Trampoline","Handball","Softball","Baseball","Climbing",
    ]
  },

  sportsLeague: {
    label: 'Sports League',
    question: 'What is the best sports league?',
    answers: [
      "NFL","NBA","MLB","NHL","WNBA",
      "MLS","NCAA Football","NCAA Basketball","UEFA Champions League","English Premier League",
      "La Liga","Serie A","Bundesliga","Ligue 1","Copa Libertadores",
      "FIFA World Cup","Copa America","UEFA Euro","UFC","Bellator",
      "ATP Tennis","WTA Tennis","PGA Tour","LIV Golf","LPGA",
      "NASCAR Cup Series","Formula 1","IndyCar","MLB","NBA G League",
      "IPL Cricket","Rugby World Cup","NRL","Super Rugby","Big Bash Cricket",
    ]
  },

  videoGameFranchise: {
    label: 'Video Game Franchise',
    question: 'What is the best video game franchise?',
    answers: [
      "Mario","Zelda","Pokemon","Call of Duty","Grand Theft Auto",
      "Halo","God of War","The Last of Us","Final Fantasy","Resident Evil",
      "Street Fighter","Mortal Kombat","Super Smash Bros","Sonic","Minecraft",
      "Fortnite","Apex Legends","Valorant","Counter-Strike","Overwatch",
      "Animal Crossing","Mario Kart","Mario Party","Assassin's Creed","Elder Scrolls",
      "Fallout","Mass Effect","Dragon Age","The Sims","Civilization",
      "Uncharted","Horizon","Gran Turismo","Forza Horizon","Gears of War",
      "Ratchet & Clank","Spider-Man","Batman Arkham","Borderlands","Diablo",
      "BioShock","Doom","Metroid","Kirby","Donkey Kong Country",
    ]
  },

  videoGameCompany: {
    label: 'Video Game Company',
    question: 'What is the best video game company?',
    answers: [
      "Nintendo","Sony PlayStation","Microsoft Xbox","Rockstar Games","Mojang",
      "Epic Games","Valve","Naughty Dog","Blizzard Entertainment","Riot Games",
      "Ubisoft","Activision","EA Sports","Capcom","Sega",
      "Bethesda","Insomniac Games","Bungie","Respawn Entertainment","CD Projekt Red",
      "Square Enix","Bandai Namco","Konami","FromSoftware","Rare",
      "BioWare","Santa Monica Studio","Treyarch","Infinity Ward","Game Freak",
      "Larian Studios","NetherRealm Studios","Guerrilla Games","Sucker Punch","id Software",
      "ConcernedApe","Hello Games","PlatinumGames","Obsidian Entertainment","IO Interactive",
    ]
  },

  gamingConsole: {
    label: 'Gaming Console',
    question: 'What is the best gaming console?',
    answers: [
      "PlayStation 2","PlayStation 5","Xbox 360","Nintendo Switch","PlayStation 4",
      "Nintendo Wii","Xbox One","Nintendo 64","GameCube","PlayStation 3",
      "Super Nintendo","Xbox Series X","Game Boy Advance","PSP","Game Boy",
      "Nintendo Wii U","Sega Genesis","Dreamcast","Nintendo 3DS","PlayStation 1",
      "Original Xbox","NES","Atari 2600","Steam Deck","Nintendo Switch OLED",
      "Game Boy SP","PlayStation Vita","Oculus Quest 2","Meta Quest 3","Nintendo Switch 2",
      "Xbox Series S","Retroid Pocket","Analogue Pocket","SNES Classic","NES Classic",
    ]
  },

  boardGame: {
    label: 'Board Game',
    question: 'What is the best board game?',
    answers: [
      "Monopoly","Chess","Uno","Scrabble","Clue",
      "Connect 4","Sorry!","The Game of Life","Battleship","Jenga",
      "Risk","Candy Land","Trouble","Catan","Guess Who?",
      "Yahtzee","Twister","Pictionary","Sequence","Mancala",
      "Exploding Kittens","Ticket to Ride","Trivial Pursuit","Codenames","Cards Against Humanity",
      "Apples to Apples","Pandemic","Taco Cat Goat Cheese Pizza","Hedbanz","Telestrations",
      "Dungeons & Dragons","Wingspan","Azul","7 Wonders","Carcassonne",
      "Coup","Dominion","King of Tokyo","Betrayal at House on the Hill","Gloomhaven",
      "Spades","Bid Whist","Tonk","Family Feud Board Game","Wheel of Fortune Game",
    ]
  },

  videoGameChar: {
    label: 'Video Game Character',
    question: 'Who is the best video game character?',
    answers: [
      "Mario","Link","Master Chief","Kratos","Sonic the Hedgehog",
      "Pikachu","Cloud Strife","Sephiroth","Lara Croft","Nathan Drake",
      "Joel","Ellie","Steve (Minecraft)","Pac-Man","Crash Bandicoot",
      "Spyro","Arthur Morgan","John Marston","Geralt of Rivia","CJ (San Andreas)",
      "Tommy Vercetti","Niko Bellic","Trevor Philips","Bowser","Ganondorf",
      "Dante","Leon Kennedy","Solid Snake","Bayonetta","Ezio Auditore",
      "Luigi","Princess Peach","Yoshi","Donkey Kong","Wario",
      "Charizard","Mewtwo","Shadow the Hedgehog","Waluigi","Toad",
    ]
  },

  app: {
    label: 'App',
    question: 'What is the best app on your phone?',
    answers: [
      "YouTube","TikTok","Instagram","Spotify","Google Maps",
      "Snapchat","Netflix","Discord","ChatGPT","Gmail",
      "Reddit","Amazon","Uber","Google Chrome","X (Twitter)",
      "Facebook","WhatsApp","DoorDash","Twitch","Cash App",
      "Venmo","PayPal","Apple Music","Waze","Pinterest",
      "CapCut","Duolingo","Hulu","Disney+","Roblox",
      "Canva","ESPN","Yelp","Telegram","FaceTime",
      "Coinbase","Shazam","Notion","Zoom","LinkedIn",
    ]
  },

  phoneBrand: {
    label: 'Phone Brand',
    question: 'What is the best phone brand?',
    answers: [
      "Apple (iPhone)","Samsung","Google Pixel","Motorola","OnePlus",
      "Nokia","Sony","LG","Xiaomi","Huawei",
      "ASUS","Nothing","Oppo","HTC","BlackBerry",
      "Honor","iPhone Pro","Samsung Galaxy S","Samsung Galaxy Z Fold","Samsung Galaxy Z Flip",
      "Google Pixel Pro","OnePlus Open","Motorola Razr","ROG Phone","Black Shark",
      "Sony Xperia","Huawei Mate","OnePlus Nord","iPhone SE","iPhone Mini",
    ]
  },

  messagingApp: {
    label: 'Messaging App',
    question: 'What is the best messaging app?',
    answers: [
      "iMessage","WhatsApp","Snapchat","Instagram DMs","Discord",
      "Messenger","Telegram","Signal","X DMs","TikTok DMs",
      "GroupMe","Slack","Microsoft Teams","Google Chat","Skype",
      "Viber","Line","WeChat","KakaoTalk","Kik",
      "FaceTime","Google Meet","Zoom","BBM","SMS/Text",
      "Reddit Chat","RCS","Marco Polo","Voxer","Beeper",
    ]
  },

  movieGenre: {
    label: 'Movie Genre',
    question: 'What is the best movie genre?',
    answers: [
      "Action","Comedy","Horror","Thriller","Sci-Fi",
      "Romance","Drama","Animated","Superhero","Mystery",
      "Adventure","Fantasy","Crime","Documentary","Musical",
      "Romcom","Coming of Age","Slasher","Psychological Thriller","Spy",
      "Heist","Gangster","Martial Arts","Zombie","Vampire",
      "Found Footage","Supernatural","Indie","Bollywood","K-Drama",
      "True Crime","Mockumentary","Parody","Dark Comedy","Sports Drama",
      "Period Drama","Post-Apocalyptic","Cyberpunk","Christmas Movie","Hood Movie",
    ]
  },

  musicGenre: {
    label: 'Music Genre',
    question: 'What is the best music genre?',
    answers: [
      "Hip-Hop","R&B","Pop","Rock","Country",
      "EDM","Latin","Reggaeton","Reggae","Afrobeats",
      "Alternative","Indie","Jazz","Blues","Funk",
      "Soul","Gospel","Neo-Soul","Disco","Motown",
      "Metal","Hard Rock","Punk","Pop Punk","Emo",
      "Screamo","Grunge","Folk","Bluegrass","Classical",
      "Trap","Drill","Mumble Rap","Conscious Rap","Old School Hip-Hop",
      "K-Pop","J-Pop","Bossa Nova","Salsa","Bachata",
      "Cumbia","Corridos","Synthwave","Lo-Fi","House",
      "Techno","Trance","Dubstep","Future Bass","Drum and Bass",
    ]
  },

  famousRapper: {
    label: 'Best Rapper',
    question: 'Who is the best rapper of all time?',
    answers: [
      "Tupac","Notorious B.I.G.","Jay-Z","Nas","Eminem",
      "Kendrick Lamar","Drake","Lil Wayne","Kanye West","J. Cole",
      "Andre 3000","Big Pun","Big L","Rakim","KRS-One",
      "Method Man","Ghostface Killah","Nipsey Hussle","DMX","Ludacris",
      "T.I.","Rick Ross","Meek Mill","Pusha T","Lil Baby",
      "21 Savage","Future","Travis Scott","50 Cent","Snoop Dogg",
      "Ice Cube","Dr. Dre","Eazy-E","Nicki Minaj","Cardi B",
      "Megan Thee Stallion","Missy Elliott","Lauryn Hill","MC Lyte","Queen Latifah",
      "Tyler the Creator","Childish Gambino","Mac Miller","Logic","Lupe Fiasco",
      "Common","Talib Kweli","Mos Def","Lil Uzi Vert","Playboi Carti",
    ]
  },

  superhero: {
    label: 'Superhero',
    question: 'Who is the best superhero?',
    answers: [
      "Spider-Man","Batman","Superman","Iron Man","Wolverine",
      "Hulk","Captain America","Thor","Deadpool","Black Panther",
      "Flash","Wonder Woman","Aquaman","Green Lantern","Green Arrow",
      "Shazam","Captain Marvel","Doctor Strange","Scarlet Witch","Vision",
      "Hawkeye","Black Widow","Falcon","Bucky Barnes","War Machine",
      "Ant-Man","Miles Morales","Spider-Gwen","Venom","Cyclops",
      "Storm","Rogue","Gambit","Nightcrawler","Daredevil",
      "Punisher","Jessica Jones","Luke Cage","Iron Fist","She-Hulk",
      "Supergirl","Batgirl","Batwoman","Black Lightning","Static Shock",
    ]
  },

  villain: {
    label: 'Best Villain',
    question: 'Who is the best movie/TV villain?',
    answers: [
      "Joker","Darth Vader","Thanos","Voldemort","Loki",
      "Magneto","Green Goblin","Lex Luthor","Doctor Doom","Killmonger",
      "Hannibal Lecter","Michael Myers","Freddy Krueger","Jason Voorhees","Pennywise",
      "Chucky","Leatherface","Ghostface","The Terminator","Agent Smith",
      "Sauron","Saruman","Smaug","Maleficent","Ursula",
      "Scar","Jafar","Cruella de Vil","Captain Hook","Hades",
      "Bowser","Ganondorf","Sephiroth","Albert Wesker","Anton Chigurh",
      "Joker (Heath Ledger)","Joker (Joaquin Phoenix)","Bane","Ra's al Ghul","Darkseid",
      "Cersei Lannister","Joffrey Baratheon","Ramsay Bolton","Night King","Tywin Lannister",
    ]
  },

  fictionalHero: {
    label: 'Fictional Hero',
    question: 'Who is the best fictional hero?',
    answers: [
      "Harry Potter","Frodo Baggins","Luke Skywalker","Katniss Everdeen","Hermione Granger",
      "Aragorn","Gandalf","Han Solo","Princess Leia","Obi-Wan Kenobi",
      "The Mandalorian","Ahsoka Tano","Percy Jackson","Annabeth Chase","James Bond",
      "Indiana Jones","Neo","Sherlock Holmes","Goku","Naruto",
      "Luffy","Batman (fictional)","Superman (fictional)","Spider-Man (fictional)","Iron Man (fictional)",
      "Captain America (fictional)","Optimus Prime","He-Man","She-Ra","Buffy Summers",
      "Bilbo Baggins","Samwise Gamgee","Legolas","Gimli","Eowyn",
      "Ciri","Geralt of Rivia","Arthur Morgan","Joel Miller","Ellie",
    ]
  },

  fictionalVillain: {
    label: 'Fictional Villain',
    question: 'Who is the best fictional villain?',
    answers: [
      "Voldemort","Darth Vader","Emperor Palpatine","Sauron","Hannibal Lecter",
      "Pennywise","Joker","Thanos","Loki","Magneto",
      "Kylo Ren","Darth Maul","Saruman","Smaug","Maleficent",
      "Ursula","Scar","Jafar","Gaston","Hades",
      "Cersei Lannister","Joffrey Baratheon","Ramsay Bolton","Night King","Tywin Lannister",
      "Anton Chigurh","Michael Corleone","Tony Montana","Buffalo Bill","Nurse Ratched",
      "Amy Dunne (Gone Girl)","Hans Landa","Patrick Bateman","The Wicked Witch","Dolores Umbridge",
      "Grand Moff Tarkin","Boba Fett","Kylo Ren","Snoke","General Grievous",
    ]
  },

  holidayMovie: {
    label: 'Holiday Movie',
    question: 'What is the best holiday movie?',
    answers: [
      "Home Alone","Elf","The Polar Express","A Christmas Story","How the Grinch Stole Christmas",
      "Christmas Vacation","The Nightmare Before Christmas","It's a Wonderful Life","Die Hard",
      "Love Actually","Miracle on 34th Street","White Christmas","A Charlie Brown Christmas",
      "Rudolph the Red-Nosed Reindeer","Frosty the Snowman","A Christmas Carol","Scrooged",
      "The Muppet Christmas Carol","Klaus","The Holiday","Best Man Holiday","This Christmas",
      "Almost Christmas","Friday After Next","A Madea Christmas","Last Holiday","Jingle Jangle",
      "The Preacher's Wife","Gremlins","Bad Santa","Christmas Chronicles","Four Christmases",
      "Hocus Pocus","Hocus Pocus 2","Halloweentown","Coco","Planes Trains and Automobiles",
    ]
  },

  gameShow: {
    label: 'Game Show',
    question: 'What is the best game show ever?',
    answers: [
      "Family Feud","Jeopardy!","Wheel of Fortune","The Price Is Right","Who Wants to Be a Millionaire",
      "Survivor","The Voice","America's Got Talent","American Idol","The Masked Singer",
      "Deal or No Deal","Are You Smarter Than a 5th Grader","Press Your Luck","Match Game",
      "Hollywood Squares","The $100,000 Pyramid","Let's Make a Deal","Beat Shazam",
      "Fear Factor","Wipeout","Holey Moley","The 1% Club","Cash Cab",
      "Hell's Kitchen","Top Chef","MasterChef","The Great British Bake Off","Chopped",
      "The Bachelor","Love Is Blind","Love Island","Too Hot to Handle","90 Day Fiance",
      "The Wall","Common Knowledge","People Puzzler","Generation Gap","Lingo",
    ]
  },

  musicDecade: {
    label: 'Music Decade',
    question: 'Which decade had the best music?',
    answers: [
      "60s","70s","80s","90s","2000s",
      "2010s","2020s","50s","40s",
    ]
  },

  dogBreed: {
    label: 'Dog Breed',
    question: 'What is the best dog breed?',
    answers: [
      "Golden Retriever","Labrador Retriever","German Shepherd","Husky","French Bulldog",
      "Pit Bull","Poodle","Bulldog","Beagle","Rottweiler",
      "Doberman","Border Collie","Dachshund","Australian Shepherd","Pomeranian",
      "Yorkie","Chihuahua","Maltese","Shih Tzu","Pug",
      "Boston Terrier","Boxer","Mastiff","Great Dane","Saint Bernard",
      "Bernese Mountain Dog","Akita","Shiba Inu","Samoyed","Alaskan Malamute",
      "Cane Corso","Welsh Corgi","Cocker Spaniel","German Shorthaired Pointer","Belgian Malinois",
      "Goldendoodle","Labradoodle","Cockapoo","Maltipoo","Cavapoo",
      "Siberian Husky","Catahoula","Australian Cattle Dog","Vizsla","Weimaraner",
    ]
  },

  catBreed: {
    label: 'Cat Breed',
    question: 'What is the best cat breed?',
    answers: [
      "Maine Coon","Persian","Siamese","Ragdoll","Bengal",
      "British Shorthair","Sphynx","Scottish Fold","Russian Blue","American Shorthair",
      "Abyssinian","Burmese","Birman","Himalayan","Exotic Shorthair",
      "Norwegian Forest Cat","Siberian","Turkish Angora","Egyptian Mau","Savannah",
      "Munchkin","Bombay","Tonkinese","Devon Rex","Cornish Rex",
      "Ragamuffin","Manx","American Bobtail","Japanese Bobtail","Toyger",
      "Calico","Tortoiseshell","Tabby","Tuxedo","Orange Cat",
    ]
  },

  farmAnimal: {
    label: 'Farm Animal',
    question: 'What is the best farm animal?',
    answers: [
      "Horse","Cow","Pig","Sheep","Chicken",
      "Goat","Duck","Dog (farm dog)","Cat (barn cat)","Rabbit",
      "Donkey","Llama","Alpaca","Turkey","Goose",
      "Highland Cow","Mini Pig","Pot Belly Pig","Lamb","Calf",
      "Pony","Mini Horse","Rooster","Hen","Peacock",
      "Guinea Fowl","Quail","Pheasant","Angus Cattle","Quarter Horse",
    ]
  },

  seaAnimal: {
    label: 'Sea Animal',
    question: 'What is the best sea animal?',
    answers: [
      "Dolphin","Killer Whale (Orca)","Humpback Whale","Blue Whale","Narwhal",
      "Great White Shark","Whale Shark","Hammerhead Shark","Sea Turtle","Octopus",
      "Manta Ray","Stingray","Sea Otter","Beluga Whale","Manatee",
      "Clownfish","Sea Horse","Lobster","Crab","Jellyfish",
      "Squid","Giant Squid","Sea Lion","Walrus","Seal",
      "Emperor Penguin","Puffin","Pelican","Starfish","Coral",
      "Blue Crab","King Crab","Sperm Whale","Goblin Shark","Bioluminescent Fish",
    ]
  },

  pet: {
    label: 'Best Pet',
    question: 'What is the best pet to own?',
    answers: [
      "Dog","Cat","Fish","Goldfish","Betta Fish",
      "Hamster","Guinea Pig","Rabbit","Hedgehog","Ferret",
      "Chinchilla","Gerbil","Bird","Parakeet","Cockatiel",
      "Parrot","Macaw","Snake","Ball Python","Bearded Dragon",
      "Leopard Gecko","Axolotl","Turtle","Tortoise","Tarantula",
      "Hermit Crab","Praying Mantis","Sugar Glider","Chinchilla","Mini Pig",
      "Goldendoodle","Mini Horse","Chicken","Duck","Llama",
    ]
  },

  store: {
    label: 'Best Store',
    question: 'What is the best store to shop at?',
    answers: [
      "Target","Walmart","Costco","Amazon","Best Buy",
      "Home Depot","Whole Foods","Trader Joe's","IKEA","Lowe's",
      "Sam's Club","Macy's","Nordstrom","TJ Maxx","Marshalls",
      "HomeGoods","Ross","Burlington","Foot Locker","Dick's Sporting Goods",
      "Academy Sports","REI","Bass Pro Shops","PetSmart","CVS",
      "Walgreens","7-Eleven","Wawa","Dollar Tree","Dollar General",
      "Aldi","Lidl","Publix","Kroger","H-E-B",
      "Wegmans","Eataly","Five Below","Container Store","West Elm",
    ]
  },

  clothingBrand: {
    label: 'Clothing Brand',
    question: 'What is the best clothing brand?',
    answers: [
      "Nike","Adidas","Gucci","Louis Vuitton","Levi's",
      "Supreme","H&M","Zara","Uniqlo","Champion",
      "Tommy Hilfiger","Polo Ralph Lauren","Calvin Klein","Lacoste","Under Armour",
      "Puma","Reebok","Vans","Converse","New Balance",
      "American Eagle","Hollister","Abercrombie","Forever 21","Old Navy",
      "Gap","Urban Outfitters","Anthropologie","Lululemon","Patagonia",
      "The North Face","Carhartt","Dickies","Wrangler","True Religion",
      "Diesel","Hugo Boss","Versace","Prada","Balenciaga",
      "Off-White","Yeezy","Fear of God","Essentials","Bape",
    ]
  },

  shoeBrand: {
    label: 'Shoe Brand',
    question: 'What is the best shoe brand?',
    answers: [
      "Nike","Adidas","Jordan","New Balance","Converse",
      "Vans","Puma","Reebok","ASICS","Under Armour",
      "Yeezy","Crocs","Skechers","Timberland","Doc Martens",
      "UGG","Birkenstock","Steve Madden","Cole Haan","Gucci",
      "Louis Vuitton","Christian Louboutin","Salomon","Hoka","Brooks",
      "Saucony","Merrell","On (Cloud)","Allbirds","Veja",
      "Common Projects","Maison Margiela","Golden Goose","Balenciaga Triple S",
      "Tecovas","Red Wing","Thursday Boot","Keen","Teva",
    ]
  },

  sneakerBrand: {
    label: 'Sneaker Brand',
    question: 'What is the best sneaker brand?',
    answers: [
      "Nike","Jordan","Adidas","New Balance","Converse",
      "Vans","Puma","Yeezy","ASICS","Reebok",
      "Air Force 1","Nike Dunk","Nike Air Max","Jordan 1","Jordan 4",
      "Jordan 11","Adidas Ultra Boost","Adidas Samba","Adidas Stan Smith","Adidas Gazelle",
      "New Balance 990","New Balance 550","Vans Old Skool","Converse Chuck Taylor",
      "Hoka Bondi","Salomon XT-6","On Cloud","Maison Margiela Replica","Golden Goose",
      "Common Projects","Balenciaga Track","Gucci Ace","Dior B22","Off-White Out of Office",
    ]
  },

  jeanBrand: {
    label: 'Jean Brand',
    question: 'What is the best jeans brand?',
    answers: [
      "Levi's","Wrangler","American Eagle","Hollister","Lee",
      "Calvin Klein","Lucky Brand","True Religion","Diesel","Old Navy",
      "Abercrombie","Gap","Hudson","Joe's Jeans","Citizens of Humanity",
      "Paige","AG Jeans","7 For All Mankind","J Brand","Frame",
      "Madewell","Everlane","AGOLDE","Reformation","Closed",
      "Acne Studios","A.P.C.","Iron Heart","Pure Blue Japan","Levi's 501",
      "Levi's 511","Wrangler Cowboy Cut","Rocawear","Sean John","True Religion Ricky",
    ]
  },

  hatBrand: {
    label: 'Hat Brand',
    question: 'What is the best hat brand?',
    answers: [
      "New Era","'47 Brand","Nike","Adidas","Carhartt",
      "Stetson","Vans","Supreme","Goorin Bros","Brixton",
      "Mitchell & Ness","Polo Ralph Lauren","Tommy Hilfiger","Champion","Under Armour",
      "Snapback","Dad Hat","Fitted","Trucker Hat","Bucket Hat",
      "Beanie","Fedora","Cowboy Hat","Beret","Flat Cap",
      "Patagonia P6","The North Face","Columbia PFG","Yeti Trucker","Akubra",
      "Resistol","Tilley","Sunday Afternoons","YETI","Lids",
    ]
  },

  carBrand: {
    label: 'Car Brand',
    question: 'What is the best car brand?',
    answers: [
      "Toyota","Honda","Ford","Chevrolet","BMW",
      "Mercedes-Benz","Tesla","Lexus","Audi","Nissan",
      "Hyundai","Subaru","Jeep","Porsche","Dodge",
      "GMC","Cadillac","Buick","Lincoln","Acura",
      "Mazda","Volkswagen","Volvo","Kia","Genesis",
      "Land Rover","Range Rover","Jaguar","Bentley","Rolls-Royce",
      "Ferrari","Lamborghini","Maserati","Aston Martin","McLaren",
      "Bugatti","Rivian","Lucid","Polestar","Mini Cooper",
    ]
  },

  celebrity: {
    label: 'Celebrity',
    question: 'Who is the most iconic celebrity?',
    answers: [
      "Dwayne Johnson","Taylor Swift","Beyonce","Kim Kardashian","Zendaya",
      "Tom Holland","Ryan Reynolds","Selena Gomez","Kanye West","Will Smith",
      "Jay-Z","Rihanna","Drake","Justin Bieber","Ariana Grande",
      "Lady Gaga","Katy Perry","Adele","Bruno Mars","Ed Sheeran",
      "Justin Timberlake","Jennifer Lopez","Kylie Jenner","Kendall Jenner","Travis Scott",
      "Travis Kelce","Patrick Mahomes","LeBron James","Cristiano Ronaldo","Lionel Messi",
      "Tiger Woods","Serena Williams","Floyd Mayweather","Mike Tyson","Conor McGregor",
      "Tom Cruise","Leonardo DiCaprio","Brad Pitt","Denzel Washington","Morgan Freeman",
      "Oprah Winfrey","Steve Harvey","Tyler Perry","Spike Lee","Eddie Murphy",
    ]
  },

  influencer: {
    label: 'Influencer',
    question: 'Who is the best social media influencer?',
    answers: [
      "MrBeast","Kim Kardashian","Kylie Jenner","Charli D'Amelio","Addison Rae",
      "Logan Paul","KSI","PewDiePie","James Charles","Emma Chamberlain",
      "David Dobrik","Liza Koshy","Shane Dawson","Jeffree Star","NikkieTutorials",
      "Bretman Rock","Huda Kattan","Michelle Phan","Zoella","Tyler Oakley",
      "Lele Pons","Kai Cenat","Druski","Funny Marco","Kountry Wayne",
      "Jake Paul","Faze Rug","Brent Rivera","Ben Azelart","Dixie D'Amelio",
      "Avani Gregg","Chase Hudson (Lilhuddy)","Larray","Bryce Hall","Pokimane",
    ]
  },

  youtubeCreator: {
    label: 'YouTube Creator',
    question: 'Who is the best YouTube creator?',
    answers: [
      "MrBeast","PewDiePie","Markiplier","Ryan Trahan","Dude Perfect",
      "Logan Paul","Jake Paul","Casey Neistat","David Dobrik","KSI",
      "SSSniperWolf","Smosh","jacksepticeye","Ninja","Pokimane",
      "Kai Cenat","Druski","Funny Marco","Mark Rober","Michael Reeves",
      "Stuff Made Here","Vsauce","CGP Grey","Kurzgesagt","Veritasium",
      "Tom Scott","Marques Brownlee (MKBHD)","LTT (Linus Tech Tips)","Donut Media","Yes Theory",
      "MKBHD","internet Historian","Wendigoon","Dunkey","No Jumper",
    ]
  },

  gumBrand: {
    label: 'Gum Brand',
    question: 'What is the best gum brand?',
    answers: [
      "Extra","Orbit","Trident","5 Gum","Juicy Fruit",
      "Hubba Bubba","Bubblicious","Dubble Bubble","Stride","Eclipse",
      "Mentos Gum","Big Red","Wrigley's Spearmint","Wrigley's Doublemint","Bubble Yum",
      "Bazooka","Big League Chew","Fruit Stripe","Dentyne Ice","Dentyne Fire",
      "Ice Breakers Ice Cubes","Tic Tac Gum","Trident White","Orbit White",
      "Extra Polar Ice","Extra Peppermint","5 Cobalt","Beemans","Razzles",
    ]
  },

  city: {
    label: 'City',
    question: 'What is the best city in the world?',
    answers: [
      "New York City","Tokyo","Paris","Los Angeles","London",
      "Rome","Las Vegas","Chicago","Miami","Dubai",
      "Hong Kong","Singapore","Barcelona","Madrid","Berlin",
      "Amsterdam","Vienna","Prague","Seoul","Toronto",
      "Sydney","Mexico City","Cancun","Tulum","Rio de Janeiro",
      "Buenos Aires","Athens","Istanbul","Cairo","Cape Town",
      "Bangkok","Bali","Phuket","San Francisco","Seattle",
      "Boston","Nashville","New Orleans","Atlanta","Houston",
      "Honolulu","Lisbon","Copenhagen","Amsterdam","Edinburgh",
    ]
  },

  vacationSpot: {
    label: 'Vacation Spot',
    question: 'You get a free vacation — where are you going?',
    answers: [
      "Hawaii","Paris","Tokyo","Maldives","Bora Bora",
      "Greece (Santorini)","Bali","Cancun","Italy","Switzerland",
      "Iceland","Dubai","Australia","New Zealand","Fiji",
      "Tahiti","Seychelles","Jamaica","Dominican Republic","Puerto Rico",
      "Aruba","Barbados","Turks and Caicos","Mexico (Cabo)","Tulum",
      "Costa Rica","Las Vegas","Bahamas","Mykonos","Capri/Amalfi Coast",
      "Barcelona","London","Tokyo","Maui","Key West",
      "Grand Canyon","Yellowstone","Banff Canada","Niagara Falls","Safari Africa",
    ]
  },

  themePark: {
    label: 'Theme Park',
    question: 'What is the best theme park?',
    answers: [
      "Disney World","Disneyland","Universal Studios","Six Flags","Cedar Point",
      "Knott's Berry Farm","Busch Gardens","SeaWorld","Magic Kingdom","Epcot",
      "Hollywood Studios","Animal Kingdom","Disney California Adventure","Universal Orlando",
      "Islands of Adventure","Volcano Bay","Disneyland Paris","Disneyland Tokyo","Tokyo DisneySea",
      "Six Flags Magic Mountain","Six Flags Great Adventure","Six Flags Over Texas",
      "Kings Island","Kings Dominion","Carowinds","Hersheypark","Dollywood",
      "Silver Dollar City","PortAventura","Europa Park","Phantasialand","Efteling",
      "Tivoli Gardens","Liseberg","SeaWorld San Diego","Discovery Cove",
    ]
  },

  holiday: {
    label: 'Holiday',
    question: 'What is the best holiday?',
    answers: [
      "Christmas","Thanksgiving","Halloween","Fourth of July","New Year's",
      "Easter","Valentine's Day","St. Patrick's Day","Mother's Day","Father's Day",
      "Labor Day","Memorial Day","Juneteenth","Kwanzaa","Hanukkah",
      "Diwali","Eid al-Fitr","Chinese New Year","Lunar New Year","Day of the Dead",
      "Cinco de Mayo","Mardi Gras","Christmas Eve","New Year's Eve","Black Friday",
      "Super Bowl Sunday","Earth Day","April Fool's Day","Pi Day","Star Wars Day",
      "Holi","Oktoberfest","Bastille Day","Canada Day","Boxing Day",
    ]
  },

  season: {
    label: 'Season',
    question: 'What is the best season?',
    answers: [
      "Fall/Autumn","Summer","Spring","Winter","Holiday Season",
      "Beach Season","Football Season","Basketball Season","Baseball Season","Pumpkin Spice Season",
      "Back to School Season","Concert Season","Skiing Season","Festival Season","Wedding Season",
      "Playoff Season","March Madness","Bowl Season","Graduation Season","Tax Season",
    ]
  },

  weather: {
    label: 'Weather',
    question: 'What is the best weather?',
    answers: [
      "Sunny & Warm","Cool & Breezy","Hot Summer Day","Cloudy & Overcast","Snowy",
      "Rainy & Cozy","Light Rain","Thunderstorm","Perfect Mild Day","Crisp Fall Day",
      "Beach Weather","Snow Day","Foggy & Misty","Partly Cloudy","Windy",
      "Spring Shower","Winter Wonderland","Heatwave","Indian Summer","Cold Front",
    ]
  },

  cardGame: {
    label: 'Card Game',
    question: 'What is the best card game?',
    answers: [
      "Spades","Bid Whist","Tonk","Uno","Poker (Texas Hold'em)",
      "Blackjack","Go Fish","Hearts","War","Crazy Eights",
      "Rummy","Gin Rummy","Pinochle","Bridge","Euchre",
      "Cribbage","Egyptian Rat Screw","Speed","Slapjack","Phase 10",
      "Skip-Bo","Five Crowns","Coup","Love Letter","Codenames",
      "Magic: The Gathering","Pokemon TCG","Yu-Gi-Oh","Marvel Snap","Hearthstone",
      "Sushi Go","Bang!","Munchkin","Star Realms","Lorcana",
    ]
  },

};

module.exports = QUESTIONS;
