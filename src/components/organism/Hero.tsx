import churchHero from "@/assets/church-in-desert.webp";
import { useTranslation } from 'react-i18next';
import AnimateOnScroll from '@/components/molecules/AnimateOnScroll.tsx';

export default function Hero() {
  const { t } = useTranslation();

  return (
    <div
        id="home"
        className="relative w-full h-[100vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${churchHero})` }}
    >
      <div className="w-full h-full bg-black/15 flex items-center justify-center p-8">
        <div className="text-center text-white space-y-4">
          <AnimateOnScroll animation="animate-fade-down animate-duration-[4000ms] animate-ease-out">
            <h1
              className="title text-4xl md:text-6xl font-bold">
              {t('common.hero_msg')}
            </h1>
            <h2
              className="title text-xl md:text-2xl font-semibold">
              {t('siteTitle')}
            </h2>
          </AnimateOnScroll>
        </div>
      </div>
         <span
        aria-hidden
        className="absolute bottom-8 left-1/2 flex h-11 w-7 -translate-x-1/2 justify-center rounded-full border-2 border-white/60 pt-2"
      >
        <span className="h-2 w-1 animate-bounce rounded-full bg-white/80" />
      </span>
    </div>
  );
}