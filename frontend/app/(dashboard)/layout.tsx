import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '../../shared/ui/Sidebar/Sidebar'
import Header from '../../shared/ui/Header/Header'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<main className="flex-1 flex flex-col p-4 w-full">
				<div>
					<SidebarTrigger />
        </div>
				<Header />
				<div className="flex-1 mt-4">
					{children}
				</div>
			</main>
		</SidebarProvider>
	)
}
