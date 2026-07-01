export function setupButtons() {
    addTaskButton();
    addProjectBtn();
}

export function addTaskButton() {
    {
        const svgPlus = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        const div = document.createElement('button')
        div.id = 'taskAddBtn'

        const addTask = document.createElement('div');
        addTask.textContent = 'add task';

        div.append(svgPlus);
        div.append(addTask)

        document.getElementById('taskbar').appendChild(div);        
    }
}

export function addProjectBtn() {
    const svgPlus = document.createElementNS("http://www.w3.org/2000/svg", "svg");

    const btnAddProject = document.createElement('button');
    const div = document.createElement('div');
    div.textContent = 'add project';

    btnAddProject.id = 'projectAddBtn'
    btnAddProject.appendChild(svgPlus);

    btnAddProject.appendChild(div);
    document.getElementById('sidebar').appendChild(btnAddProject);
}

export function showAddTaskButton() {
    document.getElementById('taskAddBtn').style.display = 'flex';
}

export function hideAddTaskButton() {
    document.getElementById('taskAddBtn').style.display = 'none';
}

export function themeToggle() {

    const toggleMode = document.createElement('div');
    toggleMode.id = 'sidebarThemeToggle';

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.id = 'sidebarThemeToggle-switch';

    const label = document.createElement('label');
    label.setAttribute('for', 'sidebarThemeToggle-switch');

    const svgSun = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgSun.setAttribute("viewBox", "0 0 22 22");
    svgSun.setAttribute("width", "20px");
    svgSun.setAttribute("height", "20px");
    const svgSunPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    svgSunPath.setAttribute("fill", "#ffffff");
    svgSunPath.setAttribute("d", "m6.76 4.84l-1.8-1.79l-1.41 1.41l1.79 1.79zM1 10.5h3v2H1zM11 .55h2V3.5h-2zm8.04 2.495l1.408 1.407l-1.79 1.79l-1.407-1.408zm-1.8 15.115l1.79 1.8l1.41-1.41l-1.8-1.79zM20 10.5h3v2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6s6-2.69 6-6s-2.69-6-6-6m0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4s4 1.79 4 4s-1.79 4-4 4m-1 4h2v2.95h-2zm-7.45-.96l1.41 1.41l1.79-1.8l-1.41-1.41z");
    
    svgSun.appendChild(svgSunPath);

    const svgMoon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgMoon.setAttribute("viewBox", "0 0 16 16");
    svgMoon.setAttribute("width", "20px");
    svgMoon.setAttribute("height", "20px");
    const svgMoonPath = document.createElementNS("http://www.w3.org/2000/svg", "g");
    svgMoonPath.setAttribute("fill", "#ffffff");
    const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path1.setAttribute("d", "M6 .278a.77.77 0 0 1 .08.858a7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316a.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71C0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278");
    const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path2.setAttribute("d", "M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.73 1.73 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.73 1.73 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.73 1.73 0 0 0 1.097-1.097zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.16 1.16 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.16 1.16 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732z");
    
    svgMoonPath.appendChild(path1);
    svgMoonPath.appendChild(path2);
    svgMoon.appendChild(svgMoonPath);

    toggleMode.appendChild(svgSun);
    toggleMode.appendChild(input);
    toggleMode.appendChild(label);
    toggleMode.appendChild(svgMoon);

    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.remove('dark');
        document.body.classList.add('light');
        svgMoonPath.setAttribute("fill", "#5f5f5f");
        svgSunPath.setAttribute("fill", "#eaac00");
        input.checked = false;
    }
    else if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.remove('light');
        document.body.classList.add('dark');
        svgMoonPath.setAttribute("fill", "#c480ff");
        svgSunPath.setAttribute("fill", "#ffffff");
        input.checked = true;
    }
    else {
        localStorage.setItem('theme', 'dark');
        if (!document.body.classList.contains('light') && !document.body.classList.contains('dark')) {
            document.body.classList.add('dark');
        }
        svgMoonPath.setAttribute("fill", "#c480ff");
        svgSunPath.setAttribute("fill", "#ffffff");
        input.checked = true;
    }

    document.querySelector('footer').appendChild(toggleMode);

    const toggleButton = document.getElementById('sidebarThemeToggle');

    toggleButton.addEventListener('change', () => {
        if (document.body.classList.contains('light')) {
            document.body.classList.remove('light');
            document.body.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            svgMoonPath.setAttribute("fill", "#c480ff");
            svgSunPath.setAttribute("fill", "#ffffff");
        } else {
            document.body.classList.remove('dark');
            document.body.classList.add('light');
            localStorage.setItem('theme', 'light');
            svgMoonPath.setAttribute("fill", "#5f5f5f");
            svgSunPath.setAttribute("fill", "#eaac00");            
        }
    });
}