import { useEffect, useState } from 'react'
import { getProjects } from '../api/projectApi'
import { Project } from '../types/ProjectFromValues'

export default function useProject() {
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

	return {
		project
	}
}
