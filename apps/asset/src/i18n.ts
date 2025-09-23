import { initI18n } from 'shared';

// Import translations as require to ensure they're loaded properly
const enTranslations = require('./locales/en.json');
const esTranslations = require('./locales/es.json');

const appTranslations = {
  en: enTranslations,
  es: esTranslations,
};

console.log('Asset: Initializing i18n with app translations:', appTranslations);
console.log('Asset: Window location:', window.location.href);
console.log('Asset: Is standalone:', window.location.port === '3002');

const i18nInstance = initI18n(appTranslations, 'asset');

// Debug logging for asset
console.log('Asset: i18n initialized:', i18nInstance.isInitialized);
console.log('Asset: Available languages:', i18nInstance.languages);
console.log('Asset: Current language:', i18nInstance.language);

// Check if resources are loaded
try {
  const enResources = i18nInstance.getResourceBundle('en', 'translation');
  const esResources = i18nInstance.getResourceBundle('es', 'translation');
  console.log('Asset: EN resources loaded:', !!enResources);
  console.log('Asset: ES resources loaded:', !!esResources);
  console.log('Asset: EN asset.title exists:', !!enResources?.asset?.title);
  console.log('Asset: EN asset.sampleData exists:', !!enResources?.asset?.sampleData);
} catch (error) {
  console.error('Asset: Error checking resources:', error);
}

// Test a translation
setTimeout(() => {
  console.log('Asset: Test translation asset.title:', i18nInstance.t('asset.title'));
  console.log('Asset: Test translation asset.createAsset:', i18nInstance.t('asset.createAsset'));
}, 100);

export default i18nInstance;
