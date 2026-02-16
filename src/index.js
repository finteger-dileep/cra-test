import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';

const style = document.createElement('style');
style.textContent = `
  html {
    scroll-padding-top: 80px;
  }
  
  @media (max-width: 600px) {
    html {
      scroll-padding-top: 60px;
    }
  }
`;
document.head.appendChild(style);

const rootElement = document.getElementById('root');
const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Use hydration if content was pre-rendered by react-snap
if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, app);
} else {
  createRoot(rootElement).render(app);
}