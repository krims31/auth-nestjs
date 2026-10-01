import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '../../shared/ui/Sidebar/Sidebar'

export default function KanbanBoardLayout({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<main className="flex-1 flex flex-col p-4 w-full">
				<div>
					<SidebarTrigger />
				</div>
				<div className="flex-1 mt-4">
					{children}
				</div>
			</main>
		</SidebarProvider>
	)
}
