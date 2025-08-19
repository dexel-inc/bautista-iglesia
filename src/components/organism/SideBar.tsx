import {Link} from "react-router-dom";
import LanguageSwitcher from "@/components/molecules/LanguageSwitcher.tsx";
import {useTranslation} from "react-i18next";

function SideBar() {
    const { t } = useTranslation();

    const closeSidebar = () => {
        const sidebarCheckbox = document.getElementById('sidebar') as HTMLInputElement;
        if (sidebarCheckbox) {
            sidebarCheckbox.checked = false;
        }
    };

    return (
      <div className="drawer-side z-20">
          <label 
            htmlFor="sidebar" 
            aria-label={t("accessibility.buttons.close")} 
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-60 md:w-80 min-h-full bg-base-200 text-base-content">
              <li>
                  <Link to="/#home" onClick={closeSidebar}>{t("menu.home")}</Link>
              </li>
              <li>
                  <Link to="/#radio" onClick={closeSidebar}>{t("menu.radio")}</Link>
              </li>
              <li>
                  <Link to="/about#home" onClick={closeSidebar}>{t("menu.aboutUs")}</Link>
              </li>
              <li>
                  <Link to="/about#missionaries" onClick={closeSidebar}>{t("menu.missionaries")}</Link>
              </li>
              <LanguageSwitcher/>
              <Link
                  to="/#donations"
                  className="mt-10 btn bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 border-none rounded-tr-lg shadow-none rounded-tl-none rounded-bl-lg rounded-br-none"
                  onClick={closeSidebar}
              >
                  {t("menu.donations")}
              </Link>
          </ul>
      </div>
  )
}

export default SideBar