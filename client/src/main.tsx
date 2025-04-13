import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

// 🧠 Global Demo Data Provider
import { DemoDataProvider } from './context/DemoDataContext';

// 🎨 Design System Provider
import { DesignSystemProvider } from './context/DesignSystemContext';

// 🗺️ Mapbox Provider
import { MapboxProvider } from './context/MapboxContext';

// 📊 Chart Provider
import { ChartProvider } from './context/ChartContext';

// Preload critical fonts
const preloadFonts = () => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = '/assets/inter-latin-400-normal-BOOGhInR.woff2';
  link.as = 'font';
  link.type = 'font/woff2';
  link.crossOrigin = 'anonymous';
  document.head.appendChild(link);
};

// Import fonts with optimized loading
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/700.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/700.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/700.css';

// Initialize font preloading
preloadFonts();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DemoDataProvider>
      <DesignSystemProvider>
        <MapboxProvider>
          <ChartProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ChartProvider>
        </MapboxProvider>
      </DesignSystemProvider>
    </DemoDataProvider>
  </StrictMode>,
);
