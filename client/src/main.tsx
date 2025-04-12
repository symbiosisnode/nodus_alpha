import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { DemoDataProvider } from './context/DemoDataContext';

// Import fonts (ensure these are installed)
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/700.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/700.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/700.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DemoDataProvider>
      <App />
    </DemoDataProvider>
  </React.StrictMode>
);
