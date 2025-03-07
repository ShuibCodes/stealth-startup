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
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showBlankModal, setShowBlankModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [handleButtonColor, setHandleButtonColor] = useState(false);
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(null);
  const [showError, setShowError] = useState(false);
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
      if (stepNumber >= 1 && stepNumber <= questions.length) {
        setCurrentQuestion(stepNumber - 1);
      }
    }
  }, [stepParam, location.pathname]);

  const handleOptionClick = (option, index) => {
    const currentQ = questions[currentQuestion];
    const selectedCode =
      currentQ.actualCode?.[index] || currentQ.codeSnippets[index];

    if (option === currentQ.correctLetter) {
      setSelectedOption(selectedCode);
    } else {
      setShowError(true);
      alert("WRONG ANSWER"); // fix the handling of this && make it a data-point

      setSelectedButtonIndex(null);
    }
  };

  const handleNext = () => {
    setShowBlankModal(false);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
    }
  };

  // Add step to URL while maintaining the /new-project path
  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
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

  // Render empty step modal
  if (questions[currentQuestion]?.isEmptyStep) {
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
                {questions[currentQuestion].content.title}
              </h2>
              <h4 className="text-xl text-gray-600 leading-relaxed">
                {questions[currentQuestion].content.description}
              </h4>
            </div>

            {/* Right side - Image */}
            <div className="flex-1">
              <img
                src={questions[currentQuestion].content.image}
                alt="Step visualization"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          <button
            onClick={handleNext}
            className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition-colors absolute bottom-8 right-8"
          >
            {currentQuestion + 1 < questions.length && 
             questions[currentQuestion + 1].title === "Congratulations!" ? "Finish" : "Continue"}
          </button>
        </div>
      </div>
    );
  }

  // Check if this is the congratulation step
  const isCongratulationStep = questions[currentQuestion]?.title === "Congratulations!";

  return (
    <>
      {/* Show confetti when on the congratulation step */}
      {isCongratulationStep && (
        <Confetti
          width={windowDimensions.width}
          height={windowDimensions.height}
          recycle={false}
          numberOfPieces={500}
          gravity={0.2}
        />
      )}

      <Dialog
        open={isOpen && !showBlankModal}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm"
          aria-hidden="true"
        />

        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-[screen] h-[screen] max-w-3xl transform overflow-hidden rounded-2xl bg-white">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-center h-[300px]">
                <div className="mx-auto flex size-12 shrink-0 items-center justify-center  sm:mx-0 sm:size-10">
                  {/* <ExclamationTriangleIcon aria-hidden="true" className="size-6 text-red-600" /> */}
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <Dialog.Title
                    as="h3"
                    className="text-base font-semibold text-gray-900"
                  >
                    {questions[currentQuestion].title}
                  </Dialog.Title>
                  <div className="mt-2">
                    <div className="text-sm text-gray-500 mb-4">
                      {questions[currentQuestion].text}
                    </div>
                    {/* Display code snippets */}
                    {questions[currentQuestion].codeSnippets?.map(
                      (snippet, index) => (
                        <pre
                          key={index}
                          className="bg-gray-100 p-2 mb-2 rounded"
                        >
                          <code>{snippet}</code>
                        </pre>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:px-6">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => {
                    setSelectedButtonIndex(index);
                    handleOptionClick(option, index);
                  }}
                  className={`inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto
                    ${
                      selectedButtonIndex === index
                        ? "bg-green-500"
                        : "bg-[#2096F3]"
                    }`}
                >
                  {option}
                </button>
              ))}

              <div className="ml-[160px]">
                {questions[currentQuestion].options.length > 0 && (
                  <button
                    type="button"
                    disabled={selectedButtonIndex === null}
                    onClick={() => {
                      // console.log("selctedoption:", questions);
                      onCodeSelect?.(selectedOption);
                      setIsOpen(false);

                      // Show next question after 3 seconds
                      if (currentQuestion < questions.length - 1) {
                        setTimeout(() => {
                          setCurrentQuestion(currentQuestion + 1);
                          setIsOpen(true);
                          setSelectedButtonIndex(null); // Reset selected button
                          setShowError(false); // Reset error state
                        }, 2000);
                      }
                    }}
                    className=" disabled:opacity-75 disabled:bg-gray-400 inline-flex w-full justify-center rounded-md bg-green-400 px-5 py-2 text-sm font-semibold text-black shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                  >
                    Run
                  </button>
                )}
                {questions[currentQuestion].options.length === 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      // If it's the congratulation step, just close the modal
                      if (questions[currentQuestion].title === "Congratulations!") {
                        setIsOpen(false);
                      } else {
                        handleNext();
                      }
                    }}
                    className="inline-flex w-full justify-center rounded-md bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-20 sm:w-auto"
                  >
                    {questions[currentQuestion].title === "Congratulations!" ? "Close" : "Next"}
                  </button>
                )}
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Blank modal */}
      <ContextModal isOpen={showBlankModal} onNext={handleNext} />

      {showError && (
        <div className="absolute bottom-20 left-0 right-0 mx-auto w-fit bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
          Wrong answer! Think again.
        </div>
      )}
    </>
  );
};

export default Modal;
