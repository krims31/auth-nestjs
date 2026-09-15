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
		handleSubmit,
		visible,
		setVisible
	}
}
