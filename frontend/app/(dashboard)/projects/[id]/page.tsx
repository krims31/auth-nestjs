'use client'

import { closestCorners, DndContext } from '@dnd-kit/core'

import ProjectToolbar from '../../../../features/projects/ui/ProjectToolbar'

import useDragEnd from '../../../../features/tasks/hooks/useDragEnd'
import TaskColumn from '../../../../features/tasks/ui/TaskColumn'

export default function ProjectId() {
  const {
    sensors,
    handleDragEnd,
    isPending,
    error,
    projectId,
    todoTasks,
    doneTasks,
    inProgressTasks
  } = useDragEnd()

  return (
    <>
      {/* <CreateTaskForm projectId={projectId}></CreateTaskForm> */}

      {/* <CreateTaskForm /> */}

      <ProjectToolbar />

      {isPending && <span>Loading...</span>}

      {error instanceof Error && <span>{error.message}</span>}

      {!isPending && !error && (
        <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
          <div className='flex gap-4 items-start overflow-x-auto pb-4 relative bottom-5'>
            <TaskColumn projectId={projectId} status='TODO' tasks={todoTasks} />
            <TaskColumn projectId={projectId} status='IN_PROGRESS' tasks={inProgressTasks} />
            <TaskColumn projectId={projectId} status='DONE' tasks={doneTasks} />
          </div>
        </DndContext>
      )}
    </>
  )
}
