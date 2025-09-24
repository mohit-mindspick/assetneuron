import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Global flag to track initialization - use window object to ensure it's truly global
if (typeof window !== 'undefined') {
  (window as any).__i18n_initialized = (window as any).__i18n_initialized || false;
  // Store the i18n instance globally to ensure it's shared across microfrontends
  (window as any).__i18n_instance = (window as any).__i18n_instance || i18n;
}

// Common translations
const commonTranslations = {
  en: {
    common: {
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      cancel: 'Cancel',
      save: 'Save',
      edit: 'Edit',
      delete: 'Delete',
      create: 'Create',
      update: 'Update',
      search: 'Search',
      filter: 'Filter',
      actions: 'Actions',
      status: 'Status',
      priority: 'Priority',
      date: 'Date',
      name: 'Name',
      description: 'Description',
      assignedTo: 'Assigned To',
      dueDate: 'Due Date',
      createdAt: 'Created At',
      lastUpdated: 'Last Updated',
      view: 'View',
      close: 'Close',
      confirm: 'Confirm',
      yes: 'Yes',
      no: 'No',
      all: 'All',
      none: 'None',
      select: 'Select',
      clear: 'Clear',
      apply: 'Apply',
      reset: 'Reset',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
      home: 'Home',
      dashboard: 'Dashboard',
      profile: 'Profile',
      settings: 'Settings',
      logout: 'Logout',
      login: 'Login',
      register: 'Register',
      darkMode: 'Dark Mode',
      lightMode: 'Light Mode',
      language: 'Language',
      english: 'English',
      spanish: 'Spanish',
    },
  },
  es: {
    common: {
      loading: 'Cargando...',
      error: 'Error',
      success: 'Éxito',
      cancel: 'Cancelar',
      save: 'Guardar',
      edit: 'Editar',
      delete: 'Eliminar',
      create: 'Crear',
      update: 'Actualizar',
      search: 'Buscar',
      filter: 'Filtrar',
      actions: 'Acciones',
      status: 'Estado',
      priority: 'Prioridad',
      date: 'Fecha',
      name: 'Nombre',
      description: 'Descripción',
      assignedTo: 'Asignado A',
      dueDate: 'Fecha de Vencimiento',
      createdAt: 'Creado En',
      lastUpdated: 'Última Actualización',
      view: 'Ver',
      close: 'Cerrar',
      confirm: 'Confirmar',
      yes: 'Sí',
      no: 'No',
      all: 'Todos',
      none: 'Ninguno',
      select: 'Seleccionar',
      clear: 'Limpiar',
      apply: 'Aplicar',
      reset: 'Restablecer',
      back: 'Atrás',
      next: 'Siguiente',
      previous: 'Anterior',
      home: 'Inicio',
      dashboard: 'Panel de Control',
      profile: 'Perfil',
      settings: 'Configuración',
      logout: 'Cerrar Sesión',
      login: 'Iniciar Sesión',
      register: 'Registrarse',
      darkMode: 'Modo Oscuro',
      lightMode: 'Modo Claro',
      language: 'Idioma',
      english: 'Inglés',
      spanish: 'Español',
    },
  },
};

