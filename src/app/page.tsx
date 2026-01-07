import SkipLink from "@/components/accessibility/SkipLink";
import AboutSection from "@/sections/About";
import ContactSection from "@/sections/Contact";
import CTASection from "@/sections/CTA";
import EducationSection from "@/sections/Education";
import Footer from "@/sections/Footer";
import Header from "@/sections/Header";
import HeroSection from "@/sections/Hero";
import ProjectsSection from "@/sections/Projects";
import TapeSection from "@/sections/Tape";
import ToolboxSection from "@/sections/Toolbox";
import WorkExperienceSection from "@/sections/WorkExperience";

export default function Home() {
	return (
		<>
			<SkipLink />
			<Header />
			<HeroSection />
			<AboutSection />
			<EducationSection />
			<WorkExperienceSection />
			<ToolboxSection />
			<TapeSection />
			<ProjectsSection />
			<ContactSection />
			<CTASection />
			<Footer />
		</>
	);
}
