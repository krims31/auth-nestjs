import { Field, FieldDescription, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useAuthLogin } from '@/features/auth-by-email/model/useAuthLogin'

export default function InputEmail() {
	const { email, setEmail } = useAuthLogin()
	return (
		<Field data-disabled>
			<FieldLabel htmlFor="input-demo-disabled">Email</FieldLabel>
			<Input
				id="input-demo-disabled"
				type="email"
				placeholder="Email"
				disabled
			/>
			<FieldDescription>This field is currently disabled.</FieldDescription>
		</Field>
	)
}
