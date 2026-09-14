import { useAuthLogin } from '../model/useAuthLogin'

export default function LoginForm() {
	const { email, setEmail, password, setPassword, handleSubmit } = useAuthLogin()
	return (
		<>
			<form></form>
		</>
	)
}
