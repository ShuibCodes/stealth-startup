"use client";

import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import ContextModal from "./ContextModal";
import { useSearchParams, useLocation } from "react-router-dom";
import wizard from "../../images/wizard.png";
import step1 from "../../images/memory-step-1.png";
import step2 from "../../images/memory-step-2.png";
import step3 from "../../images/memory-step-3.png";
import step4 from "../../images/memory-step-4.png";
import step5 from "../../images/memory-step-5.png";
import Confetti from "react-confetti";
import ProgressTracker from "../Trackers/ProgressTracker";
const baseQuestions = [
  // Step 1 explanation
  {
    title: "Step 1: Set up the game variables",
    text: "Let's start by setting up our game variables and getting DOM elements.",
    options: [],
    correctAnswer: []
  },
  // Step 1 quiz
  {
    title: "Which code snippet correctly initializes the game variables?",
    codeSnippets: [
      "var game = { cards: [], matches: 0 };",
      'DEFINE characters array with mickey, minnie, donald, goofy\nDEFINE game variables for state\nGET DOM elements',
      "const game = new MemoryGame();"
    ],
    actualCode: [
      null,
      `// Step 1: Initialize game variables
const characters = [
    { name: 'mickey', emoji: '🐭' },
    { name: 'minnie', emoji: '🎀' },
    { name: 'donald', emoji: '🦆' },
    { name: 'goofy', emoji: '🧸' }
];

let flippedCards = [];
let matchedPairs = 0;
let isProcessing = false;
let gameTimer = null;
let gameTime = 0;

// Get DOM elements
const gameBoard = document.querySelector('.game-board');
const cards = document.querySelectorAll('.card');
const matchesDisplay = document.querySelector('.game-info span:first-child');
const timeDisplay = document.querySelector('.game-info span:last-child');
const resetButton = document.getElementById('reset-button');

// Shuffle function to randomize card order
function shuffleCards() {
    const cardArray = Array.from(cards);
    cardArray.forEach(card => {
        // Remove from DOM temporarily
        gameBoard.removeChild(card);
    });
    
    // Shuffle array
    for (let i = cardArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cardArray[i], cardArray[j]] = [cardArray[j], cardArray[i]];
    }
    
    // Re-append in new order
    cardArray.forEach(card => {
        gameBoard.appendChild(card);
    });
}`,
      null
    ],
    options: ["A", "B", "C"],
    correctLetter: "B",
    stepNumber: 1
  },
  // Step 2 explanation
  {
    title: "Step 2: Handle Card Clicks",
    text: (
      <div>
        We need to implement card click functionality to:
        <ul className="list-disc pl-6 mt-2">
          <li>Check if a card can be flipped</li>
          <li>Flip the card when clicked</li>
          <li>Prepare to check for matches</li>
        </ul>
      </div>
    ),
    options: [],
    correctAnswer: [],
    stepNumber: 2
  },
  // Step 2 quiz
  {
    title: "Which snippet correctly handles card clicks?",
    codeSnippets: [
      'HANDLE card click:\n  IF card can be flipped:\n    flip card and check for matches',
      "function onClick() { console.log('clicked'); }",
      "cards.addEventListener('click', flipCard);"
    ],
    actualCode: [
      `// Step 2: Handle card clicks
function handleCardClick(card) {
    if (
        isProcessing || 
        flippedCards.length >= 2 || 
        card.classList.contains('flipped') ||
        card.classList.contains('matched')
    ) {
        return;
    }

    // Start timer on first card click
    if (!gameTimer) {
        startTimer();
    }

    // Flip the card
    card.classList.add('flipped');
    flippedCards.push(card);

    // Check for match if two cards are flipped
    if (flippedCards.length === 2) {
        isProcessing = true;
        checkForMatch();
    }
}

// Add click listeners to all cards
cards.forEach(card => {
    card.addEventListener('click', () => handleCardClick(card));
});`,
      null,
      null
    ],
    options: ["A", "B", "C"],
    correctLetter: "A",
    stepNumber: 2
  },
  // Step 3 explanation
  {
    title: "Step 3: Implement Timer",
    text: (
      <div>
        We need to track game time by:
        <ul className="list-disc pl-6 mt-2">
          <li>Starting a timer when the first card is clicked</li>
          <li>Updating the display every second</li>
          <li>Stopping the timer when the game ends</li>
        </ul>
      </div>
    ),
    options: [],
    correctAnswer: [],
    stepNumber: 3
  },
  // Step 3 quiz
  {
    title: "Which code snippet correctly implements the timer?",
    codeSnippets: [
      "setInterval(() => time++, 1000);",
      'START timer:\n  Update time display every second\nSTOP timer:\n  Clear interval and reset',
      "setTimeout(updateTimer, 1000);"
    ],
    actualCode: [
      null,
      `// Step 3: Timer functionality
function startTimer() {
    gameTimer = setInterval(() => {
        gameTime++;
        timeDisplay.textContent = \`Time: \${gameTime}s\`;
    }, 1000);
}

function stopTimer() {
    clearInterval(gameTimer);
    gameTimer = null;
}`,
      null
    ],
    options: ["A", "B", "C"],
    correctLetter: "B",
    stepNumber: 3
  },
  // Step 4 explanation
  {
    title: "Step 4: Check for Matches",
    text: (
      <div>
        Now we need to:
        <ul className="list-disc pl-6 mt-2">
          <li>Compare the two flipped cards</li>
          <li>Handle matches by keeping cards flipped</li>
          <li>Handle non-matches by flipping cards back</li>
          <li>Update the score and check for game completion</li>
        </ul>
      </div>
    ),
    options: [],
    correctAnswer: [],
    stepNumber: 4
  },
  // Step 4 quiz
  {
    title: "Which snippet correctly checks for matches?",
    codeSnippets: [
      'CHECK for match:\n  Compare cards\n  Handle match/no match\n  Update score\n  Check for win',
      "if (card1 === card2) console.log('match');",
      "matchCards();"
    ],
    actualCode: [
      `// Step 4: Check for matches
function checkForMatch() {
    const [card1, card2] = flippedCards;
    const match = card1.dataset.card === card2.dataset.card;

    setTimeout(() => {
        if (match) {
            // Handle match
            card1.classList.add('matched');
            card2.classList.add('matched');
            matchedPairs++;
            matchesDisplay.textContent = \`Matches: \${matchedPairs}\`;

            // Check for game completion
            if (matchedPairs === characters.length) {
                stopTimer();
                setTimeout(() => {
                    alert(\`Congratulations! You completed the game in \${gameTime} seconds!\`);
                }, 500);
            }
        } else {
            // Handle no match
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
        }

        // Reset for next turn
        flippedCards = [];
        isProcessing = false;
    }, 1000);
}`,
      null,
      null
    ],
    options: ["A", "B", "C"],
    correctLetter: "A",
    stepNumber: 4
  },
  // Step 5 explanation
  {
    title: "Step 5: Reset Game",
    text: (
      <div>
        Finally, we need to:
        <ul className="list-disc pl-6 mt-2">
          <li>Reset all cards to their initial state</li>
          <li>Reset the game state variables</li>
          <li>Update the displays</li>
          <li>Add a listener to the reset button</li>
        </ul>
      </div>
    ),
    options: [],
    correctAnswer: [],
    stepNumber: 5
  },
  // Step 5 quiz
  {
    title: "Which code correctly implements the reset functionality?",
    codeSnippets: [
      "location.reload();",
      'RESET game:\n  Reset cards\n  Reset state\n  Reset displays\n  Reset timer',
      "resetGame = true;"
    ],
    actualCode: [
      null,
      `// Step 5: Reset game functionality
function resetGame() {
    // Reset all cards
    cards.forEach(card => {
        card.classList.remove('flipped', 'matched');
    });

    // Randomize card positions
    shuffleCards();

    // Reset game state
    flippedCards = [];
    matchedPairs = 0;
    isProcessing = false;
    gameTime = 0;

    // Reset displays
    matchesDisplay.textContent = 'Matches: 0';
    timeDisplay.textContent = 'Time: 0s';

    // Reset timer
    stopTimer();
    gameTimer = null;
}

// Add reset button listener
resetButton.addEventListener('click', resetGame);

// Initialize the game
shuffleCards();
resetGame();`,
      null
    ],
    options: ["A", "B", "C"],
    correctLetter: "B",
    stepNumber: 5
  },
  // Congratulations
  {
    title: "Congratulations!",
    text: (
      <div>
        <p className="text-lg font-bold text-green-600 mb-2">🎉 You've successfully built a Disney Memory Game! 🎉</p>
        <p>Your game includes:</p>
        <ul className="list-disc pl-6 mt-2">
          <li>Card flipping animations</li>
          <li>Match checking logic</li>
          <li>Timer functionality</li>
          <li>Score tracking</li>
          <li>Reset capability</li>
        </ul>
        <p className="mt-3">Try to match all the cards as quickly as you can!</p>
      </div>
    ),
    options: [],
    correctAnswer: []
  }
];

