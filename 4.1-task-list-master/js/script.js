const input = document.querySelector('#task')


input.addEventListener('keydown', event => {
	if(event.code === 'Enter'){
		event.preventDefault()
		addList()
		input.value = ''
		input.blur()
	}
})

function addList(){
	const list = document.createElement("li")
	list.innerHTML = input.value
	const checkSpan = document.createElement("span")
	const deleteSpan = document.createElement("span")
	checkSpan.classList.add("check")
	deleteSpan.classList.add("delete")
	list.appendChild(deleteSpan)
	list.appendChild(checkSpan)
	document.querySelector('#task-list').appendChild(list)
	
	addListener(list)
}


function addListener(list){
	const selectCheck = list.querySelector('.check')
	selectCheck.addEventListener('click', () => {
		list.classList.toggle('checked')
	})
	
	const selectDelete = list.querySelector('.delete')
	selectDelete.addEventListener('click', () => {
		list.parentNode.removeChild(list)
	})

}
	
