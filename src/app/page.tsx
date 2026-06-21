import dynamic from "next/dynamic";
import { Header } from "@/components/ui/header-3";
import { HeroSection } from "@/components/hero";
import { FeatureSection } from "@/components/feature-section";
import { Integrations } from "@/components/integrations";


const TestimonialsSection = dynamic(() => import("@/components/testimonials-section").then((mod) => mod.TestimonialsSection));
const PricingSection = dynamic(() => import("@/components/pricing-section").then((mod) => mod.PricingSection));
const CtaSection = dynamic(() => import("@/components/cta-section").then((mod) => mod.CtaSection));
const FaqsSection = dynamic(() => import("@/components/faqs-section").then((mod) => mod.FaqsSection));
const Footer = dynamic(() => import("@/components/flickering-footer").then((mod) => mod.Component));

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col font-sans">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeatureSection />
        <Integrations />
        <TestimonialsSection />
        <PricingSection />
        <CtaSection />
        <FaqsSection />
        <Footer />
      </main>

    </div>
  );
}
