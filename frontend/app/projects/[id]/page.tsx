import { useParams } from "next/navigation"
import useTask from "../../../features/tasks/hooks/useTask"
import CreateTaskForm from "../../../features/tasks/ui/CreateTaskForm"

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

      {tasks?.map(task => (
        <li key={task.id}>
          <p>{task.title}</p>
          <p>{task.status}</p>
        </li>
      ))}
    </>
  )
}
