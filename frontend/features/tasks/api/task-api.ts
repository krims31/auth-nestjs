import ApiClient from '../../../shared/api/api-client'
export async function getTasks(projectId: string) {
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
	status: string
) {
	return ApiClient(`/projects/${projectId}/tasks/${taskId}`, {
		method: 'PATCH',
		body: { status }
	})
}
