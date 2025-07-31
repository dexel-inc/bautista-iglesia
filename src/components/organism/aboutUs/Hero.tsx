import churchImage from "../../../../public/assets/church-image2.png";
import goinsFamily from "../../../../public/assets/goins-family.png";
import { useTranslation } from 'react-i18next';
import AnimateOnScroll from '@/components/molecules/AnimateOnScroll.tsx';

export default function Hero() {
  const { t } = useTranslation();

  return (
        <section id="home"
                 className="w-full min-h-[100vh] bg-cover gap-4 pt-30 fill-black/30 flex flex-col lg:flex-row justify-between bg-local items-center"
                 style={{ backgroundImage: `url(${churchImage})` }}>
                <div
                    className="w-full h-full max-w-4xl mx-auto flex flex-col justify-center items-center gap-4 text-center text-white px-4">
                    <AnimateOnScroll animation="animate-fade-down animate-duration-[4000ms] animate-ease-out">
                        <h1 className="title text-5xl md:text-6xl font-bold">
                            {t('menu.aboutUs')}
                        </h1>
                    </AnimateOnScroll>
                    <div className="text-md max-w-2xl">
                        {t('who_we_are.description')}
                        <span className="text font-semibold">
                            {' ' + t("who_we_are.welcome")}
                        </span>
                    </div>
                </div>
                <div className="flex h-full items-end content-end justify-end">
                    <img src={goinsFamily}
                         alt="Family"
                         loading="eager"
                         fetchPriority="high"
                         className="bg-local h-auto object-contain object-bottom mx-auto"/>
                </div>
        </section>
  );
}