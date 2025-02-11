import React, { useState, useEffect } from "react";
import EditorProjectTwo from "../EditorProjectTwo";
import AIChatSidebar2 from "./AIChatSidebar2";
import "../App.css";
import Modal from "./Modal";

const NewProjectApp = () => {
  const [html, setHtml] = useState(`<!DOCTYPE html>
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
</html>`);

  const [css, setCss] = useState(`* {
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
}`);

  const [js, setJs] = useState("");
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("html");
  const [srcDoc, setSrcDoc] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <!doctype html>
        <html>
          <head>
            <style>${css}</style>
          </head>
          <body>
            ${html}
            <script>
              try {
                ${js}
              } catch (err) {
                console.log('JS Error:', err);
              }
            </script>
          </body>
        </html>
      `);
    }, 250);

    return () => clearTimeout(timeout);
  }, [html, css, js]);

  const renderEditor = () => {
    switch (activeTab) {
      case "html":
        return (
          <EditorProjectTwo
            language="xml"
            displayName="HTML"
            value={html}
            onChange={setHtml}
            currentStepIndex={currentStepIndex}
          />
        );
      case "css":
        return (
          <EditorProjectTwo
            language="css"
            displayName="CSS"
            value={css}
            onChange={setCss}
            currentStepIndex={currentStepIndex}
          />
        );
      case "javascript":
        return (
          <EditorProjectTwo
            language="javascript"
            displayName="JavaScript"
            value={js}
            onChange={setJs}
            currentStepIndex={currentStepIndex}
          />
        );
      default:
        return null;
    }
  };

  const scrollToEditor = () => {
    setTimeout(() => {
      const editorElement = document.querySelector(".editor");
      if (editorElement) {
        const editorHeight = editorElement.scrollHeight;
        editorElement.scrollTop = editorHeight;
      }
    }, 100);
  };

  const handleCodeSelect = (option) => {
    console.log("Option received:", option); // Debug log
    if (!option) return;

    setJs((prevJs) => {
      // Step 2: Button click code
      if (option.includes('addEventListener("click"')) {
        const newJs = prevJs ? `${prevJs}\n\n${option}\n` : `${option}\n`;
        return newJs;
      }

      // Step 3: Function definition
      if (option.includes("function playGame(userChoice)")) {
        const newCode =
          "function playGame(userChoice) {\n  // function logic\n}";
        return prevJs ? `${prevJs}\n\n${newCode}\n\n` : `${newCode}\n\n`;
      }

      // Step 4: Computer choice code
      if (option.includes('var choices = ["Rock", "Paper", "Scissors"]')) {
        if (prevJs && prevJs.includes("function playGame(userChoice)")) {
          console.log("old :", prevJs);
          console.log(
            "new : ",
            prevJs.replace(
              "  // function logic",
              "  " + option.split("\n").join("\n  ")
            )
          );
          return prevJs.replace(
            "  // function logic",
            "  " + option.split("\n").join("\n  ")
          );
        }
      }

      // Step 5: Winner determination code
      // console.log("Checking step 5...", option);

      // Check if this is step 5's actual code
      if (option && option.includes("if (userChoice === computerChoice)")) {
        console.log("Step 5 condition matched!");
        return prevJs.replace(
          "  // next step here",
          "  " + option.split("\n").join("\n  ")
        );
        // Find where the function starts and ends
        // const functionStart = prevJs.indexOf("function playGame(userChoice)");
        // console.log("Function start index:", functionStart);

        //         if (functionStart !== -1) {
        //           // console.log("Found the function, replacing...");

        //           // Get everything before the function
        //           // const beforeFunction = prevJs.substring(0, functionStart);

        //           // Our new function without step 6
        // //           const newFunction = `function playGame(userChoice) {
        // //   // STEP 4: Computer's random choice
        // //   var choices = ["Rock", "Paper", "Scissors"];
        // //   var randomIndex = Math.floor(Math.random() * 3);
        // //   var computerChoice = choices[randomIndex];

        // //   // STEP 5: If-else structure to decide winner
        // //   var resultMessage = "";

        // //   if (userChoice === computerChoice) {
        // //     resultMessage = = "👑 It's a tie! 👑";
        // //   } else if (
        // //     (userChoice === "Rock" && computerChoice === "Scissors") ||
        // //     (userChoice === "Scissors" && computerChoice === "Paper") ||
        // //     (userChoice === "Paper" && computerChoice === "Rock")
        // //   ) {

        // //            resultMessage = "👑 You win! 👑";
        // //   } else {
        // //        resultMessage = "👑 Computer wins! 👑";
        // //   }
        // // }`;

        //           // console.log("Returning new code...");
        //           // return beforeFunction + newFunction;
        //         }
      }

      // Step 6: Show result
      if (option && option.includes("resultDiv.textContent")) {
        // console.log("Step 6 triggered");

        // Find where the function starts and ends
        const functionStart = prevJs.indexOf("function playGame(userChoice)");
        // console.log("Function start index:", functionStart);

        if (functionStart !== -1) {
          // console.log("Found the function, replacing...");

          // Our new function with step 6
          const newFunction = `// STEP 3: Define the playGame function
function playGame(userChoice) {
  // STEP 4: Computer's random choice
  var choices = ["Rock", "Paper", "Scissors"];
  var randomIndex = Math.floor(Math.random() * 3);
  var computerChoice = choices[randomIndex];

  // STEP 5: If-else structure to decide winner
  var resultMessage = "";

  if (userChoice === computerChoice) {
    resultMessage = "It's a tie!";
  } else if (
    (userChoice === "Rock" && computerChoice === "Scissors") ||
    (userChoice === "Scissors" && computerChoice === "Paper") ||
    (userChoice === "Paper" && computerChoice === "Rock")
  ) {
    resultMessage = "You win!";
  } else {
    resultMessage = "Computer wins!";
  }

  // STEP 6: Show the result
  resultDiv.textContent = resultMessage;
}`;

          // Get everything before the function and replace
          const beforeFunction = prevJs.substring(0, functionStart);
          // console.log("Returning new code...");
          return beforeFunction + newFunction;
        }
      }

      // Step 2: Get DOM elements
      if (option.includes("document.querySelectorAll")) {
        const domCode = `\n\nvar buttons = document.querySelectorAll(".choice-btn");
var resultDiv = document.getElementById("result");\n`; // Just one newline after the DOM elements
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

      // Step 1: Add HTML structure
      if (option.includes('<button class="choice-btn"')) {
        const htmlWithTailwind = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <title>Rock Paper Scissors</title>
</head>
${option}
</html>`;
        return htmlWithTailwind;
      }

      // Default case
      const newJs = prevJs
        ? `${prevJs}\n\n${option}\n\n\n\n\n`
        : `${option}\n\n\n\n\n`;

      setTimeout(() => {
        const editorContainer = document.querySelector(".editor-container");
        if (editorContainer) {
          editorContainer.scrollTop = 99999;
        }
      }, 50);

      return newJs;
    });
    setActiveTab("javascript");
    scrollToEditor();
  };

  const [steps] = useState([
    // ... previous steps ...
    {
      subtitle: "Add Animation",
      instruction:
        "Let's add an animation overlay to make the game more exciting!",
      buttonText: "Add animation",
      action: () => {
        const animationCode = `// STEP 1: Get references to HTML elements
\n\nvar buttons = document.querySelectorAll(".choice-btn");
var resultDiv = document.getElementById("result");
var overlay = document.getElementById("gameOverlay");
var overlayContent = overlay.querySelector(".overlay-content");
var playerChoiceDisplay = document.getElementById("playerChoice");
var computerChoiceDisplay = document.getElementById("computerChoice");

// Emoji mapping
const choiceEmojis = {
    'Rock': '🪨',
    'Paper': '📄',
    'Scissors': '✂️'
};

// STEP 2: Add click events with a loop
for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function() {
        var userChoice = this.getAttribute("data-choice");
        playGame(userChoice);
    });
}

function showAnimatedOverlay() {
    const choices = ["🪨", "📄", "✂️"];
    let currentIndex = 0;
    overlay.classList.add("active");

    const animationInterval = setInterval(() => {
        overlayContent.textContent = choices[currentIndex];
        currentIndex = (currentIndex + 1) % choices.length;
    }, 200); // Change symbol every 200ms

    return new Promise(resolve => {
        setTimeout(() => {
            clearInterval(animationInterval);
            overlay.classList.remove("active");
            resolve();
        }, 2000); // Stop after 2 seconds
    });
}

// STEP 3: Define the playGame function
async function playGame(userChoice) {
    // Show animation first
    await showAnimatedOverlay();

    // STEP 4: Computer's random choice
    var choices = ["Rock", "Paper", "Scissors"];
    var randomIndex = Math.floor(Math.random() * 3);
    var computerChoice = choices[randomIndex];

    // Update choice displays
    playerChoiceDisplay.textContent = choiceEmojis[userChoice];
    computerChoiceDisplay.textContent = choiceEmojis[computerChoice];

    // STEP 5: If-else structure to decide winner
    var resultMessage = "";

    if (userChoice === computerChoice) {
        resultMessage = "👑 It's a tie! 👑";
    } else if (
        (userChoice === "Rock" && computerChoice === "Scissors") ||
        (userChoice === "Scissors" && computerChoice === "Paper") ||
        (userChoice === "Paper" && computerChoice === "Rock")
    ) {
        resultMessage = "👑 You win! 👑";
    } else {
        resultMessage = "👑 Computer wins! 👑";
    }

    // STEP 6: Show the result
    resultDiv.textContent = resultMessage;
}`;
        setJs(animationCode);
      },
    },
  ]);

  return (
    <div className="App">
      <Modal
        onCodeSelect={handleCodeSelect}
        currentStepIndex={currentStepIndex}
      />
      <div className="chat-pane">
        <AIChatSidebar2
          html={html}
          css={css}
          js={js}
          currentStepIndex={currentStepIndex}
          setCurrentStepIndex={setCurrentStepIndex}
        />
      </div>
      <div className="preview-pane">
        <div className="preview-title">Preview</div>
        <iframe
          srcDoc={srcDoc}
          title="preview"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
      <div className="editor-section">
        <div className="tab-buttons">
          <button
            className={`tab-button ${activeTab === "html" ? "active" : ""}`}
            onClick={() => setActiveTab("html")}
          >
            HTML
          </button>
          <button
            className={`tab-button ${activeTab === "css" ? "active" : ""}`}
            onClick={() => setActiveTab("css")}
          >
            CSS
          </button>
          <button
            className={`tab-button ${
              activeTab === "javascript" ? "active" : ""
            }`}
            onClick={() => setActiveTab("javascript")}
          >
            JavaScript
          </button>
        </div>
        <div
          className="editor-container"
          style={{
            height: "70vh",
            overflow: "auto",
            maxHeight: "800px",
          }}
        >
          {renderEditor()}
        </div>
      </div>
    </div>
  );
};

export default NewProjectApp;
