import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import ApiClient from '../../../shared/api/api-client'
import { projectSchema } from '../../projects/schema/project.schema'
import { ProjectFormValues } from '../../projects/types/ProjectFromValues'

export default function useCreateProject() {
	const router = useRouter()

	const { title, description, handleSubmit } = useForm<ProjectFormValues>({
		resolver: zodResolver(projectSchema)
	})

	const [serverError, setServerError] = useState<string | null>(null)

	const onSubmit = async (data: ProjectFormValues) => {
		try {
			await ApiClient('/projects', {
				method: 'POST',
				auth: false,
				body: data
			})
		} catch (error) {
			if (error instanceof Error) {
				setServerError(error.message)
			} else {
				setServerError('Something went wrong')
			}
		}
	}

	return {
		title,
		description,
		handleSubmit: handleSubmit(onSubmit),
		serverError
	}
}
