import { HeroSection } from "@/components/blocks/hero-section-5";
import { AppPreviewSection } from "@/components/blocks/app-preview-section";
import { App3DSection } from "@/components/blocks/app-3d-section";
import { ZahiSection } from "@/components/blocks/zahi-section";
import { FeaturesSection } from "@/components/blocks/features-section";
import { FinalCTASection } from "@/components/blocks/final-cta-section";

export default function Home() {
  return (
    <main className="relative flex flex-col min-h-screen">
      <HeroSection />
      <AppPreviewSection />
      <App3DSection />
      <ZahiSection />
      <FeaturesSection />
      <FinalCTASection />
    </main>
  );
}
