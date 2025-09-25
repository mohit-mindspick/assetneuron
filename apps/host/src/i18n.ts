import { initI18n, handleLocaleChange } from 'shared';
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
    const enResources = instance.getResourceBundle('en-US', 'translation');
    const esResources = instance.getResourceBundle('es-ES', 'translation');
    const frResources = instance.getResourceBundle('fr-FR', 'translation');
    const deResources = instance.getResourceBundle('de-DE', 'translation');
    const itResources = instance.getResourceBundle('it-IT', 'translation');
    const ptResources = instance.getResourceBundle('pt-BR', 'translation');
    const zhCNResources = instance.getResourceBundle('zh-CN', 'translation');
    const jaResources = instance.getResourceBundle('ja-JP', 'translation');
    const koResources = instance.getResourceBundle('ko-KR', 'translation');
    const ruResources = instance.getResourceBundle('ru-RU', 'translation');
    const arResources = instance.getResourceBundle('ar-SA', 'translation');
    const hiResources = instance.getResourceBundle('hi-IN', 'translation');
    
    console.log('Host: EN-US resources loaded:', !!enResources);
    console.log('Host: ES-ES resources loaded:', !!esResources);
    console.log('Host: FR-FR resources loaded:', !!frResources);
    console.log('Host: DE-DE resources loaded:', !!deResources);
    console.log('Host: IT-IT resources loaded:', !!itResources);
    console.log('Host: PT-BR resources loaded:', !!ptResources);
    console.log('Host: ZH-CN resources loaded:', !!zhCNResources);
    console.log('Host: JA-JP resources loaded:', !!jaResources);
    console.log('Host: KO-KR resources loaded:', !!koResources);
    console.log('Host: RU-RU resources loaded:', !!ruResources);
    console.log('Host: AR-SA resources loaded:', !!arResources);
    console.log('Host: HI-IN resources loaded:', !!hiResources);
    console.log('Host: EN-US app.title exists:', !!enResources?.app?.title);
    console.log('Host: EN-US common.home exists:', !!enResources?.common?.home);
  } catch (error) {
    console.error('Host: Error checking resources:', error);
  }
});

// Export the locale change handler for use in components
export { handleLocaleChange };

// Export the global i18n instance (will be available after initialization)
export default typeof window !== 'undefined' ? (window as any).__i18n_instance || i18n : i18n;
