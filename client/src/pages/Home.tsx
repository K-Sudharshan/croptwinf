import { useRef } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import CropAnalyzer from "@/components/CropAnalyzer";
import DashboardPreview from "@/components/DashboardPreview";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  const cropAnalyzerRef = useRef<HTMLDivElement>(null);

  const handleAnalyzerClick = () => {
    cropAnalyzerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero onAnalyzerClick={handleAnalyzerClick} />
        <Features />
        <HowItWorks />
        <div ref={cropAnalyzerRef}>
          <CropAnalyzer />
        </div>
        <DashboardPreview />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
