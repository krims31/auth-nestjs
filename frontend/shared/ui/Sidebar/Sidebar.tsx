'use client'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel
} from '@/components/ui/sidebar'
import { Ellipsis } from 'lucide-react'
import Items from './Items/Items'
import Logo from './Logo/Logo'
import Projects from './Projects/Projects'
import SystemItems from './SystemItems/SystemItems'

export function AppSidebar() {
  return (
    <Sidebar className='flex flex-col h-screen'>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className='text-lg relative top-20'>General</SidebarGroupLabel>
          <Ellipsis className='absolute top-23 right-3 text-gray-500' />
          <SidebarGroupContent>
            {/* Logo */}
            <Logo />
            <main>
              {/* Items */}
              <Items />
              {/* Projects Section */}
              <Projects />
            </main>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* System Items */}
      <SidebarFooter className='pb-4'>
        <SystemItems />
      </SidebarFooter>
    </Sidebar>
  )
}
