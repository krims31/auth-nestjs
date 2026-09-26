import { AlertCircle } from 'lucide-react'
import InputProject from '../../../shared/ui/input-project/inputProject'
import useCreateTask from '../hooks/useCreateTask'

export default function CreateTaskForm({projectId}: {projectId: string}) {
	const { register, errors, serverError, handleSubmit } = useCreateTask(projectId)

	return (
		<>
			<form onSubmit={handleSubmit}>
				<InputProject
					registration={register('title')}
					label="Title"
					placeholder="Title"
					error={errors.title?.message}
				/>
				{serverError && (
					<span className="text-red-500 text-sm font-mono flex items-center gap-1">
						<AlertCircle size={14} />
						{serverError}
					</span>
				)}
				<button type="submit">
					<span className="text-sm font-mono border rounded-2xl p-2 bg-black text-white outline-none">Submit</span>
				</button>
			</form>
		</>
	)
}
