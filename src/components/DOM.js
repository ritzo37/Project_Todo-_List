import { getProjects, addProjects, deleteProjects, addTask, deleteTask, toggleTaskDone, checkTaskDone, changePriority, getPriority, changeTaskName, changeTaskDate } from "./projects.js"

function initDom() {

     const addProjectBtn = document.querySelector('.addproject-option');
     const addProjectForm = document.querySelector('.project-name-form');
     const addProjectDialogBox = document.querySelector('.project-dialog-box');
     const submitBtn = document.querySelector('.submit');
     const messageDiv = document.querySelector('.message-div');
     addProjectBtn.addEventListener('click', () => {
          addProjectDialogBox.showModal();
     });

     addProjectForm.addEventListener('click', (event) => {
          event.preventDefault();
     })

     const closeBtn = document.querySelector('.close');
     closeBtn.addEventListener('click', () => {
          addProjectDialogBox.close();
          addProjectForm.reset();
     })

     submitBtn.addEventListener('click', () => {
          const projectName = document.querySelector('#project-name').value;

          let currProjects = getProjects();
          let flag = false;

          for (const project of currProjects) {
               if (project && project.name == projectName) {
                    flag = true;
                    break;
               }
          }

          if (flag) {
               messageDiv.textContent = "Already exists !";
          }
          else {
               messageDiv.textContent = " ";
               addProject();
               addProjectForm.reset();
               addProjectDialogBox.close();
          }

     });

     const currProjects = getProjects();
     if (currProjects.length) {

          for (let i = 0 ; i<currProjects.length ; i++) {
               
               let project = currProjects[i];

               if (project == undefined) continue;

               const projectDiv = document.querySelector('.Project-container');
               const newProjectDivContainer = document.createElement('div');
               const projectName = project.name;
               const newProjectDiv = document.createElement('div');
          
               const projectIndx = i ;
               newProjectDiv.classList.add('options');
               newProjectDiv.textContent = projectName;
               newProjectDiv.dataset.data = projectIndx;
          
               const deleteBtn = document.createElement('button');
               deleteBtn.textContent = "Delete";
          
               deleteBtn.addEventListener('click', () => {
                    projectDiv.removeChild(newProjectDivContainer);
                    deleteProjects(projectIndx);
                    const mainContentDiv = document.querySelector('.content-container');
                    mainContentDiv.textContent = " ";
               })
          
               newProjectDivContainer.classList.add('newprojectdiv');
               newProjectDiv.addEventListener('click', () => {
                    renderProject(getProjects(), projectIndx);
               });
          
               newProjectDivContainer.appendChild(newProjectDiv);
               newProjectDivContainer.appendChild(deleteBtn);
               projectDiv.appendChild(newProjectDivContainer);
          }
     }


}

function addProject() {

     const projectDiv = document.querySelector('.Project-container');
     const newProjectDivContainer = document.createElement('div');
     const projectName = document.querySelector('#project-name').value;
     const newProjectDiv = document.createElement('div');

     const projectIndx = getProjects().length;
     newProjectDiv.classList.add('options');
     newProjectDiv.textContent = projectName;
     newProjectDiv.dataset.data = projectIndx;

     const deleteBtn = document.createElement('button');
     deleteBtn.textContent = "Delete";

     deleteBtn.addEventListener('click', () => {
          projectDiv.removeChild(newProjectDivContainer);
          deleteProjects(projectIndx);
          const mainContentDiv = document.querySelector('.content-container');
          mainContentDiv.textContent = " ";
     })

     newProjectDivContainer.classList.add('newprojectdiv');


     let demoProj = {
          name: projectName,
          tasks: [{
               name: "This is just testing stuff",
               priority: false,
               date: "idkyet",
               done: false,
          },
          {
               name: "This is just testing stuff 2",
               priority: false,
               date: "idkyet",
               done: false,
          }]
     }

     addProjects(demoProj);

     newProjectDiv.addEventListener('click', () => {
          renderProject(getProjects(), projectIndx);
     });


     newProjectDivContainer.appendChild(newProjectDiv);
     newProjectDivContainer.appendChild(deleteBtn);
     projectDiv.appendChild(newProjectDivContainer);

}

