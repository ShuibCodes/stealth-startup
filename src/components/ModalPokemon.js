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
    title: "Step 1: Create Pokémon Objects",
    text: "Let's start by creating Pokémon objects to represent our battling creatures. Which code correctly creates a Pikachu?",
    codeSnippets: [
      'CREATE Pikachu!\n\nname = "Pikachu"\nhealth = 100\nattacks = [\n    Thunder Shock\n    Quick Attack\n    Thunderbolt\n]',
      
      'Pikachu = "just a string"',
      
      'CREATE Pikachu!\n\nname = "Pikachu"'
    ],
    actualCode: [
      `pikachu = { 
  "name": "Pikachu", 
  "hp": 100, 
  "attacks": [
    { "name": "Thunder Shock", "damage": 20 },
    { "name": "Quick Attack", "damage": 10 },
    { "name": "Thunderbolt", "damage": 30 }
  ]
}`
    ],
    correctLetter: "A",
    options: ["A", "B", "C"],
  },
  {
    title: "Step 2: Display Pokémon Stats",
    text: "Now, let's show our Pikachu's health points on the screen. Which code correctly displays Pikachu's health?",
    codeSnippets: [
      'SHOW Message: "Pikachu HP: 100"',
      
      'SHOW Message: "Pickachu HP: 1000"',
      
      'SHOW Message: "HP: ???"'
    ],
    actualCode: [
      'print(f"{pikachu[\'name\']} HP: {pikachu[\'hp\']}")'
    ],
    correctLetter: "A",
    options: ["A", "B", "C"],
  },
  {
    title: "Step 3: Player Turn",
    text: "Let's let the player choose which attack to use. Which code correctly gets the player's choice?",
    codeSnippets: [
      'ASK PLAYER: "Which attack? (1, 2, or 3)"\n\nGET player\'s answer\nFIND that attack in Pikachu\'s attack list',
      
      'FIND attack number 4 in Pikachu\'s list',
      
      'ALWAYS use Thunder Shock'
    ],
    actualCode: [
      'choice = int(input("Enter attack number (1-3): ")) - 1\nattack = pikachu["attacks"][choice]'
    ],
    correctLetter: "A",
    options: ["A", "B", "C"],
  },
  {
    title: "Step 4: Calculate Damage",
    text: "Now we need to apply damage to the opponent. Which code correctly reduces Charmander's health when hit?",
    codeSnippets: [
      'SUBTRACT attack damage FROM Charmander\'s health',
      
      'ADD attack damage TO Charmander\'s health',
      
      'SUBTRACT attack damage FROM Pikachu\'s health'
    ],
    actualCode: [
      'charmander["hp"] -= attack["damage"]'
    ],
    correctLetter: "A",
    options: ["A", "B", "C"],
  },
  {
    title: "Step 5: Check for Winner",
    text: "Finally, let's check if there's a winner. Which code correctly checks if Pikachu won the battle?",
    codeSnippets: [
      'IF Charmander\'s health is 0 or less THEN\n    ANNOUNCE: "Pikachu wins!"',
      
      'IF Charmander\'s health is GREATER than 0 THEN\n    ANNOUNCE: "Pikachu wins!"',
      
      'IF Pikachu\'s health is 0 or less THEN\n    ANNOUNCE: "Pikachu wins!"'
    ],
    actualCode: [
      'if charmander["hp"] <= 0: print(f"{pikachu[\'name\']} wins!")'
    ],
    correctLetter: "A",
    options: ["A", "B", "C"],
  },
  {
    title: "Congratulations!",
    text: (
      <div>
        <p className="text-lg font-bold text-green-600 mb-2">🎉 You've successfully built a Pokémon Battle game! 🎉</p>
        <p>You've created a fully functional Python game with:</p>
        <ul className="list-disc pl-6 mt-2">
          <li>Pokémon objects with properties</li>
          <li>Attack selection and damage calculation</li>
          <li>Battle turn management</li>
          <li>Win condition checking</li>
        </ul>
        <p className="mt-3">Feel free to enhance the game by adding more Pokémon, attacks, or special effects!</p>
      </div>
    ),
    options: [],
    correctAnswer: [],
  }
];

// Define the content for empty modals
const emptyModalContent = [
  {
    title: "Great start! 1",
    description:
      "You've created the Pokémon objects! Now you can see their properties and attacks.",
    image: step1,
  },
  {
    title: "Now it's getting interesting! 2",
    description:
      "You've displayed the Pokémon stats. Let's set up the player's turn next.",
    image: step2,
  },
  {
    title: "Almost there! 3 ",
    description:
      "You've implemented the attack selection. Time to calculate damage!",
    image: step3,
  },
  {
    title: "Looking good! 4",
    description:
      "You've added damage calculation. Just need to check for a winner now!",
    image: step4,
  },
  {
    title: "Getting close to the finish line!5 ",
    description:
      "You've implemented the winner check. Let's put it all together!",
    image: step5,
  },
  {
    title: "Final steps! 6",
    description: "You're about to complete your Pokémon Battle game!",
    image: step6,
  },
];

