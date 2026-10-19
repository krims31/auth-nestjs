import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  sidebarMenuButtonVariants
} from '@/components/ui/sidebar'
import { CircleQuestionMark, Settings } from 'lucide-react'
import Link from 'next/link'

// System Items
const systemItems = [
  { title: 'Settings', url: '/', icon: Settings },
  { title: 'Help Center', url: '/', icon: CircleQuestionMark }
]

export default function SystemItems() {
  return (
    <div className='mt-auto w-full'>
      <SidebarGroup>
        <SidebarGroupLabel className='relative left-3 text-base text-slate-500'>
          System
        </SidebarGroupLabel>

        <SidebarMenu>
          {systemItems.map(item => (
            <SidebarMenuItem key={item.title}>
              <Link
                href={item.url}
                className={`${sidebarMenuButtonVariants({
                  variant: 'default',
                  size: 'default'
                })} flex min-h-12 w-full items-center gap-2`}
              >
                <item.icon className='size-4 shrink-0' aria-hidden='true' />
                <span>{item.title}</span>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>
    </div>
  )
}
