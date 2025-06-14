import './App.css'
import NavBar from './components/NavBar.tsx';
import SideBar from './components/SideBar.tsx';

function App() {
  return (
    <>
      <div className="drawer">
        <input id="sidebar" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          <NavBar></NavBar>
        </div>
        <SideBar />
      </div>
    </>
  )
}

export default App
