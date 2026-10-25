import {
  DragEndEvent,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'

import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { useParams } from 'next/navigation'
import { useCallback, useState } from 'react'
import type { Task } from '../types/TaskType'
import { TaskStatus } from '../types/TaskType'
import useDeleteTask from './useDeleteTask'
import useTask from './useTask'
import useUpdateTaskStatus from './useUpdateTaskStatus'

export default function useDragEnd() {
  const params = useParams()
  const projectId = params.id as string

  const { isPending, error, todoTasks, inProgressTasks, doneTasks } = useTask(projectId)

  const { updateStatus } = useUpdateTaskStatus(projectId)

  const { deleteTask } = useDeleteTask(projectId)

  const [isActiveTask, setIsActiveTask] = useState<Task | null>(null)

  const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 3 } })

  const keyboardSensor = useSensor(KeyboardSensor, {
    coordinateGetter: sortableKeyboardCoordinates
  })

  const sensors = useSensors(pointerSensor, keyboardSensor)

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

  // Clear the active task state.
  const handleDragCancel = useCallback(() => setIsActiveTask(null), [])

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      setIsActiveTask(null)

      const { active, over } = event
      if (!over || active.id === over.id) return

      const statuses: TaskStatus[] = ['TODO', 'IN_PROGRESS', 'DONE']

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
    projectId,
    isActiveTask,
    handleDragStart,
    handleDragCancel,
    handleDragEnd,
    sensors,
    isPending,
    error,
    todoTasks,
    inProgressTasks,
    doneTasks,
    deleteTask
  }
}
