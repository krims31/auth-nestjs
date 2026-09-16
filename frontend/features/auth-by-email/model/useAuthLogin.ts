'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export const useAuthLogin = () => {
	const router = useRouter()
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [visible, setVisible] = useState<boolean>(false)

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const response = await fetch('http://localhost:3000/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email, password })
		})

		if (!response.ok) {
			console.log('Login failed')
			return
		}

		const data = await response.json()

		localStorage.setItem('access_token', data.access_token)
		localStorage.setItem('refresh_token', data.refresh_token)

		router.push('/kanban-board')
	}

	return {
		email,
		setEmail,
		password,
		setPassword,
		handleSubmit,
		visible,
		setVisible
	}
}
