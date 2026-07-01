import { storage_id, storage_name } from "../index";
import { createEditTaskForm, createProjectForm, createAddTaskForm, deleteTaskForm } from "./forms";
import { createTask, deleteTask } from "./task";
import { createProject, deleteProject } from "./project";
import { getSelectedPage, reloadPage } from "./page";
import { removeAllTasksUI } from "./ui";
import { hideAddTaskButton, showAddTaskButton } from "./buttons";


export function setupEvents() {
    addProjectBtnEvent();
    addTaskBtnEvent();
    allTasksEvent();
}

export function addProjectBtnEvent() {
    const addBtnProj = document.getElementById('projectAddBtn');
    addBtnProj.addEventListener('click', () => {
        if (!document.getElementById('projectForm')) {
            createProjectForm();
            addProjectFormEvent();
        }
    });
}

export function addProjectFormEvent() {
    document.getElementById('projectForm').addEventListener('submit', function (event) {
        event.preventDefault();
        const inputName = document.getElementById('formProject').value;
        const createProj = createProject(inputName);
        deleteProjectForm();
    });

    document.getElementById('projectForm').addEventListener('reset', function (event) {
        event.preventDefault();
        deleteProjectForm();
    });
}

export function deleteProjectForm() {
    document.getElementById('projectForm').remove();
}

export function deleteAddProjectBtn() {
    const delBtn = document.getElementById('projectAddBtn');
    delBtn.remove();
    document.getElementById('sidebar').appendChild(button);
}

export function addTaskBtnEvent() {
    const addBtnTask = document.getElementById('taskAddBtn');
    addBtnTask.addEventListener('click', () => {
        if (!document.getElementById('taskForm')) {
            createAddTaskForm();
            addTaskFormEvent();
            hideAddTaskButton();
        }
    });
}

export function addTaskFormEvent() {
    document.getElementById('taskForm').addEventListener('submit', function (event) {
        event.preventDefault();
        if (!document.getElementById('taskform')) {
            const inputGroup = getSelectedPage().name + getSelectedPage().id;
            const inputTitle = document.getElementById('formAddTaskTitle').value;
            const inputDescription = document.getElementById('formAddTaskDesc').value;
            const inputDueDate = document.getElementById('formAddTaskDate').value;
            const task = createTask(inputTitle, inputDescription, inputGroup, inputDueDate);
            deleteTaskForm();
            showAddTaskButton();
        }
    });

    document.getElementById('taskForm').addEventListener('reset', function (event) {
        event.preventDefault();
        deleteTaskForm();
        showAddTaskButton();
    });
}

export function deleteTaskBtnEvent(task) {

    document.getElementById(`del${task.id}`).addEventListener('click', () => {
        deleteTask(task);
    })
}

export function checkboxTaskEvent(task) {
    const buttonComplete = document.getElementById(`check${task.id}`);
    buttonComplete.addEventListener('click', () => {

        if (buttonComplete.checked === true) {
            task.completed = true;
            reloadPage(getSelectedPage().name, getSelectedPage().id);
        }
        else {
            task.completed = false;
            reloadPage(getSelectedPage().name, getSelectedPage().id);
        }
    })
}

export function deleteProjectBtnEvent(name, id) {
    document.getElementById(`delProj${id}`).addEventListener('click', () => {
        deleteProject(name, id);
    });

    document.getElementById(`${id}`).addEventListener('click', function (event) {
        if (event.target.tagName === 'H2') {
            reloadPage(name, id);
        }
    });
}

export function allTasksEvent() {
    reloadPage(storage_name, storage_id);
    const tasks = document.getElementById(storage_id);

    tasks.addEventListener('click', function (event) {
        if (event.target.tagName === 'H1' || event.target.tagName === 'svg') {
            removeAllTasksUI();
            reloadPage(storage_name, storage_id);
        }
    });
}

export function optionsTaskEvent(task) {
    const dropdown = document.getElementById(`dropdown${task.id}`);
    dropdown.querySelectorAll('option').forEach(element => {
        if (element.textContent === task.priority) {
            element.selected = task.priority;
            if (element.textContent === 'normal') {
                document.getElementById(`check${task.id}`).classList.add('taskCheckBtn-normal');
            }
            if (element.textContent === 'high') {
                document.getElementById(`check${task.id}`).classList.add('taskCheckBtn-high');
            }
            if (element.textContent === 'urgent') {
                document.getElementById(`check${task.id}`).classList.add('taskCheckBtn-urgent');
            }
        }
    });

    dropdown.addEventListener('change', function (event) {
        task.priority = event.target.value;
        reloadPage(getSelectedPage().name, getSelectedPage().id);
    });
}

export function dateTaskEvent(task) {
    const taskDate = document.getElementById(`date${task.id}`);
    taskDate.addEventListener('change', (event) => {
        task.dueDate = event.target.value;
        reloadPage(getSelectedPage().name, getSelectedPage().id);
    })
}

export function editTaskEvent(task) {
    const editBtn = document.getElementById(`edit${task.id}`).addEventListener('click', () => {

        const taskForm = document.getElementsByTagName('form');

        if (!taskForm.length > 0) {
            hideAddTaskButton();
            createEditTaskForm(task);
            document.getElementById(`taskForm${task.id}`).addEventListener('submit', function (event) {
                event.preventDefault();
                const inputTitle = document.getElementById(`formAddTaskTitle${task.id}`).value;
                task.title = inputTitle;
                const inputDescription = document.getElementById(`formAddTaskDesc${task.id}`).value;
                task.description = inputDescription;
                document.getElementById(`taskForm${task.id}`).remove();
                reloadPage(getSelectedPage().name, getSelectedPage().id);
            });

            document.getElementById(`taskForm${task.id}`).addEventListener('reset', function (event) {
                event.preventDefault();
                document.getElementById(`taskForm${task.id}`).remove();
                showAddTaskButton();
            });
        }
    });
}