import { useQuery } from '@tanstack/react-query'
import ApiClient from '../../../api/api-client'

// Current User
export default function useUser() {
  return useQuery({
    queryKey: ['me'],
    queryFn: () => ApiClient<{ id: string; email: string; role: string }>('/auth/me')
  })
}
