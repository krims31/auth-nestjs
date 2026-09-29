import { TaskColumnProps } from "../interfaces/TaskColumnProps";
import TaskItem from "./TaskItem";

export default function TaskColumn({ projectId, title, tasks }: TaskColumnProps) {

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
