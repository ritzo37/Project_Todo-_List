import { getProjects, addProjects, deleteProjects, addTask, deleteTask , toggleTaskDone , checkTaskDone} from "./projects.js"

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

     const submitTaskBtn = document.querySelector('.submit-task');
     const closeTaskBtn = document.querySelector('.close-task');
     const taskForum = document.querySelector('.tasks-name-form');
     const addTaskDialogBox = document.querySelector('.tasks-dialog-box');

     submitTaskBtn.addEventListener('click', (event) => {
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
                    priority: true,
                    date: date,
                    done : false, 
               };

               if (taskName.length) {
                    addTask(newTask, indx);
                    taskForum.reset();
                    renderProject(getProjects(), indx);

               }
               addTaskDialogBox.close();
               messageDiv.textContent = " ";
          }

     });

     closeTaskBtn.addEventListener('click', () => {
          addTaskDialogBox.close();
          taskForum.reset();
     });

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
          const headingDiv = mainContentDiv.querySelector('div');
          if (headingDiv) {
               if (headingDiv.textContent == projectName) {
                    mainContentDiv.textContent = " ";
               }
          }
     })

     newProjectDivContainer.classList.add('newprojectdiv');


     let demoProj = {
          name: projectName,
          tasks: [{
               name: "This is just testing stuff",
               priority: 2,
               date: "idkyet",
               done:  false ,
          },
          {
               name: "This is just testing stuff 2",
               priority: 1,
               date: "idkyet",
               done: false ,
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

     const addTaskBtn = document.createElement('button');
     const addTaskDialog = document.querySelector('.tasks-dialog-box');
     addTaskBtn.textContent = "ADD TASK";

     addTaskBtn.addEventListener('click', () => {
          addTaskDialog.showModal();
     });

     const mainContentDiv = document.querySelector('.content-container');
     mainContentDiv.appendChild(addTaskBtn);

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
          const taskName = document.createElement('p');
          const date = document.createElement('p');
          date.textContent = task.date;
          taskName.textContent = task.name;

          const redGreenBtn = document.createElement('div');
          const deleteBtn = document.createElement('div');
          const doneFlag = task.done ;
          if (doneFlag){
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

          mainContentDiv.appendChild(genericTodo);

          deleteBtn.addEventListener('click', () => {
               mainContentDiv.removeChild(genericTodo);
               deleteTask(projectIndx, i);
          });

          redGreenBtn.addEventListener('click',()=>{
              const currTaskDone = checkTaskDone(projectIndx,i);
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
              toggleTaskDone(projectIndx , i);
          })

     }

     addTaskFunctionality(projectIndx);

}

export { initDom };