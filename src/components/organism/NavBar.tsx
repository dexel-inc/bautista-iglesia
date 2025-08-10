import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Logo from "@/components/atoms/Logo.tsx";
import LanguageSwitcher from "@/components/molecules/LanguageSwitcher.tsx";

function NavBar() {
  const { t } = useTranslation();

  return (
    <div className="navbar justify-items-center content-center bg-transparent w-full shadow fixed top-0 left-0 right-0 z-20 px-4">
      <div className="title mx-2 flex-1 flex px-2 items-center min-h-[1.5rem]">
        <Logo className="w-16 h-16 lg:w-20 lg:h-20" />
        <span className="font-medium text-inherit">{t("siteTitle")}</span>
      </div>
      <div className="hidden flex-none lg:block">
        <ul className="menu menu-horizontal">
          <li>
            <Link to="/#home">{t("menu.home")}</Link>
          </li>
          <li>
            <Link to="/#radio">{t("menu.radio")}</Link>
          </li>
          <li>
            <Link to="/about#home">{t("menu.aboutUs")}</Link>
          </li>
          <LanguageSwitcher />
          <Link
            to="/#donations"
            className="ml-4 btn bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 border-none rounded-tr-lg shadow-none rounded-tl-none rounded-bl-lg rounded-br-none"
          >
            {t("menu.donations")}
          </Link>
        </ul>
      </div>
      <div className="flex-none lg:hidden">
        <label
          htmlFor="sidebar"
          aria-label={t("accessibility.buttons.menu")}
          className="btn btn-square btn-ghost"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-6 w-6 stroke-current"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
      </div>
    </div>
  );
}

export default NavBar;
