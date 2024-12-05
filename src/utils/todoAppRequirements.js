const todoAppRequirements = {
  steps: [
    {
      id: 1,
      name: 'Basic HTML Structure',
      description: 'Create the basic HTML structure with a form, input, and todo list',
      requiredElements: ['form', 'input[type="text"]', 'button[type="submit"]', 'ul.todo-list'],
      hint: `<div class="todo-container">
  <form id="todo-form">
    <input type="text" id="todo-input" placeholder="Add a new todo">
    <button type="submit">Add Todo</button>
  </form>
  <ul class="todo-list"></ul>
</div>`
    },
    {
      id: 2,
      name: 'Add Todo Function',
      description: 'Create the addTodo function to handle form submission',
      functionName: 'addTodo',
      requiredFeatures: ['preventDefault', 'createElement', 'appendChild'],
      hint: `function addTodo(e) {
  e.preventDefault();
  const todoText = todoInput.value;
  // Create new todo item
  // Add to list
  // Clear input
}`
    },
    {
      id: 3,
      name: 'Delete Todo Function',
      description: 'Add ability to delete todos',
      functionName: 'deleteTodo',
      requiredFeatures: ['remove', 'parentElement'],
      hint: `function deleteTodo(e) {
  const todoItem = e.target.parentElement;
  todoItem.remove();
}`
    },
    {
      id: 4,
      name: 'Toggle Complete Function',
      description: 'Add ability to mark todos as complete',
      functionName: 'toggleComplete',
      requiredFeatures: ['classList.toggle'],
      hint: `function toggleComplete(e) {
  const todoItem = e.target.parentElement;
  todoItem.classList.toggle('completed');
}`
    },
    {
      id: 5,
      name: 'Local Storage',
      description: 'Save and load todos from localStorage',
      functionNames: ['saveTodos', 'loadTodos'],
      requiredFeatures: ['localStorage.setItem', 'localStorage.getItem', 'JSON.stringify', 'JSON.parse'],
      hint: `function saveTodos() {
  const todoList = document.querySelector('.todo-list');
  const todos = [...todoList.children].map(todo => ({
    text: todo.querySelector('span').textContent,
    completed: todo.classList.contains('completed')
  }));
  localStorage.setItem('todos', JSON.stringify(todos));
}`
    }
  ],
  validationRules: {
    addTodo: (code) => {
      return {
        valid: code.includes('addEventListener') && code.includes('preventDefault'),
        feedback: 'Todo addition should use event listener and prevent default form submission'
      }
    },
    localStorage: (code) => {
      return {
        valid: code.includes('localStorage.setItem') && code.includes('localStorage.getItem'),
        feedback: 'Remember to use localStorage to persist todos'
      }
    }
  }
};

export default todoAppRequirements; 