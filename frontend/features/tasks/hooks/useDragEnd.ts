import { DragEndEvent, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'

import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { useParams } from 'next/navigation'
import { TaskStatus } from '../types/TaskType'
import useTask from './useTask'
import useUpdateTaskStatus from './useUpdateTaskStatus'
export default function useDragEnd() {
  const params = useParams()
  const projectId = params.id as string

  const { isPending, error, todoTasks, inProgressTasks, doneTasks } = useTask(projectId)
  const { updateStatus } = useUpdateTaskStatus(projectId)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const taskId = String(active.id)

    const statuses: TaskStatus[] = ['TODO', 'IN_PROGRESS', 'DONE']

    const targetStatuses = statuses.includes(String(over.id) as TaskStatus)
      ? (String(over.id) as TaskStatus)
      : (over.data.current?.status as TaskStatus | undefined)

    if (!targetStatuses) return

    const currentStatus = active.data.current?.status as TaskStatus | undefined

    if (currentStatus === targetStatuses) return

    updateStatus(taskId, targetStatuses)
  }

  return {
    projectId,
    handleDragEnd,
    sensors,
    isPending,
    todoTasks,
    error,
    doneTasks,
    inProgressTasks
  }
}
