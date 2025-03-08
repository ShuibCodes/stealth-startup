// Configuration for the Rock Paper Scissors game

const gameConfig = {
  // Initial HTML content
  getInitialHtml: () => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <title>Rock Paper Scissors</title>
    <style>
        .overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            z-index: 1000;
        }

        .overlay.active {
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .overlay-content {
            font-size: 8rem;
            animation: bounce 0.5s infinite;
        }

        @keyframes bounce {
            0%, 100% {
                transform: translateY(-25%);
                animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
            }
            50% {
                transform: translateY(0);
                animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
            }
        }

        .result-box {
            animation: popIn 0.5s ease-out;
        }

        @keyframes popIn {
            0% {
                transform: scale(0.8);
                opacity: 0;
            }
            100% {
                transform: scale(1);
                opacity: 1;
            }
        }
    </style>
</head>
<body class="bg-gradient-to-b from-purple-100 to-pink-100 min-h-screen flex items-center justify-center">
    <!-- Overlay -->
    <div id="gameOverlay" class="overlay">
        <div class="overlay-content text-white"></div>
    </div>

    <div class="px-4 py-3 w-80 -translate-x-[50px] -translate-y-8">
        <!-- Header -->
        <h1 class="text-2xl font-bold mb-3 text-purple-600 text-center">
            Rock Paper Scissors! 🎮
        </h1>

        <!-- Score Board -->
        <div class="bg-white rounded-md shadow-sm p-3 mb-3 w-full">
            <h2 class="text-lg font-bold text-gray-700 mb-2 text-center">Score Board</h2>
            <div class="flex justify-around text-center">
                <div class="text-green-500">
                    <p class="text-sm font-bold">Player</p>
                    <p class="text-xl" id="playerScore">0</p>
                </div>
                <div class="text-red-500">
                    <p class="text-sm font-bold">Computer</p>
                    <p class="text-xl" id="computerScore">0</p>
                </div>
            </div>
        </div>

        <!-- Game Area -->
        <div class="bg-white rounded-md shadow-sm p-3 mb-3">
            <div class="grid grid-cols-2 gap-3 mb-3">
                <div class="text-center">
                    <h3 class="text-sm font-bold text-purple-600 mb-2">You Chose</h3>
                    <div class="bg-purple-100 rounded-full p-2 inline-block">
                        <span class="text-2xl" id="playerChoice">❓</span>
                    </div>
                </div>
                <div class="text-center">
                    <h3 class="text-sm font-bold text-pink-600 mb-2">Computer Chose</h3>
                    <div class="bg-pink-100 rounded-full p-2 inline-block">
                        <span class="text-2xl" id="computerChoice">❓</span>
                    </div>
                </div>
            </div>

            <!-- Choice Buttons -->
            <div class="grid grid-cols-3 gap-2">
                <button class="choice-btn bg-gradient-to-r from-purple-400 to-purple-600 hover:from-purple-500 hover:to-purple-700 text-white rounded p-2 transition transform hover:scale-105" data-choice="Rock">
                    <span class="text-lg block">🪨</span>
                    <span class="font-bold text-xs">Rock</span>
                </button>
                <button class="choice-btn bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white rounded p-2 transition transform hover:scale-105" data-choice="Paper">
                    <span class="text-lg block">📄</span>
                    <span class="font-bold text-xs">Paper</span>
                </button>
                <button class="choice-btn bg-gradient-to-r from-pink-400 to-pink-600 hover:from-pink-500 hover:to-pink-700 text-white rounded p-2 transition transform hover:scale-105" data-choice="Scissors">
                    <span class="text-lg block">✂️</span>
                    <span class="font-bold text-xs">Scissors</span>
                </button>
            </div>
        </div>

        <!-- Result Message -->
        <div class="text-center">
            <div class="result-box inline-block bg-white rounded-md shadow-sm p-2">
                <p class="text-base font-bold" id="result">👑 Choose your move! 👑</p>
            </div>
        </div>
    </div>
</body>
</html>`,

  // Initial CSS content
  getInitialCss: () => `* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.title{
text-align: center;
padding: 4px;
}

.editor-container {
  height: 100%;
  overflow: auto;
  max-height: 500px;
}
.game {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.board {
  display: grid;
  grid-template-columns: repeat(3, 100px);
  grid-template-rows: repeat(3, 100px);
  gap: 2px;
  background-color: #000;
}

.cell {
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  cursor: pointer;
  position: relative;
}

/* X styling */
.cell.x::before,
.cell.x::after {
  content: '';
  position: absolute;
  width: 10px;
  height: 80px;
  background-color: #000;
}

.cell.x::before {
  transform: rotate(45deg);
}

.cell.x::after {
  transform: rotate(-45deg);
}

/* O styling */
.cell.o::before {
  content: '';
  position: absolute;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: 10px solid #000;
}`,

  // Initial JS content
  getInitialJs: () => "",

  // Handle code selection specifically for rock-paper-scissors
  handleCodeSelect: (option, prevJs) => {
    // Special case for resets
    if (option === "RESET_CODE_TO_INITIAL") {
      return ""; // Return empty string to reset JS
    }
    
    if (!option) return prevJs;

    // Step 2: Button click code
    if (option.includes('addEventListener("click"')) {
      const newJs = prevJs ? `${prevJs}\n\n${option}\n` : `${option}\n`;
      return newJs;
    }

    // Step 3: Function definition
    if (option.includes("function playGame(userChoice)")) {
      const newCode = "function playGame(userChoice) {\n  // function logic\n}";
      return prevJs ? `${prevJs}\n\n${newCode}\n\n` : `${newCode}\n\n`;
    }

    // Step 4: Computer choice code
    if (option.includes('var choices = ["Rock", "Paper", "Scissors"]')) {
      if (prevJs && prevJs.includes("function playGame(userChoice)")) {
        return prevJs.replace(
          "  // function logic",
          "  " + option.split("\n").join("\n  ")
        );
      }
    }

    // Step 5: Winner determination code
    if (option && option.includes("if (userChoice === computerChoice)")) {
      return prevJs.replace(
        "  // next step here",
        "  " + option.split("\n").join("\n  ")
      );
    }

    // Step 6: Show result
    if (option && option.includes("resultDiv.textContent")) {
      const functionStart = prevJs.indexOf("function playGame(userChoice)");
      
      if (functionStart !== -1) {
        const newFunction = `// STEP 3: Define the playGame function
              function playGame(userChoice) {
              // STEP 4: Computer's random choice
              var choices = ["Rock", "Paper", "Scissors"];
              var randomIndex = Math.floor(Math.random() * 3);
              var computerChoice = choices[randomIndex];

              // STEP 5: If-else structure to decide winner
              var resultMessage = "";

              if (userChoice === computerChoice) {
                resultMessage = "👑 It's a tie! 👑";
              } else if (
                (userChoice === "Rock" && computerChoice === "Scissors") ||
                (userChoice === "Scissors" && computerChoice === "Paper") ||
                (userChoice === "Paper" && computerChoice === "Rock")
              ) {
                playerScore++;
                playerScoreDisplay.textContent = playerScore;
                resultMessage = "👑 You win! 👑";
              } else {
                computerScore++;
                computerScoreDisplay.textContent = computerScore;
                resultMessage = "👑 Computer wins! 👑";
              }

              // STEP 6: Show the result
              resultDiv.textContent = resultMessage;
              playerScoreDisplay.textContent = playerScore;
              computerScoreDisplay.textContent = computerScore;
              // next step
            }
  `;

        const beforeFunction = prevJs.substring(0, functionStart);
        return beforeFunction + newFunction;
      }
    }

    // Step 7
    if (option && option.includes("Get the elements where we will show the choices")) {
      return prevJs.replace(
        "  // next step",
        "  " + option.split("\n").join("\n  ")
      );
    }
    
    // Step 2: Get DOM elements
    if (option.includes("document.querySelectorAll")) {
      const domCode = `\n\nvar buttons = document.querySelectorAll(".choice-btn");
var resultDiv = document.getElementById("result");\n`; 
      return prevJs.trimEnd() + domCode;
    }

    // Step 3: Add event listeners
    if (option.includes("buttons[i].addEventListener")) {
      const eventListenerCode = `for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function() {
    var userChoice = this.getAttribute("data-choice");
    playGame(userChoice);
  });
}`;
      return prevJs.trimEnd() + eventListenerCode;
    }

    // Default case
    const newJs = prevJs
      ? `${prevJs}\n\n${option}\n\n\n\n\n`
      : `${option}\n\n\n\n\n`;

    return newJs;
  }
};

export default gameConfig; 