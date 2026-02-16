import React from 'react';
import ReactDOM from 'react-dom/client';
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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);