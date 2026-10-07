'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Bell, Share2, Star } from 'lucide-react'
import Image from 'next/image'
import { useParams, usePathname } from 'next/navigation'
import { useState } from 'react'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import useProject from '../../../features/projects/hooks/useProject'
import CreateTaskForm from '../../../features/tasks/ui/CreateTaskForm'
import CalendarView from '../CalendarView/CalendarView'
import DropDownMenuAvatar from '../DropDown/DropDownMenuAvatar'
import KanbanView from '../KanbanView/KanbanView'
import ListView from '../ListView/ListView'

export default function Header() {
  const pathname = usePathname()
  const params = useParams()

  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState<boolean>(false)

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
      <main className='px-1 pt-0'>
        <div className='flex items-center gap-3 mb-2'>
          <Image src='/logo.jpeg' width={40} height={40} className='rounded' alt='Project icon' />
          <h1 className='text-2xl font-semibold'>{currentProject?.title}</h1>
        </div>

        <div className='flex items-center justify-between mb-2'>
          <div className='flex gap-4'>
            <KanbanView />
            <ListView />
            <CalendarView />
          </div>

          <div className='flex items-center gap-3'>
            <Input placeholder='Search' className='w-64 mt-10' />
            <Button variant='outline' className='mt-10'>
              Filter
            </Button>
            <Button onClick={() => setIsTaskDialogOpen(true)} className='mt-10'>
              Create Task
            </Button>
            <Dialog open={isTaskDialogOpen} onOpenChange={setIsTaskDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>New Task</DialogTitle>
                </DialogHeader>
                <CreateTaskForm projectId={projectId as string} />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className='h-px w-full bg-gray-300 mt-3' />
      </main>
    </>
  )
}
