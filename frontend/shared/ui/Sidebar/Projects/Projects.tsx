import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import useProject from '../../../../features/projects/hooks/useProject'
import CreateProjectForm from '../../../../features/projects/ui/CreateProjectForm'
const COLORS = ['bg-sky-500', 'bg-amber-500', 'bg-emerald-500', 'bg-violet-500', 'bg-rose-500']

export default function Projects() {
  const { project: projects } = useProject()

  const params = useParams()
  const activeId = params.id as string | undefined

  // Open Dialog for the create project.
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <SidebarGroup className='flex-1 min-h-0 relative top-10'>
      <SidebarGroupLabel className='h-10 px-3 text-base font-semibold text-sidebar-foreground/70'>
        Projects
        {projects && (
          <span className='ml-2 rounded-full bg-sidebar-accent px-2 text-xs font-normal text-sidebar-foreground/70'>
            {projects.length}
          </span>
        )}
      </SidebarGroupLabel>
      <SidebarGroupAction
        aria-label='New project'
        title='New project'
        onClick={() => setIsOpen(true)}
        className='top-2.5 rounded-md border border-sidebar-border text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground'
      >
        <Plus />
      </SidebarGroupAction>

      <SidebarGroupContent className='min-h-0 overflow-y-auto rounded-xl border border-sidebar-border bg-sidebar-accent/30 p-1.5'>
        <SidebarMenu className='gap-1'>
          {projects?.map((p, i) => (
            <SidebarMenuItem key={p.id}>
              <SidebarMenuButton
                isActive={p.id === activeId}
                className='relative h-10 gap-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent/60 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:before:absolute data-[active=true]:before:left-0 data-[active=true]:before:top-2 data-[active=true]:before:bottom-2 data-[active=true]:before:w-0.5 data-[active=true]:before:rounded-full data-[active=true]:before:bg-blue-500'
                render={<Link href={`/projects/${p.id}`} />}
              >
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-xs font-semibold text-white ring-1 ring-white/10 ${COLORS[i % COLORS.length]}`}
                >
                  {p.title.charAt(0).toUpperCase()}
                </span>
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
