import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { cn } from 'cn'
import { AlertCircle, Calendar, Ellipsis, Flag, Trash2 } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import { PRIORITY_LABEL, PRIORITY_STYLES, formatDate } from '../constants/priority.const'
import useUpdateTaskStatus from '../hooks/useUpdateTaskStatus'
import { TaskItemProps } from '../interfaces/TaskItemProps'
interface ExtendTaskItemProps extends TaskItemProps {
  onDelete: (id: string) => void
}

export default function TaskItem({ task, projectId, onDelete }: ExtendTaskItemProps) {
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
      className={cn(
        'group flex flex-col gap-2 rounded-lg border border-slate-200 bg-white p-3 shadow-sm transition',
        'dark:border-white/10 dark:bg-zinc-900',
        isDragging
          ? 'border-dashed border-sky-400 bg-sky-50/60 shadow-none'
          : 'hover:border-slate-300 hover:shadow-md'
      )}
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

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant='ghost' className='h-8 w-8 p-0 rounded-full'>
                <Ellipsis className='shrink-0 text-gray-500' size={20} />
              </Button>
            }
          />
          <DropdownMenuContent align='end' className='w-40'>
            <DropdownMenuItem
              onClick={() => onDelete(task.id)}
              className='text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950/50 cursor-pointer'
            >
              <Trash2 className='mr-2 h-4 w-4' />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {task.description && (
        <p className='line-clamp-2 text-xs text-slate-500 dark:text-slate-400'>
          {task.description}
        </p>
      )}

      {/* Footer: priority + dates */}
      <div className='flex items-center justify-between gap-2 pt-1'>
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${PRIORITY_STYLES[task.priority]}`}
        >
          <Flag size={10} />
          {PRIORITY_LABEL[task.priority]}
        </span>

        <div className='flex items-center gap-2 text-[11px] text-slate-400 dark:text-slate-500'>
          <span className='inline-flex items-center gap-1' title='Created'>
            <Calendar size={10} />
            {formatDate(task.createdAt)}
          </span>
          {task.dueDate && (
            <span
              className='inline-flex items-center gap-1 text-slate-500 dark:text-slate-400'
              title='Due'
            >
              → {formatDate(task.dueDate)}
            </span>
          )}
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
