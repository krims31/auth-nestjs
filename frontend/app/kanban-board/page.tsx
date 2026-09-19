import ProtectedRoute from '../../shared/ui/ProtectedRoute/ProtectedRoute'

export default function KanbanBoard() {
	return (
		<>
			<ProtectedRoute>
				<h1>Kanban Board</h1>
			</ProtectedRoute>
		</>
	)
}
