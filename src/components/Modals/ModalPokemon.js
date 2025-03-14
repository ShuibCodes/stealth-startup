"use client";

import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import ContextModal from "./ContextModal";
import { useSearchParams, useLocation } from "react-router-dom";
import step1 from "../../images/step-1.png"; 
import step2 from "../../images/step-2.png";
import step3 from "../../images/step-3.png";
import step4 from "../../images/step-4.png";
import step5 from "../../images/step-5.png";
import step6 from "../../images/step-6.png";
import wizard from "../../images/wizard.png";
import Confetti from "react-confetti";

const baseQuestions = [
  {
    title: "Step 1: Create Pokémon Objects",
    text: "Let's create our Pokémon characters with their stats and abilities.",
    options: [],
    correctAnswer: []
  },
  {
    title: "Which pseudocode correctly creates a Pikachu and its opponent?",
    text: "Pick the best approach to define the Pokémon objects:",
    codeSnippets: [
      `CREATE Pikachu!
  name = "Pikachu"
  health = 100
  attacks = [ Thunder Shock, Quick Attack, Thunderbolt ]`,
      `SET Pikachu to a simple string`,
      `MAKE a Pokémon with just a name`
    ],
    actualCode: [
      `# Create the Pokemon dictionary objects with their stats
import random

pikachu = {
    "name": "Pikachu", 
    "health": 100,
    "max_health": 100,
    "attacks": ["Thunder Shock", "Quick Attack", "Thunderbolt"],
    "damage": [20, 10, 30]
}

charmander = {
    "name": "Charmander",
    "health": 120,
    "max_health": 120,
    "attacks": ["Ember", "Scratch", "Flamethrower"],
    "damage": [15, 10, 25]
}`
    ],
    correctLetter: "A",
    options: ["A", "B", "C"]
  },
  
  {
    title: "Step 2: Display Pokémon Stats",
    text: "We need to create a function to show both Pokémon's current health.",
    options: [],
    correctAnswer: []
  },
  {
    title: "Which pseudocode is best for displaying Pokémon stats?",
    text: "Select the approach that will show both Pokémon's stats:",
    codeSnippets: [
      `CREATE a function that displays both Pokémon's health
CALL this function to show initial stats`,
      `PRINT only Pikachu stats to the console`,
      `UPDATE a page element with text "Stats"`
    ],
    actualCode: [
      `# Function to show current stats of both Pokemon
def show_stats():
    print(f"\n{pikachu['name']} HP: {pikachu['health']}/{pikachu['max_health']}")
    print(f"{charmander['name']} HP: {charmander['health']}/{charmander['max_health']}")
    
# Show initial stats
show_stats()`
    ],
    correctLetter: "A",
    options: ["A", "B", "C"]
  },
  
  {
    title: "Step 3: Build the Attack Menu",
    text: "Players need to see what attacks are available and their damage values.",
    options: [],
    correctAnswer: []
  },
  {
    title: "Which pseudocode correctly displays available attacks?",
    text: "Choose the approach that best shows the attack options:",
    codeSnippets: [
      `SET attack button texts to each of Pikachu.attacks and display the corresponding damage`,
      `ASSIGN the whole list of attacks to one button`,
      `LOG the attack list to the console`
    ],
    actualCode: [
      `# Function to display available attacks
def show_attack_menu():
    print("\nChoose your attack:")
    for i, attack in enumerate(pikachu["attacks"]):
        print(f"{i+1}. {attack} (Damage: {pikachu['damage'][i]})")
        
show_attack_menu()`
    ],
    correctLetter: "A",
    options: ["A", "B", "C"]
  },
  
  {
    title: "Step 4: Get Player Input",
    text: "The player needs to choose which attack to use for each turn.",
    options: [],
    correctAnswer: []
  },
  {
    title: "Which pseudocode correctly handles player input?",
    text: "Select the best approach to get and validate the player's attack choice:",
    codeSnippets: [
      `GET input as a number between 1 and 3, then subtract 1 to return an index`,
      `GET input once and return it without checking`,
      `GET input in a loop, subtract 1, and validate that the index is in range`
    ],
    actualCode: [
      `# Function to get player's attack choice
def get_player_choice():
    while True:
        try:
            choice = int(input("Enter attack number (1-3): ")) - 1
            if 0 <= choice < len(pikachu["attacks"]):
                return choice
            else:
                print("Invalid choice. Please enter 1, 2, or 3.")
        except ValueError:
            print("Please enter a number.")`
    ],
    correctLetter: "C",
    options: ["A", "B", "C"]
  },
  
  {
    title: "Step 5: Implement the Player Attack Function",
    text: "Now we need a function to handle what happens when the player attacks.",
    options: [],
    correctAnswer: []
  },
  {
    title: "Which pseudocode correctly implements the player's attack?",
    text: "Choose the best approach for the player's attack function:",
    codeSnippets: [
      `DEFINE player_attack():
    CALL get_player_choice() to get an index,
    GET the attack from Pikachu.attacks,
    SHOW a message "Pikachu uses (attack)!" and subtract damage from Charmander's health`,
      `DEFINE player_attack() that just prints "Attack executed"`,
      `DEFINE player_attack() that subtracts damage from Pikachu's health`
    ],
    actualCode: [
      `# Function for player's attack turn
def player_attack():
    # Get the attack choice from player
    attack_index = get_player_choice()
    attack = pikachu["attacks"][attack_index]
    damage = pikachu["damage"][attack_index]
    
    # Show attack message
    print(f"\n{pikachu['name']} uses {attack}!")
    
    # Apply damage to opponent
    charmander["health"] -= damage
    if charmander["health"] < 0:
        charmander["health"] = 0
    
    # Show updated stats
    show_stats()
    
    # Return True if battle continues
    return charmander["health"] > 0`
    ],
    correctLetter: "A",
    options: ["A", "B", "C"]
  },
  
  {
    title: "Step 6: Implement the Opponent's Turn",
    text: "After the player attacks, the opponent should get a turn to attack back.",
    options: [],
    correctAnswer: []
  },
  {
    title: "Which pseudocode correctly implements the opponent's attack?",
    text: "Choose the best approach for the opponent's attack function:",
    codeSnippets: [
      `DEFINE opponent_attack():
    RANDOMLY select an attack from Charmander.attacks,
    SHOW "Charmander uses (attack)!" and subtract damage from Pikachu's health`,
      `DEFINE opponent_attack() that simply prints "Opponent attacks!"`,
      `DEFINE opponent_attack() that always uses the first attack`
    ],
    actualCode: [
      `# Function for opponent's attack turn
def opponent_attack():
    # Randomly select an attack
    attack_index = random.randint(0, len(charmander["attacks"]) - 1)
    attack = charmander["attacks"][attack_index]
    damage = charmander["damage"][attack_index]
    
    # Show attack message
    print(f"\n{charmander['name']} uses {attack}!")
    
    # Apply damage to player
    pikachu["health"] -= damage
    if pikachu["health"] < 0:
        pikachu["health"] = 0
    
    # Show updated stats
    show_stats()
    
    # Return True if battle continues
    return pikachu["health"] > 0`
    ],
    correctLetter: "A",
    options: ["A", "B", "C"]
  },
  
  {
    title: "Step 7: Create the Battle Loop",
    text: "Let's create a main battle function that alternates between player and opponent turns.",
    options: [],
    correctAnswer: []
  },
  {
    title: "Which pseudocode correctly implements the battle loop?",
    text: "Choose the best structure for the main battle function:",
    codeSnippets: [
      `WHILE both Pokémon have health > 0:
    CALL player_attack()
    IF opponent's health <= 0, SHOW "Pikachu wins!" and EXIT loop;
    CALL opponent_attack()
    IF player's health <= 0, SHOW "Charmander wins!" and EXIT loop;`,
      `SHOW "Pikachu wins!" unconditionally`,
      `IF both have same health, SHOW "It's a tie!"`
    ],
    actualCode: [
      `# Main battle function
def battle():
    print("\n===== BATTLE START =====\n")
    
    while True:
        # Player's turn
        if not player_attack():
            print(f"\n{pikachu['name']} wins!")
            break
        
        # Opponent's turn
        if not opponent_attack():
            print(f"\n{charmander['name']} wins!")
            break
        
        # Show attack menu for next turn
        show_attack_menu()`
    ],
    correctLetter: "A",
    options: ["A", "B", "C"]
  },
  
  {
    title: "Step 8: Create Game Setup and Main Functions",
    text: "Finally, we need functions to reset the game and start the main game loop.",
    options: [],
    correctAnswer: []
  },
  {
    title: "Which pseudocode correctly implements game setup?",
    text: "Choose the best approach for creating the main and reset functions:",
    codeSnippets: [
      `DEFINE reset_game():
    SET both Pokémon's health to full,
    CALL the game initialization function,
    SHOW updated stats and attack menu;
DEFINE main():
    PRINT game title,
    CALL battle(),
    ASK if player wants to play again,
    IF yes, reset and restart battle;`,
      `DEFINE reset_game() that reloads the page`,
      `DEFINE reset_game() that just prints "Resetting game"`
    ],
    actualCode: [
      `# Function to reset the game
def reset_game():
    pikachu["health"] = pikachu["max_health"]
    charmander["health"] = charmander["max_health"]
    print("\n===== GAME RESET =====\n")
    show_stats()
    show_attack_menu()

# Main function to run the game
def main():
    print("===== POKEMON BATTLE =====")
    print(f"{pikachu['name']} vs {charmander['name']}")
    
    # Start the battle
    battle()
    
    # Ask if player wants to play again
    play_again = input("\nPlay again? (y/n): ").lower()
    if play_again == 'y':
        reset_game()
        battle()

# Run the game
if __name__ == "__main__":
    main()`
    ],
    correctLetter: "A",
    options: ["A", "B", "C"]
  },
  {
    title: "Congratulations!",
    text: (
      <div>
        <p className="text-lg font-bold text-green-600 mb-2">🎉 You've built the complete Pokémon Battle game! 🎉</p>
        <p>You created the Pokémon, displayed their stats, set up the attack menu, handled turns, determined a winner, and reset the game.</p>
        <p>Awesome job!</p>
      </div>
    ),
    options: [],
    correctAnswer: []
  }
];