// Define the content for empty modals
const emptyModalContent = [
    {
      title: "Great start!",
      description:
        "You've set up the game variables and initialized the basics. Let's keep going!",
      image: step1,
    },
    {
      title: "Now it's getting interesting!",
      description:
        "The cards can now be flipped. Let's add a timer!",
      image: step2,
    },
    {
      title: "Looking good!",
      description:
        "Your memory game is coming together. Let's add match checking functionality.",
      image: step3,
    },
    {
      title: "Almost there!",
      description:
        "Let's add the ability to reset the game for endless fun!",
      image: step4,
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
      // Important: continueToStep should point to the explanation step, not the quiz
      acc.push({
        isEmptyStep: true,
        continueToStep: acc.length + 1, // Point to the next explanation step, not +2
        content: emptyModalContent[Math.floor(index / 2)] || {
          title: "Keep going!",
          description: "You're making great progress.",
          image: wizard,
        },
      });
    }
  }
  return acc;
}, []);

const Modal = ({ onCodeSelect }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showBlankModal, setShowBlankModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(null);
  const [showError, setShowError] = useState(false);
  const [incorrectSelection, setIncorrectSelection] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const stepParam = searchParams.get("step");
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

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

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter" && selectedOption) {
        onCodeSelect?.(selectedOption);
        setIsOpen(false);
        setTimeout(() => {
          setCurrentQuestion(currentQuestion + 1);
          setIsOpen(true);
          setSelectedButtonIndex(null);
          setShowError(false);
        }, 2000);
      }
    };

    window.addEventListener("keypress", handleKeyPress);
    return () => window.removeEventListener("keypress", handleKeyPress);
  }, [selectedOption, onCodeSelect, currentQuestion]);

  useEffect(() => {
    if (location.pathname === "/new-project/memory-game" && stepParam) {
      const stepNumber = parseInt(stepParam);
      if (stepNumber >= 1 && stepNumber <= baseQuestions.length) {
        setCurrentQuestion(stepNumber - 1);
      }
    }
  }, [stepParam, location.pathname]);

  const handleOptionClick = (option, index) => {
    const currentQ = questions[currentQuestion];
    
    if (!currentQ || currentQ.isEmptyStep || !currentQ.codeSnippets) {
      return;
    }
    
    // Make sure we're getting the actual code, not just a description
    const selectedCode = currentQ.actualCode?.[index];

    if (option === currentQ.correctLetter) {
      setSelectedOption(selectedCode);
      setSelectedButtonIndex(index);
      setIncorrectSelection(null);
      setShowError(false);
    } else {
      setShowError(true);
      setIncorrectSelection(index);
      setSelectedButtonIndex(null);
      
      const messages = [
        "Not quite right. Think about what we need to accomplish in this step.",
        "That's not the best approach. Try another option!",
        "Close, but not correct. Review the requirements and try again.",
        "Hmm, that won't work. Look for a more complete solution."
      ];
      setErrorMessage(messages[Math.floor(Math.random() * messages.length)]);
    }
  };

  const handleNext = () => {
    setShowBlankModal(false);
    
    if (currentQuestion < questions.length - 1) {
      // If we have a specific continueToStep, use that
      const currentQ = questions[currentQuestion];
      if (currentQ && currentQ.isEmptyStep && currentQ.continueToStep) {
        setCurrentQuestion(currentQ.continueToStep);
        if (location.pathname.includes("/new-project")) {
          setSearchParams({ step: currentQ.continueToStep + 1 });
        }
      } else {
        // Otherwise just move to the next question
        setCurrentQuestion(currentQuestion + 1);
        if (location.pathname.includes("/new-project")) {
          setSearchParams({ step: currentQuestion + 2 });
        }
      }
    }
  };

  const handleNextQuestion = () => {
    // Handle Congratulations step specially
    if (questions[currentQuestion].title === "Congratulations!") {
      setIsOpen(false);
      return;
    }
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      if (location.pathname.includes("/new-project")) {
        setSearchParams({ step: currentQuestion + 2 });
      }
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSearchParams({ step: currentQuestion });
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
    if (!isMinimized) {
      setShowError(false);
    }
  };

  const handleRestart = () => {
    setIsOpen(true);
    setCurrentQuestion(0);
    setSelectedOption(null);
    setSelectedButtonIndex(null);
    setShowError(false);
    setIncorrectSelection(null);
    onCodeSelect?.("RESET_CODE_TO_INITIAL");
    
    if (location.pathname.includes("/new-project")) {
      setSearchParams({ step: 1 });
    }
    
    setTimeout(() => {
      setShowBlankModal(false);
    }, 100);
  };

  // Add a handleExplanationNext function specifically for explanation steps
  const handleExplanationNext = () => {
    // Always just go to the next question for explanation steps
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      if (location.pathname.includes("/new-project")) {
        setSearchParams({ step: currentQuestion + 2 });
      }
    }
  };

  // Empty step modal
  if (questions[currentQuestion]?.isEmptyStep) {
    return (
      <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 z-[9999]">
        <div className="bg-gradient-to-br from-white to-gray-100 rounded-2xl shadow-2xl p-12 max-w-6xl w-full h-[600px] relative overflow-hidden border border-blue-100">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full -mr-32 -mt-32 opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-100 rounded-full -ml-40 -mb-40 opacity-50"></div>
          
          <div className="absolute top-4 left-16 w-36 h-36 rounded-full bg-blue-100 p-2 shadow-lg transform hover:scale-105 transition-transform duration-300">
            <img src={wizard} alt="Wizard" className="w-full h-full object-contain rounded-full" />
          </div>

          <button
            onClick={() => {
              setCurrentQuestion(0);
              setShowBlankModal(false);
              onCodeSelect?.(null);
            }}
            className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition-all p-2 rounded-full"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="flex h-full items-center justify-between gap-12 pt-6">
            <div className="flex-1 flex flex-col justify-center pl-6">
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-md border-l-4 border-blue-500">
                <h2 className="text-4xl font-bold mb-6 text-blue-700 relative">
                  {questions[currentQuestion].content.title}
                  <span className="absolute bottom-0 left-0 w-16 h-1 bg-blue-500 rounded"></span>
                </h2>
                <p className="text-xl text-gray-700 leading-relaxed">
                  {questions[currentQuestion].content.description}
                </p>
              </div>
            </div>

            <div className="flex-1 flex justify-center items-center p-4">
              {questions[currentQuestion].content.image && (
                <div className="rounded-xl overflow-hidden shadow-xl border-4 border-white transform hover:rotate-1 transition-all duration-300">
                  <img
                    src={questions[currentQuestion].content.image}
                    alt="Step visualization"
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
            </div>
          </div>

          <button
            onClick={handleNext}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 absolute bottom-8 right-8 shadow-lg font-semibold flex items-center group"
          >
            <span>Continue</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
          
          <div className="absolute bottom-8 left-8 flex items-center">
            <div className="text-sm text-gray-500 mr-2">Progress:</div>
            <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                style={{ width: `${(currentQuestion / (questions.length - 1)) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isCongratulationStep = questions[currentQuestion]?.title === "Congratulations!";

  return (
    <>
      <ProgressTracker
        projectName="memory-game"
        currentStepIndex={currentQuestion}
        totalSteps={questions.length}
      />
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

      {isMinimized && (
        <div 
          className="fixed bottom-6 right-6 bg-blue-500 text-white py-3 px-4 rounded-full shadow-lg cursor-pointer flex items-center z-50 hover:bg-blue-600 transition-all duration-200"
          onClick={toggleMinimize}
        >
          <span className="text-xl mr-2">📝</span>
          <span className="font-bold">Show Tutorial</span>
        </div>
      )}

      {isCongratulationStep && !isMinimized && (
        <div 
          className="fixed bottom-6 right-6 bg-green-500 text-white py-3 px-4 rounded-full shadow-lg cursor-pointer flex items-center z-50 hover:bg-green-600 transition-all duration-200"
          onClick={handleRestart}
        >
          <span className="text-xl mr-2">🔄</span>
          <span className="font-bold">Start Over</span>
        </div>
      )}

      <Dialog
        open={isOpen && !showBlankModal && !isMinimized}
        onClose={() => {}}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-blue-500/30 backdrop-blur-sm" aria-hidden="true" style={{ zIndex: 40 }} />

        <div className="fixed inset-0 flex items-center justify-center p-4" style={{ zIndex: 50 }}>
          <Dialog.Panel className="w-[screen] h-[screen] max-w-3xl transform overflow-hidden rounded-2xl bg-white shadow-xl border-2 border-blue-200">
            <div className="bg-blue-500 py-4 px-6 flex items-center justify-center relative">
              <h2 className="text-2xl font-bold text-white drop-shadow-md">
                {questions[currentQuestion].title}
              </h2>
              
              <div className="absolute right-4">
                <div className="text-xl">✨</div>
              </div>
              
              <button 
                className="absolute left-4 bg-blue-400 hover:bg-blue-600 text-white p-1.5 rounded-lg transition-all duration-200"
                onClick={toggleMinimize}
                aria-label="Minimize tutorial"
                title="Minimize tutorial"
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
                    {questions[currentQuestion].text}
                  </div>
                  
                  {questions[currentQuestion].codeSnippets?.map((snippet, index) => (
                    <div 
                      key={index} 
                      className={`mb-6 rounded-xl transition-all duration-200 transform hover:scale-[1.01] ${
                        selectedButtonIndex === index 
                          ? "bg-green-50 border-2 border-green-300 shadow-md" 
                          : incorrectSelection === index
                            ? "bg-red-50 border-2 border-red-300 shadow-md" 
                            : "bg-blue-50 border-2 border-blue-200 shadow"
                      }`}
                      onClick={() => handleOptionClick(questions[currentQuestion].options[index], index)}
                    >
                      <div className="absolute -top-2 -right-2 bg-blue-100 text-blue-800 font-bold py-1 px-4 rounded-full text-sm shadow border border-blue-200">
                        Option {questions[currentQuestion].options[index]}
                      </div>
                      
                      <div className="pt-6 pb-2 px-5 rounded-t-xl relative">
                        <pre className="p-4 rounded-xl font-mono text-md overflow-auto bg-white shadow-inner">
                          <code>{snippet}</code>
                        </pre>
                      </div>
                      
                      {selectedButtonIndex === index && (
                        <div className="flex justify-center pb-2">
                          <div className="text-green-600 font-bold flex items-center">
                            <span className="mr-2">✅</span> Great choice!
                          </div>
                        </div>
                      )}
                      
                      {incorrectSelection === index && (
                        <div className="flex justify-center pb-2">
                          <div className="text-red-600 font-bold flex items-center">
                            <span className="mr-2">❌</span> Try again
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 sticky bottom-0">
              <div className="flex justify-between items-center">
                <div className="text-md font-semibold text-slate-700">
                  {selectedButtonIndex !== null ? (
                    <span className="flex items-center">
                      <span className="mr-2">🎯</span> Option {questions[currentQuestion].options[selectedButtonIndex]} selected
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <span className="mr-2">👉</span> Choose your solution
                    </span>
                  )}
                </div>
                <div className="flex space-x-4">
                  
                  {questions[currentQuestion].options.length > 0 && (
                    <button
                      type="button"
                      disabled={selectedButtonIndex === null}
                      onClick={() => {
                        const currentQ = questions[currentQuestion];
                        if (currentQ && selectedButtonIndex !== null) {
                          // Get the code snippet based on the selected option
                          const selectedCode = currentQ.actualCode?.[selectedButtonIndex];
                          
                          // Only proceed if we have valid code
                          if (selectedCode) {
                            onCodeSelect?.(selectedCode);
                            setIsOpen(false);

                            if (currentQuestion < questions.length - 1) {
                              setTimeout(() => {
                                setCurrentQuestion(currentQuestion + 1);
                                setIsOpen(true);
                                setSelectedButtonIndex(null);
                                setShowError(false);
                                setIncorrectSelection(null);
                              }, 1000);
                            }
                          }
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
                  
                  {questions[currentQuestion].options.length === 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        // If it's the congratulation step, just close the modal
                        if (questions[currentQuestion].title === "Congratulations!") {
                          setIsOpen(false);
                        } else {
                          // Use the dedicated explanation next function
                          handleExplanationNext();
                        }
                      }}
                      className="bg-blue-500 text-white rounded-xl px-6 py-2 text-md font-bold shadow-md hover:bg-blue-600 transition-all duration-200"
                    >
                      {questions[currentQuestion].title === "Congratulations!" ? (
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
                  
                  {questions[currentQuestion].title === "Congratulations!" && (
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

      <ContextModal isOpen={showBlankModal} onNext={handleNext} />

      {showError && (
        <div className="fixed bottom-4 left-0 right-0 mx-auto w-fit bg-pink-50 border-2 border-pink-300 text-pink-700 px-5 py-3 rounded-xl flex items-center shadow-lg animate-pulse" style={{ zIndex: 60 }}>
          <span className="text-xl mr-3">🤔</span>
          <span className="font-bold">{errorMessage}</span>
        </div>
      )}
    </>
  );
};

export default Modal; 