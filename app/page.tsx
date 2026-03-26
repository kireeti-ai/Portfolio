import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { TechMarquee } from "@/components/tech-marquee"
import { AboutSection } from "@/components/about-section"
import { StatsSection } from "@/components/stats-section"
import { GitHubActivitySection } from "@/components/github-activity-section"
import { ServicesSection } from "@/components/services-section"
import { SkillBars } from "@/components/skill-bars"
import { PortfolioSection } from "@/components/portfolio-section"
import { ExperienceSection } from "@/components/experience-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"
import { CursorFollower } from "@/components/cursor-follower"
import { LoadingScreen } from "@/components/loading-screen"

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <CursorFollower />
      <main className="min-h-screen bg-[#FFFFFF] scroll-smooth">
        <Navigation />
        <HeroSection />
        <TechMarquee />
        <StatsSection />
        <GitHubActivitySection />
        <AboutSection />
        <ServicesSection />
        <SkillBars />
        <PortfolioSection />
        <ExperienceSection />
        <ContactSection />
        <Footer />
        <ScrollToTop />
      </main>
    </>
  )
}
