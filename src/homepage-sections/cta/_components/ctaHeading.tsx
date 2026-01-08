import Image from "next/image";
import grainImage from "@/assets/images/grain.jpg";
import ContactButton from "@/homepage-sections/contact/_components/contactButton";

export default function CtaHeading() {
	return (
		<>
			<div className="flex flex-col gap-8 items-center md:flex-row md:gap-16">
				<div className="">
					<h2 className="font-serif text-2xl md:text-3xl">
						Let's create something amazing together
					</h2>
					<p className="text-sm mt-2 md:text-base">
						Ready to bring your next project to life? Let's connect and discuss
						how i can achive your goal
					</p>
				</div>
				<ContactButton jumpto="contact" />
			</div>
			<div className="absolute inset-0 -z-30 opacity-5">
				(
				<Image
					src={grainImage}
					alt="Grain texture"
					className="object-cover"
					loading="lazy"
					decoding="async"
					placeholder="blur"
					width={1920}
					height={1080}
					quality={20}
					sizes="100vw"
				/>
				);
			</div>
		</>
	);
}
