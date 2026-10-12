'use client'

import { useParams } from 'next/navigation'
import useTask from '../../../../features/tasks/hooks/useTask'
import TaskColumn from '../../../../features/tasks/ui/TaskColumn'
import ProjectToolbar from '../../../../features/projects/ui/ProjectToolbar'

export default function ProjectId() {
  const params = useParams()
  const projectId = params.id as string

  const { isPending, error, todoTasks, inProgressTasks, doneTasks } =
    useTask(projectId)

  return (
    <>
      {/* <CreateTaskForm projectId={projectId}></CreateTaskForm> */}

      {/* <CreateTaskForm /> */}

      {isPending && <span>Loading...</span>}

      {error instanceof Error && <span>{error.message}</span>}

      <ProjectToolbar />

      {!isPending && !error && (
        <div className="flex gap-4 mt-6 items-start overflow-x-auto pb-4">
          <TaskColumn
            title="TODO"
            tasks={todoTasks}
            projectId={projectId}
          />
          <TaskColumn
            title="IN_PROGRESS"
            tasks={inProgressTasks}
            projectId={projectId}
          />

          <TaskColumn
            title="DONE"
            tasks={doneTasks}
            projectId={projectId}
          />
        </div>
      )}
    </>
  )
}
