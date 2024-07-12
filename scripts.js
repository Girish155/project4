document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    // Load tasks from local storage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const renderTasks = () => {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;
            taskItem.innerHTML = `
                <input type="checkbox" ${task.completed ? 'checked' : ''} data-index="${index}">
                <span contenteditable="true">${task.name}</span>
                <button data-action="delete" data-index="${index}">Delete</button>
            `;
            taskList.appendChild(taskItem);
        });
    };

    const addTask = (taskName) => {
        tasks.push({ name: taskName, completed: false });
        saveTasks();
        renderTasks();
    };

    const deleteTask = (index) => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    };

    const toggleTaskCompletion = (index) => {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    };

    const editTask = (index, newName) => {
        tasks[index].name = newName;
        saveTasks();
        renderTasks();
    };

    addTaskBtn.addEventListener('click', () => {
        const taskName = taskInput.value.trim();
        if (taskName) {
            addTask(taskName);
            taskInput.value = '';
        }
    });

    taskList.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const index = e.target.dataset.index;
            deleteTask(index);
        }
    });

    taskList.addEventListener('change', (e) => {
        if (e.target.tagName === 'INPUT' && e.target.type === 'checkbox') {
            const index = e.target.dataset.index;
            toggleTaskCompletion(index);
        }
    });

    taskList.addEventListener('input', (e) => {
        if (e.target.tagName === 'SPAN') {
            const index = Array.from(taskList.children).indexOf(e.target.parentElement);
            editTask(index, e.target.textContent.trim());
        }
    });

    renderTasks();
});
