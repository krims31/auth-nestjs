import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { deleteProject, getProjects } from '../api/projectApi'
export default function useProject() {
  const queryClient = useQueryClient()
  const {
    isPending,
    data: project,
    error
  } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteProject(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['projects'] })
    }
  })

  return {
    project,
    isPending,
    error,
    deleteProject: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending
  }
}
