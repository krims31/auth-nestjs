import type { LucideIcon } from 'lucide-react'

type Props = { icon: LucideIcon; label: string; dot?: boolean }

export default function HeaderIconButton({ icon: Icon, label, dot }: Props) {
  return (
    <button
      type='button'
      aria-label={label}
      title={label}
      className='relative flex h-9 w-9 items-center justify-center rounded-lg border bg-background text-muted-foreground shadow-xs transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
    >
      <Icon className='h-4 w-4' />
      {dot && (
        <span className='absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-background' />
      )}
    </button>
  )
}
