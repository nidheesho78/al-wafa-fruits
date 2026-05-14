
import Philosophy from "@/components/Home/AboutUs";
import CTABanner from "@/components/Home/CTABanner";
import Features from "@/components/Home/Features";
import Hero from "@/components/Home/HeroSlider";
import Selection from "@/components/Home/Products";
import Services from "@/components/Home/Services";
import StatsAndTicker from "@/components/Home/StatsCheck";
import Testimonials from "@/components/Home/Testimonials";


export default function Home() {
  return (
    <main className="overflow-x-hidden">
      
      <Hero />
      <StatsAndTicker />
      <Philosophy />
      <Selection />
      <Features />
      <Services />
      {/* <Testimonials /> */}
      <CTABanner />
      
    </main>
  );
}