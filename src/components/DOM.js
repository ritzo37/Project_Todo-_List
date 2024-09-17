import { getProjects , addProjects , deleteProjects , addTask , deleteTask } from "./maincontent/projects.js"

function initDom() {
     const addProjectBtn = document.querySelector('.addproject-option');
     const addProjectForm = document.querySelector('.project-name-form');
     const addProjectDialogBox = document.querySelector('.project-dialog-box');
     const submitBtn = document.querySelector('.submit');
     addProjectBtn.addEventListener('click', () => {
          addProjectDialogBox.showModal();
     });

     const closeBtn = document.querySelector('.close');
     closeBtn.addEventListener('click', () => {
          addProjectDialogBox.close();
          addProjectForm.reset();
     })

     submitBtn.addEventListener('click', () => {
          addProject();
          addProjectForm.reset();
     });
}

function addProject() {

     const projectDiv = document.querySelector('.Project-container');
     const newProjectDivContainer= document.createElement('div');
     const projectName = document.querySelector('#project-name').value;
     const newProjectDiv = document.createElement('div');
      
     const projectIndx = getProjects().length ;
     newProjectDiv.classList.add('options');
     newProjectDiv.textContent = projectName;
     newProjectDiv.dataset.data = projectIndx; 

     const deleteBtn = document.createElement('button');
     deleteBtn.textContent = "Delete";
     
     deleteBtn.addEventListener('click',()=>{
           projectDiv.removeChild(newProjectDivContainer);
           deleteProjects(projectIndx);
           const mainContentDiv = document.querySelector('.content-container');
           const headingDiv = mainContentDiv.querySelector('h2');
           if (headingDiv) {
                if (headingDiv.textContent == projectName) {
                      mainContentDiv.textContent = " " ;
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
          },
          {
               name: "This is just testing stuff 2",
               priority: 1,
               date: "idkyet",
          }]
     }

     addProjects(demoProj);

     newProjectDiv.addEventListener('click', () => {
          renderProject(getProjects(),projectIndx);
     });

     
     newProjectDivContainer.appendChild(newProjectDiv);
     newProjectDivContainer.appendChild(deleteBtn);
     projectDiv.appendChild(newProjectDivContainer);
}

function addTaskFunctionality(projectIndx) {

       const addTaskBtn = document.createElement('button');
       addTaskBtn.textContent = "ADD TASK";
       
       const submitBtn = document.querySelector('.submit-task');
       const closeBtn = document.querySelector('.close-task');
       const taskForum = document.querySelector('.tasks-name-form');
       const addTaskDialog = document.querySelector('.tasks-dialog-box');

       addTaskBtn.addEventListener('click',()=>{
            addTaskDialog.showModal();
       });

       closeBtn.addEventListener('click',()=>{
            addTaskDialog.close();
            taskForum.reset();
       });

       submitBtn.addEventListener('click',()=>{
          const taskName = document.querySelector('#task-name').value ;
           let newTask = {
                name : taskName ,  
                priority: 2,
                date: "idkyet",
           };
          if (taskName.length) {
               addTask(newTask,projectIndx);
               taskForum.reset();
               renderProject(getProjects(), projectIndx);
          }
       });

       const mainContentDiv = document.querySelector('.content-container');
       mainContentDiv.appendChild(addTaskBtn);

}

function renderProject(projectarr , projectIndx) {
     const project = projectarr[projectIndx] ;
     const mainContentDiv = document.querySelector('.content-container');
     const projectName = project.name;
     const tasks = project.tasks;
     const heading = document.createElement('h2');
     heading.textContent = projectName;
     mainContentDiv.textContent = " ";
     mainContentDiv.appendChild(heading);
     let indx = 0 ;

     for (const task of tasks) {

          // if (task == undefined) {
          //       indx = indx + 1;
          //       continue ;
          // }

          const genericTodo = document.createElement('div');
          const taskName = document.createElement('p');
          taskName.textContent = task.name;
          taskName.dataset.index = indx; 
          // indx = indx + 1; 
          

          const redGreenBtn = document.createElement('button');
          redGreenBtn.textContent = "Done";
          const deleteBtn = document.createElement('button');

          deleteBtn.textContent = "Delete";
          redGreenBtn.classList.add('red-green-btn');
          deleteBtn.classList.add('delete-btn');
          genericTodo.classList.add('todo');
          
          genericTodo.appendChild(taskName);
          genericTodo.appendChild(redGreenBtn);
          genericTodo.appendChild(deleteBtn);

          mainContentDiv.appendChild(genericTodo);

          // deleteBtn.addEventListener('click',()=>{
          //       mainContentDiv.removeChild(genericTodo);
          //       deleteTask(projectIndx,indx-1);
          //       console.log(projectarr[projectIndx]);
          // })
     }

     addTaskFunctionality(projectIndx);

}

export { initDom };