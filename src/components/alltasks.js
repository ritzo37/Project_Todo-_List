import { getProjects, deleteTask, toggleTaskDone, checkTaskDone, changePriority, getPriority, changeTaskName, changeTaskDate } from "./projects.js"
import {renderTasks} from "./DOM.js"
function generateAllTasks() {
    const mainContentDiv = document.querySelector('.content-container');
    mainContentDiv.textContent = " ";
    const currProjects = getProjects();
    for (let projectIndx = 0 ; projectIndx < currProjects.length ; projectIndx++) {
          const project = currProjects[projectIndx];
          if (!project) continue ;
          renderTasks(projectIndx);
    }
}

export { generateAllTasks };




