'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated'

export default function ProtectedRoute({
	children
}: {
	children: React.ReactNode
}) {
	const router = useRouter()
	const [status, setStatus] = useState<AuthStatus>('loading')

	useEffect(() => {
		const token = localStorage.getItem('access_token')
		setStatus(token ? 'authenticated' : 'unauthenticated')
	}, [])

	useEffect(() => {
		if (status === 'unauthenticated') {
			router.push('/auth/login')
		}
	}, [status, router])

	if (status !== 'authenticated') {
		return <div>Loading...</div>
	}
	return <>{children}</>
}
