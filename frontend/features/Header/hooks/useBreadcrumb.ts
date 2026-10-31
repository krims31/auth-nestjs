import { useParams, usePathname } from 'next/navigation'
import useProject from '../../../../features/projects/hooks/useProject'

export default function useBreadcrumb() {
	const pathname = usePathname()
  const params = useParams()

  // Project data;
  const { project: projects } = useProject()

  // Check if the current path is a project path and get the project ID
  const isProject = pathname.startsWith('/projects')

  // Get the current project ID from the URL params
  const projectId = params.id as string | undefined

  // Find the current project from the project data
  const currentProject = projects?.find(project => project.id === projectId)

  // Generate the breadcrumb text based on the current path and project data
  const breadcrumb =
    isProject && currentProject
      ? `Projects / ${currentProject.title}`
      : 'Projects'

	return {
		breadcrumb
	}
}