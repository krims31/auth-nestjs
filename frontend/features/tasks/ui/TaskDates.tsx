import { Calendar } from 'lucide-react'
import { formatDate } from '../constants/priority.const'

// features/tasks/ui/TaskDates.tsx
export default function TaskDates({
  createdAt,
  dueDate
}: {
  createdAt: string
  dueDate: string | null
}) {
  return (
    <div className='flex items-center gap-2 text-[11px] text-slate-400 dark:text-slate-500'>
      <span className='inline-flex items-center gap-1' title='Created'>
        <Calendar size={10} />
        {formatDate(createdAt)}
      </span>
      {dueDate && (
        <span
          className='inline-flex items-center gap-1 text-slate-500 dark:text-slate-400'
          title='Due'
        >
          → {formatDate(dueDate)}
        </span>
      )}
    </div>
  )
}
