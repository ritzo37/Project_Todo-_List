
import { getProjects, deleteTask, toggleTaskDone, checkTaskDone , getPriority , changePriority} from "./projects.js"
import { generateAllTasks } from "./alltasks.js";
import { renderTask } from "./DOM.js";
function generateSideBar() {
     const sidebarContainer = document.querySelector('.sidebar');
     const container1 = document.createElement('div');
     const homeHeading = document.createElement('h3');
     const allTasks = document.createElement('div');
     const todayTasks = document.createElement('div');
     const importantTasks = document.createElement('div');

     allTasks.classList.add('options');
     todayTasks.classList.add('options');
     allTasks.classList.add('allTaskBtn');
     todayTasks.classList.add('today-tasks-div');
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

     todayTasks.addEventListener('click', todayTaskGenerator);
     importantTasks.addEventListener('click',importantTaskGenerator);
     allTasks.addEventListener('click',generateAllTasks);
}

function getTodaysDate() {
     let dateObj = new Date();
     let year = dateObj.getFullYear();
     let month = dateObj.getMonth() + 1;
     if (month <= 9) month = "0" + month;
     let day = dateObj.getDate();
     if (day <= 9) day = "0" + day;
     return (year + "-" + month + "-" + day);
}



function importantTaskGenerator() {
     const currProjects = getProjects();
     const mainContentDiv = document.querySelector('.content-container');
     mainContentDiv.textContent = " ";
     let tasksExists = false ;
     for (let i = 0; i < currProjects.length; i++) {
          if (!currProjects[i]) continue;
          let currTasks = currProjects[i].tasks;

          for (let j = 0; j < currTasks.length; j++) {
               if (!currTasks[j]) continue;
               let currPriority = currTasks[j].priority ;
               if (currPriority) {
                    tasksExists = true ;
                    renderTask(currTasks[j],i,j);
               }
          }
     }

     if (!tasksExists) { 
        mainContentDiv.textContent = "The field is clear...." ;
     }
}

function todayTaskGenerator() {

     const currProjects = getProjects();
     let dateForToday = getTodaysDate();
     const mainContentDiv = document.querySelector('.content-container');
     mainContentDiv.textContent = " ";
     let tasksExists = false; 
     for (let i = 0; i < currProjects.length; i++) {
          if (!currProjects[i]) continue;
          let currTasks = currProjects[i].tasks;
          for (let j = 0; j < currTasks.length; j++) {
               if (!currTasks[j]) continue;
               let currDate = currTasks[j].date ;
               console.log(currDate);
               if (currDate == dateForToday) {
                    tasksExists = true ;
                    renderTask(currTasks[j],i,j);
               }
          }
     }

     if (!tasksExists) { 
        mainContentDiv.textContent = "The field is clear...." ;
     }
     
}

export { generateSideBar };


