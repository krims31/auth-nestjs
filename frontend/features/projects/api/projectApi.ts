import ApiClient from '../../../shared/api/api-client'

type Project = {
  id: string
  title: string
  description: string | null
  ownerId: string
  createAt: string
}

// Get /projects
export async function getProjects(): Promise<Project[]> {
  return ApiClient<Project[]>('/projects')
}

// Create projects
export async function createProject(data: {
  title: string
  description?: string
}): Promise<Project> {
  return ApiClient<Project>('/projects', { method: 'POST', body: data })
}
