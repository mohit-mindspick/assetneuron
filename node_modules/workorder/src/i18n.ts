import { initI18n } from 'shared';

// Import translations as require to ensure they're loaded properly
const enTranslations = require('./locales/en.json');
const esTranslations = require('./locales/es.json');

const appTranslations = {
  en: enTranslations,
  es: esTranslations,
};

console.log('Workorder: Initializing i18n with app translations:', appTranslations);
console.log('Workorder: Window location:', window.location.href);
console.log('Workorder: Is standalone:', window.location.port === '3001');

const i18nInstance = initI18n(appTranslations, 'workorder');

// Debug logging for workorder
console.log('Workorder: i18n initialized:', i18nInstance.isInitialized);
console.log('Workorder: Available languages:', i18nInstance.languages);
console.log('Workorder: Current language:', i18nInstance.language);

// Check if resources are loaded
try {
  const enResources = i18nInstance.getResourceBundle('en', 'translation');
  const esResources = i18nInstance.getResourceBundle('es', 'translation');
  console.log('Workorder: EN resources loaded:', !!enResources);
  console.log('Workorder: ES resources loaded:', !!esResources);
  console.log('Workorder: EN workorder.title exists:', !!enResources?.workorder?.title);
  console.log('Workorder: EN workorder.sampleData exists:', !!enResources?.workorder?.sampleData);
} catch (error) {
  console.error('Workorder: Error checking resources:', error);
}

// Test a translation
setTimeout(() => {
  console.log('Workorder: Test translation workorder.title:', i18nInstance.t('workorder.title'));
  console.log('Workorder: Test translation workorder.sampleData.hvacRepair.title:', i18nInstance.t('workorder.sampleData.hvacRepair.title'));
  console.log('Workorder: Test translation workorder.createWorkOrder:', i18nInstance.t('workorder.createWorkOrder'));
}, 100);

export default i18nInstance;
