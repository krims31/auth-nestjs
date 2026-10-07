import { useState } from 'react'

export default function ListView() {
  const [view, setView] = useState<'kanban' | 'list' | 'calendar'>('list')

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
            List View
          </button>
        </div>
      </main>
    </>
  )
}
