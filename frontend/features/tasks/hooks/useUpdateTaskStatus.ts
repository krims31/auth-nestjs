import { useForm } from "react-hook-form";
import { TaskFormValues, taskSchema } from "../schema/task.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { updateTasks } from "../api/task-api";

export default function useUpdateTaskStatus(projectId: string) {
  const { register, handleSubmit, formState: { errors } } = useForm<TaskFormValues>({ resolver: zodResolver(taskSchema) })


  const queryClient = useQueryClient()

  const [serverError, setServerError] = useState<string | null>(null)

  const mutation = useMutation({
    mutationFn: ({taskId, data}: {taskId: string, data: TaskFormValues}) => {
      return updateTasks(projectId, taskId, data.status)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['tasks', projectId]})
    },
  })

  const submitWithId = (taskId: string) => {
    return handleSubmit((data: TaskFormValues) => {
      mutation.mutate({ taskId, data }, {
        onError: error => {
          if (error instanceof Error) {
            setServerError(error.message)
          } else {
            setServerError("Something went wrong")
          }
        },
      })
    })
  }

  return {
    register,
    handleSubmit: submitWithId,
    errors,
    serverError
  }
}
