import dynamic from "next/dynamic";

import SkipLink from "@/components/accessibility/SkipLink";

const DynamicHeader = dynamic(() => import("@/sections/Header"));
const DynamicHeroSection = dynamic(() => import("@/sections/Hero"));
const DynamicAboutSection = dynamic(() => import("@/sections/About"));
const DynamicToolboxSection = dynamic(() => import("@/sections/Toolbox"));
const DynamicProjectsSection = dynamic(() => import("@/sections/Projects"));
const DynamicTapeSection = dynamic(() => import("@/sections/Tape"));
const DynamicContactSection = dynamic(() => import("@/sections/Contact"));
const DynamicCTASection = dynamic(() => import("@/sections/CTA"));
const DynamicFooter = dynamic(() => import("@/sections/Footer"));

export default function Home() {
	return (
		<>
			<SkipLink />
			<DynamicHeader />
			<DynamicHeroSection />
			<DynamicAboutSection />
			<DynamicToolboxSection />
			<DynamicTapeSection />
			<DynamicProjectsSection />
			<DynamicContactSection />
			<DynamicCTASection />
			<DynamicFooter />
		</>
	);
}
