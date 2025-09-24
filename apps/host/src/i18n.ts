import { initI18n, handleLocaleChange } from 'shared';
import i18n from 'i18next';

// Import translations as require to ensure they're loaded properly
const enTranslations = require('./locales/en.json');
const esTranslations = require('./locales/es.json');

const appTranslations = {
  en: enTranslations,
  es: esTranslations,
};

console.log('Host: Initializing i18n with app translations:', appTranslations);
console.log('Host: Window location:', window.location.href);

// Initialize i18n asynchronously
let i18nInstance: any;
const initPromise = initI18n(appTranslations, 'host').then(instance => {
  i18nInstance = instance;
  return instance;
});

// Debug logging after initialization
initPromise.then(instance => {
  console.log('Host: i18n initialized:', instance.isInitialized);
  console.log('Host: Available languages:', instance.languages);
  console.log('Host: Current language:', instance.language);

  // Check if resources are loaded
  try {
    const enResources = instance.getResourceBundle('en', 'translation');
    const esResources = instance.getResourceBundle('es', 'translation');
    console.log('Host: EN resources loaded:', !!enResources);
    console.log('Host: ES resources loaded:', !!esResources);
    console.log('Host: EN app.title exists:', !!enResources?.app?.title);
    console.log('Host: EN common.home exists:', !!enResources?.common?.home);
  } catch (error) {
    console.error('Host: Error checking resources:', error);
  }
});

// Export the locale change handler for use in components
export { handleLocaleChange };

// Export the global i18n instance (will be available after initialization)
export default typeof window !== 'undefined' ? (window as any).__i18n_instance || i18n : i18n;
