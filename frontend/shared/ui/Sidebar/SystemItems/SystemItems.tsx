import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { Settings, CircleQuestionMark } from "lucide-react"

const systemItems = [
  { title: "Settings", url: "/", icon: Settings },
  { title: "Help Center", url: "/", icon: CircleQuestionMark}
]

export default function SystemItems() {
  return (
    <>
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
    </>
  )
}
