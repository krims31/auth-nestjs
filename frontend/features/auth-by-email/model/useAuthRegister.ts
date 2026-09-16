import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function useAuthRegister() {
	const router = useRouter()
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [username, setUsername] = useState<string>('')
	const [visible, setVisible] = useState<boolean>(false)

	const handleSubmitRegister = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const response = await fetch('http://localhost:3000/auth/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email, password })
		})

		if (!response.ok) {
			console.log("Register failed")
			return;
		}

		const data = await response.json()

		localStorage.setItem('access_token', data.access_token)
		localStorage.setItem('refresh_token', data.refresh_token)

		router.push('/auth/login')
	}

	return {
		email,
		setEmail,
		password,
		setPassword,
		username,
		setUsername,
		visible,
		setVisible,
		handleSubmitRegister
	}
}
