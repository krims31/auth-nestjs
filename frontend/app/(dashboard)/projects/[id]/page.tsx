'use client'

import {
  closestCorners,
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
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

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e
    if (!over) return

    const taskId = active.id as string

    const statuses: TaskStatus[] = ['TODO', 'IN_PROGRESS', 'DONE']

    // 1) Throw a direct on the column (In empty place)
    if (statuses.includes(over.id as TaskStatus)) {
      updateStatus(taskId, over.id as TaskStatus)
      return
    }

    // 2) Throw on the task — take a status this task
    const overStatus = over.data.current?.status as TaskStatus | undefined
    if (overStatus) updateStatus(taskId, overStatus)
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
