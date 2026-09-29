import { Task } from "../types/TaskType";

export interface TaskColumnProps {
  projectId: string;
  title: string;
  tasks: Task[] | undefined;
}
