import { Plus } from 'lucide-react'
import { TaskColumnProps } from '../interfaces/TaskColumnProps'
import type { TaskStatus } from '../types/TaskType'
import { STATUS_CONFIG } from '../types/TaskType'
import TaskItem from './TaskItem'

export default function TaskColumn({ projectId, status, tasks = [], onAdd }: TaskColumnProps) {
  const config = STATUS_CONFIG[status as TaskStatus]

  if (!config) return null

  return (
    <div className='flex w-72 shrink-0 flex-col gap-3'>
      <div className={`flex items-center justify-between rounded-lg px-3 py-2 ${config.header}`}>
        <div className='flex items-center gap-2'>
          <span className={`h-2 w-2 rounded-full ${config.dot}`} />
          <h2 className='text-sm font-medium'>{config.label}</h2>
          <span className='rounded-full bg-white px-2 text-xs text-gray-600'>{tasks.length}</span>
        </div>
        <button
          type='button'
          onClick={onAdd}
          aria-label={`Add task to ${config.label}`}
          className='rounded p-1 text-gray-500 hover:bg-white/60'
        >
          <Plus size={16} />
        </button>
      </div>

      <ul className='flex flex-col gap-2'>
        {tasks.map(task => (
          <TaskItem key={task.id} task={task} projectId={projectId} />
        ))}
      </ul>
    </div>
  )
}
