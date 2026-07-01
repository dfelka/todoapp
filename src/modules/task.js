import { storage_id, storage_name, storage } from '../index';
import { v4 as uuidv4 } from 'uuid';
import { createTaskUI, deleteTaskUI } from "./ui";
import { dateTaskEvent, deleteTaskBtnEvent, editTaskEvent, optionsTaskEvent, checkboxTaskEvent } from "./events";


class Task {
    constructor({ title, description = '', group = '', completed = false, dueDate = null, priority = 'normal', }) {
        this.id = uuidv4();
        this.title = title;
        this.description = description;
        this.completed = completed;
        this.dueDate = dueDate;
        this.priority = priority;
        this.group = group;
    }
}

export function createTask(inputTitle, inputDescription, inputGroup, inputDueDate, inputCompleted, inputPriority) {
    const newTask = new Task({ title: inputTitle, description: inputDescription, group: inputGroup, completed: inputCompleted, priority: inputPriority, dueDate: inputDueDate });
    pushTask(newTask);
    createTaskUI(newTask);
    deleteTaskBtnEvent(newTask);
    checkboxTaskEvent(newTask);
    optionsTaskEvent(newTask);
    dateTaskEvent(newTask);
    editTaskEvent(newTask);
    return newTask;
}

function pushTask(newTask) {
    if (newTask.group === `${storage_name}${storage_id}`) {
        newTask.group = `${storage_name}${storage_id}`
        storage[`${storage_name}${storage_id}`].push(newTask);
        localStorage.setItem(`${storage_name}${storage_id}`, JSON.stringify(storage));

    }
    else {
        const keyToFind = newTask.group;
        if (keyToFind in storage) {
            storage[`${newTask.group}`].push(newTask);
        }
        localStorage.setItem(`${storage_name}${storage_id}`, JSON.stringify(storage));
    }
}


export function deleteTask(task) {
    const groupToFind = task.group;
    if (groupToFind in storage) {
        storage[groupToFind].forEach((element, index) => {
            if (element.id === task.id) {
                storage[groupToFind].splice(index, 1);
            }
        });
    }
    localStorage.setItem(`${storage_name}${storage_id}`, JSON.stringify(storage));
    deleteTaskUI(task);
}