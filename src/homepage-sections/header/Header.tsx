import Link from "next/link";

const NAV_ITEMS = [
	{ name: "Home", href: "#home" },
	{ name: "About", href: "#about" },
	{ name: "Projects", href: "#projects" },
	{ name: "Contact", href: "#contact" },
];
export default function Header() {
	return (
		<div className="flex items-center justify-center fixed top-3 w-full z-20">
			<nav className="flex gap-1 p-0.5 border border-white/15 rounded-full bg-white/10 backdrop-blur-sm">
				{NAV_ITEMS.map((item, index) => {
					return (
						<Link
							key={item.name}
							href={item.href}
							className={`${index === 3 ? "bg-white text-gray-900 hover:bg-white/70 hover:text-gray-900" : ""} nav-item`}
						>
							{item.name}
						</Link>
					);
				})}
			</nav>
		</div>
	);
}
