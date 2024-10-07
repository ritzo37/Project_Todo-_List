
import { getProjects, deleteTask, toggleTaskDone, checkTaskDone , getPriority , changePriority} from "./projects.js"
function generateSideBar() {
     const sidebarContainer = document.querySelector('.sidebar');
     const container1 = document.createElement('div');
     const homeHeading = document.createElement('h3');
     const allTasks = document.createElement('div');
     const todayTasks = document.createElement('div');
     const importantTasks = document.createElement('div');

     allTasks.classList.add('options');
     todayTasks.classList.add('options');
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

     for (let i = 0; i < currProjects.length; i++) {

          if (currProjects[i] == undefined) continue;

          let currTasks = currProjects[i].tasks;

          for (let j = 0; j < currTasks.length; j++) {

               if (currTasks[j] == undefined) continue;

               let currPriority = currTasks[j].priority ;
               if (currPriority) {

                    const task = currTasks[j];
                    const genericTodo = document.createElement('div');
                    const taskName = document.createElement('p');
                    const date = document.createElement('p');
                    date.textContent = task.date;
                    taskName.textContent = task.name;

                    const redGreenBtn = document.createElement('div');
                    const deleteBtn = document.createElement('div');
                    const doneFlag = task.done;

                    if (doneFlag) {
                         redGreenBtn.textContent = "Done";
                         redGreenBtn.classList.add('green');
                    }
                    else {
                         redGreenBtn.textContent = "Undone";
                         redGreenBtn.classList.add('red');
                    }

                    deleteBtn.textContent = "Delete";
                    deleteBtn.classList.add('delete-btn');
                    redGreenBtn.classList.add('done-btn');
                    genericTodo.classList.add('todo');

                    genericTodo.appendChild(taskName);

                    genericTodo.appendChild(redGreenBtn);
                    genericTodo.classList.add('task-div');

                    genericTodo.appendChild(deleteBtn);
                    genericTodo.appendChild(date);

                    const priorityInput = document.createElement('input');
                    priorityInput.type = "checkbox";
                    priorityInput.id = i;
                    const priorityInputLabel = document.createElement('label');
                    priorityInputLabel.textContent = "Priority Task";
                    priorityInputLabel.for = i;
                    const priorityBox = document.createElement('div');
                    priorityBox.classList.add('priority-box');
                    priorityBox.appendChild(priorityInput);
                    priorityBox.appendChild(priorityInputLabel);

                    const currPriority = getPriority(i,j);
                    if (currPriority == true) {
                         priorityInput.checked = true;
                    }

                    genericTodo.appendChild(priorityBox);

                    priorityInput.addEventListener("change", () => {
                         changePriority(i,j);
                    });

                    mainContentDiv.appendChild(genericTodo);

                    deleteBtn.addEventListener('click', () => {
                         mainContentDiv.removeChild(genericTodo);
                         deleteTask(i, j);
                    });

                    redGreenBtn.addEventListener('click', () => {
                         const currTaskDone = checkTaskDone(i, j);
                         if (currTaskDone) {
                              redGreenBtn.classList.remove('green');
                              redGreenBtn.classList.add('red');
                              redGreenBtn.textContent = "Undone";
                         }
                         else {
                              redGreenBtn.classList.add('green');
                              redGreenBtn.classList.remove('red');
                              redGreenBtn.textContent = "Done";
                         }
                         toggleTaskDone(i, j);
                    })
               }
          }
     }
}

function todayTaskGenerator() {

     const currProjects = getProjects();
     let dateForToday = getTodaysDate();
     const mainContentDiv = document.querySelector('.content-container');
     mainContentDiv.textContent = " ";

     for (let i = 0; i < currProjects.length; i++) {

          if (currProjects[i] == undefined) continue;

          let currTasks = currProjects[i].tasks;

          for (let j = 0; j < currTasks.length; j++) {

               if (currTasks[j] == undefined) continue;

               let currDate = currTasks[j].date;
               if (currDate == dateForToday) {

                    const task = currTasks[j];
                    const genericTodo = document.createElement('div');
                    const taskName = document.createElement('p');
                    const date = document.createElement('p');
                    date.textContent = task.date;
                    taskName.textContent = task.name;

                    const redGreenBtn = document.createElement('div');
                    const deleteBtn = document.createElement('div');
                    const doneFlag = task.done;

                    if (doneFlag) {
                         redGreenBtn.textContent = "Done";
                         redGreenBtn.classList.add('green');
                    }
                    else {
                         redGreenBtn.textContent = "Undone";
                         redGreenBtn.classList.add('red');
                    }

                    deleteBtn.textContent = "Delete";
                    deleteBtn.classList.add('delete-btn');
                    redGreenBtn.classList.add('done-btn');
                    genericTodo.classList.add('todo');

                    genericTodo.appendChild(taskName);

                    genericTodo.appendChild(redGreenBtn);
                    genericTodo.classList.add('task-div');

                    genericTodo.appendChild(deleteBtn);
                    genericTodo.appendChild(date);

                    const priorityInput = document.createElement('input');
                    priorityInput.type = "checkbox";
                    priorityInput.id = i;
                    const priorityInputLabel = document.createElement('label');
                    priorityInputLabel.textContent = "Priority Task";
                    priorityInputLabel.for = i;
                    const priorityBox = document.createElement('div');
                    priorityBox.classList.add('priority-box');
                    priorityBox.appendChild(priorityInput);
                    priorityBox.appendChild(priorityInputLabel);

                    const currPriority = getPriority(i,j);
                    if (currPriority == true) {
                         priorityInput.checked = true;
                    }

                    genericTodo.appendChild(priorityBox);

                    priorityInput.addEventListener("change", () => {
                         changePriority(i,j);
                    });

                    mainContentDiv.appendChild(genericTodo);

                    deleteBtn.addEventListener('click', () => {
                         mainContentDiv.removeChild(genericTodo);
                         deleteTask(i, j);
                    });

                    redGreenBtn.addEventListener('click', () => {
                         const currTaskDone = checkTaskDone(i, j);
                         if (currTaskDone) {
                              redGreenBtn.classList.remove('green');
                              redGreenBtn.classList.add('red');
                              redGreenBtn.textContent = "Undone";
                         }
                         else {
                              redGreenBtn.classList.add('green');
                              redGreenBtn.classList.remove('red');
                              redGreenBtn.textContent = "Done";
                         }
                         toggleTaskDone(i, j);
                    })
               }
          }
     }
}

export { generateSideBar };


