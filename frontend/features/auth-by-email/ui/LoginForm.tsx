'use client'

import Link from 'next/link'
import Button from '../../../components/ui/buttonLogin'
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
						<p className="relative top-15 left-15 text-[15px] font-mono">
							Don`t have an account yet?
							<Link
								href="/register"
								className="text-blue-600 relative left-2 underline"
							>
								Sign Up
							</Link>
						</p>
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
						<Button />
					</form>
				</div>
			</div>
		</>
	)
}
