import { useTranslation } from "react-i18next";

export default function Services() {
  const { t } = useTranslation();

  return (
    <section className="flex flex-col my-4 max-w-sm md:hidden">
      <div className="bg-orange-500 text-white rounded p-4 mb-4">
        <h2 className="text-xl font-bold mb-2">{t("services.title")}</h2>
        <div className="mb-2">
          <div className="font-semibold">{t("services.sunday")}</div>
          <div className="font-semibold">{t("services.thursday")}</div>
        </div>
        <div className="text-sm">{t("services.email")}</div>
        <div className="text-sm">{t("services.phone")}</div>
      </div>
    </section>
  );
}