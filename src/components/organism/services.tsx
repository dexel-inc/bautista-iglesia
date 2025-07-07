import { useTranslation } from "react-i18next";

export default function Services() {
  const { t } = useTranslation();

  return (
    <>
      <section className="flex flex-col my-4 md:hidden">
        <div className="bg-orange-400 text-white rounded py-16 px-10 flex flex-col items-center">
          <h2 className="text-3xl text-center font-bold mb-2">
            {t("services.title")}
          </h2>
          <div className="py-4">
            <div className="flex flex-col items-center">
              <p>{t("services.sunday")}</p>
              <p>{t("services.thursday")}</p>
            </div>
          </div>
          <div className="mb-2">
            <div className="flex flex-col items-center text-center">
              <p>{t("services.email")}</p>
              <p>{t("services.phone")}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
