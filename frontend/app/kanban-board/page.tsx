'use client'

import CreateProjectForm from '../../features/projects/ui/CreateProjectForm'
import ProjectLists from '../../features/projects/ui/ProjectLists'
import ProtectedRoute from '../../shared/ui/ProtectedRoute/ProtectedRoute'

export default function KanbanBoard() {
	return (
		<>
			<ProtectedRoute>
				<CreateProjectForm />
				<ProjectLists />
			</ProtectedRoute>
		</>
	)
}
