import { useTranslation } from "react-i18next";
import ServicesBanner from "@/components/molecules/ServicesBanner";
import churchImage from "../../../public/assets/church-image.png";
import churchInfo from "@/services/churchInfo.json";

export default function Services() {
  const { t } = useTranslation();

  return (
    <>
      {/* Mobile Version */}
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

      {/* Desktop/Tablet Version */}
      <section className="hidden md:block my-8 mx-auto max-w-6xl px-6">
        <ServicesBanner
          backgroundImage={churchImage}
          address={churchInfo.address}
          addressLines={churchInfo.addressLines}
          mapSrc={churchInfo.mapSrc}
          mapLink={churchInfo.mapLink}
        />
      </section>
    </>
  );
}
