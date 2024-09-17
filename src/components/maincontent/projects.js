
function Projects() {

    let projects = [];
    let demoProj = {
        name : "demo" ,
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
    
    projects.push(demoProj);
    
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


    return {
         getProjects , 
         addProjects , 
         deleteProjects ,
         addTask ,
         deleteTask ,
    }
}

const { getProjects , addProjects , deleteProjects , addTask  , deleteTask} = Projects();

export { getProjects , addProjects , deleteProjects , addTask , deleteTask} ;