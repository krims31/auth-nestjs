import useProject from '../../projects/hooks/useProject'

export default function ProjectLists() {
	const { project } = useProject()

	return (
		<div>
			{project.map(project => (
				<div key={project.id}>
					<h3>{project.title}</h3>
					<p>{project.description}</p>
				</div>
			))}
		</div>
	)
}
