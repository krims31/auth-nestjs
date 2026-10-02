import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import {Plus} from 'lucide-react'
import useProject from '../../../../features/projects/hooks/useProject'
import { useState } from 'react'
import CreateProjectForm from '../../../../features/projects/ui/CreateProjectForm'
import Link from 'next/link'

export default function Projects() {
  const { project } = useProject()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  return (
    <>
      <div>
        <h1 className="text-md relative top-20 text-gray-500 left-3">Projects</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Project</DialogTitle>
            </DialogHeader>
            <CreateProjectForm />
          </DialogContent>
        </Dialog>
        <ul className="flex flex-col gap-2 relative top-22">
            {project?.map(project => (
              <li key={project.id}>
                <Link href={`/projects/${project.id}`}>{project.title}</Link>
              </li>
            ))}
            <li className="relative bottom-43 left-50">
              <button onClick={() => setIsOpen(true)} className="border rounded-sm transition duration-300 hover:bg-slate-100">
                <Plus className="text-slate-500" />
              </button>
            </li>
          </ul>
      </div>
    </>
  )
}
