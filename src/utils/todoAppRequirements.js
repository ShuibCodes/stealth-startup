const todoAppRequirements = {
  steps: [
    {
      id: 1,
      name: 'Basic HTML Structure - Input',
      description: 'Create an input field and add button. The input MUST have id="todo-input" and the button must have id="add-todo-btn"',
      requiredElements: ['input#todo-input[type="text"]', 'button#add-todo-btn'],
      hint: `<div class="todo-container">
  <input type="text" id="todo-input" placeholder="Add a new todo">
  <button id="add-todo-btn">Add Todo</button>
</div>`
    },
    {
      id: 2,
      name: 'Basic HTML Structure - List',
      description: 'Add a list to hold the todos in the todo-container.This should be a ul with a class of "todo-list"',
      requiredElements: ['ul.todo-list'],
      hint: ` <ul class="todo-list">
    <!-- Todo items will go here -->
  </ul>`
    },
    {
      id: 3,
      name: 'Add Todo Function - Setup',
      description: 'Create the addTodo function and set it as the onclick handler for the add button.',
      functionName: 'addTodo',
      requiredFeatures: ['function addTodo', 'getElementById("todo-input")'],
      hint: `function addTodo() {
  const todoInput = document.getElementById('todo-input');
}

document.getElementById('add-todo-btn').onclick = addTodo;`
    },
    {
      id: 4,
      name: 'Add Todo Function - Create Elements',
      description: 'Create new todo item elements',
      functionName: 'addTodo',
      requiredFeatures: [
        'createElement',
        'createElement("span")',
        'todoContent',
        'textContent',
        'todoInput.value'
      ],
      needsTodoContent: true,
      hint: `// Inside addTodo function:
const todoDiv = document.createElement('div');
todoDiv.classList.add('todo-item');
const todoContent = document.createElement('span');
todoContent.textContent = todoInput.value;`
    },
    {
      id: 5,
      name: 'Add Todo Function - Add Delete Button',
      description: 'Add delete button to todo item',
      functionName: 'addTodo',
      requiredFeatures: [
        'createElement("button")',
        'appendChild',
        'delete-btn'
      ],
      hint: `// Inside addTodo function:
const deleteBtn = document.createElement('button');
deleteBtn.innerHTML = '×';
deleteBtn.classList.add('delete-btn');

todoDiv.appendChild(todoContent);
todoDiv.appendChild(deleteBtn);`
    },
    {
      id: 6,
      name: 'Setup Delete Button Click Handler',
      description: 'Add onclick handler to the delete button',
      functionName: 'addTodo',
      requiredFeatures: [
        'onclick',
        'deleteTodo'
      ],
      hint: `// Inside addTodo function, after creating button:
deleteBtn.onclick = deleteTodo;`
    },
    {
      id: 7,
      name: 'Delete Function',
      description: 'Create the delete function to remove todo items',
      functionName: 'deleteTodo',
      requiredFeatures: [
        'function deleteTodo',
        'parentElement',
        'remove'
      ],
      hint: `function deleteTodo() {
  const todoItem = this.parentElement;
  todoItem.remove();
}`
    }
  ]
};

export default todoAppRequirements; 