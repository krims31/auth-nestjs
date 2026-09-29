import useTask from "../hooks/useTask";
import { TaskColumnProps } from "../interfaces/TaskColumnProps";
import TaskItem from "./TaskItem";

export default function TaskColumn({ projectId, title, tasks }: TaskColumnProps) {
  const { isPending, error } = useTask(projectId)

  if (isPending === true) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div>
      <h2>{title}</h2>
      <ul>
        {tasks?.map(task => (
          <TaskItem key={task.id} task={task} projectId={projectId} />
        ))}
      </ul>
    </div>
  )
}