function addTaskFunctionality(projectIndx) {

     const mainContentDiv = document.querySelector('.content-container');
     const addTaskBtn = document.createElement('button');
     addTaskBtn.textContent = "Add Task";
     addTaskBtn.addEventListener('click', () => {

          const mainContentDiv = document.querySelector('.content-container');
          const checkTaskFormDiv = document.querySelector('.taskNameFormDiv');
          if (checkTaskFormDiv) {
               mainContentDiv.removeChild(checkTaskFormDiv);
          }
          else {

               const taskFormDiv = document.createElement('div');
               taskFormDiv.classList.add('taskNameFormDiv');
               const taskFormElement = document.createElement('form');
               taskFormElement.classList.add('task-name-form');


               const inputElementsDiv = document.createElement('div');
               const taskNameLabel = document.createElement('label');
               taskNameLabel.textContent = "Task Name";
               taskNameLabel.for = "task-name";
               const taskNameInput = document.createElement('input');
               taskNameInput.id = "task-name";
               taskNameInput.type = "text";
               const taskDateLabel = document.createElement('label');
               taskDateLabel.textContent = "Due Date : ";
               taskDateLabel.for = "task-date";
               const taskDateInput = document.createElement('input');
               taskDateInput.type = "date";
               taskDateInput.id = "task-date";

               inputElementsDiv.appendChild(taskNameLabel);
               inputElementsDiv.appendChild(taskNameInput);
               inputElementsDiv.appendChild(taskDateLabel);
               inputElementsDiv.appendChild(taskDateInput);


               const submitBtn = document.createElement('button');
               const closeBtn = document.createElement('button');
               submitBtn.textContent = "Submit";
               closeBtn.textContent = "Close";
               submitBtn.classList.add('submit-task');
               closeBtn.classList.add('close-task');
               submitBtn.type = "submit";

               const messageDiv = document.createElement('div');
               messageDiv.classList.add('task-form-div');

               submitBtn.addEventListener('click', (event) => {
                    event.preventDefault();
                    const mainContentDiv = document.querySelector('.content-container');
                    const headingDiv = mainContentDiv.querySelector('.project-heading');
                    const projectName = headingDiv.textContent;
                    let indx = -1;

                    const currProjects = getProjects();
                    for (let i = 0; i < currProjects.length; i++) {
                         if (currProjects[i] == undefined) continue;
                         if (currProjects[i].name == projectName) {
                              indx = i;
                              break;
                         }
                    }
                    const taskName = document.querySelector('#task-name').value;
                    const date = document.querySelector('#task-date').value;
                    const messageDiv = document.querySelector('.task-form-div');

                    if (!taskName || !date) {
                         messageDiv.textContent = "Please enter all the details.";

                    }
                    else {
                         let newTask = {
                              name: taskName,
                              priority: false,
                              date: date,
                              done: false,
                         };


                         if (taskName.length) {
                              addTask(newTask, indx);
                              renderProject(getProjects(), indx);

                         }
                         messageDiv.textContent = " ";
                    }
               });

               closeBtn.addEventListener('click', () => {
                    taskFormElement.reset();
                    mainContentDiv.removeChild(taskFormDiv);
               })

               taskFormElement.appendChild(inputElementsDiv);
               taskFormElement.appendChild(submitBtn);
               taskFormElement.appendChild(closeBtn);
               taskFormElement.appendChild(messageDiv);
               taskFormDiv.appendChild(taskFormElement);

               mainContentDiv.appendChild(taskFormDiv);
          }

     });


     mainContentDiv.appendChild(addTaskBtn);

}


