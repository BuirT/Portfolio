import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import './i18n/i18n'

window.addEventListener('error', (e) => {
  document.body.innerHTML += `<div style="color:red; background:white; position:fixed; z-index:9999; top:0; left:0; width:100vw; height:100vh; overflow:auto; padding:20px; font-family:monospace; white-space:pre-wrap;"><h1>React Crash</h1><p>${e.message}</p><p>${e.error?.stack}</p></div>`;
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
