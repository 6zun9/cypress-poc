import axios from 'axios';

export const saveTodo = todo => axios.post('http://localhost:3030/api/todos', todo)

export const loadTodo = () => axios.get('http://localhost:3030/api/todos')

export const distroyTodo = id => axios.delete(`http://localhost:3000/api/todos/${id}`)

export const updateTodo = todo => axios.put(`http://localhost:3000/api/todos/${todo.id}`,todo)