function generateEditForm(projectIndx, taskIndx) {

     const formCheck = document.querySelector('.edit-form-div');
     if (formCheck) {
          const currToDo = document.querySelector(`[data-task="${taskIndx}"]`);
          const editFormEle = document.querySelector('.edit-form-ele');
          currToDo.removeChild(formCheck);
          editFormEle.reset();
     }
     else {
          const editFormDiv = document.createElement('div');
          const editFormEle = document.createElement('form');
          const inputEle = document.createElement('input');
          const inputLabelEle = document.createElement('label');
          const dateEle = document.createElement('input');
          const dateLabel = document.createElement('labell');
          const submitBtnEle = document.createElement('button');
          const closeBtn = document.createElement('button');
          const messageDiv = document.createElement('div');


          inputEle.type = "text";
          inputEle.id = "editTaskInput";
          inputLabelEle.for = "editTaskInput";
          inputLabelEle.textContent = "New Task Name : ";
          dateEle.id = "editDate";
          dateEle.type = "date";
          dateLabel.for = "editDate";
          dateLabel.textContent = "Date : ";
          submitBtnEle.textContent = "Submit";
          closeBtn.textContent = "Close";
          messageDiv.id = "editTaskMessageDiv";
          editFormDiv.classList.add('edit-form-div');
          editFormEle.classList.add('edit-form-ele');


          submitBtnEle.addEventListener('click', (event) => {
               event.preventDefault();
               const inputEle = document.querySelector('#editTaskInput');
               const date = document.querySelector('#editDate');

               if (!inputEle.value | !date.value) {
                    const messageDiv = document.querySelector('#editTaskMessageDiv');
                    messageDiv.textContent = "Please Enter everything !";
               }
               else {
                    const newName = inputEle.value;
                    const newDate = date.value;
                    changeTaskName(projectIndx, taskIndx, newName);
                    changeTaskDate(projectIndx, taskIndx, newDate);
                    const taskNameEle = document.querySelector(`[data-task="${taskIndx}"] .taskName`);
                    const taskDateEle = document.querySelector(`[data-task="${taskIndx}"] .taskDate`);
                    taskNameEle.textContent = newName;
                    taskDateEle.textContent = newDate ;


                    const formCheck = document.querySelector('.edit-form-div');
                    const currToDo = document.querySelector(`[data-task="${taskIndx}"]`);
                    const editFormEle = document.querySelector('.edit-form-ele');
                    currToDo.removeChild(formCheck);
                    editFormEle.reset();

               }
          });


          closeBtn.addEventListener('click', (event) => {
               event.preventDefault();
               const formCheck = document.querySelector('.edit-form-div');
               const currToDo = document.querySelector(`[data-task="${taskIndx}"]`);
               const editFormEle = document.querySelector('.edit-form-ele');
               currToDo.removeChild(formCheck);
               editFormEle.reset();
          })

          editFormDiv.appendChild(editFormEle);
          editFormEle.appendChild(inputLabelEle);
          editFormEle.appendChild(inputEle);
          editFormEle.appendChild(dateLabel);
          editFormEle.appendChild(dateEle);
          editFormEle.appendChild(submitBtnEle);
          editFormEle.appendChild(closeBtn);
          editFormEle.appendChild(messageDiv);

          const currToDo = document.querySelector(`[data-task="${taskIndx}"]`);
          currToDo.appendChild(editFormDiv);
     }

}

function renderProject(projectarr, projectIndx) {

     const project = projectarr[projectIndx];
     const mainContentDiv = document.querySelector('.content-container');
     const projectName = project.name;
     const tasks = project.tasks;
     const heading = document.createElement('div');
     heading.classList.add('project-heading');
     heading.textContent = projectName;
     mainContentDiv.textContent = " ";
     mainContentDiv.appendChild(heading);

     for (let i = 0; i < tasks.length; i++) {

          const task = tasks[i];
          if (task == undefined) {
               continue;
          }

          const genericTodo = document.createElement('div');
          genericTodo.dataset.task = i;
          const taskName = document.createElement('p');
          const date = document.createElement('p');
          taskName.classList.add('taskName');
          date.classList.add('taskDate');
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

          const currPriority = getPriority(projectIndx, i);
          if (currPriority == true) {
               priorityInput.checked = true;
          }

          genericTodo.appendChild(priorityBox);

          priorityInput.addEventListener("change", () => {
               changePriority(projectIndx, i);
          })

          const editBtn = document.createElement('button');
          editBtn.textContent = "Edit";

          editBtn.addEventListener('click', () => {
               generateEditForm(projectIndx, i);
          });

          deleteBtn.addEventListener('click', () => {
               mainContentDiv.removeChild(genericTodo);
               deleteTask(projectIndx, i);
          });

          redGreenBtn.addEventListener('click', () => {
               const currTaskDone = checkTaskDone(projectIndx, i);
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
               toggleTaskDone(projectIndx, i);
          })


          genericTodo.appendChild(editBtn);
          mainContentDiv.appendChild(genericTodo);


     }

     addTaskFunctionality(projectIndx);

}

export { initDom };