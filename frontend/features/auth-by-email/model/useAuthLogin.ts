import { useRouter } from 'next/router'
import { useState } from 'react'

export const useAuthLogin = () => {
	const router = useRouter()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const isSuccess = await fetch('/api/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email, password })
		}).then(res => res.json())

		if (isSuccess) {
			router.push('/dashboard')
		}
	}

	return {
		email,
		setEmail,
		password,
		setPassword,
		handleSubmit
	}
}
