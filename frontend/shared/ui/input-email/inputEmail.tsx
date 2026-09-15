import { Field, FieldLabel } from '../../../components/ui/field'
import { Input } from '../../../components/ui/input'
import { useAuthLogin } from '../../../features/auth-by-email/model/useAuthLogin'

export default function InputEmail() {
	const { email, setEmail } = useAuthLogin()
	return (
		<Field>
			<FieldLabel htmlFor="">Email</FieldLabel>
			<Input
				value={email}
				onChange={e => setEmail(e.target.value)}
				type="email"
				placeholder="Email"
			/>
		</Field>
	)
}
