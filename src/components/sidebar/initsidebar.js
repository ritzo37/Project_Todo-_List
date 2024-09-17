function generateSideBar() {
    const sidebarContainer = document.querySelector('.sidebar');
    const container1 = document.createElement('div');
    const homeHeading = document.createElement('h3');
    const allTasks = document.createElement('div');
    const todayTasks = document.createElement('div');
    const importantTasks = document.createElement('div');

    allTasks.classList.add('options');
    todayTasks.classList.add('options');
    importantTasks.classList.add('options');
    container1.classList.add('home-container');


    homeHeading.textContent = "Home";
    allTasks.textContent = "All Tasks";
    todayTasks.textContent = "Today";
    importantTasks.textContent = "Important";


    container1.appendChild(homeHeading);
    container1.appendChild(allTasks);
    container1.appendChild(todayTasks);
    container1.appendChild(importantTasks);

    const container2 = document.createElement('div');
    const ProjectHeading = document.createElement('h3');
    const addProjects = document.createElement('div');
    addProjects.classList.add('options');
    addProjects.classList.add('addproject-option');

    ProjectHeading.textContent = "Projects";
    addProjects.textContent = "Add Projects";
    container2.appendChild(ProjectHeading);
    container2.appendChild(addProjects);
    container2.classList.add('Project-container');

    sidebarContainer.appendChild(container1);
    sidebarContainer.appendChild(container2);
}

export {generateSideBar} ;


