import Image from "next/image";
import SparkleIcon from "@/assets/icons/sparkle-icon.tsx";
import StarIcon from "@/assets/icons/star-icon.tsx";
import grainImage from "@/assets/images/grain.jpg";
import { Section } from "@/components/ui";
import HeroOrbit from "@/homepage-sections/hero/_components/HeroOrbit";
import HeroBottomContents from "./_components/heroBottomContents";

export default function HeroSection() {
	return (
		<Section
			id="home"
			className="py-32 md:py-48 lg:py-60 relative z-0 overflow-x-clip"
		>
			<div className="absolute inset-0 mask-[linear-gradient(to_bottom,transparent,black_10%,black_70%,transparent)]">
				<div className="absolute inset-0 -z-30 opacity-5">
					<Image
						src={grainImage}
						alt="Grain texture"
						className="object-cover"
						loading="lazy"
						decoding="async"
						placeholder="blur"
						fill
						sizes="100vw"
					/>
				</div>
				{/* orbit */}
				<div className="size-[620px] hero-ring"></div>
				<div className="size-[820px] hero-ring"></div>
				<div className="size-[1020px] hero-ring"></div>
				<div className="size-[1220px] hero-ring"></div>
				{/* stars */}
				<div className="hidden md:block">
					<HeroOrbit
						size={430}
						rotation={-14}
						shouldOrbit
						orbitDuration="30s"
						shouldSpin
						spinDuration="3s"
					>
						<SparkleIcon
							className="size-8 text-emerald-300/20"
							aria-hidden="true"
							focusable="false"
						/>
					</HeroOrbit>
				</div>
				<div className="hidden md:block">
					<HeroOrbit
						size={440}
						rotation={79}
						shouldOrbit
						orbitDuration="32s"
						shouldSpin
						spinDuration="3s"
					>
						<SparkleIcon
							className="size-5 text-emerald-300/20"
							aria-hidden="true"
							focusable="false"
						/>
					</HeroOrbit>
				</div>
				<div className="hidden md:block">
					<HeroOrbit size={520} rotation={-41} shouldOrbit orbitDuration="34s">
						<div className="size-2 bg-emerald-300/20 rounded-full"></div>
					</HeroOrbit>
				</div>
				<div className="hidden md:block">
					<HeroOrbit
						size={530}
						rotation={178}
						shouldOrbit
						orbitDuration="36s"
						shouldSpin
						spinDuration="3s"
					>
						<SparkleIcon
							className="size-10 text-emerald-300/20"
							aria-hidden="true"
							focusable="false"
						/>
					</HeroOrbit>
				</div>
				<HeroOrbit
					size={550}
					rotation={20}
					shouldOrbit
					orbitDuration="38s"
					shouldSpin
					spinDuration="6s"
				>
					<StarIcon
						className="size-12 text-emerald-300"
						aria-hidden="true"
						focusable="false"
					/>
				</HeroOrbit>
				<div className="hidden md:block">
					<HeroOrbit
						size={590}
						rotation={98}
						shouldOrbit
						orbitDuration="40s"
						shouldSpin
						spinDuration="6s"
					>
						<StarIcon
							className="size-8 text-emerald-300"
							aria-hidden="true"
							focusable="false"
						/>
					</HeroOrbit>
				</div>
				<div className="hidden md:block">
					<HeroOrbit size={650} rotation={-5} shouldOrbit orbitDuration="42s">
						<div className="size-2 bg-emerald-300/20 rounded-full"></div>
					</HeroOrbit>
				</div>
				<div className="hidden md:block">
					<HeroOrbit
						size={710}
						rotation={144}
						shouldOrbit
						orbitDuration="44s"
						shouldSpin
						spinDuration="3s"
					>
						<SparkleIcon
							className="size-14 text-emerald-300/20"
							aria-hidden="true"
							focusable="false"
						/>
					</HeroOrbit>
				</div>
				<div className="hidden md:block">
					<HeroOrbit size={720} rotation={85} shouldOrbit orbitDuration="46s">
						<div className="size-3 bg-emerald-300/20 rounded-full"></div>
					</HeroOrbit>
				</div>
				<HeroOrbit
					size={800}
					rotation={-72}
					shouldOrbit
					orbitDuration="48s"
					shouldSpin
					spinDuration="6s"
				>
					<StarIcon
						className="size-28 text-emerald-300"
						aria-hidden="true"
						focusable="false"
					/>
				</HeroOrbit>
			</div>
			{/* bottom content */}
			<HeroBottomContents />
		</Section>
	);
}
