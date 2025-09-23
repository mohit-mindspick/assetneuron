import { initI18n, handleLocaleChange } from 'shared';

// Import translations as require to ensure they're loaded properly
const enTranslations = require('./locales/en.json');
const esTranslations = require('./locales/es.json');

const appTranslations = {
  en: enTranslations,
  es: esTranslations,
};

console.log('Host: Initializing i18n with app translations:', appTranslations);
console.log('Host: Window location:', window.location.href);

const i18nInstance = initI18n(appTranslations, 'host');

// Debug logging
console.log('Host: i18n initialized:', i18nInstance.isInitialized);
console.log('Host: Available languages:', i18nInstance.languages);
console.log('Host: Current language:', i18nInstance.language);

// Check if resources are loaded
try {
  const enResources = i18nInstance.getResourceBundle('en', 'translation');
  const esResources = i18nInstance.getResourceBundle('es', 'translation');
  console.log('Host: EN resources loaded:', !!enResources);
  console.log('Host: ES resources loaded:', !!esResources);
  console.log('Host: EN app.title exists:', !!enResources?.app?.title);
  console.log('Host: EN common.home exists:', !!enResources?.common?.home);
} catch (error) {
  console.error('Host: Error checking resources:', error);
}

// Export the locale change handler for use in components
export { handleLocaleChange };
export default i18nInstance;
