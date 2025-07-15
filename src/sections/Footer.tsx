import ArrowUpRightIcon from "@/assets/icons/arrow-up-right.svg";
import { Container } from "@/components/ui";
import { PERSONAL_INFO } from "@/constants/personal-info";
import ClientCurrentYear from "./subComponents/clientCurrentYear";

export default function Footer() {
	return (
		<footer className="relative z-20 overflow-x-clip">
			<div className="absolute h-[300px] w-[1600px] bottom-0 left-1/2 -translate-x-1/2 bg-emerald-300/40 [mask-image:radial-gradient(50%_50%_at_bottom_center,black,transparent)] -z-10"></div>
			<Container>
				<div className="border-t border-white/15 py-6 text-sm flex flex-col items-center gap-8 md:flex-row md:justify-between">
					<ClientCurrentYear />
					<nav className="flex flex-col items-center gap-8 md:flex-row">
						{PERSONAL_INFO.SOCIAL_LINKS.map((link) => {
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
