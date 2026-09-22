import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import ApiClient from '../../../shared/api/api-client'
import {
	ProjectFormValues,
	projectSchema
} from '../schema/project.schema'
export default function useCreateProject() {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<ProjectFormValues>({
		resolver: zodResolver(projectSchema)
	})

	const [serverError, setServerError] = useState<string | null>(null)

	// create project
	const onSubmit = async (data: ProjectFormValues) => {
		try {
			await ApiClient('/projects', {
				method: 'POST',
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
		register,
		errors,
		handleSubmit: handleSubmit(onSubmit),
		serverError
	}
}
