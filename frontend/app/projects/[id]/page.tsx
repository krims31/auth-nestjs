import { useParams } from 'next/navigation'
import useTask from '../../../features/tasks/hooks/useTask'

export default function ProjectId() {
	const params = useParams()

	const { tasks, isPending, error } = useTask(params.id as string)

	if (isPending) {
		return <span>Loading...</span>
	}

	if (error instanceof Error) {
		return <span>{error.message}</span>
	}

	return (
		<div>
			<h1>{params.id}</h1>
			{tasks?.map(task => (
				<div key={task.id}>
					<p>{task.title}</p>
					<p>{task.status}</p>
				</div>
			))}
		</div>
	)
}
