"use client"

import { useParams } from "next/navigation"
import useTask from "../../../features/tasks/hooks/useTask"
import CreateTaskForm from "../../../features/tasks/ui/CreateTaskForm"
import TaskItem from "../../../features/tasks/ui/TaskItem"

export default function ProjectId() {
  const params = useParams()
  const projectId = params.id as string

  const {tasks, isPending, error} = useTask(projectId)

  return (
    <>
      <h1>{projectId}</h1>
      <CreateTaskForm projectId={projectId}></CreateTaskForm>

      {isPending && <span>Loading...</span>}
      {error instanceof Error && <span>{error.message}</span>}

      <ul className="flex flex-col gap-3 mt-4">
            {tasks?.map(task => (
            <TaskItem key={task.id} task={task} projectId={projectId} />
          ))}
      </ul>
    </>
  )
}
