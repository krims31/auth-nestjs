export default async function ApiClient(
	endpoint: string,
	options?: { method?: string; body?: Record<string, unknown>; auth?: boolean }
) {
	const headers: Record<string, string> = {
		'Content-Type': 'application/json'
	}

	const auth = options?.auth

	if (auth !== false) {
		const token = localStorage.getItem('access_token')

		if (token) {
			headers.Authorization = `Bearer ${token}`
		}
	}

	const response = await fetch('http://localhost:3000' + endpoint, {
		method: options?.method || 'GET',
		headers,
		body: JSON.stringify(options?.body)
	})

	if (!response.ok) {
		const errorData = await response.json()

		throw new Error(errorData.message)
	}

	return response.json()
}
