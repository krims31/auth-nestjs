import { Task, TaskStatus } from '../types/TaskType'

export interface TaskColumnProps {
  projectId: string
  status: TaskStatus
  tasks?: Task[] | undefined
  onAdd?: () => void
}
