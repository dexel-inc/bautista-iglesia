import Logo from './Logo.tsx';

function NavBar() {
  return (
    <div
      className="navbar justify-items-center content-center bg-transparent w-full shadow fixed top-0 left-0 right-0 z-20">
      <div className="mx-2 flex-1 flex px-2 items-center">
        <Logo className="w-20 h-20" />
        Iglesia Bautista fundamental
      </div>
      <div className="hidden flex-none lg:block">
        <ul className="menu menu-horizontal">
          <li><a>Navbar Item 1</a></li>
          <li><a>Navbar Item 2</a></li>
        </ul>
      </div>
      <div className="flex-none lg:hidden">
        <label htmlFor="sidebar" aria-label="open sidebar" className="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-6 w-6 stroke-current"
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
  )
}

export default NavBar