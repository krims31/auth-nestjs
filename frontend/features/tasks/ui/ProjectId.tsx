import { useParams } from "next/navigation"
import CreateTaskForm from "./CreateTaskForm"

export default function ProjectId() {
  const params = useParams()
  return (
    <>
      <CreateTaskForm projectId={params.id as string}></CreateTaskForm>
    </>
  )
}
