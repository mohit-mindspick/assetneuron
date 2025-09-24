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
  'en-US': {
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
  'en-GB': {
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
  'es-ES': {
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
  'fr-FR': {
    common: {
      loading: 'Chargement...',
      error: 'Erreur',
      success: 'Succès',
      cancel: 'Annuler',
      save: 'Enregistrer',
      edit: 'Modifier',
      delete: 'Supprimer',
      create: 'Créer',
      update: 'Mettre à jour',
      search: 'Rechercher',
      filter: 'Filtrer',
      actions: 'Actions',
      status: 'Statut',
      priority: 'Priorité',
      date: 'Date',
      name: 'Nom',
      description: 'Description',
      assignedTo: 'Assigné à',
      dueDate: 'Date d\'échéance',
      createdAt: 'Créé le',
      lastUpdated: 'Dernière mise à jour',
      view: 'Voir',
      close: 'Fermer',
      confirm: 'Confirmer',
      yes: 'Oui',
      no: 'Non',
      all: 'Tous',
      none: 'Aucun',
      select: 'Sélectionner',
      clear: 'Effacer',
      apply: 'Appliquer',
      reset: 'Réinitialiser',
      back: 'Retour',
      next: 'Suivant',
      previous: 'Précédent',
      home: 'Accueil',
      dashboard: 'Tableau de bord',
      profile: 'Profil',
      settings: 'Paramètres',
      logout: 'Déconnexion',
      login: 'Connexion',
      register: 'S\'inscrire',
      darkMode: 'Mode sombre',
      lightMode: 'Mode clair',
      language: 'Langue',
      english: 'Anglais',
      spanish: 'Espagnol',
    },
  },
  'de-DE': {
    common: {
      loading: 'Laden...',
      error: 'Fehler',
      success: 'Erfolg',
      cancel: 'Abbrechen',
      save: 'Speichern',
      edit: 'Bearbeiten',
      delete: 'Löschen',
      create: 'Erstellen',
      update: 'Aktualisieren',
      search: 'Suchen',
      filter: 'Filtern',
      actions: 'Aktionen',
      status: 'Status',
      priority: 'Priorität',
      date: 'Datum',
      name: 'Name',
      description: 'Beschreibung',
      assignedTo: 'Zugewiesen an',
      dueDate: 'Fälligkeitsdatum',
      createdAt: 'Erstellt am',
      lastUpdated: 'Zuletzt aktualisiert',
      view: 'Anzeigen',
      close: 'Schließen',
      confirm: 'Bestätigen',
      yes: 'Ja',
      no: 'Nein',
      all: 'Alle',
      none: 'Keine',
      select: 'Auswählen',
      clear: 'Löschen',
      apply: 'Anwenden',
      reset: 'Zurücksetzen',
      back: 'Zurück',
      next: 'Weiter',
      previous: 'Vorherige',
      home: 'Startseite',
      dashboard: 'Dashboard',
      profile: 'Profil',
      settings: 'Einstellungen',
      logout: 'Abmelden',
      login: 'Anmelden',
      register: 'Registrieren',
      darkMode: 'Dunkler Modus',
      lightMode: 'Heller Modus',
      language: 'Sprache',
      english: 'Englisch',
      spanish: 'Spanisch',
    },
  },
  'it-IT': {
    common: {
      loading: 'Caricamento...',
      error: 'Errore',
      success: 'Successo',
      cancel: 'Annulla',
      save: 'Salva',
      edit: 'Modifica',
      delete: 'Elimina',
      create: 'Crea',
      update: 'Aggiorna',
      search: 'Cerca',
      filter: 'Filtra',
      actions: 'Azioni',
      status: 'Stato',
      priority: 'Priorità',
      date: 'Data',
      name: 'Nome',
      description: 'Descrizione',
      assignedTo: 'Assegnato a',
      dueDate: 'Data di scadenza',
      createdAt: 'Creato il',
      lastUpdated: 'Ultimo aggiornamento',
      view: 'Visualizza',
      close: 'Chiudi',
      confirm: 'Conferma',
      yes: 'Sì',
      no: 'No',
      all: 'Tutti',
      none: 'Nessuno',
      select: 'Seleziona',
      clear: 'Cancella',
      apply: 'Applica',
      reset: 'Reimposta',
      back: 'Indietro',
      next: 'Avanti',
      previous: 'Precedente',
      home: 'Home',
      dashboard: 'Dashboard',
      profile: 'Profilo',
      settings: 'Impostazioni',
      logout: 'Disconnetti',
      login: 'Accedi',
      register: 'Registrati',
      darkMode: 'Modalità scura',
      lightMode: 'Modalità chiara',
      language: 'Lingua',
      english: 'Inglese',
      spanish: 'Spagnolo',
    },
  },
  'pt-BR': {
    common: {
      loading: 'Carregando...',
      error: 'Erro',
      success: 'Sucesso',
      cancel: 'Cancelar',
      save: 'Salvar',
      edit: 'Editar',
      delete: 'Excluir',
      create: 'Criar',
      update: 'Atualizar',
      search: 'Pesquisar',
      filter: 'Filtrar',
      actions: 'Ações',
      status: 'Status',
      priority: 'Prioridade',
      date: 'Data',
      name: 'Nome',
      description: 'Descrição',
      assignedTo: 'Atribuído a',
      dueDate: 'Data de vencimento',
      createdAt: 'Criado em',
      lastUpdated: 'Última atualização',
      view: 'Visualizar',
      close: 'Fechar',
      confirm: 'Confirmar',
      yes: 'Sim',
      no: 'Não',
      all: 'Todos',
      none: 'Nenhum',
      select: 'Selecionar',
      clear: 'Limpar',
      apply: 'Aplicar',
      reset: 'Redefinir',
      back: 'Voltar',
      next: 'Próximo',
      previous: 'Anterior',
      home: 'Início',
      dashboard: 'Painel',
      profile: 'Perfil',
      settings: 'Configurações',
      logout: 'Sair',
      login: 'Entrar',
      register: 'Registrar',
      darkMode: 'Modo escuro',
      lightMode: 'Modo claro',
      language: 'Idioma',
      english: 'Inglês',
      spanish: 'Espanhol',
    },
  },
  'zh-CN': {
    common: {
      loading: '加载中...',
      error: '错误',
      success: '成功',
      cancel: '取消',
      save: '保存',
      edit: '编辑',
      delete: '删除',
      create: '创建',
      update: '更新',
      search: '搜索',
      filter: '过滤',
      actions: '操作',
      status: '状态',
      priority: '优先级',
      date: '日期',
      name: '名称',
      description: '描述',
      assignedTo: '分配给',
      dueDate: '截止日期',
      createdAt: '创建时间',
      lastUpdated: '最后更新',
      view: '查看',
      close: '关闭',
      confirm: '确认',
      yes: '是',
      no: '否',
      all: '全部',
      none: '无',
      select: '选择',
      clear: '清除',
      apply: '应用',
      reset: '重置',
      back: '返回',
      next: '下一步',
      previous: '上一步',
      home: '首页',
      dashboard: '仪表板',
      profile: '个人资料',
      settings: '设置',
      logout: '退出登录',
      login: '登录',
      register: '注册',
      darkMode: '深色模式',
      lightMode: '浅色模式',
      language: '语言',
      english: '英语',
      spanish: '西班牙语',
    },
  },
  'zh-TW': {
    common: {
      loading: '載入中...',
      error: '錯誤',
      success: '成功',
      cancel: '取消',
      save: '保存',
      edit: '編輯',
      delete: '刪除',
      create: '創建',
      update: '更新',
      search: '搜索',
      filter: '過濾',
      actions: '操作',
      status: '狀態',
      priority: '優先級',
      date: '日期',
      name: '名稱',
      description: '描述',
      assignedTo: '分配給',
      dueDate: '截止日期',
      createdAt: '創建時間',
      lastUpdated: '最後更新',
      view: '查看',
      close: '關閉',
      confirm: '確認',
      yes: '是',
      no: '否',
      all: '全部',
      none: '無',
      select: '選擇',
      clear: '清除',
      apply: '應用',
      reset: '重置',
      back: '返回',
      next: '下一步',
      previous: '上一步',
      home: '首頁',
      dashboard: '儀表板',
      profile: '個人資料',
      settings: '設置',
      logout: '退出登錄',
      login: '登錄',
      register: '註冊',
      darkMode: '深色模式',
      lightMode: '淺色模式',
      language: '語言',
      english: '英語',
      spanish: '西班牙語',
    },
  },
  'ja-JP': {
    common: {
      loading: '読み込み中...',
      error: 'エラー',
      success: '成功',
      cancel: 'キャンセル',
      save: '保存',
      edit: '編集',
      delete: '削除',
      create: '作成',
      update: '更新',
      search: '検索',
      filter: 'フィルター',
      actions: 'アクション',
      status: 'ステータス',
      priority: '優先度',
      date: '日付',
      name: '名前',
      description: '説明',
      assignedTo: '割り当て先',
      dueDate: '期限',
      createdAt: '作成日',
      lastUpdated: '最終更新',
      view: '表示',
      close: '閉じる',
      confirm: '確認',
      yes: 'はい',
      no: 'いいえ',
      all: 'すべて',
      none: 'なし',
      select: '選択',
      clear: 'クリア',
      apply: '適用',
      reset: 'リセット',
      back: '戻る',
      next: '次へ',
      previous: '前へ',
      home: 'ホーム',
      dashboard: 'ダッシュボード',
      profile: 'プロフィール',
      settings: '設定',
      logout: 'ログアウト',
      login: 'ログイン',
      register: '登録',
      darkMode: 'ダークモード',
      lightMode: 'ライトモード',
      language: '言語',
      english: '英語',
      spanish: 'スペイン語',
    },
  },
  'ko-KR': {
    common: {
      loading: '로딩 중...',
      error: '오류',
      success: '성공',
      cancel: '취소',
      save: '저장',
      edit: '편집',
      delete: '삭제',
      create: '생성',
      update: '업데이트',
      search: '검색',
      filter: '필터',
      actions: '작업',
      status: '상태',
      priority: '우선순위',
      date: '날짜',
      name: '이름',
      description: '설명',
      assignedTo: '할당 대상',
      dueDate: '마감일',
      createdAt: '생성일',
      lastUpdated: '마지막 업데이트',
      view: '보기',
      close: '닫기',
      confirm: '확인',
      yes: '예',
      no: '아니오',
      all: '모두',
      none: '없음',
      select: '선택',
      clear: '지우기',
      apply: '적용',
      reset: '재설정',
      back: '뒤로',
      next: '다음',
      previous: '이전',
      home: '홈',
      dashboard: '대시보드',
      profile: '프로필',
      settings: '설정',
      logout: '로그아웃',
      login: '로그인',
      register: '등록',
      darkMode: '다크 모드',
      lightMode: '라이트 모드',
      language: '언어',
      english: '영어',
      spanish: '스페인어',
    },
  },
  'ru-RU': {
    common: {
      loading: 'Загрузка...',
      error: 'Ошибка',
      success: 'Успех',
      cancel: 'Отмена',
      save: 'Сохранить',
      edit: 'Редактировать',
      delete: 'Удалить',
      create: 'Создать',
      update: 'Обновить',
      search: 'Поиск',
      filter: 'Фильтр',
      actions: 'Действия',
      status: 'Статус',
      priority: 'Приоритет',
      date: 'Дата',
      name: 'Имя',
      description: 'Описание',
      assignedTo: 'Назначено',
      dueDate: 'Срок выполнения',
      createdAt: 'Создано',
      lastUpdated: 'Последнее обновление',
      view: 'Просмотр',
      close: 'Закрыть',
      confirm: 'Подтвердить',
      yes: 'Да',
      no: 'Нет',
      all: 'Все',
      none: 'Нет',
      select: 'Выбрать',
      clear: 'Очистить',
      apply: 'Применить',
      reset: 'Сбросить',
      back: 'Назад',
      next: 'Далее',
      previous: 'Предыдущий',
      home: 'Главная',
      dashboard: 'Панель управления',
      profile: 'Профиль',
      settings: 'Настройки',
      logout: 'Выйти',
      login: 'Войти',
      register: 'Регистрация',
      darkMode: 'Темный режим',
      lightMode: 'Светлый режим',
      language: 'Язык',
      english: 'Английский',
      spanish: 'Испанский',
    },
  },
  'ar-SA': {
    common: {
      loading: 'جاري التحميل...',
      error: 'خطأ',
      success: 'نجح',
      cancel: 'إلغاء',
      save: 'حفظ',
      edit: 'تحرير',
      delete: 'حذف',
      create: 'إنشاء',
      update: 'تحديث',
      search: 'بحث',
      filter: 'تصفية',
      actions: 'الإجراءات',
      status: 'الحالة',
      priority: 'الأولوية',
      date: 'التاريخ',
      name: 'الاسم',
      description: 'الوصف',
      assignedTo: 'مُعيّن لـ',
      dueDate: 'تاريخ الاستحقاق',
      createdAt: 'تم الإنشاء في',
      lastUpdated: 'آخر تحديث',
      view: 'عرض',
      close: 'إغلاق',
      confirm: 'تأكيد',
      yes: 'نعم',
      no: 'لا',
      all: 'الكل',
      none: 'لا شيء',
      select: 'اختيار',
      clear: 'مسح',
      apply: 'تطبيق',
      reset: 'إعادة تعيين',
      back: 'رجوع',
      next: 'التالي',
      previous: 'السابق',
      home: 'الرئيسية',
      dashboard: 'لوحة التحكم',
      profile: 'الملف الشخصي',
      settings: 'الإعدادات',
      logout: 'تسجيل الخروج',
      login: 'تسجيل الدخول',
      register: 'التسجيل',
      darkMode: 'الوضع المظلم',
      lightMode: 'الوضع الفاتح',
      language: 'اللغة',
      english: 'الإنجليزية',
      spanish: 'الإسبانية',
    },
  },
  'hi-IN': {
    common: {
      loading: 'लोड हो रहा है...',
      error: 'त्रुटि',
      success: 'सफलता',
      cancel: 'रद्द करें',
      save: 'सहेजें',
      edit: 'संपादित करें',
      delete: 'हटाएं',
      create: 'बनाएं',
      update: 'अपडेट करें',
      search: 'खोजें',
      filter: 'फ़िल्टर',
      actions: 'कार्य',
      status: 'स्थिति',
      priority: 'प्राथमिकता',
      date: 'तारीख',
      name: 'नाम',
      description: 'विवरण',
      assignedTo: 'असाइन किया गया',
      dueDate: 'देय तिथि',
      createdAt: 'बनाया गया',
      lastUpdated: 'अंतिम अपडेट',
      view: 'देखें',
      close: 'बंद करें',
      confirm: 'पुष्टि करें',
      yes: 'हाँ',
      no: 'नहीं',
      all: 'सभी',
      none: 'कोई नहीं',
      select: 'चुनें',
      clear: 'साफ़ करें',
      apply: 'लागू करें',
      reset: 'रीसेट करें',
      back: 'वापस',
      next: 'अगला',
      previous: 'पिछला',
      home: 'होम',
      dashboard: 'डैशबोर्ड',
      profile: 'प्रोफ़ाइल',
      settings: 'सेटिंग्स',
      logout: 'लॉगआउट',
      login: 'लॉगिन',
      register: 'रजिस्टर',
      darkMode: 'डार्क मोड',
      lightMode: 'लाइट मोड',
      language: 'भाषा',
      english: 'अंग्रेजी',
      spanish: 'स्पेनिश',
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
      'en-US': {
        translation: {
          ...commonTranslations['en-US'],
          ...appTranslations['en-US'],
        },
      },
      'es-ES': {
        translation: {
          ...commonTranslations['es-ES'],
          ...appTranslations['es-ES'],
        },
      },
    };

    console.log('Initializing i18n with resources:', resources);
    console.log('Common translations EN:', commonTranslations['en-US']);
    console.log('App translations EN:', appTranslations['en-US']);

    await globalI18n
      .use(LanguageDetector)
      .use(initReactI18next)
      .init({
        resources,
        fallbackLng: 'en-US',
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
