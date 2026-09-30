import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { updateTasks } from '../api/task-api'
import { TaskStatus } from '../types/TaskType'

export default function useUpdateTaskStatus(projectId: string) {
	const queryClient = useQueryClient()

	const [isDelete, setIsDelete] = useState<boolean>(false)

	// Delete task
	const deleteTask = () => {
		if (isDelete) {
			setIsDelete(false)
		} else {
			setIsDelete(true)
		}
	}

	
	const [serverError, setServerError] = useState<string | null>(null)

	const mutation = useMutation({
		mutationFn: ({
			taskId,
			status
		}: {
			taskId: string
			status: TaskStatus
		}) => {
			return updateTasks(projectId, taskId, status)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['tasks', projectId] })
		}
  })

	// Update Status for tasks
	const updateStatus = (taskId: string, status: TaskStatus) => {
		mutation.mutate(
			{ taskId, status },
			{
				onError: error => {
					if (error instanceof Error) {
						setServerError(error.message)
					} else {
						setServerError('Something went wrong')
					}
				}
			}
		)
		return { updateStatus, serverError }
	}

	return {
		updateStatus,
		deleteTask,
		serverError
	}
}
