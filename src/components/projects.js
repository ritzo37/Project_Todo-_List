
function Projects() {

    let projects = [];
    
    const getProjects = ()=> projects ;

    const addProjects = (project)=> {
          projects.push(project);
    }

    const deleteProjects = (projectIndx)=> {
         projects[projectIndx] = undefined ;
    }

    const addTask = (newTask , indx)=>{
          projects[indx].tasks.push(newTask);
    }

    const deleteTask = (projectIndx, taskIndx)=> {
          projects[projectIndx].tasks[taskIndx] = undefined ;
    }

    const toggleTaskDone = (projectIndx , taskIndx) => {
          projects[projectIndx].tasks[taskIndx].done = !projects[projectIndx].tasks[taskIndx].done ;
    }

    const checkTaskDone = (projectIndx , taskIndx) => {
          return projects[projectIndx].tasks[taskIndx].done ;
    }

    const changePriority = (projectIndx , taskIndx) => {
           projects[projectIndx].tasks[taskIndx].priority = !projects[projectIndx].tasks[taskIndx].priority ;
    }

    const getPriority = (projectIndx , taskIndx) => {
          return projects[projectIndx].tasks[taskIndx].priority 
    }
    
    const changeTaskName = (projectIndx , taskIndx, name) =>{
          projects[projectIndx].tasks[taskIndx].name =  name ;
    }

    const changeTaskDate = (projectIndx , taskIndx , newDate) => {
         projects[projectIndx].tasks[taskIndx].date = newDate ;
    }


    return {
         getProjects , 
         addProjects , 
         deleteProjects ,
         addTask ,
         deleteTask ,
         toggleTaskDone ,
         checkTaskDone,
         changePriority , 
         getPriority ,
         changeTaskName , 
         changeTaskDate  ,
    }
}

const { getProjects , addProjects , deleteProjects , addTask  , deleteTask , toggleTaskDone , checkTaskDone , changePriority , getPriority , changeTaskDate , changeTaskName} = Projects();

export { getProjects , addProjects , deleteProjects , addTask , deleteTask , toggleTaskDone , checkTaskDone , changePriority , getPriority, changeTaskDate , changeTaskName} ;