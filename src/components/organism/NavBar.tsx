import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Logo from "@/components/atoms/Logo.tsx";
import LanguageSwitcher from "@/components/molecules/LanguageSwitcher.tsx";

const NAV_LINKS = [
  { to: "/#home", label: "menu.home" },
  { to: "/#radio", label: "menu.radio" },
  { to: "/about#home", label: "menu.aboutUs" },
  { to: "/about#missionaries", label: "menu.missionaries" },
];

function NavBar() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`navbar fixed top-0 right-0 left-0 z-20 w-full content-center justify-items-center px-4 ${
        scrolled ? "navbar-scrolled py-1" : "navbar-top py-2"
      }`}
    >
      <div className="title mx-2 flex flex-1 items-center px-2 min-h-[1.5rem]">
        <Logo
          className={`transition-all duration-500 ${
            scrolled ? "w-12 h-12 lg:w-14 lg:h-14" : "w-16 h-16 lg:w-20 lg:h-20"
          }`}
        />
        <span className="font-medium tracking-wide text-inherit">
          {t("siteTitle")}
        </span>
      </div>
      <div className="hidden flex-none lg:block">
        <ul className="menu menu-horizontal items-center gap-1">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className="nav-link rounded-full px-3 hover:bg-white/10 focus:bg-white/10"
              >
                {t(link.label)}
              </Link>
            </li>
          ))}
          <LanguageSwitcher />
          <Link
            to="/#donations"
            className="ml-4 inline-flex items-center justify-center rounded-full border-none bg-primary-500 px-6 py-2 text-sm font-semibold text-white shadow-lg shadow-primary-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-600 hover:shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-primary-300/60"
          >
            {t("menu.donations")}
          </Link>
        </ul>
      </div>
      <div className="flex-none lg:hidden">
        <label
          htmlFor="sidebar"
          aria-label={t("accessibility.buttons.menu")}
          className="btn btn-square btn-ghost transition-transform duration-300 hover:scale-110"
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
