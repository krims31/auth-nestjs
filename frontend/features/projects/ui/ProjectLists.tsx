import useProject from '../hooks/useProject'

export default function ProjectLists() {
	const { project, isPending, error } = useProject()

	// Pending loading.
	if (isPending) {
		return <div>Loading...</div>
	}

	// Check error message and return error message.
	if (error instanceof Error) {
		return <span>{error.message}</span>
	}

	// Return lists of projects.
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
