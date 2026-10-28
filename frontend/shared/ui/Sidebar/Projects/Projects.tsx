import { SidebarGroup } from '@/components/ui/sidebar'
import CreateProjectDialog from './Dialogs/CreateProjectDialog'
import DeleteAlertDialog from './Dialogs/DeleteAlertDialog'
import SidebarProjectLists from './ProjectLists/SidebarProjectLists'
import TitleProjects from './TitleProjects/TitleProjects'
import { ProjectsDialogsProvider } from './context/ProjectsDialogsContext'

export default function Projects() {
  return (
    <ProjectsDialogsProvider>
      <SidebarGroup>
        <TitleProjects />
        <SidebarProjectLists />
        <CreateProjectDialog />
        <DeleteAlertDialog />
      </SidebarGroup>
    </ProjectsDialogsProvider>
  )
}
