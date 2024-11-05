let tasks = [];

function showNewTaskModal() {
    document.getElementById('newTaskModal').style.display = 'block';
}

function hideNewTaskModal() {
    document.getElementById('newTaskModal').style.display = 'none';
}

function renderTasks() {
    const taskGrid = document.getElementById('taskGrid');
    taskGrid.innerHTML = '';

    tasks.forEach(task => {
        const taskCard = document.createElement('div');
        taskCard.className = 'task-card';
        taskCard.innerHTML = `
            <div class="task-header">
                <h3>${task.title}</h3>
                <span class="task-status status-${task.status}">${task.status}</span>
            </div>
            <p>${task.description}</p>
            <div class="task-details">
                <p><strong>Responsável:</strong> ${task.assignee}</p>
                <p><strong>Prazo:</strong> ${moment(task.dueDate).format('DD/MM/YYYY')}</p>
                <p><strong>Prioridade:</strong> ${task.priority}</p>
            </div>
            <div class="comments">
                <h4>Comentários (${task.comments.length})</h4>
                ${task.comments.map(comment => `
                    <div class="comment">
                        <strong>${comment.user}</strong>: ${comment.text}
                        <small>${moment(comment.date).format('DD/MM/YYYY')}</small>
                    </div>
                `).join('')}
            </div>
        `;
        taskGrid.appendChild(taskCard);
    });
}

function addTask(task) {
    tasks.push({
        id: tasks.length + 1,
        ...task,
        status: 'pending',
        comments: []
    });
    renderTasks();
}

document.getElementById('newTaskForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newTask = {
        title: formData.get('title'),
        description: formData.get('description'),
        assignee: formData.get('assignee'),  // agora você pode alterar o nome aqui
        dueDate: formData.get('dueDate'),
        priority: formData.get('priority')
    };
    addTask(newTask);
    hideNewTaskModal();
});

document.addEventListener('DOMContentLoaded', () => {
    renderTasks();
});
