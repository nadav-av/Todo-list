'use strict'

let todos = getSavedTodos()

const filters = {
    searchText: '',
    hideCompleted: false
}

renderTodos(todos, filters)

document.querySelector('#search-text').addEventListener('input', (e)=> {
    filters.searchText = e.target.value
    renderTodos(todos, filters)
})

document.querySelector('#new-todo').addEventListener('submit',  (e)=> {
    e.preventDefault()
    const trimmed= e.target.elements.text.value.trim()
    if(trimmed.length>0)
    {
    todos.push({
        id: uuidv4(),
        text: e.target.elements.text.value,
        completed: false
    })
    saveTodos(todos)
    renderTodos(todos, filters)
    e.target.elements.text.value = ''
}
})

document.querySelector('#hide-completed').addEventListener('change',  (e)=>{
    filters.hideCompleted = e.target.checked
    renderTodos(todos, filters)
})


    //for 2 tabs live changing by updating storage
    window.addEventListener('storage', (e)=>{
        if(e.key== 'todos')
            todos= JSON.parse(e.newValue)
        
        renderTodos(todos, filters)
    })
