import { useTranslation } from "react-i18next";

export default function LocationSection() {
  const { t } = useTranslation();

  return (
    <section className="flex flex-col bg-white rounded-lg shadow-md p-4 my-4 max-w-sm mx-auto">
      {/* Mapa y Direcciones */}
      <div className="mb-4">
        <h2 className="text-xl font-bold text-orange-600">{t("location.title")}</h2>
        <div className="text-orange-600 font-semibold mb-2">{t("location.subtitle")}</div>
        <div className="mb-2">
          <span className="font-bold text-orange-600">{t("location.from_cg_title")}</span>
          <p className="text-sm">{t("location.from_cg_desc")}</p>
        </div>
        <div className="mb-2">
          <span className="font-bold text-orange-600">{t("location.from_south_title")}</span>
          <p className="text-sm">{t("location.from_south_desc")}</p>
        </div>
        {/* Imagen del mapa esquemático */}
        <img src="/mapa-iglesia.png" alt="Mapa esquemático" className="w-full my-2 rounded" />
        {/* Cita bíblica */}
        <blockquote className="italic text-center text-gray-700 my-2">
          {t("location.bible_quote")}
          <br />
          <span className="font-semibold">{t("location.bible_ref")}</span>
        </blockquote>
        {/* Google Maps */}
        <a
          href="https://maps.app.goo.gl/4kqQw3k2Qw9u6k8A8"
          target="_blank"
          rel="noopener noreferrer"
          className="block my-2"
        >
          <img
            src="/google-maps-preview.png"
            alt={t("location.view_map")}
            className="w-full rounded"
          />
        </a>
        <div className="text-center font-bold mt-2 whitespace-pre-line">
          {t("location.address")}
        </div>
      </div>
    </section>
  );
}