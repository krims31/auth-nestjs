import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { RegisterFormValues, registerSchema } from './register.schema'

export default function useAuthRegister() {
	const router = useRouter()
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<RegisterFormValues>({
		resolver: zodResolver(registerSchema)
	})

	const onSubmit = async (data: RegisterFormValues) => {
		const response = await fetch('http://localhost:3000/auth/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})

		if (!response.ok) {
			console.log('Register failed')
			return
		}

		const result = await response.json()

		localStorage.setItem('access_token', result.access_token)
		localStorage.setItem('refresh_token', result.refresh_token)

		router.push('/auth/login')
	}

	return { register, handleSubmit: handleSubmit(onSubmit), errors }
}
