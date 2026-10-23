import { useMutation, useQueryClient } from '@tanstack/react-query'

import { deleteTask as deleteTaskApi } from '../api/task-api'

export default function useDeleteTask(projectId: string) {
  const queryClient = useQueryClient()

  const {
    mutate: deleteTask,
    isPending,
    error
  } = useMutation({
    mutationFn: (taskId: string) => deleteTaskApi(projectId, taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', projectId] })
    }
  })
  return { deleteTask, isPending, error }
}
