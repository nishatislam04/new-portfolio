import { NAV_ITEMS } from "@/constants";

export default function Header() {
	return (
		<div className="flex items-center justify-center fixed top-3 w-full z-20">
			<nav className="flex gap-1 p-0.5 border border-white/15 rounded-full bg-white/10 backdrop-blur">
				{NAV_ITEMS.map((item, index) => {
					return (
						<a key={item.name} href={item.href} className={`${index === 3 ? "bg-white text-gray-900 hover:bg-white/70 hover:text-gray-900" : ""} nav-item`}>
							{item.name}
						</a>
					);
				})}
			</nav>
		</div>
	);
}
