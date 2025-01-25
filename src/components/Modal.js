'use client'

import React, { useState, useEffect } from 'react'
import { Dialog } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import ContextModal from './ContextModal'
import { useSearchParams, useLocation } from 'react-router-dom'
import step1 from '../images/step-1.png'
import step2 from '../images/step-2.png'
import step3 from '../images/step-3.png'
import step4 from '../images/step-4.png'
import step5 from '../images/step-5.png'
import step6 from '../images/step-6.png'
import wizard from '../images/wizard.png'

const baseQuestions = [
  {
    title: "Step 1: Find the Rock, Paper, Scissors buttons and the result display",
    text: <div>
      We want to find:
      <ul className="list-disc pl-6 mt-2">
        <li>All the <strong>Rock, Paper, Scissors</strong> buttons (they have a class <code>.choice-btn</code>).</li>
        <li>The <code>&lt;div&gt;</code> where we'll display the game result.</li>
      </ul>
    </div>,
    options: [],
    correctAnswer: []
  },
  {
    title: "Which lines of code correctly select these elements?",
    codeSnippets: [
      'var buttons = document.querySelectorAll(".choice-btn");\nvar resultDiv = document.getElementById("result");',
      'var buttons = "some buttons";\nvar resultDiv = "some result place";',
      'var button = document.createElement("button");\nvar resultDiv = document.createElement("div");'
    ],
    options: ["A", "B", "C"],
    correctLetter:"A"
  },
  {
    title: "Step 2: Adding Click Events ",
    text: "We have an array of buttons called buttons and want each button to respond when clicked.",
    options: [],
    correctAnswer: []
  },
  {
    title: "Which code snippet correctly adds a click event to each button?",
    codeSnippets: [
      'IF user clicks one button:\n    check only "Rock"\nELSE:\n    do nothing',
      'FOR each button in buttons:\n    WHEN button is clicked:\n        do something',
      'buttons = "I\'m just a string now!"'
    ],
    actualCode: [
      null,
      `for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function() {
    var userChoice = this.getAttribute("data-choice");
    playGame(userChoice);
  });
}`,
      null
    ],
    options: ["A", "B", "C"],
    correctLetter: "B"
  },
  {
    title: "Step 3: Defining the playGame function. Its getting serious now!",
    text: "We need a function that accepts the user's selection (e.g., Rock, Paper, or Scissors) and determines the outcome.",
    options: [],
    correctAnswer: []
  },
  {
    title: "Which snippet sets up the function signature?",
    codeSnippets: [
      'var userChoice = "playGame";',
      'playGame = userChoice {\n  // function logic\n}',
      'function playGame(userChoice) {\n  // function logic\n}'
    ],
    options: ["A", "B", "C"],
    correctLetter: "C"
  },

  {
    title: "Step 4: Inside playGame: Determining the Computer's Move",
    text: <div>
      <p>Inside the <code>playGame</code> function, we want:</p>
      <ol className="list-decimal pl-6 mt-2">
        <li>Make a short list of the three moves: Rock, Paper, and Scissors.</li>
        <li>Pick a random number that can be 0, 1, or 2.</li>
        <li>Use that random number to choose one move from the list—this becomes the computer's choice.</li>
      </ol>
      
    </div>,
    options: [],
    correctAnswer: []
  },

  {
    title: "Which snippet correctly determines the computer's move?",
    codeSnippets: [
      'var choices = ["Rock", "Paper", "Scissors"];\nvar randomIndex = Math.floor(Math.random() * 3);\nvar computerChoice = choices[randomIndex];\n// next step here',
      'var computerChoice = "RockPaperScissors";\nvar randomIndex = 3;',
      'alert("Computers always pick Rock!");'
    ],
    options: ["A", "B", "C"],
    correctLetter: "A"
  },
  {
    title: "Step 5: Compare and Determine the Winner ",
    text:"We want to check for a tie, or a user victory, or a computer victory.",
    options: [],
    correctAnswer: []
  },
  {
    title: "Which code determines the winner?",
    codeSnippets: [
      'IF userChoice == computerChoice:\n    say "Tie!"\nELSE IF userChoice beats computerChoice:\n    say "You win!"\nELSE:\n    say "Computer wins!"',
      'FOR each round:\n    show "Computer always wins!"',
      'resultMessage = "Game Over."'
    ],
    actualCode: [
      `  var resultMessage = "";

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
  }`,
      null,
      null
    ],
    options: ["A", "B", "C"],
    correctLetter: "A"
  },
  {
    title: "Step 6: Finally, its time to display the result",
    text: "We want to display the result in the <code>resultDiv</code>.",
    options: [],
    correctAnswer: []
  },
  {
    title: "Which snippet inserts <code>resultMessage</code> into <code>&lt;div id=\"result\"&gt;&lt;/div&gt;</code>?",
    text: "We want to display the result in the <code>resultDiv</code>.",
    codeSnippets: [
      'prompt(resultMessage);',
      'resultDiv.textContent = resultMessage;',
      'alert("Done!");'
    ],
    options: ["A", "B", "C"],
    correctLetter: "B"
  }
]

