"use client";

import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import ContextModal from "./ContextModal";
import { useSearchParams, useLocation } from "react-router-dom";
import step1 from "../images/step-1.png";
import step2 from "../images/step-2.png";
import step3 from "../images/step-3.png";
import step4 from "../images/step-4.png";
import step5 from "../images/step-5.png";
import step6 from "../images/step-6.png";
import wizard from "../images/wizard.png";
import Confetti from "react-confetti";

const baseQuestions = [
    {
      title: "Step 1: Set up the game board",
      text: "Let's start by creating a 3x3 grid to represent our Tic-Tac-Toe board.",
      codeSnippets: [
        'SET board TO an array with 9 empty strings ["", "", "", "", "", "", "", "", ""]',
        "var board = [null, null, null, null, null, null, null, null, null];",
        "let board = Array(9).fill(null);",
      ],
      actualCode: [
        'var board = ["", "", "", "", "", "", "", "", ""];',
      ],
      correctLetter: "A",
      options: ["A", "B", "C"],
    },
    {
      title: "Step 2: Find the game board and status display elements",
      text: (
        <div>
          We want to find:
          <ul className="list-disc pl-6 mt-2">
            <li>The <code>&lt;div&gt;</code> elements representing each cell in the grid.</li>
            <li>The <code>&lt;div&gt;</code> where we'll display the game status (e.g., whose turn it is or who won).</li>
          </ul>
        </div>
      ),
      options: [],
      correctAnswer: [],
    },
    {
      title: "Which lines of code correctly select these elements?",
      codeSnippets: [
        'var cells = document.querySelectorAll(".cell");\nvar statusDiv = document.getElementById("status");',
        'var cells = "some cells";\nvar statusDiv = "status bar";',
        'var board = document.createElement("div");\nvar statusDiv = document.createElement("div");',
      ],
      options: ["A", "B", "C"],
      correctLetter: "A",
    },
    {
      title: "Step 3: Adding Click Events",
      text: "We need to detect when a player clicks on a cell to make a move.",
      options: [],
      correctAnswer: [],
    },
    {
      title: "Which code snippet correctly adds a click event to each cell?",
      codeSnippets: [
        "IF user clicks on a cell:\n    place 'X' or 'O'\nELSE:\n    do nothing",
        "FOR each cell in cells:\n    WHEN cell is clicked:\n        do something",
        'cells = "Not a real array!"',
      ],
      actualCode: [
        null,
        `cells.forEach((cell, index) => {
    cell.addEventListener("click", () => handleMove(index));
  });`,
        null,
      ],
      options: ["A", "B", "C"],
      correctLetter: "B",
    },
    {
      title: "Step 4: Handling a player's move",
      text: "We need a function that handles when a player clicks on a cell, places their mark, and checks if the game is over.",
      options: [],
      correctAnswer: [],
    },
    {
      title: "Which snippet correctly sets up the function signature?",
      codeSnippets: [
        'var handleMove = "moveFunction";',
        "handleMove = index {\n  // function logic\n}",
        "function handleMove(index) {\n  // function logic\n}",
      ],
      options: ["A", "B", "C"],
      correctLetter: "C",
    },
    {
      title: "Step 5: Alternating turns between players",
      text: "We need to track whose turn it is and alternate between 'X' and 'O'.",
      options: [],
      correctAnswer: [],
    },
    {
      title: "Which snippet correctly switches turns?",
      codeSnippets: [
        'IF currentPlayer == "X":\n    currentPlayer = "O"\nELSE:\n    currentPlayer = "X"',
        'SET currentPlayer = "Always X";',
        "console.log('Turns not needed');",
      ],
      options: ["A", "B", "C"],
      actualCode: [
        `currentPlayer = currentPlayer === "X" ? "O" : "X";`,
        null,
        null,
      ],
      correctLetter: "A",
    },
    {
      title: "Step 6: Checking for a winner",
      text: "We need to determine if the current player has won the game.",
      options: [],
      correctAnswer: [],
    },
    {
      title: "Which snippet correctly checks for a winning condition?",
      codeSnippets: [
        'var winningCombos = [\n  [0, 1, 2], [3, 4, 5], [6, 7, 8],\n  [0, 3, 6], [1, 4, 7], [2, 5, 8],\n  [0, 4, 8], [2, 4, 6]\n];\nFOR each combo in winningCombos:\n    IF board[combo[0]] == board[combo[1]] == board[combo[2]] AND board[combo[0]] is not empty:\n        return true',
        'console.log("Everyone wins!");',
        'winningMove = "Just guess";',
      ],
      actualCode: [
        `const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  
  function checkWinner() {
    return winningCombos.some(combo => 
      board[combo[0]] && 
      board[combo[0]] === board[combo[1]] && 
      board[combo[0]] === board[combo[2]]
    );
  }`,
        null,
        null,
      ],
      options: ["A", "B", "C"],
      correctLetter: "A",
    },
    {
      title: "Step 7: Displaying the result",
      text: "Once a winner is found or the game ends in a tie, we need to update the status message.",
      options: [],
      correctAnswer: [],
    },
    {
      title: "Which snippet updates the game status?",
      codeSnippets: [
        'statusDiv.textContent = "Winner: " + currentPlayer;',
        "prompt('Game Over!');",
        'alert("Done!");',
      ],
      options: ["A", "B", "C"],
      correctLetter: "A",
    },
    {
      title: "Step 8: Resetting the game",
      text: "We need a function to reset the game and start a new round.",
      options: [],
      correctAnswer: [],
    },
    {
      title: "Which snippet correctly resets the game?",
      codeSnippets: [
        'FOR each cell in cells:\n    set cell text to ""\nRESET board\nRESET currentPlayer to "X"',
        "window.location.reload();",
        'alert("Restarting!");',
      ],
      actualCode: [
        `function resetGame() {
    board.fill("");
    cells.forEach(cell => cell.textContent = "");
    currentPlayer = "X";
    statusDiv.textContent = "Player X's turn";
  }`,
        null,
        null,
      ],
      options: ["A", "B", "C"],
      correctLetter: "A",
    },
    {
      title: "Congratulations!",
      text: (
        <div>
          <p className="text-lg font-bold text-green-600 mb-2">🎉 You've successfully built a Tic Tac Toe game! 🎉</p>
          <p>You've created a fully functional game with:</p>
          <ul className="list-disc pl-6 mt-2">
            <li>Game board setup</li>
            <li>Player turn tracking</li>
            <li>Win condition checking</li>
            <li>Game reset functionality</li>
          </ul>
          <p className="mt-3">Feel free to play the game and challenge a friend!</p>
        </div>
      ),
      options: [],
      correctAnswer: [],
    }
  ];
  

