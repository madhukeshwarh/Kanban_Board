document.addEventListener('DOMContentLoaded', function() {
    loadTasksFromLocalStorage();
  });
  
  function addTask(columnId) {
    const title = prompt('Enter task title:');
    if (title) {
      const column = document.getElementById(columnId + '-column');
      const taskElement = document.createElement('div');
      taskElement.classList.add('task');
      
      // Create checkbox for task
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.classList.add('task-checkbox');
      taskElement.appendChild(checkbox);
      
      // Add task title
      const taskTitle = document.createElement('span');
      taskTitle.textContent = title;
      taskTitle.classList.add('task-title');
      taskElement.appendChild(taskTitle);
      
      column.appendChild(taskElement);
      saveTasksToLocalStorage();
    }
  }
  
  function deleteSelectedTasks() {
    const tasks = document.querySelectorAll('.task');
    tasks.forEach(task => {
      const checkbox = task.querySelector('.task-checkbox');
      if (checkbox.checked) {
        task.remove();
      }
    });
    saveTasksToLocalStorage();
  }
  
  function saveTasksToLocalStorage() {
    const tasks = [];
    document.querySelectorAll('.task').forEach(task => {
      const columnId = task.parentElement.id.replace('-column', '');
      const title = task.querySelector('.task-title').textContent;
      tasks.push({ title: title, column: columnId });
    });
    localStorage.setItem('kanban_tasks', JSON.stringify(tasks));
  }
  
  function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('kanban_tasks')) || [];
    tasks.forEach(task => {
      const column = document.getElementById(task.column + '-column');
      const taskElement = document.createElement('div');
      taskElement.classList.add('task');
      
      // Create checkbox for task
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.classList.add('task-checkbox');
      taskElement.appendChild(checkbox);
      
      // Add task title
      const taskTitle = document.createElement('span');
      taskTitle.textContent = task.title;
      taskTitle.classList.add('task-title');
      taskElement.appendChild(taskTitle);
      
      column.appendChild(taskElement);
    });
  }