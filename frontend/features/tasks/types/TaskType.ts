export type Task = {
  id: string
  title: string
  status: TaskStatus
  projectId: string
  createdAt: string
}

export const taskStatuses = ['TODO', 'IN_PROGRESS', 'DONE'] as const

export type TaskStatus = (typeof taskStatuses)[number]

export const STATUS_CONFIG: Record<
  TaskStatus,
  { label: string; dot: string; badge: string; header: string; text: string; count: string }
> = {
  TODO: {
    label: 'To Do',
    dot: 'bg-sky-500',
    badge: 'bg-sky-50 text-blue-700 border-sky-200',
    header: 'bg-sky-50',
    text: 'text-sky-700',
    count: 'bg-sky-100 text-sky-700'
  },
  IN_PROGRESS: {
    label: 'In Progress',
    dot: 'bg-amber-500',
    badge: 'bg-amber-50 text-amber-700 border-amber-200',
    header: 'bg-amber-50',
    text: 'text-amber-700',
    count: 'bg-amber-100 text-amber-700'
  },
  DONE: {
    label: 'Done',
    dot: 'bg-emerald-500',
    badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    header: 'bg-emerald-50',
    text: 'text-emerald-700',
    count: 'bg-emerald-100 text-emerald-700'
  }
}
