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
import { Ellipsis, Home, Settings, Mail, CircleQuestionMark, Plus } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import useProject from "../../../features/projects/hooks/useProject"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import CreateProjectForm from "../../../features/projects/ui/CreateProjectForm"

const items = [
  { title: "Home", url: "/", icon: Home },
  { title: "Inbox", url: "/", icon: Mail },
]

const systemItems = [
  { title: "Settings", url: "/", icon: Settings },
  { title: "Help Center", url: "/", icon: CircleQuestionMark}
]

export function AppSidebar() {
  const { project } = useProject()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-md relative top-20">General</SidebarGroupLabel>
          <Ellipsis className="absolute top-23 right-3 text-gray-500"/>
          <SidebarGroupContent>
            {/* Logo */}
            <header>
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
            </header>
            <main>
              {/* Items */}
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

              {/* Projects Section */}
              <div>
                <h1 className="text-md relative top-20 text-gray-500 left-3">Projects</h1>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>New Project</DialogTitle>
                    </DialogHeader>
                    <CreateProjectForm />
                  </DialogContent>
                </Dialog>
                <ul className="flex flex-col gap-2 relative top-22">
                    {project?.map(project => (
                      <li key={project.id}>
                        <Link href={`/projects/${project.id}`}>{project.title}</Link>
                      </li>
                    ))}
                    <li className="relative bottom-43 left-50">
                      <button onClick={() => setIsOpen(true)} className="border rounded-sm transition duration-300 hover:bg-slate-100">
                        <Plus className="text-slate-500" />
                      </button>
                    </li>
                  </ul>
              </div>

              {/* System Items */}
              <SidebarMenu className="relative top-160">
                <h1 className="text-md relative left-3 text-slate-500">System</h1>
                {systemItems.map((item) => (
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
            </main>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
