'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import ApiClient from '../../../shared/api/api-client'
import { LoginFormValues, loginSchema } from './login.schema'

interface LoginResult {
  access_token: string
  refresh_token: string
}

export const useAuthLogin = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema)
  })

  const [serverError, setServerError] = useState<string | null>(null)

  // login user and get token from server
  const onSubmit = async (data: LoginFormValues) => {
    try {
      const result = await ApiClient<LoginResult>('/auth/login', {
        method: 'POST',
        auth: false,
        body: data
      })

      localStorage.setItem('access_token', result.access_token)
      localStorage.setItem('refresh_token', result.refresh_token)

      router.push('/kanban-board')
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
    handleSubmit: handleSubmit(onSubmit),
    errors,
    serverError
  }
}
