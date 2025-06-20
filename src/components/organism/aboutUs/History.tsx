
import { useTranslation } from 'react-i18next';
import AnimateOnScroll from '@/components/molecules/AnimateOnScroll.tsx';
import CommunityMeeting from "../../../assets/community-meeting.jpg";

export default function History() {
  const { t } = useTranslation();

  return (
      <section className="py-16 bg-white text-gray-800">
        <div className="mx-auto flex flex-col flex-col-reverse lg:flex-row gap-12 px-8 justify-center items-center">
          <div className="p-4 max-w-2xl">
            <img src={CommunityMeeting} alt="meeting" className="rounded-lg shadow-md"/>
          </div>
          <div className="flex-1 p-2 md:p-6">
            <AnimateOnScroll animation="animate-fade-left animate-fill-both animate-duration-[2000ms] animate-ease-out">
                  <h2 className="title title-color text-4xl md:text-6xl font-bold mb-4">
                    {t('common.our')} <span className="text-orange-500 font-bold">{t('common.history')}</span>
                  </h2>
                </AnimateOnScroll>
                <p className="text-color text-md md:text-lg leading-relaxed">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
          </div>
        </div>
    </section>
);
}