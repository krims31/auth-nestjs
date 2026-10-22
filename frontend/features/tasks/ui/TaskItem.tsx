import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { AlertCircle } from 'lucide-react'
import useUpdateTaskStatus from '../hooks/useUpdateTaskStatus'
import { TaskItemProps } from '../interfaces/TaskItemProps'

export default function TaskItem({ task, projectId }: TaskItemProps) {
  const { serverError } = useUpdateTaskStatus(projectId)

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
    data: { status: task.status }
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  }

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={`group flex flex-col gap-2 rounded-lg border border-slate-200 bg-white p-3 shadow-sm
      dark:bg-zinc-950 dark:border-white transition ${
        isDragging
          ? 'border-dashed border-sky-400 bg-sky-50/60 shadow-none'
          : 'hover:border-slate-30 dark:bg-zinc-900/40 dark:border-white/10 hover:border-slate-300 hover:shadow-md'
      }`}
    >
      <div className='flex items-center justify-between gap-2'>
        {/* Task title */}
        <div
          {...attributes}
          {...listeners}
          className='min-w-0 flex-1 cursor-grab touch-none active:cursor-grabbing'
        >
          <p
            className='wrap-break-word text-sm font-medium leading-snug
           text-slate-800 dark:text-white'
          >
            {task.title}
          </p>
        </div>
      </div>

      {serverError && (
        <span className='flex items-center gap-1 font-mono text-xs text-red-500'>
          <AlertCircle size={12} />
          {serverError}
        </span>
      )}
    </li>
  )
}
