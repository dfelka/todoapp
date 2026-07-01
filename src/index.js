import "./styles.css";
import { initializePage } from "./modules/page";
import { addProjectBtn, addTaskButton } from "./modules/buttons";
import { addProjectBtnEvent, addTaskBtnEvent, allTasksEvent, deleteProjectBtnEvent } from "./modules/events";
import { createProjectUI } from "./modules/ui";

export let storage = {};
export let storageGroup;

export let storage_name;
export let storage_id;

if (localStorage.getItem('inboxb929b1e3-9ac3-452e-bf32-e6a29758b007')) {
    const name = 'inbox';
    const id = 'b929b1e3-9ac3-452e-bf32-e6a29758b007';
    let item = localStorage.getItem(name + id)
    storage = JSON.parse(item);
    storage_name = name;
    storage_id = id;

    let groupData = localStorage.getItem('groupNames')
    if (groupData === '[]') {
        storageGroup = [];
    }
    else {
        storageGroup = JSON.parse(groupData);
    }
} else {
    const name = 'inbox';
    const id = 'b929b1e3-9ac3-452e-bf32-e6a29758b007';
    storage[`${name}${id}`] = [];
    storageGroup = [];
    storageGroup[`groupNames`] = [];
    storage_name = name;
    storage_id = id;
    localStorage.setItem(`groupNames`, JSON.stringify(storageGroup));
    localStorage.setItem(`${storage_name}${storage_id}`, JSON.stringify(storage));
}

export function loadProjects(groupData) {
    groupData = JSON.parse(localStorage.getItem('groupNames'));
    if (groupData) {
        groupData.forEach(element => {
            createProjectUI(element.gName, element.gId);
            deleteProjectBtnEvent(element.gName, element.gId);
        });
    }
}

initializePage();
addProjectBtn();
addProjectBtnEvent();
addTaskButton();
addTaskBtnEvent();
allTasksEvent();
loadProjects(storageGroup);