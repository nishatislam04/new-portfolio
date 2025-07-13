"use client";

import { Section, Button, Container } from "@/components/ui";
import { ArrowDownIcon, ArrowUpRightIcon, StarIcon } from "@/components/icons";
import { scrollToElement } from "@/utils";
import { PERSONAL_INFO } from "@/constants/personal-info";
import Image from "next/image";
import memojiImage from "@/assets/images/memoji-computer.png";

export const HeroSection = () => {
	const handleScrollToProjects = () => {
		scrollToElement("projects");
	};

	const handleScrollToContact = () => {
		scrollToElement("contact");
	};

	return (
		<Section id="home" className="py-32 md:py-48 lg:py-52">
			<Container>
				<div className="flex flex-col items-center">
					<Image src={memojiImage} className="size-[100px]" alt="Person peeking behind from computer" width={100} height={100} />

					<div className="bg-gray-950 border border-gray-800 py-1.5 px-4 inline-flex items-center gap-4 rounded-lg">
						<div className="bg-green-500 size-2.5 rounded-full"></div>
						<div className="text-sm font-semibold">Available for new projects</div>
					</div>
				</div>
				<div className="max-w-lg mx-auto">
					<h1 className="font-serif text-3xl text-center mt-8 tracking-wide md:text-5xl">Building Exceptional User Experiences</h1>
					<p className="mt-4 text-center text-white/60 md:text-lg">{PERSONAL_INFO.profile}</p>
				</div>
				<div className="flex flex-col items-center mt-8 gap-4 md:flex-row justify-center">
					<button onClick={handleScrollToProjects} className="inline-flex items-center gap-2 border border-white/15 px-6 h-12 rounded-xl">
						<span className="font-semibold">View My Work</span>
						<ArrowDownIcon className="size-4" />
					</button>
					<button onClick={handleScrollToContact} className="inline-flex items-center gap-2 border border-white bg-white text-gray-900 h-12 px-6 rounded-xl">
						<span className="font-semibold">Let's Connect</span>
						<ArrowUpRightIcon className="w-5 h-5" />
					</button>
				</div>
			</Container>
		</Section>
	);
};