// Define the content for empty modals
const emptyModalContent = [
    {
      title: "Great start!",
      description:
        "You've set up the game board and initialized the basics. Let's keep going!",
      image: step1,
    },
    {
      title: "Now it's getting interesting!",
      description:
        "You've added click events to mark the grid. Time to handle turns.",
      image: step2,
    },
    {
      title: "Almost there!",
      description:
        "You've implemented the logic to check for a winner. Just a bit more to go!",
      image: step3,
    },
    {
      title: "Looking good!",
      description:
        "Your Tic-Tac-Toe game is coming together. Let's add player turns and display updates.",
      image: step4,
    },
    {
      title: "Getting close to the finish line!",
      description:
        "Now it's time to add a reset button and handle game restarts.",
      image: step5,
    },
    {
      title: "Final steps!",
      description: "You're about to complete your Tic-Tac-Toe game!",
      image: step6,
    },
  ];
  

// Create new array with empty steps after every 2nd question
const questions = baseQuestions.reduce((acc, question, index) => {
  // Add the regular question
  acc.push(question);

  // Add empty step after every 2nd question (but not after the last question)
  // Also, don't add an empty step if the next question is the congratulation step
  if ((index + 1) % 2 === 0 && index < baseQuestions.length - 1) {
    // Check if the next question is the congratulation step
    const nextQuestion = baseQuestions[index + 1];
    if (nextQuestion && nextQuestion.title !== "Congratulations!") {
      acc.push({
        isEmptyStep: true,
        continueToStep: acc.length + 2,
        content: emptyModalContent[Math.floor(index / 2)] || {
          title: "Keep going!",
          description: "You're making great progress.",
          image: null,
        },
      });
    }
  }
  return acc;
}, []);

