import Hero from "../components/landing/Hero";
import Navbar from "../components/landing/Navbar";

export default function LandingPage() {
  return (
    <main className="bg-gray-950">
      <Navbar />
      <Hero />
    </main>
  );
}
