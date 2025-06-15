import { useEffect } from 'react';
import './App.css'
import NavBar from './components/NavBar.tsx';
import SideBar from './components/SideBar.tsx';
import Footer from './components/Footer.tsx';
import { useTranslation } from 'react-i18next';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ROUTES } from './config/routes.tsx';

function App() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.title = 'IBF - ' + t('siteTitle')
  }, [t, i18n.language])

  return (
    <BrowserRouter>
      <div className="drawer">
        <input id="sidebar" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col py-10">
          <NavBar></NavBar>
          <Routes>
            {ROUTES.map(route => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
          </Routes>
          <Footer></Footer>
        </div>
        <SideBar />
      </div>
    </BrowserRouter>
  )
}

export default App
