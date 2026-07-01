import {storage_id, storage_name, storage, storageGroup} from "../index";
import { createProjectUI,deleteProjectUI, removeAllTasksUI } from "./ui";
import { v4 as uuidv4 } from 'uuid';
import { allTasksEvent, deleteProjectBtnEvent } from "./events";

export function createProject(name, id) {
    const temp = {};
    if (id) {
        storage[`${name}${id}`] = [];
        temp.name = name;        
        temp.id = id;
    }
    else {
        const id = uuidv4();
        storage[`${name}${id}`] = [];
        temp.name = name;
        temp.id = id;
    }
    const gItem = {
    gName : temp.name,
    gId: temp.id}
    storageGroup.push(gItem);
    localStorage.setItem(`groupNames`, JSON.stringify(storageGroup));    
    localStorage.setItem(`${storage_name}${storage_id}`, JSON.stringify(storage));
    createProjectUI(temp.name, temp.id);
    deleteProjectBtnEvent(temp.name, temp.id);
    return temp;
}

export function deleteProject(name, id) {
    delete storage[`${name}${id}`];
    for (let index = 0; index < storageGroup.length; index++) {
        if (storageGroup[index].gId === id) {
            storageGroup.splice(index, 1)
        };
    }
    deleteProjectUI(id);
    removeAllTasksUI();
    localStorage.setItem(`groupNames`, JSON.stringify(storageGroup));
    localStorage.setItem(`${storage_name}${storage_id}`, JSON.stringify(storage));
    allTasksEvent('click');
}