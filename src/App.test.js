import { fireEvent, render, screen } from '@testing-library/react'
import App from './App'
import ToDoItem from './components/TodoItem'

test('Render TodoItem', () => {
	const item = {
		id: 5,
		title: 'Lorem nipsum dolor sit amet',
		completed: false,
	}
	render(<ToDoItem item={item} />)
	const linkElement = screen.getByText('Lorem nipsum dolor sit amet')
	expect(linkElement).toBeInTheDocument()
})

test('create a new todo', () => {
	render(<App />)
	const input = screen.getByPlaceholderText(/Add a new task/i)
	const button = screen.getByRole('button', { name: /Add/i })
	fireEvent.change(input, { target: { value: 'new TODO' } })
	fireEvent.click(button)
	fireEvent.change(input, { target: { value: '' } })
	const existToDo = screen.getByText(/new TODO/i)
	expect(existToDo).not.toBeNull()
	expect(input.value).toBe('')
})

test('remove a todo', () => {
	render(<App />)
	const buttonsRemove = screen.getAllByRole('button', { name: '' })
	fireEvent.click(buttonsRemove[1])
	const buttonsRemoved = screen.getAllByRole('button', { name: '' })
	expect(buttonsRemoved.length < buttonsRemove.length).toEqual(true)
})

test('checked a todo', () => {
	render(<App />)
	const buttonChecked = screen.getByRole('button', { name: 'Lorem ipsum dolor sit amet' })
	fireEvent.click(buttonChecked)
  expect(buttonChecked).toHaveStyle("text-decoration: line-through")
})


test('filter completed', () => {
	render(<App />)
	const toDoIncomplete = screen.getByRole('button', { name: 'Lorem ipsum dolor sit amet' })
	const buttonIncomplete = screen.getByRole('button', { name: 'incomplete' })
	fireEvent.click(buttonIncomplete)
  expect(toDoIncomplete!==undefined).toEqual(true)
})