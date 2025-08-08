import Logo from "@/components/atoms/Logo.tsx";
import churchImage from "../../../public/assets/church-in-desert.webp";
import churchSchedulesJson from "@/services/church_schedules.json";
import navegation from "@/services/navegation.json";
import { useTranslation } from "react-i18next";
import subscriptionsService from "@/domain/services/subscriptions.service.ts";
import React, { useState } from "react";
import Notification from "@/components/molecules/Notification.tsx";

const churchSchedules: Record<string, { start_time: string }> = churchSchedulesJson;

function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const storeSubscription = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const emailInput = e.currentTarget.elements.namedItem("newsletter-email") as HTMLInputElement;
      if (emailInput?.value) {
          try {
              const response = await subscriptionsService.storeSubscription({ email: emailInput.value });
              if (response) {
                  emailInput.value = "";
                  setNotification({ message: t("footer.subscription_message.success"), type: "success" });
              } else {
                  setNotification({ message: t("footer.subscription_message.error"), type: "error" });
              }
          } catch (error) {
              console.error("Error subscribing:", error);
              setNotification({ message: t("footer.subscription_message.error"), type: "error" });
          }
      }
  };

  return (
    <footer id="footer" className="bg-white text-gray-400">
      <section className="max-w-6xl mx-auto px-6 py-10">
        <div
          className="bg-opacity-40 p-10 rounded-3xl text-center flex flex-col items-center justify-ceneter text-white"
          style={{
            backgroundImage: `url(${churchImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h2 className="title w-4/5 md:w-1/2 text-2xl md:text-4xl font-semibold mb-6">
            {t("footer.subscribe_desc")}
          </h2>
          <form
              className="max-w-xl mx-auto w-full flex flex-col md:flex-row items-center gap-4"
              onSubmit={storeSubscription}
          >
            <div className="w-full md:flex-1">
              <label htmlFor="newsletter-email" className="sr-only">
                {t("common.inputs.email.label")}
              </label>
              <input
                id="newsletter-email"
                type="email"
                placeholder={t("common.inputs.email.description")}
                className="w-full px-4 py-3 rounded-xl text-gray-800 bg-white focus:outline-none"
                required
              />
            </div>
            <button
              type="submit"
              aria-label={t("accessibility.buttons.subscribe")}
              className="bg-primary-500 hover:bg-primary-600 text-white font-semibold px-6 py-3 rounded-xl"
            >
              {t("footer.subscribe")}
            </button>
          </form>
        <div className="mt-4 w-full max-w-xl mx-auto">
            {notification && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification(null)}
                />
            )}
        </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Logo className="w-12 h-12"></Logo>
            <h3 className="font-semibold text-gray-800 title">
              {t("siteTitle")}
            </h3>
          </div>
          <p className="text-sm mb-2">
            {t("footer.short_desc") + " "}
            <a href="#" className="text-gray-600 underline hover:text-gray-800">
              {" "}
              {t("common.read_more")}
            </a>
          </p>
          <div className="mt-4">
            <h4 className="font-semibold text-sm uppercase text-gray-800">
              {t("common.schedules")}
            </h4>
            {Object.keys(churchSchedules).map((title) => (
              <p key={title} className="text-sm">
                {" "}
                {t(`common.week_days.${title}`)} —{" "}
                {churchSchedules[title].start_time}
              </p>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-sm uppercase text-gray-800 mb-3">
            {t("common.navegation")}
          </h4>
          <ul className="space-y-2 text-sm">
            {Object.values(navegation).map((title) => (
              <li key={title}>
                <a href={`#${title}`} className="hover:text-gray-800">
                  {t(`menu.${title}`)}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-sm uppercase mb-3 text-gray-800">
            {t(`common.followUs`)}
          </h4>
          <a
            href="https://www.youtube.com/@iglesiabautistafundamental9995"
            aria-label="Canal de YouTube"
            className="inline-flex items-center justify-center w-10 h-10 border border-gray-400 rounded-full hover:bg-gray-200"
          >
            <svg
              fill="currentColor"
              viewBox="0 0 24 24"
              className="w-5 h-5"
              aria-hidden="true"
            >
              <path d="M19.6 3.2H4.4C3.1 3.2 2 4.3 2 5.6v12.8c0 1.3 1.1 2.4 2.4 2.4h15.2c1.3 0 2.4-1.1 2.4-2.4V5.6c0-1.3-1.1-2.4-2.4-2.4zM10 16V8l6 4-6 4z" />
            </svg>
          </a>
        </div>
      </div>

      <div className="border-t border-gray-200 py-6 text-center text-sm">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>{t('footer.copyright', { year: currentYear })}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
