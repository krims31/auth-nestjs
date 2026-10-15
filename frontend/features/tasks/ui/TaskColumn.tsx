import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Plus } from 'lucide-react'
import { TaskColumnProps } from '../interfaces/TaskColumnProps'
import type { TaskStatus } from '../types/TaskType'
import { STATUS_CONFIG } from '../types/TaskType'
import TaskItem from './TaskItem'

export default function TaskColumn({ projectId, status, tasks = [], onAdd }: TaskColumnProps) {
  const config = STATUS_CONFIG[status as TaskStatus]

  const { setNodeRef, isOver } = useDroppable({ id: status })

  if (!config) return null

  return (
    <div
      ref={setNodeRef}
      className={`flex w-72 shrink-0 flex-col gap-3 rounded-lg transition ${
        isOver ? 'ring-2 ring-sky-400 bg-sky-50/40' : ''
      }`}
    >
      <div className={`flex items-center justify-between rounded-lg px-3 py-2 ${config.header}`}>
        <div className='flex items-center gap-2'>
          <span className={`h-2 w-2 rounded-full ${config.dot}`} />
          <h2 className={`text-sm font-medium ${config.text}`}>{config.label}</h2>
          <span className={`rounded-full px-2 text-sm font-medium ${config.count}`}>
            {tasks.length}
          </span>
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

      <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
        <ul className='flex flex-col gap-2 min-h-10'>
          {tasks.map(task => (
            <TaskItem key={task.id} task={task} projectId={projectId} />
          ))}
        </ul>
      </SortableContext>
    </div>
  )
}