// Dynamic locale loading function
const loadLocaleResources = async (appName: string, locale: string) => {
  try {
    console.log(`📥 Loading ${locale} resources for ${appName}...`);
    
    // For now, we'll use a different approach since dynamic imports with relative paths
    // don't work well in this context. We'll use fetch to load the locale files.
    let url;
    switch (appName) {
      case 'host':
        url = `http://localhost:3003/locales/${locale}.json`;
        break;
      case 'workorder':
        url = `http://localhost:3001/locales/${locale}.json`;
        break;
      case 'asset':
        url = `http://localhost:3002/locales/${locale}.json`;
        break;
      default:
        console.warn(`⚠️ Unknown app name: ${appName}`);
        return null;
    }
    
    console.log(`🌐 Fetching ${url}...`);
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText} for ${url}`);
    }
    
    const resources = await response.json();
    console.log(`✅ Successfully loaded ${locale} resources for ${appName}:`, {
      keys: Object.keys(resources),
      hasWorkorder: !!resources.workorder,
      hasAsset: !!resources.asset,
      hasApp: !!resources.app,
    });
    return resources;
  } catch (error) {
    console.error(`❌ Failed to load ${locale} resources for ${appName}:`, error);
    return null;
  }
};

// Global locale change handler
const handleLocaleChange = async (newLocale: string) => {
  const globalI18n = typeof window !== 'undefined' ? (window as any).__i18n_instance : i18n;
  
  console.log(`🌍 Locale changed to: ${newLocale}`);
  console.log(`🌍 Current registered microfrontends:`, (window as any).__registered_microfrontends || []);
  
  // Load common translations for the new locale
  const commonResources = commonTranslations[newLocale as keyof typeof commonTranslations];
  if (commonResources) {
    console.log(`🌍 Adding common resources for ${newLocale}`);
    globalI18n.addResourceBundle(newLocale, 'translation', commonResources, true, true);
  }
  
  // Always try to load from known microfrontends, regardless of registration status
  // This ensures that even if microfrontends haven't registered yet, we still load their locales
  const knownApps = ['host', 'workorder', 'asset'];
  console.log(`🌍 Loading locales for known apps:`, knownApps);
  
  for (const appName of knownApps) {
    try {
      console.log(`🌍 Loading ${newLocale} resources for ${appName}...`);
      const resources = await loadLocaleResources(appName, newLocale);
      if (resources) {
        console.log(`✅ Successfully loaded ${newLocale} resources for ${appName}:`, Object.keys(resources));
        globalI18n.addResourceBundle(newLocale, 'translation', resources, true, true);
      } else {
        console.warn(`⚠️ No resources loaded for ${appName}`);
      }
    } catch (error) {
      console.error(`❌ Failed to load resources for ${appName}:`, error);
    }
  }
  
  // Change the language
  console.log(`🌍 Changing language to ${newLocale}`);
  await globalI18n.changeLanguage(newLocale);
  console.log(`🌍 Language changed successfully. Current language:`, globalI18n.language);
};

// Register microfrontend for dynamic locale loading
const registerMicrofrontend = (appName: string) => {
  if (typeof window !== 'undefined') {
    (window as any).__registered_microfrontends = (window as any).__registered_microfrontends || [];
    if (!(window as any).__registered_microfrontends.includes(appName)) {
      (window as any).__registered_microfrontends.push(appName);
      console.log(`📝 Registered microfrontend: ${appName}`);
      
      // If there's a current language set, immediately load the locale for this microfrontend
      const globalI18n = (window as any).__i18n_instance;
      if (globalI18n && globalI18n.language) {
        console.log(`🔄 Microfrontend ${appName} registered, loading current language: ${globalI18n.language}`);
        loadLocaleResources(appName, globalI18n.language).then(resources => {
          if (resources) {
            globalI18n.addResourceBundle(globalI18n.language, 'translation', resources, true, true);
            console.log(`✅ Loaded current language resources for ${appName}`);
          }
        });
      }
    }
  }
};

// Initialize i18n
const initI18n = async (appTranslations: any = {}, appName: string = 'unknown') => {
  console.log(`initI18n called for ${appName} with appTranslations:`, appTranslations);
  const isInitialized = typeof window !== 'undefined' ? (window as any).__i18n_initialized : false;
  const globalI18n = typeof window !== 'undefined' ? (window as any).__i18n_instance : i18n;
  console.log('isInitialized:', isInitialized);
  console.log('Using global i18n instance:', globalI18n === i18n ? 'local' : 'global');
  
  // Register this microfrontend for dynamic locale loading
  registerMicrofrontend(appName);
  
  // Only initialize if not already initialized
  if (!isInitialized) {
    const resources = {
      en: {
        translation: {
          ...commonTranslations.en,
          ...appTranslations.en,
        },
      },
      es: {
        translation: {
          ...commonTranslations.es,
          ...appTranslations.es,
        },
      },
    };

    console.log('Initializing i18n with resources:', resources);
    console.log('Common translations EN:', commonTranslations.en);
    console.log('App translations EN:', appTranslations.en);

    await globalI18n
      .use(LanguageDetector)
      .use(initReactI18next)
      .init({
        resources,
        fallbackLng: 'en',
        debug: true, // Enable debug mode
        interpolation: {
          escapeValue: false,
        },
        detection: {
          order: ['localStorage', 'navigator', 'htmlTag'],
          caches: ['localStorage'],
        },
        react: {
          useSuspense: false,
        },
      });
      if (typeof window !== 'undefined') {
        (window as any).__i18n_initialized = true;
      }
      console.log('i18n initialization completed');
  } else {
    console.log('i18n already initialized, adding new resources:', appTranslations);
    // If already initialized, add new resources
    Object.keys(appTranslations).forEach(lng => {
      if (appTranslations[lng]) {
        console.log(`Adding resource bundle for language: ${lng}`, appTranslations[lng]);
        // Get existing resources for this language
        const existingResources = globalI18n.getResourceBundle(lng, 'translation') || {};
        // Merge with new resources
        const mergedResources = {
          ...existingResources,
          ...appTranslations[lng],
        };
        console.log(`Merged resources for ${lng}:`, mergedResources);
        // Add the merged resources
        globalI18n.addResourceBundle(lng, 'translation', mergedResources, true, true);
      }
    });
  }

  return globalI18n;
};

// Force refresh all microfrontend locales (useful when a new microfrontend is loaded)
const refreshAllMicrofrontendLocales = async () => {
  const globalI18n = typeof window !== 'undefined' ? (window as any).__i18n_instance : i18n;
  if (!globalI18n || !globalI18n.language) {
    console.warn('⚠️ No i18n instance or language set, cannot refresh locales');
    return;
  }
  
  const currentLanguage = globalI18n.language;
  console.log(`🔄 Refreshing all microfrontend locales for language: ${currentLanguage}`);
  
  const knownApps = ['host', 'workorder', 'asset'];
  for (const appName of knownApps) {
    try {
      const resources = await loadLocaleResources(appName, currentLanguage);
      if (resources) {
        globalI18n.addResourceBundle(currentLanguage, 'translation', resources, true, true);
        console.log(`✅ Refreshed ${currentLanguage} resources for ${appName}`);
      }
    } catch (error) {
      console.error(`❌ Failed to refresh resources for ${appName}:`, error);
    }
  }
};

export { initI18n, commonTranslations, handleLocaleChange, loadLocaleResources, registerMicrofrontend, refreshAllMicrofrontendLocales };
export default typeof window !== 'undefined' ? (window as any).__i18n_instance || i18n : i18n;
