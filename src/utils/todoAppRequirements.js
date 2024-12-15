const todoAppRequirements = {
  steps: [
    {
      id: 1,
      name: 'Basic HTML Structure - Form',
      description: 'Create a form with an input field and submit button',
      requiredElements: ['form', 'input[type="text"]', 'button[type="submit"]'],
      hint: `<form id="todo-form">
  <input type="text" id="todo-input" placeholder="Add a new todo">
  <button type="submit">Add Todo</button>
</form>`
    },
    {
      id: 2,
      name: 'Basic HTML Structure - List',
      description: 'Add a container and list to hold the todos',
      requiredElements: ['div.todo-container', 'ul.todo-list'],
      hint: `<div class="todo-container">
  <!-- Previous form here -->
  <ul class="todo-list">
    <!-- Todo items will go here -->
  </ul>
</div>`
    },
    {
      id: 3,
      name: 'Add Todo Function - Setup',
      description: 'Create the addTodo function and prevent form submission',
      functionName: 'addTodo',
      requiredFeatures: ['function addTodo', 'preventDefault'],
      hint: `function addTodo(e) {
  e.preventDefault();  // Prevent form from submitting
  const todoInput = document.getElementById('todo-input');
}`
    },
    {
      id: 4,
      name: 'Add Todo Function - Create Elements',
      description: 'Create new todo item elements',
      functionName: 'addTodo',
      requiredFeatures: [
        'createElement',
        'classList.add',
        'createElement("span")',
        'textContent',
        'todoInput.value'
      ],
      hint: `// Inside addTodo function:
const todoDiv = document.createElement('div');
todoDiv.classList.add('todo-item');

const todoContent = document.createElement('span');
todoContent.textContent = todoInput.value;`
    },
    {
      id: 5,
      name: 'Add Todo Function - Add Buttons',
      description: 'Add complete and delete buttons to todo item',
      functionName: 'addTodo',
      requiredFeatures: [
        'document.createElement("button")',
        'document.createElement(\'button\')',
        'appendChild'
      ],
      hint: `// Inside addTodo function:
const completeBtn = document.createElement('button');
completeBtn.innerHTML = '✓';
completeBtn.classList.add('complete-btn');

const deleteBtn = document.createElement('button');
deleteBtn.innerHTML = '×';
deleteBtn.classList.add('delete-btn');

todoDiv.appendChild(todoContent);
todoDiv.appendChild(completeBtn);
todoDiv.appendChild(deleteBtn);`
    },
    {
      id: 6,
      name: 'Delete Function - Setup',
      description: 'Create the delete function and identify clicked element',
      functionName: 'deleteTodo',
      requiredFeatures: ['function deleteTodo', 'target'],
      hint: `function deleteTodo(e) {
  const button = e.target;
  if (!button.classList.contains('delete-btn')) return;`
    },
    {
      id: 7,
      name: 'Delete Function - Remove Todo',
      description: 'Remove the todo item when delete is clicked',
      functionName: 'deleteTodo',
      requiredFeatures: ['parentElement', 'remove'],
      hint: `// Inside deleteTodo function:
const todoItem = button.parentElement;
todoItem.remove();`
    },
    {
      id: 8,
      name: 'Toggle Complete - Setup',
      description: 'Create the toggle function and identify clicked element',
      functionName: 'toggleComplete',
      requiredFeatures: ['function toggleComplete', 'classList.contains'],
      hint: `function toggleComplete(e) {
  const button = e.target;
  if (!button.classList.contains('complete-btn')) return;`
    },
    {
      id: 9,
      name: 'Toggle Complete - Add Style',
      description: 'Toggle the completed class on the todo item',
      functionName: 'toggleComplete',
      requiredFeatures: ['classList.toggle', 'completed'],
      hint: `// Inside toggleComplete function:
const todoItem = button.parentElement;
todoItem.classList.toggle('completed');`
    },
    {
      id: 10,
      name: 'Local Storage - Save Function',
      description: 'Create function to save todos to localStorage',
      functionName: 'saveTodos',
      requiredFeatures: ['localStorage.setItem', 'JSON.stringify'],
      hint: `function saveTodos() {
  const todoList = document.querySelector('.todo-list');
  const todos = [...todoList.children].map(todo => ({
    text: todo.querySelector('span').textContent,
    completed: todo.classList.contains('completed')
  }));
  localStorage.setItem('todos', JSON.stringify(todos));
}`
    },
    {
      id: 11,
      name: 'Local Storage - Load Function',
      description: 'Create function to load todos from localStorage',
      functionName: 'loadTodos',
      requiredFeatures: ['localStorage.getItem', 'JSON.parse'],
      hint: `function loadTodos() {
  const todos = JSON.parse(localStorage.getItem('todos')) || [];
  todos.forEach(todo => {
    // Create todo elements like in addTodo
    // Set completed class if todo.completed is true
  });
}`
    },
    {
      id: 12,
      name: 'Event Listeners',
      description: 'Add all necessary event listeners',
      requiredFeatures: ['addEventListener'],
      hint: `document.getElementById('todo-form')
  .addEventListener('submit', addTodo);

document.querySelector('.todo-list')
  .addEventListener('click', e => {
    deleteTodo(e);
    toggleComplete(e);
  });

// Load todos when page loads
document.addEventListener('DOMContentLoaded', loadTodos);`
    }
  ]
};

export default todoAppRequirements; 