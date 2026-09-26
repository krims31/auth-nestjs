import {z} from 'zod'

export const taskSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
	projectId: z.string().min(3, "Project id must be at least 3 characters")
})

export type TaskFormValues = z.infer<typeof taskSchema>
