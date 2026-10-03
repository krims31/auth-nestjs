'use client'

import { useParams, usePathname } from "next/navigation"
import useProject from "../../../features/projects/hooks/useProject"

export default function Header() {
  const pathname = usePathname()
  const params = useParams()

  const { project: projects } = useProject()

  const isProject = pathname.startsWith('/projects')
  const currentProjectId = params.id as string | undefined

  const currentProject = projects?.find(project => project.id === currentProjectId)

  const breadcrumb = isProject && currentProject
      ? `Projects / ${currentProject.title}`
      : 'Projects'

    return (
      <div className="flex items-center justify-between p-4 border-b relative bottom-11 left-4">
        <span className="text-lg text-gray-500">{breadcrumb}</span>
      </div>
    )
}
