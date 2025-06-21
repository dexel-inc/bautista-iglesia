import Hero from "@/components/organism/aboutUs/Hero.tsx";
import History from "@/components/organism/aboutUs/History.tsx";
import OurPastor from "@/components/organism/aboutUs/OurPastor.tsx";
import Missionaries from "@/components/organism/aboutUs/Missionaries.tsx";

export default function About() {
  return <section className="flex flex-col">
    <Hero/>
    <History/>
    <OurPastor/>
    <Missionaries/>
  </section>;
}