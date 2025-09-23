# AssetNeuron Microfrontend Application

A React-based microfrontend application using Module Federation with Material UI.

## Architecture

- **Host/Shell App**: Main application that loads microfrontends dynamically and manages global state and navigation
- **Workorder Microfrontend**: Sample microfrontend for work order management
- **Asset Microfrontend**: Sample microfrontend for asset management

## Getting Started

1. Install dependencies:
```bash
npm run install:all
```

2. Start all applications in development mode:
```bash
npm run dev
```

3. Access the applications:
- Host App: http://localhost:3000 (loads microfrontends dynamically)
- Workorder App: http://localhost:3001 (standalone)
- Asset App: http://localhost:3002 (standalone)

**Note:** Make sure to start all three applications for the full microfrontend experience. The host app will dynamically load the workorder and asset microfrontends when you navigate to their respective routes.

## Available Scripts

- `npm run dev` - Start all applications in development mode
- `npm run build` - Build all applications for production
- `npm run dev:host` - Start only the host application
- `npm run dev:workorder` - Start only the workorder microfrontend
- `npm run dev:asset` - Start only the asset microfrontend

## Technology Stack

- React 18
- Module Federation (Webpack 5)
- Material UI with custom branding
- React Router
- Context API for global state management
- Shared theme system across microfrontends
- Internationalization (i18n) with react-i18next

## Brand Color Palette

The application uses a consistent color palette across all microfrontends:

- **Primary**: `#695813` (Dark Olive)
- **Accent C**: `#EF7E4C` (Orange - Work Orders)
- **Accent N**: `#944248` (Burgundy - Error states)
- **Accent E**: `#D900BA` (Magenta - Dashboard)
- **Accent D**: `#D47C6E` (Coral - Secondary actions)
- **Secondary**: `#D3C795` (Light Olive)
- **Background**: `#F5F3EC` (Cream)
- **Neutral L**: `#E0DED6` (Light Gray)
- **Support C**: `#A6934D` (Gold - Assets)

Each microfrontend has its own color scheme while maintaining brand consistency:
- **Host App**: Uses primary brand colors
- **Workorder App**: Orange accent theme (`#EF7E4C`)
- **Asset App**: Gold accent theme (`#A6934D`)

## Internationalization (i18n)

The application supports multiple languages with a comprehensive translation system:

### Supported Languages
- **English** (en) - Default language
- **Spanish** (es) - Full translation support

### Features
- **Language Switcher**: Available in the navigation bar
- **Persistent Language Selection**: Language preference is saved in localStorage
- **Shared Translations**: Common translations are shared across all microfrontends
- **App-Specific Translations**: Each microfrontend has its own translation namespace
- **Automatic Language Detection**: Detects browser language on first visit

### Translation Structure
```
packages/shared/
├── i18n.ts              # Shared i18n configuration
└── theme.ts             # Shared theme configuration

apps/host/src/locales/
├── en.json              # Host app English translations
└── es.json              # Host app Spanish translations

apps/workorder/src/locales/
├── en.json              # Workorder app English translations
└── es.json              # Workorder app Spanish translations

apps/asset/src/locales/
├── en.json              # Asset app English translations
└── es.json              # Asset app Spanish translations
```

### Usage
The language can be switched using the dropdown in the navigation bar. All text content, including:
- Navigation items
- Form labels and placeholders
- Button text
- Status indicators
- Sample data
- Error messages

Will automatically update to the selected language across all microfrontends.
