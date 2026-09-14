import { useAuthLogin } from '@/features/auth-by-email/model/useAuthLogin'

export default function InputEmail() {
	const { email, setEmail } = useAuthLogin()
	return (
		<>
			<div className="flex items-center justify-center h-150">
				<input
					type="email"
					value={email}
					placeholder="Email"
					onChange={e => setEmail(e.target.value)}
					className="border rounded-[5px] w-70 h-10 placeholder:p-10 placeholder:text-gray-500 bg-gray-200"
				/>
			</div>
		</>
	)
}
