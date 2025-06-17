import desiertoImg from "../../assets/desert-hero-image.png";
import { useTranslation } from 'react-i18next';
import AnimateOnScroll from '@/components/molecules/AnimateOnScroll.tsx';

export default function Hero() {
  const { t } = useTranslation();

  return (
    <div
        id="home"
        className="w-full h-[100vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${desiertoImg})` }}
    >
      <div className="w-full h-full bg-black/30 flex items-center justify-center">
        <div className="text-center text-white space-y-4">
          <AnimateOnScroll animation="animate-fade-down animate-duration-[4000ms] animate-ease-out">
            <h1
              className="title text-4xl md:text-6xl font-bold">
              A todos los sedientos venid…
            </h1>
            <h2
              className="title text-xl md:text-2xl font-semibold">
              {t('siteTitle')}
            </h2>
          </AnimateOnScroll>
        </div>
      </div>
    </div>
  );
}