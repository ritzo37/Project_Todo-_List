
function testingTodo() {
    const mainContentDiv = document.querySelector('.content-container');
    const genericTodo = document.createElement('div');
    const taskName = document.createElement('p');
    taskName.textContent = "This is just a testing TODO";
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
}

export { testingTodo };




