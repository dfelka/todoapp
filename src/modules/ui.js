import { storage_name, storage, storageGroup } from "..";
import { checkboxTaskEvent, dateTaskEvent, deleteTaskBtnEvent, editTaskEvent, optionsTaskEvent } from "./events";
import { getSelectedPage } from "./page";

export function createTaskUI(task) {
    const taskDivMain = document.createElement('div');
    taskDivMain.id = task.id;
    taskDivMain.classList.add('task');

    const taskTitle = document.createElement('div');    
    taskTitle.textContent = `${task.title}`;
    taskTitle.id = `title${task.id}`
    taskTitle.classList.add('taskTitle');

    const taskDelBtn = document.createElement('button');
    taskDelBtn.id = `del${task.id}`;
    taskDelBtn.classList.add('btnDelete')

    const taskCheckBtnComplete = document.createElement('input');
    taskCheckBtnComplete.id = `check${task.id}`;
    taskCheckBtnComplete.type = 'checkbox';
    if (task.completed === true) {
        taskCheckBtnComplete.checked = true
    }
    else {
        taskCheckBtnComplete.checked = false;
    }

    const taskPriorityLabel = document.createElement('label');
    taskPriorityLabel.setAttribute('for', `dropdown${task.id}`);
    taskPriorityLabel.textContent = 'priority:';

    const taskPriorityDropdown = document.createElement('select');
    taskPriorityDropdown.id = `dropdown${task.id}`
    taskPriorityDropdown.classList.add('taskPriority')

    const taskPriorityOptionNormal = document.createElement('option');
    taskPriorityOptionNormal.textContent = 'normal';
    const taskPriorityOptionHigh = document.createElement('option');
    taskPriorityOptionHigh.textContent = 'high';
    const taskPriorityOptionUrgent = document.createElement('option');
    taskPriorityOptionUrgent.textContent = 'urgent';

    taskPriorityDropdown.appendChild(taskPriorityOptionNormal)
    taskPriorityDropdown.appendChild(taskPriorityOptionHigh)
    taskPriorityDropdown.appendChild(taskPriorityOptionUrgent)

    const date = task.dueDate
    const taskDate = document.createElement('input');
    taskDate.setAttribute('type', 'date');
    taskDate.setAttribute('id', `date${task.id}`);
    taskDate.setAttribute('value', date);
    taskDate.classList.add('taskDate')

    const taskEditBtn = document.createElement('button');
    taskEditBtn.id = `edit${task.id}`;
    taskEditBtn.classList.add('taskBtnEdit');

    const taskDescription = document.createElement('div');
    taskDescription.textContent = `${task.description}`;
    taskDescription.id = `desc${task.id}`
    taskDescription.classList.add('description');

    const taskCheckBtn = document.createElement('div');
    taskCheckBtn.classList.add('taskCheckBtn')

    const taskRow3 = document.createElement('div');
    taskRow3.classList.add('taskRow3')
    const taskRow1 = document.createElement('div');
    const taskRow2 = document.createElement('div');
    const taskDivSub = document.createElement('div');
    taskDivSub.classList.add('taskDiv')
    const taskDivButtons = document.createElement('div');
    taskDivButtons.id = 'buttons'
    const taskDivRow = document.createElement('div');

    const taskGroupLabel = document.createElement('label');
    taskGroupLabel.setAttribute('for', `group${task.id}`);
    const taskGroupParagraph = document.createElement('p');

    if (getSelectedPage().name === storage_name) {
        storageGroup.forEach(element => {
            if ((element.gName + element.gId) === task.group) {
                taskGroupLabel.textContent = 'project:';
                taskGroupParagraph.textContent = element.gName;
            }
        });
    }
    
    taskCheckBtn.appendChild(taskCheckBtnComplete);
    taskRow1.appendChild(taskTitle);
    taskDivRow.appendChild(taskDate);
    taskDivRow.appendChild(taskPriorityLabel);
    taskDivRow.appendChild(taskPriorityDropdown);
    taskDivRow.appendChild(taskGroupLabel);
    taskDivRow.appendChild(taskGroupParagraph);
    taskDivButtons.appendChild(taskEditBtn)
    taskDivButtons.appendChild(taskDelBtn);
    taskRow2.appendChild(taskDescription);
    taskDivMain.appendChild(taskCheckBtn)
    taskDivSub.appendChild(taskRow1)
    taskDivSub.appendChild(taskRow2)
    taskDivSub.appendChild(taskRow3)
    taskDivMain.appendChild(taskDivSub);
    taskRow3.appendChild(taskDivRow);
    taskRow3.appendChild(taskDivButtons);

    document.getElementById('taskbar').insertBefore(taskDivMain, document.getElementById('taskAddBtn'))

    if (task.completed === true) {
        document.getElementById(`${task.id}`).style.opacity = '50%';
    }
}

export function deleteTaskUI(task) {
    document.getElementById(`${task.id}`).remove();
}

export function createProjectUI(name, id) {
    const div = document.createElement('div');
    div.id = id;
    div.classList.add('project');
    const tag = document.createElement('h2');
    tag.textContent = '#';

    const group = document.createElement('div');
    group.classList.add('projectTag')

    const h2 = document.createElement('h2');
    h2.textContent = name;
    const btnDel = document.createElement('button');
    btnDel.id = `delProj${id}`;
    btnDel.classList.add('btnDelProj');

    group.appendChild(tag);
    group.appendChild(h2);
    div.appendChild(group);
    div.appendChild(btnDel);

    document.getElementById('sidebar').insertBefore(div, document.getElementById('projectAddBtn'));

    function getRandomColor() {
        const hue = Math.floor(Math.random() * 360);
        const saturation = Math.floor(Math.random() * 41) + 40;
        const lightness = Math.floor(Math.random() * 21) + 60;
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    }
    tag.style.color = getRandomColor();
}

export function deleteProjectUI(id) {
    document.getElementById(`${id}`).remove();
}

export function addAllTasksUI() {
    for (let index = 0; index < Object.keys(storage).length; index++) {
        storage[Object.keys(storage)[index]].forEach(element => {
            createTaskUI(element);
            deleteTaskBtnEvent(element);
            checkboxTaskEvent(element);
            optionsTaskEvent(element);
            dateTaskEvent(element)
            editTaskEvent(element)
        });
    }
}

export function removeAllTasksUI() {
    document.querySelectorAll('.task').forEach(element => {
        element.remove();
    });
}

export function addProjectTasksUI(name, id) {
    storage[`${name}${id}`].forEach(element => {
        createTaskUI(element);
        checkboxTaskEvent(element);
        deleteTaskBtnEvent(element);
        optionsTaskEvent(element);
        dateTaskEvent(element)
        editTaskEvent(element)
    });
}