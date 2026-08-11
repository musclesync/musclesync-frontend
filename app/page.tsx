import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import DashboardPreview from "@/components/DashboardPreview";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Navbar />
      <Hero />
      <Features />
      <Pricing />
      <DashboardPreview />
      <Footer />
    </main>
  );

}
