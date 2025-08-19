import Hero from "@/components/organism/aboutUs/Hero.tsx";
import History from "@/components/organism/aboutUs/History.tsx";
import Missionaries from "@/components/organism/aboutUs/Missionaries.tsx";

export default function About() {
  return <section className="flex flex-col">
    <Hero/>
    <History/>
    <div id="missionaries">
      <Missionaries />
    </div>
  </section>;
}