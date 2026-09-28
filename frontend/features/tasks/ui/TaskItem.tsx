import { AlertCircle } from 'lucide-react'
import useUpdateTaskStatus from '../hooks/useUpdateTaskStatus'
import { TaskItemProps } from '../interfaces/TaskItemProps'
import { TASK_STATUSES } from '../types/TaskType'

export default function TaskItem({ task, projectId }: TaskItemProps) {
	const { serverError } = useUpdateTaskStatus(projectId)

	return (
		<li className="flex flex-col gap-1 border-b py-2">
			<div className="flex items-center justify-between gap-4">
				<p className="font-medium text-lg">{task.title}</p>

				<select
					value={task.status}
					className="border rounded px-2 py-1 bg-white text-sm outline-none cursor-pointer"
				>
					<option value={TASK_STATUSES[0]}>To Do</option>
					<option value={TASK_STATUSES[1]}>In Progress</option>
					<option value={TASK_STATUSES[2]}>Done</option>
				</select>
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
