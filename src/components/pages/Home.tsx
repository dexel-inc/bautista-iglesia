import Hero from "@/components/organism/Hero.tsx";
import WhoWeAre from "@/components/organism/WhoWeAre.tsx";
import ChurchActivities from '@/components/organism/ChurchActivities.tsx';

export default function Home() {
  return (
    <section className="flex flex-col">
      <Hero />
      <WhoWeAre />
      <ChurchActivities />
    </section>
  );
}
