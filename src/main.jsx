import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "@fortawesome/fontawesome-free/css/all.min.css"
import { HeroUIProvider } from '@heroui/react'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HeroUIProvider>

      <App />


    </HeroUIProvider>
  </StrictMode>,
)
