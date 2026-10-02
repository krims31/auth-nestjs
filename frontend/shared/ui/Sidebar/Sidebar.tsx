'use client'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar"
import { Ellipsis} from "lucide-react"
import Projects from "./Projects/Projects"
import Logo from "./Logo/Logo"
import Items from "./Items/Items"
import SystemItems from "./SystemItems/SystemItems"

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-md relative top-20">General</SidebarGroupLabel>
          <Ellipsis className="absolute top-23 right-3 text-gray-500"/>
          <SidebarGroupContent>
            {/* Logo */}
            <Logo />
            <main>
              {/* Items */}
              <Items />
              {/* Projects Section */}
              <Projects />
              {/* System Items */}
              <SystemItems />
            </main>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