const Modal = ({ onCodeSelect }) => {
  //  // console.log("Modal component rendering");
  const [isOpen, setIsOpen] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false); // Track minimized state
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showBlankModal, setShowBlankModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [handleButtonColor, setHandleButtonColor] = useState(false);
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(null);
  const [showError, setShowError] = useState(false);
  const [incorrectSelection, setIncorrectSelection] = useState(null); // Track incorrect selection
  const [errorMessage, setErrorMessage] = useState(""); // Custom error message
  const [showHint, setShowHint] = useState(false); // State for showing hints
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const stepParam = searchParams.get("step");
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  // Update window dimensions when window resizes
  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const buttonColor = () => {
    setHandleButtonColor(!handleButtonColor);
  };

  // Add useEffect for keyboard listener
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter" && selectedOption) {
        onCodeSelect?.(selectedOption);
        setIsOpen(false);
        setTimeout(() => {
          setCurrentQuestion(currentQuestion + 1);
          setIsOpen(true);
          setSelectedButtonIndex(null); // Reset selected button
          setShowError(false); // Reset error state
        }, 2000);
      }
    };

    window.addEventListener("keypress", handleKeyPress);
    return () => window.removeEventListener("keypress", handleKeyPress);
  }, [selectedOption, onCodeSelect, currentQuestion]);

  useEffect(() => {
    // Only handle step parameter if we're on the new-project/tic-tac-toe path
    if (location.pathname === "/new-project/tic-tac-toe" && stepParam) {
      const stepNumber = parseInt(stepParam);
      if (stepNumber >= 1 && stepNumber <= baseQuestions.length) {
        setCurrentQuestion(stepNumber - 1);
      }
    }
  }, [stepParam, location.pathname]);

  const handleOptionClick = (option, index) => {
    const currentQ = baseQuestions[currentQuestion];
    const selectedCode =
      currentQ.actualCode?.[index] || currentQ.codeSnippets[index];

    if (option === currentQ.correctLetter) {
      setSelectedOption(selectedCode);
      setSelectedButtonIndex(index); // Only set selectedButtonIndex for correct answers
      setIncorrectSelection(null); // Reset incorrect selection
      setShowError(false); // Hide any error message
    } else {
      setShowError(true);
      setIncorrectSelection(index); // Store the incorrect selection for highlighting
      setSelectedButtonIndex(null); // Ensure no "correct" indicator is shown
      
      // Generate a more helpful error message based on the current question
      const messages = [
        "Hmm, that's not quite right. Look closer at what the code needs to do!",
        "Not quite! Review the requirements and try again.",
        "That option doesn't match what we need. Try another approach!",
        "Close, but not correct. Think about what the code should accomplish."
      ];
      setErrorMessage(messages[Math.floor(Math.random() * messages.length)]);
    }
  };

  const handleNext = () => {
    setShowBlankModal(false);
    if (currentQuestion < baseQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
    }
  };

  // Add step to URL while maintaining the /new-project path
  const handleNextQuestion = () => {
    if (currentQuestion < baseQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSearchParams({ step: currentQuestion + 2 });
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSearchParams({ step: currentQuestion });
    }
  };

  // Function to provide a hint based on the current question
  const handleShowHint = () => {
    setShowHint(true);
    // Hide hint after 5 seconds
    setTimeout(() => {
      setShowHint(false);
    }, 7000);
  };

  // Toggle minimized state
  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
    // Hide any error or hint when minimizing
    if (!isMinimized) {
      setShowError(false);
      setShowHint(false);
    }
  };

  // Reset quiz to start over
  const handleRestart = () => {
    // Force reopen the modal if it was about to close
    setIsOpen(true);
    
    // Reset to the first question
    setCurrentQuestion(0);
    
    // Clear all selections and states
    setSelectedOption(null);
    setSelectedButtonIndex(null);
    setShowError(false);
    setIncorrectSelection(null);
    setShowHint(false);
    
    // Reset the code in the parent component by sending a special reset command
    // Use the game config's initial JS as the reset value to properly trigger the handler
    onCodeSelect?.("RESET_CODE_TO_INITIAL");
    
    // Reset URL parameter if using them
    if (location.pathname.includes("/new-project")) {
      setSearchParams({ step: 1 });
    }
    
    // If we're using confetti, wait a moment for it to clear
    setTimeout(() => {
      // Ensure modal is fully reset and visible
      setShowBlankModal(false);
    }, 100);
  };

  // Render empty step modal
  if (baseQuestions[currentQuestion]?.isEmptyStep) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[9999]">
        <div className="bg-white rounded-lg p-12 max-w-6xl w-full h-[600px] relative">
          {/* Wizard image */}
          <img
            src={wizard}
            alt="Wizard avatar"
            className="absolute top-4 left-16 w-32 h-32 object-contain"
          />

          {/* Close button */}
          <button
            onClick={() => {
              setCurrentQuestion(0);
              setShowBlankModal(false);
              onCodeSelect?.(null);
            }}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="flex h-full items-center justify-between gap-8">
            {/* Left side - Content */}
            <div className="flex-1 flex flex-col justify-center">
              <h2 className="text-3xl font-bold mb-4">
                {baseQuestions[currentQuestion].content.title}
              </h2>
              <h4 className="text-xl text-gray-600 leading-relaxed">
                {baseQuestions[currentQuestion].content.description}
              </h4>
            </div>

            {/* Right side - Image */}
            <div className="flex-1">
              <img
                src={baseQuestions[currentQuestion].content.image}
                alt="Step visualization"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          <button
            onClick={handleNext}
            className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition-colors absolute bottom-8 right-8"
          >
            {currentQuestion + 1 < baseQuestions.length && 
             baseQuestions[currentQuestion + 1].title === "Congratulations!" ? "Finish" : "Continue"}
          </button>
        </div>
      </div>
    );
  }

  // Check if this is the congratulation step
  const isCongratulationStep = baseQuestions[currentQuestion]?.title === "Congratulations!";

  return (
    <>
      {/* Show confetti when on the congratulation step - positioned behind modal but above backdrop */}
      {isCongratulationStep && (
        <div className="fixed inset-0" style={{ zIndex: 45, pointerEvents: 'none' }}>
          <Confetti
            width={windowDimensions.width}
            height={windowDimensions.height}
            recycle={false}
            numberOfPieces={300}
            gravity={0.2}
          />
        </div>
      )}

      {/* Minimized floating button */}
      {isMinimized && (
        <div 
          className="fixed bottom-6 right-6 bg-blue-500 text-white py-3 px-4 rounded-full shadow-lg cursor-pointer flex items-center z-50 hover:bg-blue-600 transition-all duration-200"
          onClick={toggleMinimize}
        >
          <span className="text-xl mr-2">📝</span>
          <span className="font-bold">Show Quiz</span>
        </div>
      )}

      {/* Restart quiz button - only shown when completed and not minimized */}
      {isCongratulationStep && !isMinimized && (
        <div 
          className="fixed bottom-6 right-6 bg-green-500 text-white py-3 px-4 rounded-full shadow-lg cursor-pointer flex items-center z-50 hover:bg-green-600 transition-all duration-200"
          onClick={handleRestart}
        >
          <span className="text-xl mr-2">🔄</span>
          <span className="font-bold">Restart Quiz</span>
        </div>
      )}

      <Dialog
        open={(isOpen && !showBlankModal && !isMinimized)}
        onClose={() => {
          // Do nothing when clicking outside - this prevents accidental closing
          // Only allow closing through explicit buttons
        }}
        className="relative z-50"
      >
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <div
          className="fixed inset-0 bg-blue-500/30 backdrop-blur-sm"
          aria-hidden="true"
          style={{ zIndex: 40 }}
        />

        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0 flex items-center justify-center p-4" style={{ zIndex: 50 }}>
          <Dialog.Panel className="w-[screen] h-[screen] max-w-3xl transform overflow-hidden rounded-2xl bg-white shadow-xl border-2 border-blue-200">
            {/* Fun header with decorative elements but toned down */}
            <div className="bg-blue-500 py-4 px-6 flex items-center justify-center relative">
              <h2 className="text-2xl font-bold text-white drop-shadow-md">
                {baseQuestions[currentQuestion].title}
              </h2>
              
              {/* Decorative element on right side */}
              <div className="absolute right-4">
                <div className="text-xl">✨</div>
              </div>
              
              {/* Minimize button - original left position */}
              <button 
                className="absolute left-4 bg-blue-400 hover:bg-blue-600 text-white p-1.5 rounded-lg transition-all duration-200"
                onClick={toggleMinimize}
                aria-label="Minimize quiz"
                title="Minimize quiz"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
                </svg>
              </button>
            </div>
            
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 rounded-b-2xl">
              <div className="h-[300px] overflow-auto p-4">
                <div className="text-center sm:text-left w-full">
                  <div className="text-lg text-slate-700 mb-6 font-medium bg-slate-50 p-4 rounded-xl border border-slate-200">
                    {baseQuestions[currentQuestion].text}
                  </div>
                  
                  {/* Keep the fun code option styling */}
                  {baseQuestions[currentQuestion].codeSnippets?.map(
                    (snippet, index) => (
                      <div 
                        key={index} 
                        className={`mb-6 rounded-xl transition-all duration-200 transform hover:scale-[1.01] ${
                          selectedButtonIndex === index 
                            ? "bg-green-50 border-2 border-green-300 shadow-md" 
                            : incorrectSelection === index
                              ? "bg-red-50 border-2 border-red-300 shadow-md" 
                              : "bg-blue-50 border-2 border-blue-200 shadow"
                        }`}
                        onClick={() => {
                          handleOptionClick(baseQuestions[currentQuestion].options[index], index);
                        }}
                      >
                        {/* Keep fun option badge but tone it down */}
                        <div className="absolute -top-2 -right-2 bg-blue-100 text-blue-800 font-bold py-1 px-4 rounded-full text-sm shadow border border-blue-200">
                          Option {baseQuestions[currentQuestion].options[index]}
                        </div>
                        
                        <div className="pt-6 pb-2 px-5 rounded-t-xl relative">
                          <pre
                            className="p-4 rounded-xl font-mono text-md overflow-auto bg-white shadow-inner"
                          >
                            <code>{snippet}</code>
                          </pre>
                        </div>
                        
                        {/* Keep fun indicators for selection */}
                        {selectedButtonIndex === index && (
                          <div className="flex justify-center pb-2">
                            <div className="text-green-600 font-bold flex items-center">
                              <span className="mr-2">✅</span> Great choice!
                            </div>
                          </div>
                        )}
                        
                        {/* Add indicator for incorrect selection */}
                        {incorrectSelection === index && (
                          <div className="flex justify-center pb-2">
                            <div className="text-red-600 font-bold flex items-center">
                              <span className="mr-2">❌</span> Not quite right
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
            
            {/* Footer with toned down styling */}
            <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 sticky bottom-0">
              <div className="flex justify-between items-center">
                <div className="text-md font-semibold text-slate-700">
                  {selectedButtonIndex !== null ? (
                    <span className="flex items-center">
                      <span className="mr-2">🎯</span> Option {baseQuestions[currentQuestion].options[selectedButtonIndex]} selected
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <span className="mr-2">👉</span> Pick your favorite code
                    </span>
                  )}
                </div>
                <div className="flex space-x-4">
                  {/* Add hint button */}
                  {baseQuestions[currentQuestion].options.length > 0 && (
                    <button
                      type="button"
                      onClick={handleShowHint}
                      className="bg-amber-100 text-amber-800 rounded-xl px-4 py-2 text-sm font-medium shadow border border-amber-200 hover:bg-amber-200 transition-all duration-200"
                    >
                      <span className="mr-1">💡</span> Hint
                    </button>
                  )}
                  
                  {baseQuestions[currentQuestion].options.length > 0 && (
                    <button
                      type="button"
                      disabled={selectedButtonIndex === null}
                      onClick={() => {
                        onCodeSelect?.(selectedOption);
                        setIsOpen(false);

                        // Show next question after 3 seconds
                        if (currentQuestion < baseQuestions.length - 1) {
                          setTimeout(() => {
                            setCurrentQuestion(currentQuestion + 1);
                            setIsOpen(true);
                            setSelectedButtonIndex(null); // Reset selected button
                            setShowError(false); // Reset error state
                            setIncorrectSelection(null); // Reset incorrect selection
                          }, 2000);
                        }
                      }}
                      className={`disabled:opacity-75 disabled:bg-gray-300 rounded-xl px-6 py-2 text-md font-bold shadow-md transition-all duration-200 ${
                        selectedButtonIndex === null
                          ? "bg-gray-300 text-gray-600"
                          : "bg-blue-500 text-white hover:bg-blue-600"
                      }`}
                    >
                      <span className="mr-2">🚀 Run Code</span>
                    </button>
                  )}
                  {baseQuestions[currentQuestion].options.length === 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        // If it's the congratulation step, just close the modal
                        if (baseQuestions[currentQuestion].title === "Congratulations!") {
                          setIsOpen(false);
                        } else {
                          handleNext();
                        }
                      }}
                      className="bg-blue-500 text-white rounded-xl px-6 py-2 text-md font-bold shadow-md hover:bg-blue-600 transition-all duration-200"
                    >
                      {baseQuestions[currentQuestion].title === "Congratulations!" ? (
                        <>
                          <span className="mr-2">🎉 Finish</span>
                        </>
                      ) : (
                        <>
                          <span className="mr-2">🔜 Next</span>
                        </>
                      )}
                    </button>
                  )}
                  
                  {/* Add restart button inside modal when on congratulation step */}
                  {baseQuestions[currentQuestion].title === "Congratulations!" && (
                    <button
                      type="button"
                      onClick={handleRestart}
                      className="ml-4 bg-green-500 text-white rounded-xl px-6 py-2 text-md font-bold shadow-md hover:bg-green-600 transition-all duration-200"
                    >
                      <span className="mr-2">🔄 Start Over</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Blank modal */}
      <ContextModal isOpen={showBlankModal} onNext={handleNext} />

      {/* Customized error message */}
      {showError && (
        <div className="fixed bottom-4 left-0 right-0 mx-auto w-fit bg-pink-50 border-2 border-pink-300 text-pink-700 px-5 py-3 rounded-xl flex items-center shadow-lg animate-pulse" style={{ zIndex: 60 }}>
          <span className="text-xl mr-3">🤔</span>
          <span className="font-bold">{errorMessage}</span>
        </div>
      )}
      
      {/* Hint tooltip */}
      {showHint && (
        <div className="fixed top-4 left-0 right-0 mx-auto w-fit max-w-md bg-amber-50 border-2 border-amber-300 text-amber-800 px-5 py-3 rounded-xl flex items-start shadow-lg" style={{ zIndex: 60 }}>
          <span className="text-xl mr-3 mt-1">💡</span>
          <div>
            <span className="font-bold block mb-1">Hint:</span>
            <span className="block">
              {baseQuestions[currentQuestion].title.includes("board") 
                ? "Look for code that initializes variables for the game board and player." 
                : baseQuestions[currentQuestion].title.includes("function") 
                  ? "The correct option should define a proper JavaScript function with the right parameters."
                  : baseQuestions[currentQuestion].title.includes("elements") 
                    ? "Look for code that correctly selects elements using document methods."
                    : "Read the requirements carefully and choose the option that best matches what's needed."}
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
