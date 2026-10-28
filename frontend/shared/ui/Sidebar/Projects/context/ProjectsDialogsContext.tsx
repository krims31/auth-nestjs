'use client'

import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'

export type DeleteTarget = { id: string; title: string }

type ProjectsDialogsContextValue = {
  createOpen: boolean
  openCreate: () => void
  closeCreate: () => void
  setCreateOpen: (open: boolean) => void

  deleteTarget: DeleteTarget | null
  openDelete: (target: DeleteTarget) => void
  closeDelete: () => void
}

const ProjectsDialogsContext = createContext<ProjectsDialogsContextValue | null>(null)

export function ProjectsDialogsProvider({ children }: { children: ReactNode }) {
  const [createOpen, setCreateOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget | null>(null)

  const value = useMemo<ProjectsDialogsContextValue>(
    () => ({
      createOpen,
      openCreate: () => setCreateOpen(true),
      closeCreate: () => setCreateOpen(false),
      setCreateOpen,

      deleteTarget,
      openDelete: target => setDeleteTarget(target),
      closeDelete: () => setDeleteTarget(null),
    }),
    [createOpen, deleteTarget],
  )

  return (
    <ProjectsDialogsContext.Provider value={value}>
      {children}
    </ProjectsDialogsContext.Provider>
  )
}

export function useProjectsDialogs() {
  const context = useContext(ProjectsDialogsContext)
  if (!context) {
    throw new Error(
      'useProjectsDialogs must be used within <ProjectsDialogsProvider>'
    )
  }
  return context
}