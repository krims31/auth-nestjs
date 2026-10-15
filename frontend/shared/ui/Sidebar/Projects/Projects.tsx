import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton
} from '@/components/ui/sidebar'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import useProject from '../../../../features/projects/hooks/useProject'
import CreateProjectForm from '../../../../features/projects/ui/CreateProjectForm'

export default function Projects() {
  const { project: projects, isPending, error } = useProject()
  const params = useParams()
  const activeId = params.id as string | undefined
  const [isOpen, setIsOpen] = useState(false)

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Projects</SidebarGroupLabel>
      <SidebarGroupAction aria-label='New project' onClick={() => setIsOpen(true)}>
        <Plus />
      </SidebarGroupAction>

      <SidebarGroupContent>
        <SidebarMenu>
          {isPending && <SidebarMenuSkeleton />}
          {error instanceof Error && <li className='px-2 text-xs text-red-500'>{error.message}</li>}
          {projects?.length === 0 && (
            <li className='px-2 text-xs text-gray-400'>No projects yet</li>
          )}
          {projects?.map(p => (
            <SidebarMenuItem key={p.id}>
              <SidebarMenuButton
                isActive={p.id === activeId}
                render={<Link href={`/projects/${p.id}`} />}
              >
                <span className='truncate'>{p.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Project</DialogTitle>
          </DialogHeader>
          <CreateProjectForm /* onSuccess={() => setIsOpen(false)} */ />
        </DialogContent>
      </Dialog>
    </SidebarGroup>
  )
}
