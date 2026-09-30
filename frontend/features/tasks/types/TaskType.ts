export type Task = {
	id: string
	title: string
	status: TaskStatus
	projectId: string
	createdAt: string
}

export const taskStatuses = ['TODO', 'IN_PROGRESS', 'DONE'] as const

export type TaskStatus = (typeof taskStatuses)[number]
