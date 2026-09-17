import { Field, FieldLabel } from '../../../components/ui/field'
import { Input } from '../../../components/ui/input'
import { InputUsernameProps } from '../../../features/auth-by-email/model/interfaces/InputUsernameProps'

export default function InputUsername({ value, onChange }: InputUsernameProps) {
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
				value={value}
				onChange={e => onChange(e.target.value)}
				type="text"
				placeholder="Username"
				className="relative top-20 left-10 font-mono w-85!"
			/>
		</Field>
	)
}