// Define empty modal content for friendly feedback between steps
const emptyModalContent = [
  { title: "Great start!", description: "You've created the Pokémon objects with their stats and attacks!", image: step1 },
  { title: "Nice job!", description: "You implemented a function to display both Pokémon's stats!", image: step2 },
  { title: "Keep going!", description: "You created a function to display the attack menu with damage values!", image: step3 },
  { title: "Making progress!", description: "You added input validation to get the player's attack choice!", image: step4 },
  { title: "Well done!", description: "You implemented the player's attack function with damage calculation!", image: step5 },
  { title: "Excellent work!", description: "You added the opponent's random attack functionality!", image: step6 },
  { title: "Almost there!", description: "You created the main battle loop to alternate between turns!", image: step6 },
  { title: "You did it!", description: "You finished with reset and main functions to complete the game!", image: step1 },
];

const questions = baseQuestions.reduce((acc, question, index) => {
  acc.push(question);
  
    if (
    index < baseQuestions.length - 1 && 
    baseQuestions[index + 1].title !== "Congratulations!" &&
    question.options && 
    question.options.length > 0
  ) {
     const stepNumber = Math.floor(index / 2);
    
    acc.push({
      isEmptyStep: true,
      continueToStep: acc.length + 2,
      content: emptyModalContent[stepNumber] || { title: "Keep going!", description: "You're making great progress.", image: null }
    });
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
        }, 1000);
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
