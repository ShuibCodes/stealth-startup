'use client'

import React, { useState, useEffect } from 'react'
import { Dialog } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import ContextModal from './ContextModal'

const Modal = ({ onCodeSelect }) => {
  console.log("Modal component rendering");
  const [isOpen, setIsOpen] = useState(true)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [showBlankModal, setShowBlankModal] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null)

  const questions = [
    {
      title: "Setting up variables",
      text: "We need a variable to store the computer's choice and a variable for the user's choice.",
      options: [],
      correctAnswer: []
    },
    {
      title: "Which line of code best creates a variable for computerChoice?",
      options: ["A = console.log('working')", "B = console.log('computerChoice')", "C = function computerChoice() {}"],
      correctAnswer: ["console.log('working')"]
    },
    // {
    //   title: "Second explanation",
    //   text: "explanation",
    //   options: [],
    // },
    
    // {
    //   title: "Question 2",
    //   text: "How many years of experience do you have?",
    //   options: ["A", "B", "C"]
    // },

    
  ]

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

  const handleOptionClick = (option) => {
    const currentQ = questions[currentQuestion];
    // Add safety check
    if (!currentQ || !currentQ.correctAnswer) {
      console.log("No correct answer defined for this question");
      return;
    }

    if (currentQ.correctAnswer.includes(option.replace('A = ', ''))) {
      setSelectedOption(option);
      onCodeSelect?.(option);
      setIsOpen(false);
    }
    
    // Add console.log for debugging
    console.log({
      option,
      currentQ,
      isCorrect: currentQ.correctAnswer?.includes(option.replace('A = ', '')),
      selectedOption
    });
  }

  const handleNext = () => {
    setShowBlankModal(false)
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      onCodeSelect?.(selectedOption)
      setIsOpen(false)
    }
  }

  // Let's also verify the questions array
  console.log("Current question:", questions[currentQuestion]);

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
          <Dialog.Panel className="w-[screen] h-[screen] max-w-md transform overflow-hidden rounded-2xl bg-white">
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
                    <p className="text-sm text-gray-500">
                      {questions[currentQuestion].text}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:px-6">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleOptionClick(option)}
                  className="inline-flex w-full justify-center rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
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
    </>
  ) 
}

export default Modal
