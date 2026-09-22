import { UseFormRegisterReturn } from 'react-hook-form'
import { Field, FieldLabel } from '../../../components/ui/field'
import { Input } from '../../../components/ui/input'

export default function InputProject({
	registration,
	error,
	label,
	placeholder
}: {
	registration: UseFormRegisterReturn
	error?: string
	label: string
	placeholder: string
}) {
	return (
		<div className="flex flex-col gap-1 mb-4">
			<Field>
				<FieldLabel htmlFor={registration.name}>{label}</FieldLabel>
			</Field>
			<Input
				id={registration.name}
				type="text"
				placeholder={placeholder}
				{...registration}
			/>

			{error && <span className="text-red-500 text-sm">{error}</span>}
		</div>
	)
}
