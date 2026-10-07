'use client'

import { Bell, Share2, Star } from 'lucide-react'
import Image from 'next/image'
import { useParams, usePathname } from 'next/navigation'
import useProject from '../../../features/projects/hooks/useProject'
import CalendarView from '../CalendarView/CalendarView'
import DropDownMenuAvatar from '../DropDown/DropDownMenuAvatar'
import KanbanView from '../KanbanView/KanbanView'
import ListView from '../ListView/ListView'

export default function Header() {
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
  const breadcrumb = isProject && currentProject ? `Projects / ${currentProject.title}` : 'Projects'

  return (
    <>
      <header className='flex items-center justify-between p-4 relative bottom-12 left-4 border-b'>
        {/* Left part: Breadcrumb */}
        <div className='flex items-center'>
          <span className='text-lg text-gray-500 font-medium ml-5'>{breadcrumb}</span>
        </div>

        {/* Right part: Icons */}
        <div className='flex items-center gap-4'>
          <div className='border rounded-sm h-8 w-8 flex items-center justify-center'>
            <Star className='h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors' />
          </div>

          <div className='border rounded-sm h-8 w-8 flex items-center justify-center'>
            <Share2 className='h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors' />
          </div>

          <div className='border rounded-sm h-8 w-8 flex items-center justify-center'>
            <Bell className='h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors' />
          </div>
          <DropDownMenuAvatar />
        </div>
      </header>
      <main>
        <div>
          <Image
            src='/logo.jpeg'
            width={50}
            height={50}
            className='absolute top-2 left-3'
            alt='Picture of the author'
          />
          <h1 className=''>{currentProject?.title}</h1>
        </div>
        <div>
          <KanbanView />
          <ListView />
          <CalendarView />
        </div>
      </main>
    </>
  )
}
