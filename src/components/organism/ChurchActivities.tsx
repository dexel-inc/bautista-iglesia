import Carrousel from '../molecules/Carrousel.tsx';
import PredicationIco from '../atoms/PredicationIco.tsx';
import FamilyIco from '../atoms/FamilyIco.tsx';
import MusicIco from '../atoms/MusicIco.tsx';
import FriendsIco from '../atoms/FriendsIco.tsx';
import ActivitiesIco from '../atoms/ActivitiesIco.tsx';
import BibleIco from '../atoms/BibleIco.tsx';
import CampIco from '../atoms/CampIco.tsx';
import { Trans, useTranslation } from 'react-i18next';
import AnimateOnScroll from '../molecules/AnimateOnScroll.tsx';
import {JSX} from "react";

const slides: Record<string, { logo: JSX.Element }> = {
  'preaching': {
    "logo": <PredicationIco />
  },
  'class': {
    "logo": <FamilyIco />
  },
  'music': {
    "logo": <MusicIco />
  },
  'friends': {
    "logo": <FriendsIco />
  },
  'family': {
    "logo": <FamilyIco />
  },
  "activities": {
    "logo": <ActivitiesIco />
  },
  "bible": {
    "logo": <BibleIco />
  },
  "camp": {
    "logo": <CampIco />
  }
};

export default function ChurchActivities() {
  const { t } = useTranslation();

  return (
    <section className="py-12 mx-16">
      <AnimateOnScroll animation="animate-fade-right animate-fill-both animate-duration-[2000ms] animate-ease-out">
        <h2 className="title title-color text-4xl font-bold">
          <Trans i18nKey="common.activities" /> <span className="text-orange-500">{t('common.our_church')}</span>
        </h2>
      </AnimateOnScroll>
      <Carrousel className="w-full" slides={Object.keys(slides)} lengthWithPageLG={4}>
            {Object.keys(slides).map((text, i) => (
              <div
                key={i}
                className="snap-center items-center justify-center h-full px-1 shrink-0 w-full md:w-1/4"
              >
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="text-orange-500 text-6xl mb-4 w-24 h-24">{slides[text].logo}</div>
                  <p className="text-sm font-medium max-w-[200px] leading-tight">
                    {t(`activities.${text}`)}
                  </p>
                </div>
              </div>
            ))}
        </Carrousel>
    </section>
  )
}
