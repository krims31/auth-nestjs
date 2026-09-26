import { AlertCircle } from 'lucide-react'
import InputProject from '../../../shared/ui/input-project/inputProject'
import useCreateProject from '../../projects/hooks/useCreateProject'

export default function CreateProjectForm() {
	const { register, errors, serverError, handleSubmit } = useCreateProject()

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
					<span className="text-sm font-mono">Submit</span>
				</button>
			</form>
		</>
	)
}
