document.addEventListener("DOMContentLoaded", ()=>{
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));

    if(storedTasks){
        storedTasks.forEach((tasks)=> tasks.push(tasks))
    }
});


    let tasks = [];


    const saveTasks = () =>{
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    const addTask = () => {
        const taskInput = document.getElementById("taskInput");
        const text = taskInput.value.trim();
        
        if (text) {
            tasks.push({ text: text, completed: false });
            taskInput.value = "";
            updateTasksList();
            saveTasks();
        }
    };

    const updateTasksList = () => {
        const taskList = document.getElementById("task-list");
        taskList.innerHTML = "";

        tasks.forEach((task, index) => {
            const listItem = document.createElement("li");

            listItem.innerHTML = `
            <div class="taskItem">
                <div class="task ${task.completed ? 'complete' : ''}">
                    <input type="checkbox" class="checkbox" ${task.completed ? 'checked' : ''} />
                    <p>${task.text}</p>
                </div>
                <div class="icons">
                    <img src="./img/edit.jpg" class="edit" data-index="${index}" />
                    <img src="./img/bin.jpg" class="delete" data-index="${index}" />
                </div>
            </div>
            `;

            listItem.querySelector('.checkbox').addEventListener("change", () => toggleTaskComplete(index));
            listItem.querySelector('.edit').addEventListener("click", () => editTask(index));
            listItem.querySelector('.delete').addEventListener("click", () => deleteTask(index));
            taskList.append(listItem);    
        });
    };

    const toggleTaskComplete = (index) => {
        tasks[index].completed = !tasks[index].completed;
        updateTasksList();
        updateStats();
        saveTasks();


    };

    const editTask = (index) => {
        const taskInput = document.getElementById("taskInput");
        taskInput.value = tasks[index].text;
        
        tasks.splice(index,1);
        updateTasksList();
        updateStats();
        saveTasks();


        // Optionally, focus the input field for convenience
        
    };

    const deleteTask = (index) => {
        tasks.splice(index, 1);
        updateTasksList();
        updateStats();
        saveTasks();

    };

    const updateStats =() =>{
        const completeTasks = tasks.filter(task => task.completed).length;
        const totolTasks = tasks.length;
        const progress = (completeTasks/totolTasks)*100;

        const progressBar = document.getElementById("progress");

        progressBar.style.width = `${progress}%`;


        document.getElementById("numbers").innerText = `${completeTasks} / ${totolTasks}`;



    };

    document.getElementById("newTask").addEventListener("click", function(e) {
        e.preventDefault();
        addTask();
});
