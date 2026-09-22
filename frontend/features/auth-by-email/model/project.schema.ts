import { z } from 'zod'

export default function projectSchema() {
	return {
		title: z.string().min(3, 'Title must be at least 3 characters'),
		description: z
			.string()
			.min(3, 'Description must be at least 3 characters')
			.optional()
	}
}

export type Project = z.infer<typeof projectSchema>
