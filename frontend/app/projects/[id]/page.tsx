"use client"

import { useParams } from "next/navigation"
import useTask from "../../../features/tasks/hooks/useTask"
import CreateTaskForm from "../../../features/tasks/ui/CreateTaskForm"
import TaskColumn from "../../../features/tasks/ui/TaskColumn"


export default function ProjectId() {
  const params = useParams()
  const projectId = params.id as string

  const { tasks, isPending, error } = useTask(projectId)

  const todoTasks = tasks?.filter(task => task.status === 'TODO')
  const inProgressTasks = tasks?.filter(task => task.status === 'IN_PROGRESS')
  const doneTasks = tasks?.filter(task => task.status === 'DONE')

  return (
    <>
      <h1>{projectId}</h1>
      <CreateTaskForm projectId={projectId}></CreateTaskForm>

      {isPending && <span>Loading...</span>}
      {error instanceof Error && <span>{error.message}</span>}

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
    </>
  )
}
