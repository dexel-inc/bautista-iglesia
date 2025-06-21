import churchImage from "../../../assets/church-image.png";
import goinsFamily from "../../../assets/goins-family.png";
import { useTranslation } from 'react-i18next';
import AnimateOnScroll from '@/components/molecules/AnimateOnScroll.tsx';

export default function Hero() {
  const { t } = useTranslation();

  return (
      <section
          id="hero"
          className="w-full h-[100vh]  bg-cover bg-center bg-center flex items-center justify-center"
          style={{backgroundImage: `url(${churchImage})`, alignSelf: 'stretch'}}
      >
        <div className="w-full h-full bg-black/30 flex items-center content-center justify-center pt-30 px-8 md:px-30 flex flex-col lg:flex-row">
          <div className="w-full">
            <div className="max-w-4xl mx-auto py-20 flex flex-col gap-4 px-4 text-center text-white">
              <AnimateOnScroll animation="animate-fade-down animate-duration-[4000ms] animate-ease-out">
                <h1 className="title text-5xl md:text-6xl font-bold">
                  {t('menu.aboutUs')}
                </h1>
              </AnimateOnScroll>
              <p className="text-md">
               {t('who_we_are.description')}
              </p>
            </div>
          </div>
          <div className="flex h-full items-end content-end justify-end">
            <img
                src={goinsFamily}
                alt="Family"
                className="w-[100vh] h-[60vh]"
            />
          </div>
        </div>
      </section>
  );
}