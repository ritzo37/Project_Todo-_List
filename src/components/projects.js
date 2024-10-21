
function Projects() {

      let projects;
      try {
            projects = JSON.parse(localStorage.getItem("projects")) || [];
      }
      catch (e) {
            projects = [];
      }

      const saveToLocalStorage = (projects) => {
           localStorage.setItem("projects", JSON.stringify(projects));
      }

      const getProjects = () => {
            return projects;
      }

      const addProjects = (project) => {
            projects.push(project);
            saveToLocalStorage(projects); 
      }

      const deleteProjects = (projectIndx) => {
            projects[projectIndx] = null;
            saveToLocalStorage(projects); 
      }

      const addTask = (newTask, indx) => {
            projects[indx].tasks.push(newTask);
            saveToLocalStorage(projects); 
      }

      const deleteTask = (projectIndx, taskIndx) => {
            projects[projectIndx].tasks[taskIndx] = null;
            saveToLocalStorage(projects); 
      }

      const toggleTaskDone = (projectIndx, taskIndx) => {
            projects[projectIndx].tasks[taskIndx].done = !projects[projectIndx].tasks[taskIndx].done;
            saveToLocalStorage(projects); 
      }

      const checkTaskDone = (projectIndx, taskIndx) => {
            return projects[projectIndx].tasks[taskIndx].done;
      }

      const changePriority = (projectIndx, taskIndx) => {
            projects[projectIndx].tasks[taskIndx].priority = !projects[projectIndx].tasks[taskIndx].priority;
            saveToLocalStorage(projects);
      }

      const getPriority = (projectIndx, taskIndx) => {
            return projects[projectIndx].tasks[taskIndx].priority;
      }

      const changeTaskName = (projectIndx, taskIndx, name) => {
            projects[projectIndx].tasks[taskIndx].name = name;
            saveToLocalStorage(projects); 
      }

      const changeTaskDate = (projectIndx, taskIndx, newDate) => {
            projects[projectIndx].tasks[taskIndx].date = newDate;
            saveToLocalStorage(projects); 
      }


      return {
            getProjects,
            addProjects,
            deleteProjects,
            addTask,
            deleteTask,
            toggleTaskDone,
            checkTaskDone,
            changePriority,
            getPriority,
            changeTaskName,
            changeTaskDate,
      }
}

const { getProjects, addProjects, deleteProjects, addTask, deleteTask, toggleTaskDone, checkTaskDone, changePriority, getPriority, changeTaskDate, changeTaskName } = Projects();

export { getProjects, addProjects, deleteProjects, addTask, deleteTask, toggleTaskDone, checkTaskDone, changePriority, getPriority, changeTaskDate, changeTaskName };