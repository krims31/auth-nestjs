import { AlertCircle } from 'lucide-react'
import useUpdateTaskStatus from '../hooks/useUpdateTaskStatus'
import { TaskItemProps } from '../interfaces/TaskItemProps'

export default function TaskItem({ task, projectId }: TaskItemProps) {
	const { register, handleSubmit, serverError } = useUpdateTaskStatus(projectId)

	return (
		<li className="flex flex-col gap-1 border-b py-2">
			<div className="flex items-center justify-between gap-4">
				<p className="font-medium text-lg">{task.title}</p>

				<form onChange={handleSubmit(task.id)}>
					<select
						defaultValue={task.status}
						{...register('status')}
						className="border rounded px-2 py-1 bg-white text-sm outline-none cursor-pointer"
					>
						<option value="todo">To Do</option>
						<option value="in-progress">In Progress</option>
						<option value="done">Done</option>
					</select>
				</form>
			</div>

			{serverError && (
				<span className="text-red-500 text-xs font-mono flex items-center gap-1">
					<AlertCircle size={12} />
					{serverError}
				</span>
			)}
		</li>
	)
}
