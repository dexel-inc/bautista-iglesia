import { useTranslation } from "react-i18next";
import AnimateOnScroll from "@/components/molecules/AnimateOnScroll.tsx";

const POINTS = [1, 2, 3, 4] as const;

const POINT_DELAYS = [
    "animate-delay-0",
    "animate-delay-100",
    "animate-delay-200",
    "animate-delay-300",
];

/** Los títulos vienen como "1. Reconocer…"; el número se muestra en la insignia. */
const stripLeadingNumber = (text: string) =>
    text.replace(/^\s*\d+\s*[.)-]\s*/, "");

export default function SalvationSection() {
    const { t } = useTranslation();

    return (
        <section
            id="salvation"
            className="w-full bg-gradient-to-b from-white via-white to-gray-50 py-12 md:py-16"
        >
            {/* Encabezado: mismo lenguaje visual que el resto de secciones */}
            <AnimateOnScroll animation="animate-fade-down animate-fill-both animate-duration-[1200ms] animate-ease-out">
                <div className="flex flex-col items-center px-6 text-center">
                    <h2 className="title title-color mx-auto max-w-4xl text-balance text-3xl font-bold md:text-5xl">
                        {t("salvation.title")}
                    </h2>

                    <p className="mt-3 max-w-xl text-sm text-gray-500 md:text-base">
                        {t("salvation.intro")}
                    </p>
                </div>
            </AnimateOnScroll>

            {/* Texto introductorio */}
            <AnimateOnScroll animation="animate-fade-up animate-fill-both animate-duration-[900ms] animate-ease-out">
                <p className="mx-auto mt-8 max-w-3xl px-6 text-base leading-relaxed text-gray-600 md:mt-10 md:text-lg">
                    {t("salvation.content")}
                </p>
            </AnimateOnScroll>

            {/* Los cuatro pasos */}
            <div
                className="mx-auto mt-10 grid max-w-5xl gap-6 px-6 md:mt-12 md:grid-cols-2 md:gap-8"
                role="list"
            >
                {POINTS.map((point, index) => (
                    <AnimateOnScroll
                        key={point}
                        className="h-full"
                        animation={`animate-fade-up animate-fill-both animate-duration-700 animate-ease-out ${POINT_DELAYS[index]}`}
                    >
                        <article
                            role="listitem"
                            className="card-item flex h-full flex-col gap-3"
                        >
                            <div className="flex items-center gap-3">
                                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-500 text-base font-bold text-white">
                                    {point}
                                </span>
                                <h4 className="text-lg font-semibold leading-snug text-primary-600 md:text-xl">
                                    {stripLeadingNumber(
                                        t(`salvation.points.${point}_title`)
                                    )}
                                </h4>
                            </div>

                            <p className="text-sm leading-relaxed text-gray-600 md:text-base">
                                {t(`salvation.points.${point}_text`)}
                            </p>
                        </article>
                    </AnimateOnScroll>
                ))}
            </div>

            {/* Llamado final */}
            <AnimateOnScroll animation="animate-fade-up animate-fill-both animate-duration-[900ms] animate-ease-out">
                <div className="mx-auto mt-12 max-w-3xl px-6 text-center">
                    <p className="text-xl font-medium text-gray-700 md:text-2xl">
                        {t("salvation.call_to_action")}
                    </p>
                    <span className="mx-auto mt-4 mb-4 block h-1 w-12 rounded-full bg-primary-400" />
                    <p className="mx-auto max-w-xl italic leading-relaxed text-primary-600">
                        {t("salvation.verse")}
                    </p>
                </div>
            </AnimateOnScroll>
        </section>
    );
}
