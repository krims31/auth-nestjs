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

const COLORS = ['bg-sky-500', 'bg-amber-500', 'bg-emerald-500', 'bg-violet-500', 'bg-rose-500']

export default function Projects() {
  const { project: projects, isPending, error } = useProject()

  const params = useParams()
  const activeId = params.id as string | undefined

  const [isOpen, setIsOpen] = useState<boolean>(false)


  return (
    <SidebarGroup className='flex-1 min-h-0 relative top-10'>
      <SidebarGroupLabel className='h-10 px-3 text-base text-gray-500'>
        Projects
        {projects && (
          <span className='ml-2 rounded-full bg-slate-100 px-2 text-xs font-normal text-slate-500'>
            {projects.length}
          </span>
        )}
      </SidebarGroupLabel>
      <SidebarGroupAction
        aria-label='New project'
        title='New project'
        onClick={() => setIsOpen(true)}
        className='top-2.5 rounded-md border hover:bg-slate-100'
      >
        <Plus />
      </SidebarGroupAction>

      <SidebarGroupContent className='min-h-0 overflow-y-auto rounded-xl border bg-white/70 p-1.5 shadow-sm'>
        <SidebarMenu className='gap-1'>
          {isPending && (
            <>
              <SidebarMenuSkeleton />
              <SidebarMenuSkeleton />
              <SidebarMenuSkeleton />
            </>
          )}
          {error instanceof Error && <li className='px-2 text-xs text-red-500'>{error.message}</li>}
          {projects?.length === 0 && (
            <li className='px-2 py-3 text-center text-xs text-gray-400'>No projects yet</li>
          )}
          {projects?.map((p, i) => (
            <SidebarMenuItem key={p.id}>
              <SidebarMenuButton
                isActive={p.id === activeId}
                className='h-10 gap-3 rounded-lg'
                render={<Link href={`/projects/${p.id}`} />}
              >
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-xs font-semibold text-white ${COLORS[i % COLORS.length]}`}
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
