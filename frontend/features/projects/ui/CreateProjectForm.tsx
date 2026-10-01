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
				<InputProject
					registration={register('description')}
					label="Description"
					placeholder="Description"
					error={errors.description?.message}
				/>
				{serverError && (
					<span className="text-red-500 text-sm font-mono flex items-center gap-1">
						<AlertCircle size={14} />
						{serverError}
					</span>
				)}
				<button type="submit">
					<span className="text-sm font-mono tracking-wide border border-zinc-800 bg-zinc-950 text-zinc-100 px-5 py-2 rounded-lg transition-all duration-300 ease-out hover:bg-blue-600 hover:text-white hover:border-blue-600 hover:shadow-lg hover:shadow-blue-500/20 active:scale-95 relative left-32">Submit</span>
				</button>
			</form>
		</>
	)
}
