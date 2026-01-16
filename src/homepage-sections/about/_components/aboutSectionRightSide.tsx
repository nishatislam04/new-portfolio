import Image from "next/image";
import profilePicture from "@/assets/images/profile_picture.png";
import { FadeIn } from "@/components/animations/FadeIn";
import AboutTechStacksGrid from "./aboutTechStacksGrid";

export default function AboutSectionRightSide() {
	return (
		<div className="space-y-8">
			{/* Avatar */}
			<FadeIn delay={0.3}>
				<div className="relative">
					<div className="relative w-64 h-64 mx-auto transform transition-transform duration-500 hover:scale-105">
						<div className="absolute inset-0 bg-linear-to-br from-emerald-500/20 to-sky-500/20 rounded-full blur-xl" />
						<div className="relative w-full h-full bg-gray-800/50 rounded-full border border-white/10 overflow-hidden">
							<Image
								src={profilePicture}
								alt="About me"
								className="object-contain p-4"
								width={1920}
								height={1080}
								loading="lazy"
								quality={40}
								sizes="(max-width: 768px) 256px, 256px"
							/>
						</div>
					</div>
				</div>
			</FadeIn>

			{/* Tech Stack Grid */}
			<AboutTechStacksGrid />
		</div>
	);
}
