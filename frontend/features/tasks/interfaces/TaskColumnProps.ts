import { Task, TaskStatus } from '../types/TaskType'

export interface TaskColumnProps {
  projectId: string
  status: TaskStatus
  title: string
  tasks?: Task[] | undefined
  onAdd?: () => void
}
