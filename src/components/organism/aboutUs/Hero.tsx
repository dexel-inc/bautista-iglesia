import churchImage from "@/assets/church-in-desert.webp";
import goinsFamily from "@/assets/goins-family.png";
import { useTranslation } from "react-i18next";
import AnimateOnScroll from "@/components/molecules/AnimateOnScroll.tsx";

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section
      id="home"
      className="relative flex min-h-[92vh] w-full flex-col items-center justify-between bg-cover bg-center lg:flex-row"
      style={{ backgroundImage: `url(${churchImage})` }}
    >
      {/* Overlay en gradiente para dar profundidad y legibilidad */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-black/65" />

      <div className="relative z-10 flex h-full w-full flex-col items-center justify-between gap-4 px-5 sm:px-8 lg:flex-row">
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center justify-center gap-5 pt-28 text-center text-white lg:pt-24">
          <AnimateOnScroll animation="animate-fade-down animate-fill-both animate-duration-[1200ms] animate-ease-out">
            <h1 className="title text-4xl font-bold tracking-tight drop-shadow-lg sm:text-5xl md:text-6xl">
              {t("menu.aboutUs")}
            </h1>
            <span className="mx-auto mt-5 block h-1 w-20 rounded-full bg-primary-500" />
          </AnimateOnScroll>

          <AnimateOnScroll animation="animate-fade-up animate-fill-both animate-duration-[1200ms] animate-delay-200 animate-ease-out">
            <p className="max-w-2xl text-base leading-relaxed text-white/90 drop-shadow md:text-lg">
              {t("who_we_are.description")}
              <span className="font-semibold text-white">
                {" " + t("who_we_are.welcome")}
              </span>
            </p>
          </AnimateOnScroll>
        </div>

        <div className="flex h-full items-end justify-end">
          <AnimateOnScroll animation="animate-fade-up animate-fill-both animate-duration-[1400ms] animate-ease-out">
            <img
              src={goinsFamily}
              alt="Family"
              loading="eager"
              fetchPriority="high"
              className="mx-auto h-auto object-contain object-bottom drop-shadow-2xl"
            />
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
