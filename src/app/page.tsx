import SkipLink from "@/components/accessibility/SkipLink";
import Header from "@/sections/Header";
import HeroSection from "@/sections/Hero";
import AboutSection from "@/sections/About";
import EducationSection from "@/sections/Education";
import ToolboxSection from "@/sections/Toolbox";
import TapeSection from "@/sections/Tape";
import ProjectsSection from "@/sections/Projects";
import ContactSection from "@/sections/Contact";
import CTASection from "@/sections/CTA";
import Footer from "@/sections/Footer";

export default function Home() {
	return (
		<>
			<SkipLink />
			<Header />
			<HeroSection />
			<AboutSection />
			<EducationSection />
			<ToolboxSection />
			<TapeSection />
			<ProjectsSection />
			<ContactSection />
			<CTASection />
			<Footer />
		</>
	);
}
