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
