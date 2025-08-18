import {useTranslation} from "react-i18next";
import churchImg from "@/assets/community-meeting.webp";
import AnimateOnScroll from "@/components/molecules/AnimateOnScroll.tsx";

export default function WhoWeAre() {
  const { t } = useTranslation();

  return (
        <div
            className="w-full py-8 px-4 bg-white flex flex-col justify-center lg:flex-row lg:items-center lg:px-0 lg:pl-4">
          <div className="max-w-4xl lg:w-1/2 rounded-xl flex flex-col items-center">
            <div className="flex-1 p-2 md:p-6">
              <AnimateOnScroll
                  animation="animate-fade-right animate-fill-both animate-duration-[2000ms] animate-ease-out">
                <h2 className="title title-color text-center text-4xl md:text-6xl font-bold mb-4">
                  {t("who_we_are.title_hispanic")}
                  <span className="text-primary-500 font-bold"> {t("who_we_are.for_christ")}</span>
                </h2>
              </AnimateOnScroll>
              <p className="text-color text-sm leading-relaxed text-center gap-2 flex flex-col">
            <span>
            {t("who_we_are.question")}
            </span>
                <span className="font-extrabold text-3xl text-primary-500">
              {t("who_we_are.christ_answer")}
            </span>
                <span className="text-md">
              {t("who_we_are.invitation")}
            </span>
              </p>
            </div>
          </div>
          <div className="relative w-full flex flex-col items-center mt-4 lg:w-1/2">
            <div
                className="relative w-[75vw] h-[30vh] flex justify-center items-end z-10 lg:w-[40vw] lg:h-[50vh] lg:absolute lg:top-1/2 lg:-translate-y-1/2">
              <img
                  src={churchImg}
                  alt="Congregación de la Iglesia Bautista Fundamental reunida en oración y adoración"
                  className="w-[75vw] h-[30vh] object-cover rounded-3xl shadow-lg
              lg:w-[40vw] lg:h-[50vh]"
                  style={{zIndex: 2}}
              />
            </div>
            <div
                className="-mt-20 w-[90vw] h-36 bg-primary-300 rounded-t-full mx-auto z-0
            lg:mx-0 lg:mt-0 lg:ml-auto lg:w-[35vw] lg:h-[70vh] lg:rounded-l-full lg:rounded-t-none"
            ></div>
          </div>
        </div>
  );
}
