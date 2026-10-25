import { useParams } from 'next/navigation'
import { useState } from 'react'
import { Task } from '../types/TaskType'
import useDeleteTask from './useDeleteTask'
import useDndSensors from './useDndSensors'
import useTask from './useTask'
import useUpdateTaskStatus from './useUpdateTaskStatus'

export default function useProjectId() {
  const params = useParams()
  const projectId = params.id as string

  const { isPending, error, todoTasks, inProgressTasks, doneTasks } = useTask(projectId)

  const { updateStatus } = useUpdateTaskStatus(projectId)

  const { deleteTask } = useDeleteTask(projectId)

  const [isActiveTask, setIsActiveTask] = useState<Task | null>(null)

  const { sensors, keyboardSensor, pointerSensor } = useDndSensors()

  return {
    isPending,
    error,
    todoTasks,
    inProgressTasks,
    doneTasks,
    updateStatus,
    deleteTask,
    isActiveTask,
    setIsActiveTask,
    sensors,
    projectId,
    keyboardSensor,
    pointerSensor
  }
}
