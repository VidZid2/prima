import dynamic from "next/dynamic";
import { Header } from "@/components/ui/header-3";
import { HeroSection } from "@/components/hero";
import { FeatureSection } from "@/components/feature-section";
import { Integrations } from "@/components/integrations";


const SectionSkeleton = () => (
  <div className="w-full max-w-6xl mx-auto px-4 py-16">
    <div className="h-[250px] w-full animate-pulse bg-zinc-900/40 border border-white/5 rounded-2xl" />
  </div>
);

const TestimonialsSection = dynamic(
  () => import("@/components/testimonials-section").then((mod) => mod.TestimonialsSection),
  { loading: () => <SectionSkeleton /> }
);
const PricingSection = dynamic(
  () => import("@/components/pricing-section").then((mod) => mod.PricingSection),
  { loading: () => <SectionSkeleton /> }
);
const CtaSection = dynamic(
  () => import("@/components/cta-section").then((mod) => mod.CtaSection),
  { loading: () => <SectionSkeleton /> }
);
const FaqsSection = dynamic(
  () => import("@/components/faqs-section").then((mod) => mod.FaqsSection),
  { loading: () => <SectionSkeleton /> }
);
const Footer = dynamic(
  () => import("@/components/flickering-footer").then((mod) => mod.Component),
  { loading: () => <SectionSkeleton /> }
);

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
