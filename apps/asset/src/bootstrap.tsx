import React from 'react';
import { createRoot } from 'react-dom/client';
import i18n from './i18n'; // Import the i18n instance
import App from './App';

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root element not found');
}

const root = createRoot(container);

// Wait for i18n to be ready before rendering
if (i18n.isInitialized) {
  root.render(<App />);
} else {
  i18n.on('initialized', () => {
    console.log('Asset: i18n initialized, rendering app');
    root.render(<App />);
  });
}
