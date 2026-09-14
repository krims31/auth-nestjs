'use client'

import InputEmail from '@/shared/ui/input-email/inputEmail'
import { useAuthLogin } from '../model/useAuthLogin'

export default function LoginForm() {
	const { password, setPassword, handleSubmit } = useAuthLogin()
	return (
		<>
			<div className="flex items-center justify-center h-200">
				<div className="border rounded-2xl w-100 h-120">
					<form>
						<InputEmail />
					</form>
				</div>
			</div>
		</>
	)
}
