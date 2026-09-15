import { Field, FieldLabel } from '../../../components/ui/field'
import { Input } from '../../../components/ui/input'
import { InputPasswordProps } from '../../../features/auth-by-email/model/interfaces/InputPasswordProps'
import { useAuthLogin } from '../../../features/auth-by-email/model/useAuthLogin'

export default function InputPassword({ value, onChange }: InputPasswordProps) {
	const { visible, setVisible } = useAuthLogin()
	return (
		<Field>
			<FieldLabel
				htmlFor="password"
				className="relative top-35 left-10 text-[15px] font-mono"
			>
				Password
			</FieldLabel>
			<Input
				value={value}
				onChange={e => onChange(e.target.value)}
				type="password"
				placeholder="Password"
				className="relative top-35 left-10 font-mono"
			/>
		</Field>
	)
}
