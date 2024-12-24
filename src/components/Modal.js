'use client'

import React, { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

const Modal = ({ onCodeSelect }) => {
  const [isOpen, setIsOpen] = useState(true)
  const [currentQuestion, setCurrentQuestion] = useState(0)

  const questions = [
    {
      title: "Question 1",
      text: "What is your favorite programming language?",
      options: ["A", "B", "C"]
    },
    {
      title: "Question 2",
      text: "How many years of experience do you have?",
      options: ["A", "B", "C"]
    },
  ]

  const handleOptionClick = (option) => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setIsOpen(false)
    }
  }

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-[1200px] h-[400px] max-w-md transform overflow-hidden rounded-2xl bg-gray-800">
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
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="inline-flex w-full justify-center rounded-md bg-green-400 px-5 py-2 text-sm font-semibold text-black shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
              >
                Run 
              </button>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  ) 
}

export default Modal
