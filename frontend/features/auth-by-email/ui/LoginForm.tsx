'use client'

import InputEmail from '@/shared/ui/input-email/inputEmail'
import { useAuthLogin } from '../model/useAuthLogin'

export default function LoginForm() {
	const { password, setPassword, handleSubmit } = useAuthLogin()
	return (
		<>
			<form>
				<InputEmail />
			</form>
		</>
	)
}
