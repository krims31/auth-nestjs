import { useQuery } from '@tanstack/react-query'
import ApiClient from '../../../api/api-client'

export default function useCreateUser() {
  return useQuery({
    queryKey: ['me'],
    queryFn: () =>
      ApiClient<{ id: string; email: string; role: string }>('/auth/me')
  })
}
