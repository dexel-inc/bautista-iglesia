import { useTranslation } from "react-i18next";
import churchSchedulesJson from "@/services/church_schedules.json";

interface ServicesBannerProps {
  backgroundImage: string;
  mapSrc: string;
  mapLink: string;
  className?: string;
}

const churchSchedules: Record<string, { start_time: string }> = churchSchedulesJson;

export default function ServicesBanner({
  backgroundImage,
  mapSrc,
  mapLink,
  className = ""
}: ServicesBannerProps) {
  const { t } = useTranslation();

  return (
    <div 
      className={`relative rounded-lg overflow-hidden flex items-center max-w-6xl md:p-5 lg:p-10 mx-auto ${className}`}
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Content */}
      <div className="flex-1 text-white p-8 md:p-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          {t("services.title")}
        </h2>
        
        {/* Schedules */}
        <div className="mb-6">
          {Object.keys(churchSchedules).map((day) => (
            <p key={day} className="text-lg md:text-xl mb-1">
              {t(`common.week_days.${day}`)} {churchSchedules[day].start_time}
            </p>
          ))}
        </div>

        {/* Contact Info */}
        <div className="space-y-2">
          <p className="text-base md:text-lg">
            {t("services.email")}
          </p>
          <p className="text-base md:text-lg">
            {t("services.phone")}
          </p>
        </div>
      </div>

      {/* Map */}
      <div className="w-80 h-60 m-8 rounded-lg overflow-hidden shadow-lg">
        <iframe
          src={mapSrc}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={t("location.title")}
        />
        <div className="absolute bottom-2 right-2">
          <a
            href={mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-gray-800 px-3 py-1 rounded text-sm font-medium hover:bg-gray-100 transition-colors"
          >
            {t("location.view_map")}
          </a>
        </div>
      </div>
    </div>
  );
}
