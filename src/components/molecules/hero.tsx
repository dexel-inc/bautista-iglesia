import desiertoImg from "../../assets/desert-hero-image.jpg";

export default function Hero() {
  return (
    <div
      className="w-full h-[100vh] bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${desiertoImg})` }}
    >
      <div className="w-full h-full bg-black/30 flex items-center justify-center">
        <div className="text-center text-white space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold">
            A todos los sedientos venid…
          </h1>
          <h2 className="text-xl md:text-2xl font-semibold">
            Iglesia Bautista Fundamental
          </h2>
        </div>
      </div>
    </div>
  );
}