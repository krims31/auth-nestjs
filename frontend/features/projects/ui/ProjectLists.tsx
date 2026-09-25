import Link from 'next/link'
import useProject from '../hooks/useProject'

export default function ProjectLists() {
	const { project, isPending, error } = useProject()

	// Pending loading.
	if (isPending) {
		return <span className="text-2xl flex items-center h-screen">Loading...</span>
	}

	// Check error message and return error message.
	if (error instanceof Error) {
		return <span>{error.message}</span>
	}

	// Return lists of projects.
	return (
		<div>
			{project?.map(project => (
				<Link
					href={`/projects/${project.id}`}
					key={project.id}
				>
					<h3>{project.title}</h3>
					<p>{project.description}</p>
				</Link>
			))}
		</div>
	)
}
