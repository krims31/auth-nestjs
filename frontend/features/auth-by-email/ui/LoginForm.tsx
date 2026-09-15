'use client'

import InputEmail from '../../../shared/ui/input-email/inputEmail'
import InputPassword from '../../../shared/ui/input-password/inputPassword'
import { useAuthLogin } from '../model/useAuthLogin'

export default function LoginForm() {
	const { email, setEmail, password, setPassword, handleSubmit } =
		useAuthLogin()
	return (
		<>
			<div className="flex items-center justify-center h-200">
				<div className="border rounded-2xl w-100 h-120">
					<section>
						<h1 className="text-center relative top-10 text-2xl font-mono">
							Sign In
						</h1>
					</section>
					<form onSubmit={handleSubmit}>
						<InputEmail
							value={email}
							onChange={setEmail}
						/>
						<InputPassword
							value={password}
							onChange={setPassword}
						/>
						<button
							type="submit"
							className="border rounded-[10px] w-80 h-12 flex justify-center items-center relative top-50 left-11 text-[15px] font-mono bg-black text-white hover:bg-blue-600 transform duration-300 ease-in-out"
						>
							Login
						</button>
					</form>
				</div>
			</div>
		</>
	)
}
