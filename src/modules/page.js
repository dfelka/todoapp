import { storage_id, storage_name, storage } from "../index";
import { addTaskButton, showAddTaskButton, themeToggle } from "./buttons";
import { addTaskBtnEvent } from "./events";
import { addAllTasksUI, removeAllTasksUI, addProjectTasksUI } from "./ui";
import logoPath from './icons/logo.png';

let selectedPage = {}

export function setSelectedPage(name, id) {
    selectedPage.name = name;
    selectedPage.id = id;
}

export function getSelectedPage() {
    return selectedPage;
}

export function initializePage() {

    function createHeader() {
        const divA = document.createElement('div');
        divA.id = 'userName'
        const divB = document.createElement('div');
        const div1 = document.createElement('div');
        div1.id = 'headerUser'
        const div2 = document.createElement('div');
        const div1img = document.createElement('div');
        div1img.id = 'headerUserImg';
        const div1text = document.createElement('p');
        div1text.textContent = 'user';

        const svgArrow = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svgArrow.id = 'headerUserArrow';

        const divSvgArrow = document.createElement('div');
        divSvgArrow.appendChild(svgArrow);

        const svgNotification = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svgNotification.id = 'headerUserNotification';

        const svgSettings = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svgSettings.id = 'headerUserSettings';
                              
        const divSvgNotification = document.createElement('div');
        divSvgNotification.append(svgNotification);
        const divSvgSettings = document.createElement('div');
        divSvgSettings.append(svgSettings);
        
        // div1.appendChild(div1img);
        // div1.appendChild(div1text);
        // div1.appendChild(divSvgArrow);
        
        // div2.appendChild(divSvgNotification);
        // div2.appendChild(divSvgSettings);
        
        // divA.appendChild(div1);
        // divA.appendChild(div2);

        const logo = document.createElement('img');   
        logo.src = logoPath;

        const divText = document.createElement('div');
        divText.textContent = 'todoapp'
        divText.id = 'title'

        divA.appendChild(logo);
        divA.appendChild(divText);

        document.querySelector('header').appendChild(divA);
        document.querySelector('header').appendChild(divB);        
    }

    function createSidebar() {
        const div = document.createElement('div');
        div.id = 'sidebar';
        document.getElementById('content').appendChild(div);    
    }

    function createAllTasks() {
        const div = document.createElement('div');        
        div.id = storage_id;
        div.classList.add('projectElement')

        const h1 = document.createElement('h1');        
        h1.textContent = 'inbox';
        
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.id = 'sidebarInboxIcon';
        
        div.appendChild(svg)
        div.appendChild(h1)        


        const h1MyProjects = document.createElement('h1');        
        h1MyProjects.id = 'projectMyProjects';
        h1MyProjects.textContent = 'my projects';       
        
        document.getElementById('sidebar').insertBefore(div, document.getElementById('projectAddBtn'));
        document.getElementById('sidebar').appendChild(h1MyProjects);
    }

    function createTaskbar() {
        const div = document.createElement('div');
        div.id = 'taskbar';
        document.getElementById('content').appendChild(div);
    }

    function createCurrentPage() {
        const h1 = document.createElement('h1');
        h1.id = 'currentPage';
        const currentPage = document.getElementById('taskbar').insertBefore(h1, document.getElementById('taskbar').firstChild);
    }

    function createFooter() {
        const footer = document.createElement('footer');
    }

    createHeader();
    createSidebar();
    createTaskbar();
    createCurrentPage();
    createAllTasks();
    createFooter();
    themeToggle();
}   

export function reloadPage(name, id) {
    
    if (name && id) {
            if (document.getElementById('taskForm')) {
                document.getElementById('taskForm').remove();
            }            
            setSelectedPage(name, id);
            const page = document.getElementById('currentPage').textContent = selectedPage.name
            removeAllTasksUI();
            const projectActive = document.getElementsByClassName('projectActive')

            for (let index = 0; index < projectActive.length; index++) {
                projectActive[index].classList.remove('projectActive');
            }

            if(name === storage_name) {
                addAllTasksUI();
                document.getElementById(storage_id).classList.add('projectActive');
            }
            else {
                addProjectTasksUI(name, id);
                document.getElementById(id).classList.add('projectActive');
            }
            if (!document.getElementById('taskAddBtn')) {
                addTaskButton();
                addTaskBtnEvent();                
            }
            showAddTaskButton();
            localStorage.setItem(`${storage_name}${storage_id}`, JSON.stringify(storage));
        }
}