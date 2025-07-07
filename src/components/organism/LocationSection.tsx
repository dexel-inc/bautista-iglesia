import { useTranslation } from "react-i18next";
import GoogleLocation from "../molecules/googleLocation";
import churchMapImg from "../../../public/assets/church-map.png";
import churchInfo from "@/services/churchInfo.json";

export default function LocationSection() {
  const { t } = useTranslation();

  return (
    <section className="bg-white my-8 mx-auto max-w-sm md:max-w-4xl">
      <div className="p-6 md:p-8">
        {/* Title */}
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            {t("location.title")}
            <span className="text-orange-600">{" " + t("location.subtitle")}</span>
          </h2>
        </div>

        {/* Content Layout */}
        <div className="md:grid md:grid-cols-2 md:gap-8 md:items-start">
          {/* Directions Text */}
          <div className="space-y-4 md:space-y-6">
            <div>
              <h3 className="font-bold text-orange-600 text-lg mb-2">
                {t("location.from_cg_title")}
              </h3>
              <p className="text-sm md:text-base leading-relaxed text-gray-700">
                {t("location.from_cg_desc")}
              </p>
            </div>
            <div>
              <h3 className="font-bold text-orange-600 text-lg mb-2">
                {t("location.from_south_title")}
              </h3>
              <p className="text-sm md:text-base leading-relaxed text-gray-700">
                {t("location.from_south_desc")}
              </p>
            </div>
          </div>

          {/* Map Image */}
          <div className="mt-6 md:mt-0">
            <img
              src={churchMapImg}
              alt="Mapa esquemático de ubicación de la iglesia"
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
        </div>

        {/* Biblical Quote */}
        <div className="mt-8 md:mt-12 text-center">
          <blockquote className="italic text-gray-600 text-sm md:text-base leading-relaxed max-w-md mx-auto">
            {t("location.bible_quote")}
            <br />
            <cite className="font-semibold text-orange-600 not-italic block mt-2">
              {t("location.bible_ref")}
            </cite>
          </blockquote>
        </div>
      </div>

      {/* Google Location Component */}
      <div className="md:hidden px-6 pb-6">
        <GoogleLocation
          address={churchInfo.address}
          addressLines={churchInfo.addressLines}
          mapSrc={churchInfo.mapSrc}
          mapLink={churchInfo.mapLink}
        />
      </div>
    </section>
  );
}
