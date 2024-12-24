import React, { useState, useEffect } from 'react';

const codeSteps = {
  initial: {
    question: "What would you like to add to your app?",
    choices: [
      { 
        text: "Add input field and button", 
        nextStep: "inputStyle",
        code: `<div class="flex gap-2 p-4">
  <input type="text" id="todo-input" placeholder="Add a new todo" class="px-4 py-2 rounded border">
  <button id="add-todo-btn" class="bg-blue-500 text-white px-4 py-2 rounded">Add Todo</button>
</div>`
      },
      { 
        text: "Add a list to show items", 
        nextStep: "listStyle",
        code: `<ul class="space-y-2 p-4" id="todo-list">
  <!-- Todo items will go here -->
</ul>`
      },
      { 
        text: "Add JavaScript to handle adding todos", 
        nextStep: "jsFunction",
        code: `function addTodo() {
  const todoInput = document.getElementById('todo-input');
  const todoList = document.getElementById('todo-list');
  
  const todoItem = document.createElement('li');
  todoItem.className = 'flex justify-between items-center p-2 bg-white rounded shadow';
  todoItem.textContent = todoInput.value;
  todoList.appendChild(todoItem);
  
  todoInput.value = '';
}`
      }
    ]
  },
  inputStyle: {
    question: "How would you like to style the input?",
    choices: [
      {
        text: "Simple and clean",
        nextStep: "initial",
        code: `<input type="text" id="todo-input" class="px-4 py-2 border rounded" placeholder="Add a new todo">`
      },
      {
        text: "Modern with shadow",
        nextStep: "initial",
        code: `<input type="text" id="todo-input" class="px-4 py-2 border-none rounded-lg shadow-lg focus:ring-2 focus:ring-blue-500" placeholder="Add a new todo">`
      }
    ]
  }
};

const CodePromptModal = ({ isOpen, onClose, onCodeSelect }) => {
  const [currentStep, setCurrentStep] = useState('initial');

  useEffect(() => {
    if (isOpen) {
      setCurrentStep('initial');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChoice = (choice) => {
    onCodeSelect(choice.code);
    if (choice.nextStep) {
      setCurrentStep(choice.nextStep);
    } else {
      setCurrentStep('initial');
      onClose();
    }
  };

  const currentStepData = codeSteps[currentStep] || codeSteps.initial;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-8 max-w-lg w-11/12 text-white">
        <h2 className="text-xl font-bold mb-6">
          {currentStepData.question}
        </h2>
        
        <div className="space-y-4">
          {currentStepData.choices.map((choice, index) => (
            <button
              key={index}
              onClick={() => handleChoice(choice)}
              className="w-full text-left p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors duration-200"
            >
              {choice.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CodePromptModal; 