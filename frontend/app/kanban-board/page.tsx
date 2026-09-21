'use client'

import useProject from '../../features/projects/hooks/useProject'
import ProtectedRoute from '../../shared/ui/ProtectedRoute/ProtectedRoute'

export default function KanbanBoard() {
	const { project } = useProject()
	return (
		<>
			<ProtectedRoute>
				<div>
					{project.map(project => (
						<div key={project.id}>
							<h3>{project.title}</h3>
							<p>{project.description}</p>
						</div>
					))}
				</div>
			</ProtectedRoute>
		</>
	)
}
