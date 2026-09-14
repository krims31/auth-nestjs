import { useAuthLogin } from '@/features/auth-by-email/model/useAuthLogin'

export default function InputEmail() {
	const { email, setEmail } = useAuthLogin()
	return (
		<>
			<input
				type="email"
				value={email}
				onChange={e => setEmail(e.target.value)}
			/>
		</>
	)
}
