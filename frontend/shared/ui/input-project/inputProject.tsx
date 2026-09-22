import { UseFormRegisterReturn } from 'react-hook-form'
import { Field, FieldLabel } from '../../../components/ui/field'
import { Input } from '../../../components/ui/input'

export default function InputProject({
	registration,
	error
}: {
	registration: UseFormRegisterReturn
	error?: string
}) {
	return (
		<div className="flex flex-col gap-1 mb-4">
			<Field>
				<FieldLabel htmlFor="project">Project</FieldLabel>
			</Field>
			<Input
				id="project"
				type="text"
				placeholder="Project"
				{...registration}
			/>
			{error && <span className="text-red-500 text-sm">{error}</span>}
		</div>
	)
}
