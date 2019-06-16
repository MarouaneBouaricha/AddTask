// Define UI vars

const form = document.querySelector('#task-form');
const tasklist = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const taskInput = document.querySelector('#task');
const filter = document.querySelector('#filter');

// load all event listners

loadEventListeners();

function loadEventListeners() {
	//Add task event
	form.addEventListener('submit', addTask);
	//Remove task event
	tasklist.addEventListener('click', removeTask);
	//Clear task event
	clearBtn.addEventListener('click', clearTask);
	//Filter task event
	filter.addEventListener('keyup', filterTasks);
}

//Add task
function addTask(e) {
	if (taskInput.value === '') {
		alert('Add a task');
	}

//Add li 
const li = document.createElement('li');
//Add a class to the li
li.className = 'collection-item';
//Add a text node and append it to the li
li.appendChild(document.createTextNode(taskInput.value));
//Add a link
const link = document.createElement('a');
//Give the link a class name
link.className = 'delete-item secondary-content';
//Add a remove icon
link.innerHTML = '<i class="fa fa-remove"></i>';
//Set that icon to the li
li.appendChild(link);
//Set the li to th ul
tasklist.appendChild(li);
//Add to local sotorage
storeTaskInLocalStorage(taskInput.value);
//Clear Input
taskInput.value = '';
	
	e.preventDefault();
}

function storeTaskInLocalStorage(task){
	let tasks;
	if(localStorage.getItem('tasks') === null){
		tasks = [];
	}
	else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}

	tasks.push(task);
	localStorage.setItem('tasks', JSON.stringify(tasks));
}



function removeTask(e){
	if(e.target.parentElement.classList.contains('delete-item')){
		if(confirm('Are you sure?')){
			e.target.parentElement.parentElement.remove();
		}
	}
}

function clearTask(e){
	while(tasklist.firstChild){
		tasklist.removeChild(tasklist.firstChild);
	}
}


function filterTasks(e){
	const text = e.target.value.toLowerCase();

	document.querySelectorAll('.collection-item').forEach(function(task){
		const item = task.firstChild.textContent;
		if(item.toLowerCase().indexOf(text) != -1){
			task.style.display = 'block';
		}
		else {
			task.style.display = 'none';
		}
	});
}