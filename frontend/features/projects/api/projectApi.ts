import ApiClient from '../../../shared/api/api-client'
import { Project } from '../types/ProjectFromValues'

export async function getProject(): Promise<Project[]> {
	return ApiClient('/projects')
}

export async function createProject(data: {
	title: string
	description?: string
}): Promise<Project> {
	return ApiClient('/projects', { method: 'POST', body: data })
}
