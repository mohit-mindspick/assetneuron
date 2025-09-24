import { initI18n } from 'shared';
import i18n from 'i18next';

// Import translations as require to ensure they're loaded properly
const enTranslations = require('./locales/en-US.json');
const esTranslations = require('./locales/es-ES.json');

const appTranslations = {
  'en-US': enTranslations,
  'es-ES': esTranslations,
};

console.log('Asset: Initializing i18n with app translations:', appTranslations);
console.log('Asset: Window location:', window.location.href);
console.log('Asset: Is standalone:', window.location.port === '3002');

// Initialize i18n asynchronously
let i18nInstance: any;
const initPromise = initI18n(appTranslations, 'asset').then(instance => {
  i18nInstance = instance;
  return instance;
});

// Debug logging after initialization
initPromise.then(instance => {
  console.log('Asset: i18n initialized:', instance.isInitialized);
  console.log('Asset: Available languages:', instance.languages);
  console.log('Asset: Current language:', instance.language);

  // Check if resources are loaded
  try {
    const enResources = instance.getResourceBundle('en-US', 'translation');
    const esResources = instance.getResourceBundle('es-ES', 'translation');
    console.log('Asset: EN-US resources loaded:', !!enResources);
    console.log('Asset: ES-ES resources loaded:', !!esResources);
    console.log('Asset: EN-US asset.title exists:', !!enResources?.asset?.title);
    console.log('Asset: EN-US asset.sampleData exists:', !!enResources?.asset?.sampleData);
  } catch (error) {
    console.error('Asset: Error checking resources:', error);
  }

  // Test a translation
  setTimeout(() => {
    console.log('Asset: Test translation asset.title:', instance.t('asset.title'));
    console.log('Asset: Test translation asset.createAsset:', instance.t('asset.createAsset'));
  }, 100);
});

// Export the global i18n instance (will be available after initialization)
export default typeof window !== 'undefined' ? (window as any).__i18n_instance || i18n : i18n;
