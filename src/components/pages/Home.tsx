import Hero from "../molecules/hero";
import WhoWeAre from "../molecules/WhoWeAre";

export default function Home() {
  return (
    <section className="flex flex-col">
      <Hero />
      <WhoWeAre />
    </section>
  );
}
