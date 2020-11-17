'use strict'

// Fetch existing todos from localStorage
const getSavedTodos =  () =>{
    const todosJSON = localStorage.getItem('todos')

    try{
        return todosJSON ? JSON.parse(todosJSON) : []
    }catch(e){
        return []
    }
}

// Save todos to localStorage
const saveTodos =  (todos)=> {
    localStorage.setItem('todos', JSON.stringify(todos))
}

// Remove todo by id
const removeTodo = (id)=> {
    const todoIndex = todos.findIndex((todo)=> todo.id === id)
    
    if (todoIndex > -1) {
        todos.splice(todoIndex, 1)
    }
}

// Toggle the completed value for a given todo
const toggleTodo = (id)=> {
    const todo = todos.find((todo)=>todo.id === id) 

    if (todo) {
        todo.completed = !todo.completed
    }
}

// Render application todos based on filters
const renderTodos = (todos, filters)=> {
   const todoEL= document.querySelector('#todos')
    if(todos.length > 0)
    {
        const filteredTasks= todos.filter((item)=>{
            if(filters.hideCompleted)
            return (item.text.toLowerCase().includes(filters.searchText.toLowerCase())) && (!item.completed)
            else
            return item.text.toLowerCase().includes(filters.searchText.toLowerCase())
        })

        const incompleteTodos = filteredTasks.filter(function (todo) {
            return !todo.completed
        })

        todoEL.innerHTML = ''
        todoEL.appendChild(generateSummaryDOM(incompleteTodos))

        filteredTasks.forEach((todo)=> {
        todoEL.appendChild(generateTodoDOM(todo))
        })
        
    }else{
        todoEL.innerHTML = ''
        const empty= document.createElement('p')
        empty.classList.add('empty-message')
        empty.textContent= 'No To-dos to show'
        todoEL.appendChild(empty)
    }

}

// Get the DOM elements for an individual note
const generateTodoDOM = (todo)=> {
    const todoEl = document.createElement('label')
    const containerEl= document.createElement('div')
    const checkbox = document.createElement('input')
    const todoText = document.createElement('span')
    const removeButton = document.createElement('button')

    // Setup todo checkbox
    checkbox.setAttribute('type', 'checkbox')
    checkbox.checked = todo.completed
    containerEl.appendChild(checkbox)
    checkbox.addEventListener('change', ()=> {
        toggleTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })

    // Setup the todo text
    todoText.textContent = todo.text
    containerEl.appendChild(todoText)

    //setup container
    todoEl.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    todoEl.appendChild(containerEl)

    // Setup the remove button
    removeButton.textContent = 'Remove'
    removeButton.classList.add('button', 'button--text')
    todoEl.appendChild(removeButton)
    removeButton.addEventListener('click', ()=> {
        removeTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })

    return todoEl
}

// Get the DOM elements for list summary
const generateSummaryDOM = (incompleteTodos)=> {
    const summary = document.createElement('h2')
    summary.classList.add('list-title')
    const plural= incompleteTodos.length === 1 ? '':'s'

    summary.textContent = `You have ${incompleteTodos.length} todo${plural} left`

    return summary
}


