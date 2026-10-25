import { DragEndEvent, DragStartEvent } from '@dnd-kit/core'

import { useCallback } from 'react'
import { TaskStatus } from '../types/TaskType'
import useProjectId from './useProjectId'

const statuses: TaskStatus[] = ['TODO', 'IN_PROGRESS', 'DONE']

export default function useDragEnd() {
  const {
    isPending,
    error,
    todoTasks,
    projectId,
    inProgressTasks,
    doneTasks,
    updateStatus,
    deleteTask,
    isActiveTask,
    setIsActiveTask,
    sensors,
    keyboardSensor,
    pointerSensor
  } = useProjectId()

  // Find the task by ID status lists.
  const handleDragStart = useCallback(
    (event: DragStartEvent) => {
      const id = String(event.active.id)

      const task =
        todoTasks?.find(t => t.id === id) ??
        inProgressTasks?.find(t => t.id === id) ??
        doneTasks?.find(t => t.id === id) ??
        null

      setIsActiveTask(task)
    },
    [todoTasks, inProgressTasks, doneTasks]
  )

  const handleDragCancel = useCallback(() => setIsActiveTask(null), [])

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      setIsActiveTask(null)

      const { active, over } = event
      if (!over || active.id === over.id) return

      const overId = String(over.id)

      const targetStatus = statuses.includes(overId as TaskStatus)
        ? (overId as TaskStatus)
        : (over.data.current?.status as TaskStatus | undefined)

      if (!targetStatus) return

      const currentStatus = active.data.current?.status as TaskStatus | undefined
      if (currentStatus === targetStatus) return

      updateStatus(String(active.id), targetStatus)
    },
    [updateStatus]
  )

  return {
    isActiveTask,
    handleDragStart,
    handleDragCancel,
    handleDragEnd,
    isPending,
    error,
    sensors,
    keyboardSensor,
    pointerSensor,
    todoTasks,
    inProgressTasks,
    doneTasks,
    projectId,
    deleteTask
  }
}
