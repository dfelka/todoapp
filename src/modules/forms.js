import { format } from "date-fns";

export function createAddTaskForm() {
    const form = document.createElement('form');
    form.id = 'taskForm';
    const labelTitle = document.createElement('label');
    labelTitle.setAttribute('for', 'formAddTaskTitle');
    labelTitle.textContent = 'Title:';

    const inputTitle = document.createElement('input');
    inputTitle.type = 'text';
    inputTitle.id = 'formAddTaskTitle';
    inputTitle.name = 'formAddTaskTitle';
    inputTitle.required = true;    

    const labelDesc = document.createElement('label');
    labelDesc.setAttribute('for', 'formAddTaskDesc');
    labelDesc.textContent = 'Description:';

    const inputDesc = document.createElement('input');
    inputDesc.type = 'text';
    inputDesc.id = 'formAddTaskDesc';
    inputDesc.name = 'formAddTaskDesc';

    const accept = document.createElement('button');
    accept.type = 'submit';
    accept.textContent = 'accept';

    const deny = document.createElement('button');
    deny.type = 'reset';
    deny.textContent = 'deny';

    const today = new Date();
    const formattedDate = format(today, 'yyyy-MM-dd');

    const inputDate = document.createElement('input');
    inputDate.setAttribute('type', 'date');
    inputDate.setAttribute('id', 'formAddTaskDate');
    inputDate.setAttribute('value', formattedDate);

    const div = document.createElement('div');
    div.appendChild(accept);
    div.appendChild(deny);
    
    form.appendChild(labelTitle);
    form.appendChild(inputTitle);
    form.appendChild(labelDesc);
    form.appendChild(inputDesc);
    form.appendChild(inputDate);
    form.appendChild(div);

    document.getElementById('taskbar').appendChild(form);
}

export function deleteTaskForm() {
    document.getElementById('taskForm').remove();
}


export function createProjectForm() {
    const form = document.createElement('form');
    form.id = 'projectForm';

    const labelProject = document.createElement('label');
    labelProject.setAttribute('for', 'formProject');
    labelProject.textContent = 'Name:';

    const inputProject = document.createElement('input');
    inputProject.type = 'text';
    inputProject.id = 'formProject';
    inputProject.name = 'formProject';
    inputProject.required = true;

    const div = document.createElement('div')

    const accept = document.createElement('button');
    accept.type = 'submit';
    accept.textContent = 'accept';

    const deny = document.createElement('button');
    deny.type = 'reset';
    deny.textContent = 'deny';
    
    form.appendChild(labelProject);
    form.appendChild(inputProject);
    div.appendChild(accept)
    div.appendChild(deny)
    form.appendChild(div)

    document.getElementById('sidebar').insertBefore(form, document.getElementById('projectAddBtn'));
}

export function createEditTaskForm(task) {
    const form = document.createElement('form');
    form.id = `taskForm${task.id}`;    
    form.classList.add('taskForm');

    const labelTitle = document.createElement('label');
    labelTitle.setAttribute('for', `formAddTaskTitle${task.id}`);
    labelTitle.textContent = 'Title:';

    const inputTitle = document.createElement('input');
    inputTitle.type = 'text';
    inputTitle.id = `formAddTaskTitle${task.id}`;
    inputTitle.name = `formAddTaskTitle${task.id}`;
    inputTitle.value = task.title;
    inputTitle.required = true;

    const labelDesc = document.createElement('label');
    labelDesc.setAttribute('for', `formAddTaskDesc${task.id}`);
    labelDesc.textContent = 'Description:';

    const inputDesc = document.createElement('input');
    inputDesc.type = 'text';
    inputDesc.id = `formAddTaskDesc${task.id}`;
    inputDesc.name = `formAddTaskDesc${task.id}`;
    inputDesc.value = task.description;

    const accept = document.createElement('button');
    accept.type = 'submit';
    accept.textContent = 'accept';

    const deny = document.createElement('button');
    deny.type = 'reset';
    deny.textContent = 'deny';

    const div = document.createElement('div')
    div.appendChild(accept)
    div.appendChild(deny)
    
    form.appendChild(labelTitle);
    form.appendChild(inputTitle);
    form.appendChild(labelDesc);
    form.appendChild(inputDesc);
    form.appendChild(div);    

    document.getElementById(`${task.id}`).insertAdjacentElement('afterend', form);
}
