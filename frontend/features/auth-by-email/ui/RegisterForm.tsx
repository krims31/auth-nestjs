'use client'

import ButtonRegister from '../../../components/ui/buttonRegister'
import InputEmail from '../../../shared/ui/input-email/inputEmail'
import InputPassword from '../../../shared/ui/input-password/inputPassword'
import InputUsername from '../../../shared/ui/input-username/inputUsername'
import useAuthRegister from '../model/useAuthRegister'

export default function RegisterForm() {
	const { register, handleSubmit, errors } = useAuthRegister()
	return (
		<>
			<div className="flex items-center justify-center h-200">
				<div className="border rounded-2xl w-100 h-120">
					<section>
						<h1 className="text-center relative top-10 text-2xl font-mono">
							Sign Up
						</h1>
					</section>
					<form onSubmit={handleSubmit}>
						<InputUsername
							registration={register('username')}
							error={errors.username?.message}
						/>
						<InputEmail
							registration={register('email')}
							error={errors.email?.message}
						/>
						<InputPassword
							registration={register('password')}
							error={errors.password?.message}
						/>
						<ButtonRegister />
					</form>
				</div>
			</div>
		</>
	)
}
