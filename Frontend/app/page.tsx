import { Features } from "@/components/ui/features";
import { HeroSection } from "@/components/ui/hero-section";
import { Stats } from "@/components/ui/stats";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <Stats />
      <Features />
    </main>
  );
}