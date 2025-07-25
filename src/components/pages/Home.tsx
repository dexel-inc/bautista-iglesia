import Hero from "@/components/organism/Hero.tsx";
import WhoWeAre from "@/components/organism/WhoWeAre.tsx";
import ChurchActivities from '@/components/organism/ChurchActivities.tsx';
import DonationSection from '@/components/organism/DonationSection.tsx';
import Radio from '@/components/organism/Radio.tsx';
import LatestYoutubeVideo from "@/components/organism/LatestYTVideo";
import LocationSection from "@/components/organism/LocationSection";
import Services from "@/components/organism/services";
import Testimonials from "@/components/organism/testimonials";
import Salvation from "@/components/organism/Salvation.tsx";

export default function Home() {
  return (
    <section className="flex flex-col">
      <Hero />
      <WhoWeAre />
      <ChurchActivities />
      <Services />
      <LocationSection />
      <LatestYoutubeVideo />
      <Salvation/>    
      <Testimonials />
      <Radio/>
      <DonationSection />
    </section>
  );
}
