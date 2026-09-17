import { Eye, EyeOff } from 'lucide-react'
import { Field, FieldLabel } from '../../../components/ui/field'
import { Input } from '../../../components/ui/input'
import { useAuthLogin } from '../../../features/auth-by-email/model/useAuthLogin'
import {UseFormRegisterReturn} from 'react-hook-form'

export default function InputPassword({
	registration
}: {
	registration: UseFormRegisterReturn
}) {
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
				type={visible ? 'text' : 'password'}
				placeholder="Password"
				className="relative top-25 left-10 font-mono w-85!"
			/>
			<button
				type="button"
				onClick={() => setVisible(!visible)}
				className="relative top-16.5 left-87"
			>
				{visible ? <EyeOff size={20} /> : <Eye size={20} />}
			</button>
		</Field>
	)
}
