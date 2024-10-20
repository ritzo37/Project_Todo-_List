
function Projects() {

      let projects;
      try {
            if (localStorage.getItem("projects")) {
                  projects = JSON.parse(localStorage.getItem("projects"));
            }
            else {
                  projects = [];
            }
      }
      catch (e) {
            projects = [];
      }

      const getProjects = () => {
            return projects;
      }

      const addProjects = (project) => {
            projects.push(project);
            localStorage.setItem("projects", JSON.stringify(projects));
      }

      const deleteProjects = (projectIndx) => {
            projects[projectIndx] = undefined;
            localStorage.setItem("projects", JSON.stringify(projects));
      }

      const addTask = (newTask, indx) => {
            projects[indx].tasks.push(newTask);
            localStorage.setItem("projects", JSON.stringify(projects));
      }

      const deleteTask = (projectIndx, taskIndx) => {
            projects[projectIndx].tasks[taskIndx] = undefined;
            localStorage.setItem("projects", JSON.stringify(projects));
      }

      const toggleTaskDone = (projectIndx, taskIndx) => {
            projects[projectIndx].tasks[taskIndx].done = !projects[projectIndx].tasks[taskIndx].done;
            localStorage.setItem("projects", JSON.stringify(projects));
      }

      const checkTaskDone = (projectIndx, taskIndx) => {
            return projects[projectIndx].tasks[taskIndx].done;
      }

      const changePriority = (projectIndx, taskIndx) => {
            projects[projectIndx].tasks[taskIndx].priority = !projects[projectIndx].tasks[taskIndx].priority;
      }

      const getPriority = (projectIndx, taskIndx) => {
            return projects[projectIndx].tasks[taskIndx].priority;
      }

      const changeTaskName = (projectIndx, taskIndx, name) => {
            projects[projectIndx].tasks[taskIndx].name = name;
            localStorage.setItem("projects", JSON.stringify(projects));
      }

      const changeTaskDate = (projectIndx, taskIndx, newDate) => {
            projects[projectIndx].tasks[taskIndx].date = newDate;
            localStorage.setItem("projects", JSON.stringify(projects));
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