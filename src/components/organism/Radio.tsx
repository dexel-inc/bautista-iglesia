import radioImage from "@/assets/radio-image.jpg";
import { useTranslation } from 'react-i18next';
import { Trans } from 'react-i18next';
import AnimateOnScroll from "@/components/molecules/AnimateOnScroll.tsx";

function Radio() {
    const { t } = useTranslation();

    return (
        <div
            id="radio"
            className="w-full h-[100vh] bg-white flex flex-col justify-center items-center"
        >
            <div
                className="relative w-full rounded-xl min-h-[80%]  items-center md:items-start overflow-hidden"
                style={{
                    backgroundImage: `url(${radioImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="absolute inset-0 bg-white/80"></div>

                <div className="relative z-10  grid grid-cols-1 md:grid-cols-2 h-full p-10 px-16 md:p-20 items-center">
                    <div className="flex flex-col justify-between gap-10">
                        <AnimateOnScroll animation="animate-fade-right animate-fill-both animate-duration-[2000ms] animate-ease-out">
                            <h2 className="title-color title text-4xl md:text-6xl font-bold mb-4">
                                {t('radio.title')}
                            </h2>
                        </AnimateOnScroll>

                        <p className="title-color text-md md:text-lg leading-relaxed">
                            {t('radio.description')}
                        </p>

                        <a
                            href="https://radiolavoz.net/listen/"
                            className="hidden md:inline-block bg-orange-500 hover:bg-orange-600 text-center text-white font-semibold px-6 py-3 rounded-xl"
                        >
                            {t("radio.button")}
                        </a>
                    </div>

                    <div className="flex flex-col h-full w-full items-start md:items-center md:justify-center gap-10">
                        <div className="flex gap-4">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="h-10 w-10">
                                <path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/>
                            </svg>

                            <p className="title-color text-sm md:text-lg leading-relaxed">
                                <Trans i18nKey="radio.schedule" />
                            </p>
                        </div>

                        <a
                            href="https://radiolavoz.net/listen/"
                            className="block md:hidden w-full bg-orange-500 hover:bg-orange-600 text-center text-white font-semibold px-6 py-3 rounded-xl"
                        >
                            {t("radio.button")}
                        </a>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Radio;
