import Home from '../components/pages/Home';
import About from '../components/pages/About';
import type { JSX } from 'react';

export interface AppRoute {
  path: string;
  label: string;
  element: JSX.Element;
}

export const ROUTES: AppRoute[] = [
  {
    path: '/',
    label: 'Inicio',
    element: <Home />
  },
  {
    path: '/about',
    label: 'Sobre nosotros',
    element: <About />
  }
];