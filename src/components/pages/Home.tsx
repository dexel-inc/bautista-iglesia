import Hero from "@/components/organism/Hero.tsx";
import WhoWeAre from "@/components/organism/WhoWeAre.tsx";

export default function Home() {
  return (
    <section className="flex flex-col">
      <Hero />
      <WhoWeAre />
    </section>
  );
}
