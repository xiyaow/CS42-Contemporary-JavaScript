const ENTER_KEY_CODE = 13

const taskInput = document.getElementById('task')
const taskList = document.getElementById('task-list')

if(localStorage.tasks){
  taskList.innerHTML = localStorage.tasks;
}
taskInput.addEventListener("keydown", event => {
  if (event.keyCode === ENTER_KEY_CODE) {
    event.preventDefault()
    addTaskToList()
  }
})

/* Adds a new task item to the list, with the value from the
 * given input.
 *
 * Arguments:
 * taskInput -- the HTMLElement input tag
 */
function addTaskToList() {
  if (taskInput.value)  {
    const li = renderTaskTemplate(taskInput.value);

    taskInput.value = ""
    taskList.appendChild(li)
    localStorage.tasks = taskList.innerHTML;
  }
}

/* Handles check/delete events for the given task.
 *
 * Arguments:
 * taskLi -- the HTMLElement li tag
 */
taskList.addEventListener('click', event => {
  let target = event.target;
  while(target != taskList && !target.classList.contains('check') && !target.classList.contains('delete')){
    target = target.parentNode;
  }

  if(target == taskList){
    return;
  }

  const li = target.parentNode;
  if(target.classList.contains('check')){
    li.classList.toggle('checked')
    localStorage.tasks = taskList.innerHTML;
  }else{
    li.parentNode.removeChild(li)
    localStorage.tasks = taskList.innerHTML;
  }
})

function renderTaskTemplate(task){
  return tag('li', {}, [
    task,
    tag('span', {class: 'delete'}, []),
    tag('span', {class: 'check'}, [])
    ])
}

function tag(type, attr, contents){
  const element = document.createElement(type)
  for(const key in attr){
    element.setAttribute(key, attr[key]);
  }

  if(!(contents instanceof Array)){
    contents = [contents];
  }

  contents.forEach(content => {
    if(content instanceof HTMLElement){
      element.appendChild(content);
    }else{
      element.appendChild(document.createTextNode(content));
    }
  })
  return element;
}
