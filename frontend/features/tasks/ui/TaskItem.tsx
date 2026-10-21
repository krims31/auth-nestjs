import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { AlertCircle } from 'lucide-react'
import useUpdateTaskStatus from '../hooks/useUpdateTaskStatus'
import { TaskItemProps } from '../interfaces/TaskItemProps'
import type { TaskStatus } from '../types/TaskType'
import { STATUS_CONFIG, taskStatuses } from '../types/TaskType'

export default function TaskItem({ task, projectId }: TaskItemProps) {
  const { updateStatus, serverError } = useUpdateTaskStatus(projectId)

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
      className={`group flex flex-col gap-2 rounded-lg border border-slate-200 bg-white p-3 shadow-sm transition ${
        isDragging
          ? 'border-dashed border-sky-400 bg-sky-50/60 shadow-none'
          : 'hover:border-slate-300 hover:shadow-md'
      }`}
    >
      <div className='flex items-center justify-between gap-2'>
        {/* Task title */}
        <div
          {...attributes}
          {...listeners}
          className='min-w-0 flex-1 cursor-grab touch-none active:cursor-grabbing'
        >
          <p className='wrap-break-word text-sm font-medium leading-snug text-slate-800'>
            {task.title}
          </p>
        </div>

        {/* Task status select */}
        <select
          value={task.status}
          onChange={e => updateStatus(task.id, e.target.value as TaskStatus)}
          className={`shrink-0 cursor-pointer rounded-md border px-2 py-1 text-xs font-medium outline-none ${STATUS_CONFIG[task.status as TaskStatus].badge}`}
        >
          {taskStatuses.map(status => (
            <option key={status} value={status}>
              {STATUS_CONFIG[status].label}
            </option>
          ))}
        </select>
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
