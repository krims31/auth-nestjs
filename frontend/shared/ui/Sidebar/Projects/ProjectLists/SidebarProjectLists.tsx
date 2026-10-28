import { SidebarGroupContent, SidebarMenu, SidebarMenuAction, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import useProject from '../../../../../features/projects/hooks/useProject'
import { useProjectsDialogs } from '../context/ProjectsDialogsContext'

const COLORS = [
  'bg-sky-500',
  'bg-amber-500',
  'bg-emerald-500',
  'bg-violet-500',
  'bg-rose-500'
]

export default function SidebarProjectLists() {
	const params = useParams()
	const activeId = params.id as string | undefined
	const {project: projects} = useProject()

	const { openDelete } = useProjectsDialogs()


	return (
		<>
			<SidebarGroupContent className="min-h-0 relative top-10 overflow-y-auto rounded-xl border border-sidebar-border bg-sidebar-accent/30 p-1.5">
        <SidebarMenu className="gap-1">
          {projects?.map((p, i) => (
            <SidebarMenuItem key={p.id}>
              <SidebarMenuButton
                isActive={p.id === activeId}
                className="relative h-10 gap-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent/60 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:before:absolute data-[active=true]:before:left-0 data-[active=true]:before:top-2 data-[active=true]:before:bottom-2 data-[active=true]:before:w-0.5 data-[active=true]:before:rounded-full data-[active=true]:before:bg-blue-500"
                render={<Link href={`/projects/${p.id}`} />}
              >
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-xs font-semibold text-white ring-1 ring-white/10 ${COLORS[i % COLORS.length]}`}
                >
                  {(p.title?.[0] ?? '?').toUpperCase()}
                </span>
                <span className="truncate">{p.title}</span>
              </SidebarMenuButton>

              <SidebarMenuAction
                showOnHover
                aria-label={`Delete project ${p.title}`}
                title="Delete project"
                onClick={() => openDelete({ id: p.id, title: p.title })}
                className="text-sidebar-foreground/70 hover:text-destructive"
              >
                <Trash2 />
              </SidebarMenuAction>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
		</>
	)
}