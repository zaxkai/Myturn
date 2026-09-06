import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'leaflet/dist/leaflet.css';
import App from './MyTurnApp.jsx';
import { PreferencesProvider } from './PreferencesContext.jsx';
import './style.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PreferencesProvider><App /></PreferencesProvider>
  </StrictMode>,
);
