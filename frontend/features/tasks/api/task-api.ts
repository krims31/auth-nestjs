import ApiClient from '../../../shared/api/api-client'
import { Task } from '../types/TaskType'
export async function getTasks(projectId: string): Promise<Task[]> {
	return ApiClient(`/projects/${projectId}/tasks`)
}

export async function createTasks(projectId: string, data: { title: string }) {
	return ApiClient(`/projects/${projectId}/tasks`, {
		method: 'POST',
		body: data
	})
}

export async function updateTasks(
	projectId: string,
	taskId: string,
	status: Task
) {
	return ApiClient(`/projects/${projectId}/tasks/${taskId}`, {
		method: 'PATCH',
		body: { status }
	})
}
