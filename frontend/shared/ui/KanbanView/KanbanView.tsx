import { useState } from 'react'

export default function KanbanView() {
  const [view, setView] = useState<'kanban' | 'list' | 'calendar'>('kanban')

  return (
    <>
      <main>
        <div>
          <button
            onClick={() => setView(view)}
            className={`
                relative h-8 w-30 rounded-sm border
                border-b-2 border-b-transparent
                transition-colors duration-200
                top-5
                text-zinc-950
                hover:border-b-blue-500
                ${view === 'kanban' ? 'border-b-blue-500 bg-blue-50/50' : ''}
              `}
          >
            Kanban View
          </button>
        </div>
      </main>
    </>
  )
}
