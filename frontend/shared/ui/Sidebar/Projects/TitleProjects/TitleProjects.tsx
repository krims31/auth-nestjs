import { SidebarGroup, SidebarGroupAction, SidebarGroupLabel } from '@/components/ui/sidebar'
import { Plus } from 'lucide-react'
import useProject from '../../../../../features/projects/hooks/useProject'
import { useProjectsDialogs } from '../context/ProjectsDialogsContext'

export default function TitleProjects() {
	const {project: projects} = useProject()

		  const { openCreate } = useProjectsDialogs()

	return (
		<>
		<main>
			<SidebarGroup className="flex-1 min-h-0 relative top-10">
      <SidebarGroupLabel className="h-10 px-3 text-base text-sidebar-foreground/70">
        Projects
        {projects && (
          <span className="ml-2 rounded-full bg-sidebar-accent px-2 text-xs font-normal text-sidebar-foreground/70">
            {projects.length}
          </span>
        )}
      </SidebarGroupLabel>
      <SidebarGroupAction
        aria-label="New project"
        title="New project"
        onClick={openCreate}
        className="top-4.5 rounded-md border border-sidebar-border text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
      >
        <Plus />
      </SidebarGroupAction>
			</SidebarGroup>
		</main>
		</>
	)
}