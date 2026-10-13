export type Task = {
  id: string
  title: string
  status: TaskStatus
  projectId: string
  createdAt: string
}

export const STATUS_CONFIG: Record<
  TaskStatus,
  { label: string; dot: string; badge: string; header: string }
> = {
  TODO: {
    label: 'To Do',
    dot: 'bg-sky-500',
    badge: 'bg-sky-50 text-sky-700 border-sky-200',
    header: 'bg-sky-50'
  },
  IN_PROGRESS: {
    label: 'In Progress',
    dot: 'bg-amber-500',
    badge: 'bg-amber-50 text-amber-700 border-amber-200',
    header: 'bg-amber-50'
  },
  DONE: {
    label: 'Done',
    dot: 'bg-emerald-500',
    badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    header: 'bg-emerald-50'
  }
}

export const taskStatuses = ['TODO', 'IN_PROGRESS', 'DONE'] as const

export type TaskStatus = (typeof taskStatuses)[number]
