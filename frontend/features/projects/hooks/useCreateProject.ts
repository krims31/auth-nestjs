import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { createProject } from '../api/projectApi'
import { ProjectFormValues, projectSchema } from '../schema/project.schema'
export default function useCreateProject() {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<ProjectFormValues>({
		resolver: zodResolver(projectSchema)
	})

	// Get query client
	const queryClient = useQueryClient()

	// Server error
	const [serverError, setServerError] = useState<string | null>(null)

	// Create mutation for create project
	const mutation = useMutation({
		mutationFn: createProject,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['projects'] })
		}
	})

	// create project
	const onSubmit = (data: ProjectFormValues) => {
		mutation.mutate(data, {
			onError: error => {
				if (error instanceof Error) {
					setServerError(error.message)
				} else {
					setServerError('Something went wrong')
				}
			}
		})
	}

	return {
		register,
		errors,
		handleSubmit: handleSubmit(onSubmit),
		serverError
	}
}
