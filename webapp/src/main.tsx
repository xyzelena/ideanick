import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App.tsx';

const rootEl = document.getElementById('root');

if (!rootEl) {
  throw new Error('Error in root');
}

createRoot(rootEl).render(
  <StrictMode>
    <App />
  </StrictMode>
);
