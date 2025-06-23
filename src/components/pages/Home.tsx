import Hero from "@/components/organism/Hero.tsx";
import WhoWeAre from "@/components/organism/WhoWeAre.tsx";
import ChurchActivities from '@/components/organism/ChurchActivities.tsx';
import DonationSection from '@/components/organism/DonationSection.tsx';
import Radio from '@/components/organism/Radio.tsx';
import LatestYoutubeVideo from "@/components/organism/LatestYTVideo";
import Testimonials from "@/components/organism/testimonials";

export default function Home() {
  return (
    <section className="flex flex-col">
      <Hero />
      <WhoWeAre />
      <ChurchActivities />
      <LatestYoutubeVideo />
      <Testimonials />
      <Radio/>
      <DonationSection />

    </section>
  );
}
