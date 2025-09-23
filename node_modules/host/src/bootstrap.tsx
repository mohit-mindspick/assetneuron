import React from 'react';
import { createRoot } from 'react-dom/client';
import './i18n';
import App from './App';

// Ensure i18n is initialized before rendering
import i18n from './i18n';

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root element not found');
}

const root = createRoot(container);
root.render(<App />);
