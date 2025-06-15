import { useEffect } from 'react';
import './App.css'
import NavBar from './components/NavBar.tsx';
import SideBar from './components/SideBar.tsx';
import Footer from './components/Footer.tsx';
import { useTranslation } from 'react-i18next';

function App() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.title = 'IBF - ' + t('siteTitle')
  }, [t, i18n.language])

  return (
    <>
      <div className="drawer">
        <input id="sidebar" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col py-10">
          <NavBar></NavBar>
          <Footer></Footer>
        </div>
        <SideBar />
      </div>
    </>
  )
}

export default App
