
      /* ---------- WORD BANK ---------- */
      const wordBank = {
        beginner: [
          { word: "apple", meaning: "A sweet fruit that grows on trees." },
          { word: "rain", meaning: "Water that falls from clouds." },
          { word: "book", meaning: "A set of pages with written words." },
          { word: "cat", meaning: "A small furry pet animal." },
          { word: "fish", meaning: "An animal that lives in water." },
          { word: "table", meaning: "Furniture with a flat top and legs." },
          { word: "chair", meaning: "A seat for one person." },
          { word: "music", meaning: "Art of combining sounds in harmony." },
          { word: "water", meaning: "A clear liquid essential for life." },
          { word: "happy", meaning: "Feeling or showing pleasure." },
        ],
        moderate: [
          { word: "teacher", meaning: "A person who educates students." },
          { word: "holiday", meaning: "A day of relaxation or celebration." },
          { word: "building", meaning: "A structure with walls and a roof." },
          {
            word: "computer",
            meaning: "An electronic device for data processing.",
          },
          { word: "universe", meaning: "All matter and space as a whole." },
          { word: "travel", meaning: "To go from one place to another." },
          { word: "garden", meaning: "A place where plants and flowers grow." },
          { word: "language", meaning: "A system of communication." },
          { word: "college", meaning: "An educational institution." },
          { word: "picture", meaning: "A visual representation on a surface." },
        ],
        advanced: [
          {
            word: "philosophy",
            meaning: "The study of fundamental ideas and existence.",
          },
          {
            word: "architecture",
            meaning: "Art of designing and constructing buildings.",
          },
          { word: "revolution", meaning: "A sudden or complete change." },
          { word: "astronomy", meaning: "The study of stars and planets." },
          {
            word: "psychology",
            meaning: "Science of the human mind and behavior.",
          },
          {
            word: "microbiology",
            meaning: "The study of microscopic organisms.",
          },
          {
            word: "engineering",
            meaning: "The application of science to design and build.",
          },
          {
            word: "economics",
            meaning: "Study of production and consumption.",
          },
          { word: "literature", meaning: "Written works of artistic value." },
          {
            word: "pharmacy",
            meaning: "The science of preparing and dispensing medicines.",
          },
        ],
      };

      /* ---------- GAME VARIABLES ---------- */
      let currentLevel = "",
        currentWord = "",
        currentMeaning = "";
      let score = 0,
        timeLeft = 60,
        timer;

      /* ---------- MAIN FUNCTIONS ---------- */
      function showScreen(id) {
        document
          .querySelectorAll(".screen")
          .forEach((s) => s.classList.remove("active"));
        document.getElementById(id).classList.add("active");
        if (id === "start-screen") clearInterval(timer);
      }

      function startGame(level) {
        currentLevel = level;
        score = 0;
        document.getElementById("score").textContent = score;
        document.getElementById(
          "level-title"
        ).textContent = `-- ${level.toUpperCase()} LEVEL --`;
        showScreen("game-screen");
        startTimer();
        nextWord();
      }

      function startTimer() {
        clearInterval(timer);
        timeLeft = 60;
        updateTimer();
        timer = setInterval(() => {
          timeLeft--;
          updateTimer();
          if (timeLeft <= 0) endGame();
        }, 1000);
      }

      function updateTimer() {
        document.getElementById("time").textContent = timeLeft;
        document.getElementById("progress").style.width =
          (timeLeft / 60) * 100 + "%";
      }

      function nextWord() {
        const words = wordBank[currentLevel];
        const random = words[Math.floor(Math.random() * words.length)];
        currentWord = random.word;
        currentMeaning = random.meaning;

        let scrambled;
        do {
          scrambled = currentWord
            .split("")
            .sort(() => Math.random() - 0.5)
            .join("");
        } while (scrambled === currentWord);

        document.getElementById("scrambled-word").textContent = scrambled;
        document.getElementById("user-input").value = "";
        document.getElementById("hint").textContent = "";
        document.getElementById("meaning").textContent = "";
      }

      function checkAnswer() {
        const guess = document.getElementById("user-input").value.toLowerCase();
        const wordBox = document.getElementById("scrambled-word");

        if (guess === currentWord) {
          score += 10;
          document.getElementById("score").textContent = score;
          wordBox.classList.add("correct");
          document.getElementById("meaning").textContent =
            "✅ " + currentMeaning;
          setTimeout(() => wordBox.classList.remove("correct"), 500);
        } else {
          alert("❌ Wrong guess! Try again.");
        }
      }

      function showHint() {
        document.getElementById("hint").textContent =
          "💡 Hint: " + currentMeaning;
      }

      function endGame() {
        clearInterval(timer);
        document.getElementById("final-score").textContent = score;

        let msg =
          score >= 80
            ? "🌟 Excellent! You're a word master!"
            : score >= 40
            ? "👍 Nice job! Keep improving!"
            : "💪 Keep practicing to get better!";

        document.getElementById("feedback-msg").textContent = msg;
        showScreen("result-screen");
      }
