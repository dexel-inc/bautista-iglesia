import Hero from "@/components/organism/Hero.tsx";
import WhoWeAre from "@/components/organism/WhoWeAre.tsx";
import ChurchActivities from '@/components/organism/ChurchActivities.tsx';
import DonationSection from '@/components/organism/DonationSection.tsx';
import Radio from '@/components/organism/Radio.tsx';
import LatestYoutubeVideo from "@/components/organism/LatestYTVideo";
import Testimonies from "../organism/testimonies";

export default function Home() {
  return (
    <section className="flex flex-col">
      <Hero />
      <WhoWeAre />
      <ChurchActivities />
      <LatestYoutubeVideo />
      <Testimonies />
      <Radio/>
      <DonationSection />

    </section>
  );
}
