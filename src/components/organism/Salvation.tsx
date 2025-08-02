import { useTranslation } from "react-i18next";

export default function SalvationSection() {
    const { t } = useTranslation();

    return (
        <div
            id="salvation"
            className="w-full py-8 px-6 md:px-16 bg-white flex flex-col justify-center lg:flex-row lg:items-center"
        >
            <div className="flex-1 w-full">
                <h2 className="title title-color text-center text-4xl md:text-6xl font-bold mb-4">
                    {t("salvation.title")}
                </h2>

                <div className="max-w-6xl mx-auto">
                    <div className="text-center text-sm max-w-3xl mx-auto mb-6">
                        {t("salvation.intro")}
                    </div>

                    <div className="text-base md:text-lg text-justify p-6 md:p-10 text-gray-800">
                        {t("salvation.content")}
                    </div>

                    <div className="grid md:grid-cols-2 gap-8" role="list">
                        <div className="card-item" role="listitem">
                            <h4 className="text-xl font-semibold text-primary-600 mb-2">
                                {t("salvation.points.1_title")}
                            </h4>
                            <p>{t("salvation.points.1_text")}</p>
                        </div>

                        <div className="card-item" role="listitem">
                            <h4 className="text-xl font-semibold text-primary-600 mb-2">
                                {t("salvation.points.2_title")}
                            </h4>
                            <p>{t("salvation.points.2_text")}</p>
                        </div>

                        <div className="card-item" role="listitem">
                            <h4 className="text-xl font-semibold text-primary-600 mb-2">
                                {t("salvation.points.3_title")}
                            </h4>
                            <p>{t("salvation.points.3_text")}</p>
                        </div>

                        <div className="card-item" role="listitem">
                            <h4 className="text-xl font-semibold text-primary-600 mb-2">
                                {t("salvation.points.4_title")}
                            </h4>
                            <p>{t("salvation.points.4_text")}</p>
                        </div>
                    </div>

                    <div className="text-center py-10 px-6 space-y-4">
                        <p className="text-xl font-medium text-gray-700">
                            {t("salvation.call_to_action")}
                        </p>
                        <p className="italic text-primary-600">{t("salvation.verse")}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
