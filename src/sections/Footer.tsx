import { ArrowUpRightIcon } from "@/components/icons";
import { Container } from "@/components/ui";
import { SOCIAL_LINKS } from "@/constants";

export default function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="relative z-20 overflow-x-clip">
			<div className="absolute h-[400px] w-[1600px] bottom-0 left-1/2 -translate-x-1/2 bg-emerald-300/40 [mask-image:radial-gradient(50%_50%_at_bottom_center,black,transparent)] -z-10"></div>
			<Container>
				<div className="border-t border-white/15 py-6 text-sm flex flex-col items-center gap-8 md:flex-row md:justify-between">
					<div className="text-white/40">&copy; {currentYear}. All rights reserved.</div>
					<nav className="flex flex-col items-center gap-8 md:flex-row">
						{SOCIAL_LINKS.map((link) => {
							return (
								<a key={link.name} href={link.url} target="_blank" className="inline-flex items-center gap-1.5">
									<span className="font-semibold">{link.name}</span>
									<ArrowUpRightIcon className="size-4" />
								</a>
							);
						})}
					</nav>
				</div>
			</Container>
		</footer>
	);
}
