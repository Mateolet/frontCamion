import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { BrandSlider } from "@/components/BrandSlider";
import { FeaturedTrucks } from "@/components/FeaturedTrucks";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <BrandSlider />
        <FeaturedTrucks />
        <WhyChooseUs />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