const questions = baseQuestions.reduce((acc, question, index) => {
  // Add the regular question
  acc.push(question);

  // Add an empty step after each question (except the last one)
  if (index < baseQuestions.length - 1) {
    const nextQuestion = baseQuestions[index + 1];
    if (nextQuestion && nextQuestion.title !== "Congratulations!") {
      acc.push({
        isEmptyStep: true,
        continueToStep: acc.length + 2,
        content: emptyModalContent[index] || {
          title: "Keep going!",
          description: "You're making great progress.",
          image: null,
        },
      });
    }
  }
  return acc;
}, []);

console.log(questions);

const ModalPokemon = ({ onCodeSelect }) => {
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
    const currentQ = questions[currentQuestion];
    
    // Skip processing if it's an empty step or missing required properties
    if (!currentQ || currentQ.isEmptyStep || !currentQ.codeSnippets) {
      return;
    }
    
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
  // Toggle minimized state
  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
    // Hide any error or hint when minimizing
    if (!isMinimized) {
      setShowError(false);
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
  if (questions[currentQuestion]?.isEmptyStep) {
    return (
      <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 z-[9999] transition-all duration-300 ease-in-out">
        <div className="bg-gradient-to-br from-white to-gray-100 rounded-2xl shadow-2xl p-12 max-w-6xl w-full h-[600px] relative overflow-hidden border border-purple-100 animate-fadeIn">
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-100 rounded-full -mr-32 -mt-32 opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-100 rounded-full -ml-40 -mb-40 opacity-50"></div>
          
          {/* Wizard image with enhanced styling */}
          <div className="absolute top-4 left-16 w-36 h-36 rounded-full bg-purple-100 p-2 shadow-lg transform hover:scale-105 transition-transform duration-300">
            <img
              src={wizard}
              alt="Wizard avatar"
              className="w-full h-full object-contain rounded-full"
            />
          </div>

          {/* Close button with improved styling */}
          <button
            onClick={() => {
              setCurrentQuestion(0);
              setShowBlankModal(false);
              onCodeSelect?.(null);
            }}
            className="absolute top-4 right-4 text-gray-500 hover:text-red-500 hover:bg-red-50 transition-all p-2 rounded-full"
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

          <div className="flex h-full items-center justify-between gap-12 pt-6">
            {/* Left side - Content with improved typography and layout */}
            <div className="flex-1 flex flex-col justify-center pl-6">
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-md border-l-4 border-purple-500 transform hover:translate-y-[-5px] transition-all duration-300">
                <h2 className="text-4xl font-bold mb-6 text-purple-700 relative">
                  {questions[currentQuestion].content.title}
                  <span className="absolute bottom-0 left-0 w-16 h-1 bg-purple-500 rounded"></span>
                </h2>
                <p className="text-xl text-gray-700 leading-relaxed">
                  {questions[currentQuestion].content.description}
                </p>
              </div>
            </div>

            {/* Right side - Image with enhancement */}
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

          {/* Continue button with improved styling */}
          <button
            onClick={handleNext}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-6 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 absolute bottom-8 right-8 shadow-lg font-semibold flex items-center group"
          >
            <span>
              {currentQuestion + 1 < questions.length && 
              questions[currentQuestion + 1].title === "Congratulations!" ? "Finish" : "Continue"}
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
          
          {/* Progress indicator */}
          <div className="absolute bottom-8 left-8 flex items-center">
            <div className="text-sm text-gray-500 mr-2">Progress:</div>
            <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-500"
                style={{ width: `${(currentQuestion / (questions.length - 1)) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Check if this is the congratulation step
  const isCongratulationStep = questions[currentQuestion]?.title === "Congratulations!";

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
                {questions[currentQuestion].title}
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
                    {questions[currentQuestion].text}
                  </div>
                  
                  {/* Keep the fun code option styling */}
                  {questions[currentQuestion].codeSnippets?.map(
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
                          handleOptionClick(questions[currentQuestion].options[index], index);
                        }}
                      >
                        {/* Keep fun option badge but tone it down */}
                        <div className="absolute -top-2 -right-2 bg-blue-100 text-blue-800 font-bold py-1 px-4 rounded-full text-sm shadow border border-blue-200">
                          Option {questions[currentQuestion].options[index]}
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
                      <span className="mr-2">🎯</span> Option {questions[currentQuestion].options[selectedButtonIndex]} selected
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <span className="mr-2">👉</span> Pick your favorite code
                    </span>
                  )}
                </div>
                <div className="flex space-x-4">
                  {questions[currentQuestion].options.length > 0 && (
                    <button
                      type="button"
                      disabled={selectedButtonIndex === null}
                      onClick={() => {
                        onCodeSelect?.(selectedOption);
                        setIsOpen(false);

                        // Show next question after 3 seconds
                        if (currentQuestion < questions.length - 1) {
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
                  
                  {/* Add restart button inside modal when on congratulation step */}
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

      {/* Blank modal */}
      <ContextModal isOpen={showBlankModal} onNext={handleNext} />

      {/* Customized error message */}
      {showError && (
        <div className="fixed bottom-4 left-0 right-0 mx-auto w-fit bg-pink-50 border-2 border-pink-300 text-pink-700 px-5 py-3 rounded-xl flex items-center shadow-lg animate-pulse" style={{ zIndex: 60 }}>
          <span className="text-xl mr-3">🤔</span>
          <span className="font-bold">{errorMessage}</span>
        </div>
      )}
      
    </>
  );
};

export default ModalPokemon;
