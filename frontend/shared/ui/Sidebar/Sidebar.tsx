'use client'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Ellipsis, Home, Settings, User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const items = [
  { title: "Home", url: "/", icon: Home },
  { title: "Inbox", url: "/profile", icon: User },
  { title: "Settings", url: "/settings", icon: Settings },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-md relative top-20">General</SidebarGroupLabel>
          <Ellipsis className="absolute top-23 right-3 text-gray-500"/>
          <SidebarGroupContent>
            <div>
              <div className="h-px w-full bg-gray-300 relative top-8"></div>
              <Image
                    src="/logo.jpeg"
                    width={50}
                    height={50}
                    className="absolute top-3 left-3"
                    alt="Picture of the author"
                  />
              <h1 className="text-lg relative bottom-6 left-18 font-mono text-zinc-950">TaskFlow</h1>
              <p className="text-xs relative bottom-6 left-18 font-mono text-slate-500">Task Manager</p>
            </div>
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
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
