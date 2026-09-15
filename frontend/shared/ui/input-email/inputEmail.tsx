import { Field, FieldLabel } from '../../../components/ui/field'
import { Input } from '../../../components/ui/input'
import { useAuthLogin } from '../../../features/auth-by-email/model/useAuthLogin'

export default function InputEmail() {
	const { email, setEmail } = useAuthLogin()
	return (
		<Field>
			<FieldLabel
				htmlFor="email"
				className="relative top-40 left-10 text-[15px] font-mono"
			>
				Email
			</FieldLabel>
			<Input
				value={email}
				onChange={e => setEmail(e.target.value)}
				type="email"
				placeholder="Email"
				className="relative top-40 left-10 font-mono"
			/>
		</Field>
	)
}
