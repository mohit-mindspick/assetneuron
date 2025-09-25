import { initI18n } from 'shared';
import i18n from 'i18next';

// Import translations as require to ensure they're loaded properly
const enTranslations = require('./locales/en-US.json');
const esTranslations = require('./locales/es-ES.json');
const enGBTranslations = require('./locales/en-GB.json');
const frTranslations = require('./locales/fr-FR.json');
const deTranslations = require('./locales/de-DE.json');
const itTranslations = require('./locales/it-IT.json');
const ptTranslations = require('./locales/pt-BR.json');
const zhCNTranslations = require('./locales/zh-CN.json');
const zhTWTranslations = require('./locales/zh-TW.json');
const jaTranslations = require('./locales/ja-JP.json');
const koTranslations = require('./locales/ko-KR.json');
const ruTranslations = require('./locales/ru-RU.json');
const arTranslations = require('./locales/ar-SA.json');
const hiTranslations = require('./locales/hi-IN.json');

const appTranslations = {
  'en-US': enTranslations,
  'es-ES': esTranslations,
  'en-GB': enGBTranslations,
  'fr-FR': frTranslations,
  'de-DE': deTranslations,
  'it-IT': itTranslations,
  'pt-BR': ptTranslations,
  'zh-CN': zhCNTranslations,
  'zh-TW': zhTWTranslations,
  'ja-JP': jaTranslations,
  'ko-KR': koTranslations,
  'ru-RU': ruTranslations,
  'ar-SA': arTranslations,
  'hi-IN': hiTranslations,
};

console.log('Workorder: Initializing i18n with app translations:', appTranslations);
console.log('Workorder: Window location:', window.location.href);
console.log('Workorder: Is standalone:', window.location.port === '3001');

// Initialize i18n asynchronously
let i18nInstance: any;
const initPromise = initI18n(appTranslations, 'workorder').then(instance => {
  i18nInstance = instance;
  return instance;
});

// Debug logging after initialization
initPromise.then(instance => {
  console.log('Workorder: i18n initialized:', instance.isInitialized);
  console.log('Workorder: Available languages:', instance.languages);
  console.log('Workorder: Current language:', instance.language);

  // Check if resources are loaded
  try {
    const enResources = instance.getResourceBundle('en-US', 'translation');
    const esResources = instance.getResourceBundle('es-ES', 'translation');
    console.log('Workorder: EN-US resources loaded:', !!enResources);
    console.log('Workorder: ES-ES resources loaded:', !!esResources);
    console.log('Workorder: EN-US workorder.title exists:', !!enResources?.workorder?.title);
    console.log('Workorder: EN-US workorder.sampleData exists:', !!enResources?.workorder?.sampleData);
  } catch (error) {
    console.error('Workorder: Error checking resources:', error);
  }

  // Test a translation
  setTimeout(() => {
    console.log('Workorder: Test translation workorder.title:', instance.t('workorder.title'));
    console.log('Workorder: Test translation workorder.sampleData.hvacRepair.title:', instance.t('workorder.sampleData.hvacRepair.title'));
    console.log('Workorder: Test translation workorder.createWorkOrder:', instance.t('workorder.createWorkOrder'));
  }, 100);
});

// Export the global i18n instance (will be available after initialization)
export default typeof window !== 'undefined' ? (window as any).__i18n_instance || i18n : i18n;
