import { Header } from '@/sections/Header';
import { HeroSection } from '@/sections/Hero';
import { AboutSection } from '@/sections/About';
import { ToolboxSection } from '@/sections/Toolbox';
import { ProjectsSection } from '@/sections/Projects';
// import { TestimonialsSection } from '@/sections/Testimonials';
import { TapeSection } from '@/sections/Tape';
import { ContactSection } from '@/sections/Contact';
import { CTASection } from '@/sections/CTA';
import { Footer } from '@/sections/Footer';
import { SkipLink } from '@/components/accessibility/SkipLink';

export default function Home() {
  return (
    <>
      <SkipLink />
      <Header />
      <main id="main-content" className="min-h-screen">
        <HeroSection />
        <AboutSection />
        <ToolboxSection />
        <TapeSection />
        <ProjectsSection />
        {/* <TestimonialsSection /> */}
        <ContactSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
