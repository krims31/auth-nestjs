import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import CreateProjectForm from '../../../../../features/projects/ui/CreateProjectForm'
import { useProjectsDialogs } from '../context/ProjectsDialogsContext'

export default function CreateProjectDialog() {
    const { createOpen, setCreateOpen } = useProjectsDialogs()
  return (
    <>
      <main>
        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Project</DialogTitle>
            </DialogHeader>
            <CreateProjectForm onSuccess={() => setCreateOpen(false)} />
          </DialogContent>
        </Dialog>
      </main>
    </>
  )
}
