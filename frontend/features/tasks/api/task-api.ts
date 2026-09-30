import ApiClient from '../../../shared/api/api-client'
import { Task, TaskStatus } from '../types/TaskType'

// getTasks async function for projects/id/tasks
export async function getTasks(projectId: string): Promise<Task[]> {
	return ApiClient(`/projects/${projectId}/tasks`)
}

// createTasks async function for projects/id/tasks
export async function createTasks(projectId: string, data: { title: string }) {
	return ApiClient(`/projects/${projectId}/tasks`, {
		method: 'POST',
		body: data
	})
}

// UpdateTasks async function for projects/id/tasks/id
export async function updateTasks(
	projectId: string,
	taskId: string,
	status: TaskStatus
) {
	return ApiClient(`/projects/${projectId}/tasks/${taskId}`, {
		method: 'PATCH',
		body: { status }
	})
}
