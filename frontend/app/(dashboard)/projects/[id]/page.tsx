'use client'

import {
  closestCorners,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { useParams } from 'next/navigation'
import ProjectToolbar from '../../../../features/projects/ui/ProjectToolbar'
import useTask from '../../../../features/tasks/hooks/useTask'
import useUpdateTaskStatus from '../../../../features/tasks/hooks/useUpdateTaskStatus'
import { TaskStatus } from '../../../../features/tasks/types/TaskType'
import TaskColumn from '../../../../features/tasks/ui/TaskColumn'

export default function ProjectId() {
  const params = useParams()
  const projectId = params.id as string

  const { isPending, error, todoTasks, inProgressTasks, doneTasks } = useTask(projectId)

  const { updateStatus } = useUpdateTaskStatus(projectId)

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } 
  }),
  useSensor(KeyboardSensor, {
  coordinateGetter: sortableKeyboardCoordinates
  }),
)

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const taskId = String(active.id)

    const statuses: TaskStatus[] = ['TODO', 'IN_PROGRESS', 'DONE']


    const targetStatuses = statuses.includes(String(over.id) as TaskStatus) ? (String(over.id) as TaskStatus) : (over.data.current?.status as TaskStatus | undefined)

    if (!targetStatuses) return;

    const currentStatus = active.data.current?.status as TaskStatus | undefined

    if (currentStatus === targetStatuses) return

    updateStatus(taskId, targetStatuses)
  }

  return (
    <>
      {/* <CreateTaskForm projectId={projectId}></CreateTaskForm> */}

      {/* <CreateTaskForm /> */}

      <ProjectToolbar />

      {isPending && <span>Loading...</span>}

      {error instanceof Error && <span>{error.message}</span>}

      {!isPending && !error && (
        <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
          <div className='flex gap-4 mt-6 items-start overflow-x-auto pb-4'>
            <TaskColumn projectId={projectId} status='TODO' tasks={todoTasks} />
            <TaskColumn projectId={projectId} status='IN_PROGRESS' tasks={inProgressTasks} />
            <TaskColumn projectId={projectId} status='DONE' tasks={doneTasks} />
          </div>
        </DndContext>
      )}
    </>
  )
}
