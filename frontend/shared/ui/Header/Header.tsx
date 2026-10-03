'use client'

import { useParams, usePathname } from "next/navigation"
import useProject from "../../../features/projects/hooks/useProject"

export default function Header() {
  const pathname = usePathname()
  const params = useParams()

  // Project data;
  const { project: projects } = useProject()

  // Check if the current path is a project path and get the project ID
  const isProject = pathname.startsWith('/projects')

  // Get the current project ID from the URL params
  const currentProjectId = params.id as string | undefined

  // Find the current project from the project data
  const currentProject = projects?.find(project => project.id === currentProjectId)

  // Generate the breadcrumb based on the current path and project data
  const breadcrumb = isProject && currentProject
      ? `Projects / ${currentProject.title}`
      : 'Projects'

    return (
      <div className="flex items-center justify-between p-4 border-b relative bottom-11 left-4">
        <span className="text-lg text-gray-500">{breadcrumb}</span>
      </div>
    )
}
