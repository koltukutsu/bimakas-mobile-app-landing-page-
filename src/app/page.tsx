import { Navbar } from '@/components/navigation/navbar';
import HeroSection from '@/components/sections/hero-section';
import TestimonialsGrid from '@/components/sections/testimonials-grid';
import FeaturesShowcase from '@/components/sections/features-showcase';
import BenefitsSection from '@/components/sections/benefits-section';
import DarkModeFeature from '@/components/sections/dark-mode-feature';
import UserReviews from '@/components/sections/user-reviews';
import RatingsCta from '@/components/sections/ratings-cta';
import Footer from '@/components/sections/footer';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#FFF8F0] pt-16">
        <HeroSection />
        {/* <TestimonialsGrid /> */}
        <FeaturesShowcase />
        <BenefitsSection />
        <DarkModeFeature />
        {/* <UserReviews /> */}
        <RatingsCta />
      </main>
      <Footer />
    </>
  );
}