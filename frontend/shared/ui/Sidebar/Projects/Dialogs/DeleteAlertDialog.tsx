import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { useParams, useRouter } from 'next/navigation'
import useProject from '../../../../../features/projects/hooks/useProject'
import { useProjectsDialogs } from '../context/ProjectsDialogsContext'

export default function DeleteAlertDialog() {
  const params = useParams()
  const activeId = params.id as string | undefined
  const router = useRouter()
  const { isDeleting, deleteProject } = useProject()
  const { deleteTarget, closeDelete } = useProjectsDialogs()

  const handleDelete = async () => {
    if (!deleteTarget) return
    try {
      await deleteProject(deleteTarget.id)
      if (deleteTarget.id === activeId) router.replace('/')
      closeDelete()
    } catch (err) {
      console.error('Failed to delete project', err)
    }
  }

  return (
    <AlertDialog
      open={!!deleteTarget}
      onOpenChange={open => {
        if (!open && !isDeleting) closeDelete()
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete project?</AlertDialogTitle>
          <AlertDialogDescription>
            Project «{deleteTarget?.title}» will be deleted forever. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isDeleting}
            onClick={event => {
              event.preventDefault()
              handleDelete()
            }}
            className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
          >
            {isDeleting ? 'Deleting…' : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
