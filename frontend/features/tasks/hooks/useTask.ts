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

	return {
		tasks,
		isPending,
		error
	}
}
