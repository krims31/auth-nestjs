'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { RegisterFromValues } from './type/RegisterFromValues'

export const useAuthLogin = () => {
	const router = useRouter()
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<RegisterFromValues>()

	const onSubmit = async (data: RegisterFromValues) => {
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
