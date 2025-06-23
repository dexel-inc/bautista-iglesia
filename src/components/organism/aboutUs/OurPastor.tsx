import AnimateOnScroll from '@/components/molecules/AnimateOnScroll.tsx';
import GoinsPastor from "../../../../public/assets/goins-pastor.png";
import {useTranslation} from "react-i18next";

export default function OurPastor() {
    const { t } = useTranslation();

    return (
      <section className="py-16 bg-white shadow shadow-3xl text-gray-800">
          <div className="mx-auto flex flex-col flex-co lg:flex-row gap-12 px-8 justify-center items-center">
              <div className="flex-1 p-2 md:p-6 flex flex-col items-center md:items-start">
                  <AnimateOnScroll
                      animation="animate-fade-right animate-fill-both animate-duration-[2000ms] animate-ease-out">
                      <h2 className="title title-color text-4xl md:text-6xl font-bold mb-4">
                          { t('our_pastor.our')} <span className="text-orange-500 font-bold">{ t('our_pastor.pastor')}</span>
                      </h2>
                  </AnimateOnScroll>
                  <div className="w-full flex justify-center">
                      <div className="relative p-4 max-w-xl inline lg:hidden flex justify-items-center">
                          <img src={GoinsPastor} alt="Pastor Roberto Goins" className='w-2/4 h-full'/>
                      </div>
                  </div>
                  <p className="text-color pt-4 lg:pt-0 text-md md:text-lg leading-relaxed">
                      {t('our_pastor.description')}
                  </p>
              </div>
              <div className="relative p-4 max-w-xl hidden lg:inline">
                  <img src={GoinsPastor} alt="Pastor Roberto Goins" className='w-90 h-98'/>
              </div>
          </div>
      </section>
  );
}