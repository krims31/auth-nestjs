'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import ApiClient from '../../../shared/api/api-client'
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
		try {
			const result = await ApiClient('/auth/login', {
				method: 'POST',
				auth: false,
				body: data
			})

			localStorage.setItem('access_token', result.access_token)
			localStorage.setItem('refresh_token', result.refresh_token)

			router.push('/kanban-board')
		} catch (error) {
			console.log(error)
		}
	}

	return {
		register,
		handleSubmit: handleSubmit(onSubmit),
		errors
	}
}
