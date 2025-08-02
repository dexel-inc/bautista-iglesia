import { StrictMode, startTransition } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import App from './App.tsx'
import './i18n'

// Optimización: marcar el contenido principal como crítico
const root = createRoot(document.getElementById('root')!)

// Usar startTransition para priorizar el renderizado inicial
startTransition(() => {
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
})
