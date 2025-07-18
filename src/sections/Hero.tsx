import { Section, Container } from "@/components/ui";
import ArrowDownIcon from "@/assets/icons/arrow-down.svg";
import ArrowUpRightIcon from "@/assets/icons/arrow-up-right.svg";
import { PERSONAL_INFO } from "@/constants/personal-info";
import Image from "next/image";
import memojiImage from "@/assets/images/memoji-computer.png";
import grainImage from "@/assets/images/grain.jpg";
import StarIcon from "@/assets/icons/star.svg";
import SparkleIcon from "@/assets/icons/sparkle.svg";
import HeroOrbit from "@/components/block/HeroOrbit";
import DownloadIcon from "@/assets/icons/Download.svg";
import HeroButton from "./subComponents/HeroButton";

export default function HeroSection() {
	return (
		<Section id="home" className="py-32 md:py-48 lg:py-60 relative z-0 overflow-x-clip">
			<div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_70%,transparent)]">
				<div className="absolute inset-0 -z-30 opacity-5">
					<Image src={grainImage} alt="Grain texture" className="object-cover" priority />
				</div>
				{/* orbit */}
				<div className="size-[620px] hero-ring"></div>
				<div className="size-[820px] hero-ring"></div>
				<div className="size-[1020px] hero-ring"></div>
				<div className="size-[1220px] hero-ring"></div>
				{/* stars */}
				<HeroOrbit size={430} rotation={-14} shouldOrbit orbitDuration="30s" shouldSpin spinDuration="3s">
					<SparkleIcon className="size-8 text-emerald-300/20" />
				</HeroOrbit>
				<HeroOrbit size={440} rotation={79} shouldOrbit orbitDuration="32s" shouldSpin spinDuration="3s">
					<SparkleIcon className="size-5 text-emerald-300/20" />
				</HeroOrbit>
				<HeroOrbit size={520} rotation={-41} shouldOrbit orbitDuration="34s">
					<div className="size-2 bg-emerald-300/20 rounded-full"></div>
				</HeroOrbit>
				<HeroOrbit size={530} rotation={178} shouldOrbit orbitDuration="36s" shouldSpin spinDuration="3s">
					<SparkleIcon className="size-10 text-emerald-300/20" />
				</HeroOrbit>
				<HeroOrbit size={550} rotation={20} shouldOrbit orbitDuration="38s" shouldSpin spinDuration="6s">
					<StarIcon className="size-12 text-emerald-300" />
				</HeroOrbit>
				<HeroOrbit size={590} rotation={98} shouldOrbit orbitDuration="40s" shouldSpin spinDuration="6s">
					<StarIcon className="size-8 text-emerald-300" />
				</HeroOrbit>
				<HeroOrbit size={650} rotation={-5} shouldOrbit orbitDuration="42s">
					<div className="size-2 bg-emerald-300/20 rounded-full"></div>
				</HeroOrbit>
				<HeroOrbit size={710} rotation={144} shouldOrbit orbitDuration="44s" shouldSpin spinDuration="3s">
					<SparkleIcon className="size-14 text-emerald-300/20" />
				</HeroOrbit>
				<HeroOrbit size={720} rotation={85} shouldOrbit orbitDuration="46s">
					<div className="size-3 bg-emerald-300/20 rounded-full"></div>
				</HeroOrbit>
				<HeroOrbit size={800} rotation={-72} shouldOrbit orbitDuration="48s" shouldSpin spinDuration="6s">
					<StarIcon className="size-28 text-emerald-300" />
				</HeroOrbit>
			</div>
			<Container>
				<div className="flex flex-col items-center">
					<Image src={memojiImage} className="size-[100px]" alt="Person peeking behind from computer" width={100} height={100} priority />
					<div className="bg-gray-950 border border-gray-800 py-1.5 px-4 inline-flex items-center gap-4 rounded-lg">
						<div className="bg-green-500 size-2.5 rounded-full relative">
							<div className="animate-ping-large rounded-full bg-green-500 absolute inset-0"></div>
						</div>
						<div className="text-sm font-semibold">Available for new projects</div>
					</div>
				</div>
				<div className="max-w-lg mx-auto">
					<h1 className="font-serif text-3xl text-center mt-8 tracking-wide md:text-5xl">Building Exceptional User Experiences</h1>
					<p className="mt-4 text-center text-white/60 md:text-base">{PERSONAL_INFO.profile}</p>
				</div>
				<div className="flex flex-col items-center mt-8 gap-4 md:flex-row justify-center z-50 relative">
					<HeroButton jumpTo="projects" text="View My Work">
						<ArrowDownIcon className="size-4" />
					</HeroButton>
					<HeroButton text="View My CV">
						<DownloadIcon className="size-5 fill-white ml-2" />
					</HeroButton>
					<HeroButton jumpTo="contact" text="Let's Connect" className="inline-flex items-center gap-2 border border-white bg-white text-gray-900 h-12 px-6 rounded-xl">
						<ArrowUpRightIcon className="w-5 h-5" />
					</HeroButton>
				</div>
			</Container>
		</Section>
	);
}
