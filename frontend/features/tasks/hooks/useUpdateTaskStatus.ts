import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { updateTasks } from '../api/task-api'
import { TaskStatus } from '../types/TaskType'

export default function useUpdateTaskStatus(projectId: string) {
  const queryClient = useQueryClient()

  const [isDelete, setIsDelete] = useState<boolean>(false)

  const deleteTask = () => {
    if (isDelete) {
      setIsDelete(false)
    } else {
      setIsDelete(true)
    }
  }

  const [serverError, setServerError] = useState<string | null>(null)

  const mutation = useMutation({
    mutationFn: ({ taskId, status }: { taskId: string; status: TaskStatus }) => {
      return updateTasks(projectId, taskId, status)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['tasks', projectId]
      })
    },

    onError: (error: Error) => {
      setServerError(error.message || 'Something went wrong')
    }
  })

  const updateStatus = (taskId: string, status: TaskStatus) => {
    mutation.mutate({ taskId, status })
    return { updateStatus, serverError, isPending: mutation.isPending }
  }

  return {
    updateStatus,
    deleteTask,
    serverError
  }
}
