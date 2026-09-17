import { Field, FieldLabel } from '../../../components/ui/field'
import { Input } from '../../../components/ui/input'
import { UseFormRegisterReturn } from 'react-hook-form'

export default function InputUsername({
	registration
}: {
	registration: UseFormRegisterReturn
}) {
	return (
		<Field>
			<FieldLabel
				htmlFor="username"
				className="relative top-20 left-10 text-[15px] font-mono"
			>
				Username
			</FieldLabel>
			<Input
				id="username"
				type="text"
				placeholder="Username"
				{...registration}
				className="relative top-20 left-10 font-mono w-85!"
			/>
		</Field>
	)
}
