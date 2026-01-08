import SkipLink from "@/components/accessibility/SkipLink";
import AboutSection from "@/homepage-sections/about/About";
import ContactSection from "@/homepage-sections/contact/Contact";
import CTASection from "@/homepage-sections/cta/CTA";
import EducationSection from "@/homepage-sections/education/Education";
import Footer from "@/homepage-sections/footer/Footer";
import Header from "@/homepage-sections/header/Header";
import HeroSection from "@/homepage-sections/hero/Hero";
import MyStats from "@/homepage-sections/my-stats/myStats";
import ProjectsSection from "@/homepage-sections/projects/Projects";
import TapeSection from "@/homepage-sections/tapes/Tape";
import ToolboxSection from "@/homepage-sections/toolboxes/Toolbox";
import WorkExperienceSection from "@/homepage-sections/work-experience/WorkExperience";

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
			<MyStats />
			<Footer />
		</>
	);
}
