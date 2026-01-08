import { ArrowDownIcon, ArrowUpRightIcon, ViewIcon } from "lucide-react";
import Image from "next/image";
import memojiImage from "@/assets/images/memoji-computer.png";
import { Container } from "@/components/ui";
import { PERSONAL_INFO } from "@/constants/personal-info";
import HeroButton from "./HeroButton";

export default function HeroBottomContents() {
	return (
		<Container>
			<div className="flex flex-col items-center">
				<Image
					src={memojiImage}
					className="size-[100px]"
					alt="Person peeking behind from computer"
					width={100}
					height={100}
					fetchPriority="high"
					priority
					sizes="(max-width: 768px) 100px, 100px"
				/>
				<div className="bg-gray-950 border border-gray-800 py-1.5 px-4 inline-flex items-center gap-4 rounded-lg">
					<div className="bg-green-500 size-2.5 rounded-full relative">
						<div className="animate-ping-large rounded-full bg-green-500 absolute inset-0"></div>
					</div>
					<div className="text-sm font-semibold">
						Available for new projects
					</div>
				</div>
			</div>
			<div className="max-w-lg mx-auto">
				<h1 className="font-serif text-3xl text-center mt-8 tracking-wide md:text-5xl">
					Building Exceptional User Experiences
				</h1>
				<p className="mt-4 text-center text-white/60 md:text-base">
					{PERSONAL_INFO.profile}
				</p>
			</div>
			<div className="flex flex-col items-center mt-8 gap-4 md:flex-row justify-center z-50 relative">
				<HeroButton jumpTo="projects" text="My Work">
					<ArrowDownIcon className="size-4" />
				</HeroButton>
				<HeroButton
					href="https://drive.google.com/file/d/16rFYNbRmaBiCcKloCobYp_pHqw0Nd_sL/view?usp=sharing"
					text="My CV"
				>
					<ViewIcon className="size-4" />
				</HeroButton>
				<HeroButton
					jumpTo="contact"
					text="Let's Connect"
					className="border border-white bg-white text-gray-900 hover:bg-gray-100 hover:border-gray-200 max-w-[190px]"
				>
					<ArrowUpRightIcon className="size-4" />
				</HeroButton>
			</div>
		</Container>
	);
}
