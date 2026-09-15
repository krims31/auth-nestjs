import { Eye, EyeOff } from 'lucide-react'
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
				className="relative top-25 left-10 text-[15px] font-mono"
			>
				Password
			</FieldLabel>
			<Input
				value={value}
				onChange={e => onChange(e.target.value)}
				type={visible ? 'text' : 'password'}
				placeholder="Password"
				className="relative top-25 left-10 font-mono w-87.5!"
			/>
			<button
				type="button"
				onClick={() => setVisible(!visible)}
				className="relative top-16.5 left-89"
			>
				{visible ? <EyeOff size={20} /> : <Eye size={20} />}
			</button>
		</Field>
	)
}
