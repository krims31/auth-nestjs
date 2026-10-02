import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import Link from 'next/link'

import {Home, Mail} from 'lucide-react'

const items = [
  { title: "Home", url: "/", icon: Home },
  { title: "Inbox", url: "/", icon: Mail },
]

export default function Items() {
  return (
    <>
      <SidebarMenu className="relative top-10">
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton>
              <Link href={item.url} className="flex items-center gap-4 w-full h-full text-sm font-mono">
                <item.icon  className="h-4 w-4"/>
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </>
  )
}
