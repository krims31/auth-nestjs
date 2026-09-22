'use client'

import ProjectLists from '../../features/projects/project/ProjectLists'
import ProtectedRoute from '../../shared/ui/ProtectedRoute/ProtectedRoute'

export default function KanbanBoard() {
	return (
		<>
			<ProtectedRoute>
				<ProjectLists />
			</ProtectedRoute>
		</>
	)
}
