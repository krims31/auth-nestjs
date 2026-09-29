import { useQuery } from '@tanstack/react-query'
import { getTasks } from '../api/task-api'


export default function useTask(projectId: string) {
	const {
		isPending,
		data: tasks,
    error
	} = useQuery({
		queryKey: ['tasks', projectId],
		queryFn: () => getTasks(projectId)
  })

	const todoTasks = tasks?.filter(task => task.status === 'TODO')
  const inProgressTasks = tasks?.filter(task => task.status === 'IN_PROGRESS')
  const doneTasks = tasks?.filter(task => task.status === 'DONE')

	return {
		tasks,
		isPending,
    error,
    todoTasks,
    inProgressTasks,
    doneTasks,
	}
}
