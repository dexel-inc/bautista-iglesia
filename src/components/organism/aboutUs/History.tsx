
import { useTranslation } from 'react-i18next';
import AnimateOnScroll from '@/components/molecules/AnimateOnScroll.tsx';
import CommunityMeeting from "../../../../public/assets/community-meeting.webp";

export default function History() {
  const { t } = useTranslation();

  return (
      <section className="py-16 bg-white text-gray-800">
          <div className="mx-auto flex flex-col flex-col-reverse lg:flex-row gap-12 px-8 justify-center items-center">
              <div className="md:p-4 w-full md:w-1/2">
                  <svg height="100%" width="100%" viewBox="0 0 384 192" className="hidden md:block">
                      <mask id="blob1" className="mask-type-alpha">
                          <path
                                d="M138.25 45.9161c34.504 -4.0384 45.586 -8.2996 69.504 -26.7274c35.516 -27.35568 88.5 -27.47958 103.651 24.8472c11.65 40.2452 0.417 90.1771 -25.438 113.0701c-43.537 38.552 -124.113 45.445 -174.128 15.703c-43.1183 -25.637 -56.9741 -74.9589 -30.0882 -107.1019c9.1187 -10.902 23.4522 -15.924 56.4992 -19.791z"></path>
                      </mask>
                      <image href={CommunityMeeting} height="100%" width="100%" mask="url(#blob1)"
                             className="object-contain"/>
                  </svg>
                  <img src={CommunityMeeting} alt="Community" className="rounded-lg shadow-md object-contain block md:hidden" />
              </div>
              <div className="flex-1 p-2 md:p-6">
                  <AnimateOnScroll
                      animation="animate-fade-right md:animate-fade-left animate-fill-both animate-duration-[2000ms] animate-ease-out">
                      <h2 className="title title-color text-center md:text-left text-4xl md:text-6xl font-bold mb-4">
                          {t('common.our')} <span className="text-primary-500 font-bold">{t('common.history')}</span>
                      </h2>
                  </AnimateOnScroll>
                  <p className="text-color text-md md:text-lg leading-relaxed">
                     {t('our_pastor.description')}
                  </p>
              </div>
          </div>
      </section>
  );
}