// Define the content for empty modals
const emptyModalContent = [
  {
    title: "Great job on the first steps!",
    description: "You've set up the basic structure. Let's continue building our game.",
    image: step1
  },
  {
    title: "Now we're getting somewhere!",
    description: "The game is starting to take shape. Ready for the next challenge?",
    image: step2
  },
  {
    title: "Almost there!",
    description: "Just a few more steps to complete your Rock, Paper, Scissors game.",
    image: step3
  },
  {
    title: "Looking good!",
    description: "Your game is coming together nicely. Let's add more functionality.",
    image: step4
  },
  {
    title: "Getting close to the finish line!",
    description: "Just a few more touches to make your game perfect.",
    image: step5
  },
  {
    title: "Final steps!",
    description: "You're about to complete your Rock, Paper, Scissors game!",
    image: step6
  }
];

// Create new array with empty steps after every 2nd question
const questions = baseQuestions.reduce((acc, question, index) => {
  // Add the regular question
  acc.push(question);
  
  // Add empty step after every 2nd question (but not after the last question)
  if ((index + 1) % 2 === 0 && index < baseQuestions.length - 1) {
    acc.push({
      isEmptyStep: true,
      continueToStep: acc.length + 2,
      content: emptyModalContent[Math.floor(index / 2)] || {
        title: "Keep going!",
        description: "You're making great progress.",
        image: null
      }
    });
  }
  return acc;
}, []);

const Modal = ({ onCodeSelect }) => {
  console.log("Modal component rendering");
  const [isOpen, setIsOpen] = useState(true)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [showBlankModal, setShowBlankModal] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null)
  const [handleButtonColor, setHandleButtonColor] = useState(false)
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(null)
  const [showError, setShowError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const stepParam = searchParams.get('step');

  const buttonColor = () => {
    setHandleButtonColor(!handleButtonColor)
  }

  // Add useEffect for keyboard listener
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Enter' && selectedOption) {
        onCodeSelect?.(selectedOption);
        setIsOpen(false);
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [selectedOption, onCodeSelect]);

  useEffect(() => {
    // Only handle step parameter if we're on the new-project path
    if (location.pathname === '/new-project' && stepParam) {
      const stepNumber = parseInt(stepParam);
      if (stepNumber >= 1 && stepNumber <= questions.length) {
        setCurrentQuestion(stepNumber - 1);
      }
    }
  }, [stepParam, location.pathname]);

  const handleOptionClick = (option, index) => {
    const currentQ = questions[currentQuestion];
    const selectedCode = currentQ.actualCode?.[index] || currentQ.codeSnippets[index];
    
    if (option === currentQ.correctLetter) {
      setSelectedOption(selectedCode);
    } else {
      setShowError(true);
      setSelectedButtonIndex(null);
    }
  }

  const handleNext = () => {
    setShowBlankModal(false)
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {

    }
  }

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

  // Let's also verify the questions array
  console.log("Current question:", questions[currentQuestion]);

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
              <h2 className="text-3xl font-bold mb-4">{questions[currentQuestion].content.title}</h2>
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
            Continue
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Dialog
        open={isOpen && !showBlankModal}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />

        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-[screen] h-[screen] max-w-2xl transform overflow-hidden rounded-2xl bg-white">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-center h-[300px]">
                <div className="mx-auto flex size-12 shrink-0 items-center justify-center  sm:mx-0 sm:size-10">
                  {/* <ExclamationTriangleIcon aria-hidden="true" className="size-6 text-red-600" /> */}
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <Dialog.Title as="h3" className="text-base font-semibold text-gray-900">
                    {questions[currentQuestion].title}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 mb-4">
                      {questions[currentQuestion].text}
                    </p>
                    {/* Display code snippets */}
                    {questions[currentQuestion].codeSnippets?.map((snippet, index) => (
                      <pre key={index} className="bg-gray-100 p-2 mb-2 rounded">
                        <code>{snippet}</code>
                      </pre>
                    ))}
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
                    handleOptionClick(option, index);
                    setSelectedButtonIndex(index);
                  }}
                  className={`inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto
                    ${selectedButtonIndex === index ? 'bg-green-500' : 'bg-[#2096F3]'}`}
                >
                  {option}
                </button>
              ))}
     
              <div className="ml-[160px]" >
                {questions[currentQuestion].options.length > 0 && (
                  <button
                    type="button"
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
                        }, 2200);
                      }
                    }}
                    className="inline-flex w-full justify-center rounded-md bg-green-400 px-5 py-2 text-sm font-semibold text-black shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                  >
                    Run 
                  </button>
                )}
                {questions[currentQuestion].options.length === 0 && (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex w-full justify-center rounded-md bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-20 sm:w-auto"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Blank modal */}
      <ContextModal
  isOpen={showBlankModal}
  onNext={handleNext}
  
      />

      {showError && (
        <div className="absolute bottom-20 left-0 right-0 mx-auto w-fit bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
          Wrong answer! Think again.
        </div>
      )}
    </>
  ) 
}

export default Modal
