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
    <li ref={setNodeRef} style={style} className='flex flex-col gap-1 border-b py-2'>
      <div className='flex items-center justify-between gap-4'>
        <div {...attributes} {...listeners} className='flex-1'>
          <p className='font-medium text-lg'>{task.title}</p>
        </div>

        <select
          value={task.status}
          onChange={e => updateStatus(task.id, e.target.value as TaskStatus)}
          className={`rounded-md border px-2 py-1 text-xs font-medium outline-none cursor-pointer ${STATUS_CONFIG[task.status as TaskStatus].badge}`}
        >
          {taskStatuses.map(status => (
            <option key={status} value={status}>
              {STATUS_CONFIG[status].label}
            </option>
          ))}
        </select>
      </div>

      {serverError && (
        <span className='text-red-500 text-xs font-mono flex items-center gap-1'>
          <AlertCircle size={12} />
          {serverError}
        </span>
      )}
    </li>
  )
}
