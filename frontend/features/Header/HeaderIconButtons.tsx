import type { LucideIcon } from 'lucide-react'
import { forwardRef } from 'react'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: LucideIcon
  label: string
  dot?: boolean
}

const HeaderIconButton = forwardRef<HTMLButtonElement, Props>(
  ({ icon: Icon, label, dot, className, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        type='button'
        aria-label={label}
        title={label}
        className={[
          'relative flex h-9 w-9 items-center justify-center rounded-lg border',
          'bg-background text-muted-foreground shadow-xs transition-colors',
          'hover:bg-accent hover:text-foreground',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          className ?? ''
        ].join(' ')}
        {...rest}
      >
        <Icon className='h-4 w-4' />
        {dot && (
          <span className='absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-background' />
        )}
      </button>
    )
  }
)

HeaderIconButton.displayName = 'HeaderIconButton'

export default HeaderIconButton
