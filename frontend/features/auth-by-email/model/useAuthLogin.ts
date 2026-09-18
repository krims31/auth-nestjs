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
			console.log('Login failed')
			return
		}

		localStorage.setItem('access_token', data.access_token)
		localStorage.setItem('refresh_token', data.refresh_token)

		router.push('/kanban-board')
	}

	return {
		register,
		handleSubmit: handleSubmit(onSubmit),
		errors
	}
}
