export type Task = {
	id: string
	title: string
	status: string
	projectId: string
	createdAt: string
}

export const TASK_STATUSES = ['TODO', 'IN_PROGRESS', 'DONE'] as const

export type TaskStatus = (typeof TASK_STATUSES)[number]
