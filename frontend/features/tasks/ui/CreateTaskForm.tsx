import { AlertCircle } from 'lucide-react'
import InputProject from '../../../shared/ui/input-project/inputProject'
import useCreateTask from '../hooks/useCreateTask'

export default function CreateTaskForm({ projectId }: { projectId: string }) {
  const { register, errors, serverError, handleSubmit } = useCreateTask(projectId)

  return (
    <>
      <form onSubmit={handleSubmit}>
        {/* Title input */}
        <InputProject
          registration={register('title')}
          label='Title'
          placeholder='Title'
          error={errors.title?.message}
        />

        <div className='grid grid-cols-2 gap-3'>
          <div className='flex flex-col gap-1'>
            <label className='text-sm text-slate-600 dark:text-slate-300'>Priority</label>
            <select
              {...register('priority')}
              className='rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white'
            >
              <option value='LOW'>LOW</option>
              <option value='MEDIUM'>MEDIUM</option>
              <option value='HIGH'>HIGH</option>
            </select>
            {errors.priority?.message && (
              <span className='text-xs text-red-500'>{errors.priority.message}</span>
            )}
          </div>
          <div className='flex flex-col gap-1'>
            <label className='text-sm text-slate-600 dark:text-slate-300'>Due date</label>
            <input
              type='date'
              {...register('dueDate')}
              className='rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white'
            />
            {errors.dueDate?.message && (
              <span className='text-xs text-red-500'>{errors.dueDate.message}</span>
            )}
          </div>
        </div>

        {serverError && (
          <span className='text-red-500 text-sm font-mono flex items-center gap-1'>
            <AlertCircle size={14} />
            {serverError}
          </span>
        )}

        {/* Create task button */}
        <button type='submit'>
          <span className='relative top-5 text-sm font-mono border rounded-lg p-2 bg-black text-white outline-none ml-60'>
            Create Task
          </span>
        </button>

        {/* Cancel button */}
        <button type='submit'>
          <span className='text-sm font-mono border rounded-lg p-2 text-gray-500 outline-none ml-40 relative bottom-0'>
            Cancel
          </span>
        </button>
      </form>
    </>
  )
}
