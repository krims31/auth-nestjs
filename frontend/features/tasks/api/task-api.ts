import ApiClient from '../../../shared/api/api-client'
import { Task } from '../types/task'
export async function getTasks(projectId: Task) {
	return ApiClient(`/projects/${projectId}/tasks`)
}

export async function createTasks(projectId: Task, data: Task) {
	return ApiClient(`/projects/${projectId}/tasks`, {
		method: 'POST',
		body: data
	})
}

export async function updateTasks(projectId: Task, taskId: Task, status: Task) {
	return ApiClient(`/projects/${projectId}/tasks/${taskId}`, {
		method: 'PATCH',
		body: { status }
	})
}
