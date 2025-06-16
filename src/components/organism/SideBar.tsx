function SideBar() {
  return (
    <div className="drawer-side z-20">
      <label htmlFor="sidebar" aria-label="close sidebar" className="drawer-overlay"></label>
      <ul className="menu bg-base-200 min-h-full w-80 p-4">
        <li><a>Sidebar Item 1</a></li>
        <li><a>Sidebar Item 2</a></li>
      </ul>
    </div>
  )
}

export default SideBar