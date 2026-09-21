'use client'

import { useEffect, useState } from 'react'
import { getProjects } from '../../features/projects/api/projectApi'
import { Project } from '../../features/projects/types/ProjectFromValues'
import ProtectedRoute from '../../shared/ui/ProtectedRoute/ProtectedRoute'

export default function KanbanBoard() {
	const [project, setProject] = useState<Project[]>([])

	useEffect(() => {
		const fetchProjects = async () => {
			try {
				const data = await getProjects()
				setProject(data)
			} catch (error) {
				console.error('Error will be loading projects:', error)
			}
		}
		fetchProjects()
	}, [])
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
