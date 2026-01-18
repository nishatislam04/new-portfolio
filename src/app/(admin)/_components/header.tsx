import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Header() {
	return (
		<header className="flex h-20 items-center gap-4 border-b border-white/10 bg-gray-900/80 px-6 backdrop-blur-sm">
			<div className="w-full flex items-center justify-between gap-3">
				<SidebarTrigger className=" bg-gray-900/80 text-gray-200 hover:bg-white/10">
					Menu
				</SidebarTrigger>
				<div className="space-y-1 ml-4">
					<p className="text-sm uppercase tracking-[0.3em] text-emerald-300">
						Control Center
					</p>
					<h1 className="text-2xl font-semibold text-white">
						Portfolio Administration
					</h1>
				</div>
				<p className="ml-auto text-sm text-gray-400">minhajul islam nishat</p>
			</div>
		</header>
	);
}
