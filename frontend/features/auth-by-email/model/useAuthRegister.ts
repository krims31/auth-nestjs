import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import ApiClient from '../../../shared/api/api-client'
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
		try {
			const result = await ApiClient('/auth/register', {
				method: 'POST',
				auth: false,
				body: data
			})

			router.push('/auth/login')
		} catch (error) {
			console.log(error)
		}
	}

	return { register, handleSubmit: handleSubmit(onSubmit), errors }
}
