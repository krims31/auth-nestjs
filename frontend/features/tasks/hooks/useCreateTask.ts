import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TaskFormValues, taskSchema } from "../schema/task.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { createTasks } from "../api/task-api";

export default function useCreateTask() {
  const {
    register,
    handleSubmit,
    formState: {error}
  } = useForm<TaskFormValues>({ resolver: zodResolver(taskSchema) })

  const queryClient = useQueryClient()

  const [serverError, setServerError] = useState<string | null>(null)

  const mutation = useMutation({
    mutationFn: (data) => {
      createTasks(projectId, data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['tasks', projectId]})
    },
  })
}
