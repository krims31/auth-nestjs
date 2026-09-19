'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { LoginFormValues, loginSchema } from './login.schema'

export const useAuthLogin = () => {
	const router = useRouter()
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema)
	})

	const onSubmit = async (data: LoginFormValues) => {
		const response = await fetch('http://localhost:3000/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})

		if (!response.ok) {
			const errorData = await response.json().catch(() => null)
			console.log('Login failed', response.status, errorData)
			return
		}

		const result = await response.json()

		localStorage.setItem('access_token', result.access_token)
		localStorage.setItem('refresh_token', result.refresh_token)

		router.push('/kanban-board')
	}

	return {
		register,
		handleSubmit: handleSubmit(onSubmit),
		errors
	}
}
