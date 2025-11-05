const pages = {
  start: document.getElementById("startPage"),
  level: document.getElementById("levelPage"),
  game: document.getElementById("gamePage"),
  result: document.getElementById("resultPage")
};

const scrambledWord = document.getElementById("scrambledWord");
const hintBox = document.getElementById("hintBox");
const timerDisplay = document.getElementById("timer");
const scoreDisplay = document.getElementById("score");
const guessInput = document.getElementById("guessInput");
const finalScore = document.getElementById("finalScore");
const levelTitle = document.getElementById("levelTitle");

let currentWord = "";
let currentHint = "";
let timer;
let timeLeft = 60;
let score = 0;
let usedWords = [];
let wordsData = {};

wordsData.beginner = [
  { word: "apple", hint: "A red or green fruit." },
  { word: "table", hint: "Used for eating or working." },
  { word: "water", hint: "Essential liquid to drink." },
  { word: "book", hint: "You read it." },
  { word: "chair", hint: "You sit on it." },
  { word: "clock", hint: "Shows time." },
  { word: "bread", hint: "Baked food." },
  { word: "plant", hint: "A green living thing." },
  { word: "phone", hint: "Used to call." },
  { word: "earth", hint: "The planet we live on." },
  { word: "music", hint: "Pleasant sound." },
  { word: "paper", hint: "We write on it." },
  { word: "river", hint: "Flows with water." },
  { word: "smile", hint: "Expression of happiness." },
  { word: "light", hint: "Opposite of dark." },
  { word: "night", hint: "When we sleep." },
  { word: "dream", hint: "See it while sleeping." },
  { word: "train", hint: "Runs on tracks." },
  { word: "juice", hint: "Fruit drink." },
  { word: "candy", hint: "Sweet treat." }
];

wordsData.moderate = [
  { word: "computer", hint: "An electronic machine." },
  { word: "library", hint: "Place full of books." },
  { word: "picture", hint: "An image or photo." },
  { word: "teacher", hint: "Educates students." },
  { word: "science", hint: "Study of the natural world." },
  { word: "battery", hint: "Stores energy." },
  { word: "holiday", hint: "No work, just fun." },
  { word: "hospital", hint: "Treats patients." },
  { word: "station", hint: "Trains stop here." },
  { word: "diamond", hint: "Precious stone." },
  { word: "language", hint: "Used for communication." },
  { word: "kitchen", hint: "Used for cooking." },
  { word: "weather", hint: "Rain, sun, snow etc." },
  { word: "journey", hint: "Travel from one place to another." },
  { word: "country", hint: "A nation." },
  { word: "message", hint: "You can send or receive this." },
  { word: "college", hint: "Place to study after school." },
  { word: "village", hint: "Small community." },
  { word: "garden", hint: "Place with plants." },
  { word: "holiday", hint: "A break from work." }
];

wordsData.advanced = [
  { word: "astronomy", hint: "Study of stars." },
  { word: "philosophy", hint: "Love of wisdom." },
  { word: "literature", hint: "Books and writings." },
  { word: "university", hint: "Higher education place." },
  { word: "electricity", hint: "Powers your home." },
  { word: "laboratory", hint: "Scientific experiments." },
  { word: "architecture", hint: "Building design." },
  { word: "microphone", hint: "Used to speak loudly." },
  { word: "investment", hint: "Money for profit." },
  { word: "responsible", hint: "Trustworthy person." },
  { word: "population", hint: "Total number of people." },
  { word: "development", hint: "Growth or progress." },
  { word: "communication", hint: "Exchange of information." },
  { word: "congratulations", hint: "You say this to celebrate." },
  { word: "environment", hint: "Surroundings." },
  { word: "imagination", hint: "Power of creativity." },
  { word: "celebration", hint: "A happy event." },
  { word: "organization", hint: "A structured group." },
  { word: "information", hint: "Knowledge or facts." },
  { word: "appreciation", hint: "Feeling grateful." }
];

let currentLevel = "";

function goToStart() {
  switchPage(pages.start);
}

function goToLevel() {
  switchPage(pages.level);
}

function switchPage(page) {
  Object.values(pages).forEach(p => p.classList.remove("active"));
  page.classList.add("active");
}

function startGame(level) {
  currentLevel = level;
  score = 0;
  usedWords = [];
  levelTitle.textContent = `-- ${level.charAt(0).toUpperCase() + level.slice(1)} --`;
  scoreDisplay.textContent = `Score: ${score}`;
  timeLeft = 60;
  switchPage(pages.game);
  pickNewWord();
  startTimer();
}

function pickNewWord() {
  const levelWords = wordsData[currentLevel];
  if (usedWords.length >= 20) {
    endGame();
    return;
  }
  let newWordObj;
  do {
    newWordObj = levelWords[Math.floor(Math.random() * levelWords.length)];
  } while (usedWords.includes(newWordObj.word));

  usedWords.push(newWordObj.word);
  currentWord = newWordObj.word;
  currentHint = newWordObj.hint;
  scrambledWord.textContent = shuffleWord(currentWord);
  guessInput.value = "";
  hintBox.textContent = "";
}

function shuffleWord(word) {
  return word.split('').sort(() => Math.random() - 0.5).join('');
}

function checkGuess() {
  const guess = guessInput.value.trim().toLowerCase();
  if (guess === currentWord) {
    score += 10;
    scoreDisplay.textContent = `Score: ${score}`;
    pickNewWord();
  } else {
    hintBox.textContent = "❌ Wrong! Try again.";
  }
}

function showHint() {
  hintBox.textContent = `💡 Hint: ${currentHint}`;
}

function startTimer() {
  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `Time: ${timeLeft}s`;
    if (timeLeft <= 0) endGame();
  }, 1000);
}

function endGame() {
  clearInterval(timer);
  finalScore.textContent = score;
  switchPage(pages.result);
}


goToStart();
