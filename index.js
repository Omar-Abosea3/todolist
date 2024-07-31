const displayTasks = () => {
    const prevTasks = JSON.parse(localStorage.getItem('tasks'));
    const tasks = document.querySelector('#tasks');
    tasks.innerHTML ='';
    prevTasks?prevTasks.forEach(task => {
        tasks.innerHTML += `<div class="task" onclick="markCompletedTasks(this)">
            <span class="taskname">${task}</span>
            <button class="delete" onclick="deleteTask(this)">
                <i class="far fa-trash-alt"></i>
            </button>
        </div>`;
    }):console.log('no prev tasks');
}

displayTasks();

const addTaskToLocalStorage = (task) => {
    let prevTasks = [];
    if(localStorage.getItem('tasks')){
        prevTasks = JSON.parse(localStorage.getItem('tasks'));
        prevTasks.unshift(task);
        localStorage.setItem('tasks', JSON.stringify(prevTasks));
    }else{
        prevTasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(prevTasks));
    }
    clearInput();
    displayTasks();
}

const removeTask = (i) => {
    console.log(i);
    const prevTasks = JSON.parse(localStorage.getItem('tasks'));
    const newTasks = prevTasks.filter((t , index) => {return index !== i});
    console.log(newTasks);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
    displayTasks();
}

const deleteTask = (thisElement) => {
    const current_tasks = Array.from(document.querySelectorAll(".delete"));
    const i = current_tasks.indexOf(thisElement);
        // this.parentNode.remove();
        console.log(thisElement);
        removeTask(i);
} 

const clearInput = () => {
    document.querySelector('#newtask input').value = '';
}

const markCompletedTasks = (thisElement) => {
    thisElement.classList.toggle('completed');
}

document.querySelector('#push').onclick = function () {
    if(document.querySelector('#newtask input').value.length === 0){
        alert("Please Enter a Task");
    }else{
        addTaskToLocalStorage(document.querySelector('#newtask input').value);
    }
};
document.addEventListener('keydown', (e) => {
    if(e.which === 13){
        if(document.querySelector('#newtask input').value.length === 0){
            alert("Please Enter a Task");
        }else{
            addTaskToLocalStorage(document.querySelector('#newtask input').value);
        }
    }
})


   