import './index.css'
import { useState } from 'react'
import ToDoItem from './components/TodoItem'
import FilterButton from './components/FilterButton'

const initialData = [
	{ id: 1, title: 'Lorem ipsum dolor sit amet', completed: false },
	{ id: 2, title: 'Vivamus id arcu laoreet', completed: false },
	{ id: 3, title: 'Donec cursus mi', completed: true },
	{ id: 4, title: 'Aenean id fringilla justo', completed: false },
]

const ToDo = () => {
	const [addTodo, setAddTodo] = useState('')
	const [filter, setFilter] = useState('all')
	const [todos, setTodos] = useState(initialData)

	const handleStatus = (item) => {
		const list = []
		todos.forEach((element) => {
			if (element.id === item.id) {
				item.completed = !item.completed
			}
			list.push(element)
		})
		setTodos(list)
	}

	const handleRemove = (item) => {
		const ItemRemoved = todos.filter((element) => item.id !== element.id)
		setTodos(ItemRemoved)
	}

	const handleAddTodo = () => {
		const newTodo = {
			id: todos.length + 1,
			title: addTodo,
			completed: false,
		}
		setTodos([...todos, newTodo])
		setAddTodo('')
	}

	const filterTodos = () => {
		if (filter === 'complete') {
			return todos.filter((element) => element.completed === true)
		} else if (filter === 'incomplete') {
			return todos.filter((element) => element.completed === false)
		}
		return todos
	}

	const handleChange = (e) => {
		setAddTodo(e.target.value)
	}

	const visibleTodos = filterTodos()
	const doneCount = todos.filter((item) => item.completed === true).length

	return (
		<div>
			<div className='field'>
				<input placeholder='Add a new task' value={addTodo} onChange={handleChange} />
				<button className='btn btn--add' onClick={handleAddTodo} disabled={addTodo.length < 1}>
					Add
				</button>
			</div>
			<div className='filter-wrapper'>
				<div className='filter-tabs'>
					<FilterButton activeFilter={filter} filter='all' onClick={() => setFilter('all')} />
					<FilterButton activeFilter={filter} filter='complete' onClick={() => setFilter('complete')} />
					<FilterButton activeFilter={filter} filter='incomplete' onClick={() => setFilter('incomplete')} />
				</div>
				<p style={{ lineHeight: 1.5 }}>{doneCount === todos.length ? `🎉 ${doneCount}/${todos.length} all todos complete!` : `${doneCount}/${todos.length} todos complete`}</p>
			</div>
			{visibleTodos.length === 0 ? (
				<p style={{ paddingLeft: '1rem' }}>No todos to show here...</p>
			) : (
				visibleTodos.length > 0 &&
				visibleTodos.map((item, idx) => {
					return <ToDoItem key={idx} item={item} handleStatus={() => handleStatus(item)} handleRemove={() => handleRemove(item)} />
				})
			)}
		</div>
	)
}

export default function App() {
	return (
		<div className='container'>
			<h1>
				<strong>ToDo</strong> List
			</h1>
			<ToDo />
		</div>
	)
}
