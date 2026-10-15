import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import Header from '../../shared/ui/Header/Header'
import { AppSidebar } from '../../shared/ui/Sidebar/Sidebar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className='flex-1 flex flex-col p-4 w-full'>
        <div>
          <SidebarTrigger />
        </div>
        <SidebarInset>
          <Header />
          <div className='flex-1 p-6'>{children}</div>
        </SidebarInset>
      </main>
    </SidebarProvider>
  )
}
