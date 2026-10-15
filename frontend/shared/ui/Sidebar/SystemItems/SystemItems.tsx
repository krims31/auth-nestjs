import {
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar'
import { CircleQuestionMark, Settings } from 'lucide-react'
import Link from 'next/link'

// SystemItems
const systemItems = [
  { title: 'Settings', url: '/', icon: Settings },
  { title: 'Help Center', url: '/', icon: CircleQuestionMark }
]

export default function SystemItems() {
  return (
    <>
      <div className='mt-auto w-full'>
        <SidebarMenu>
          <SidebarGroupLabel className='text-lg relative left-3 text-slate-500'>
            System
          </SidebarGroupLabel>
          {systemItems.map(item => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton>
                <Link
                  href={item.url}
                  className='flex items-center gap-4 w-full h-full text-sm font-mono'
                >
                  <item.icon className='h-4 w-4' />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </div>
    </>
  )
}
