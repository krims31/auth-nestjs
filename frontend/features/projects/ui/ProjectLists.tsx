import useProject from '../hooks/useProject'

export default function ProjectLists() {
	const { project, isPending, error } = useProject()

	if (isPending) {
		return <div>Loading...</div>
	}

	if (error instanceof Error) {
		return <span>{error.message}</span>
	}

	return (
		<div>
			{project?.map(project => (
				<div key={project.id}>
					<h3>{project.title}</h3>
					<p>{project.description}</p>
				</div>
			))}
		</div>
	)
}
