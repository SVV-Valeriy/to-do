import axios from 'axios'

export const instance = axios.create({
	withCredentials: true,
	baseURL: 'https://jsonplaceholder.typicode.com/',
	headers: {
		'Content-Type': 'application/json'
	}
})

export const todoApi = {
	getTodos(limit?: number) {
		return instance.get(`todos?_limit=${limit}`)
	},
	deleteTodos(id: string) {
		return instance.delete(`todos/${id}`)
	},
	changeStatus(id: string, completed: boolean) {
		return instance.patch(`todos/${id}`, { completed: completed })
	}
}
