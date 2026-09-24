import { useQuery } from '@tanstack/react-query'
import { getProjects } from '../api/projectApi'
export default function useProject() {
	const {
		isPending,
		data: project,
		error
	} = useQuery({
		queryKey: ['projects'],
		queryFn: getProjects
	})

	return {
		project,
		isPending,
		error
	}
}
