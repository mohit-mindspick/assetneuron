import React from 'react';

interface IconProps {
  className?: string;
  style?: React.CSSProperties;
  fontSize?: 'small' | 'medium' | 'large' | 'inherit';
}

// Custom Dashboard Icon
export const DashboardIcon: React.FC<IconProps> = ({ className, style, fontSize = 'medium' }) => {
  const getSize = () => {
    switch (fontSize) {
      case 'small': return 20;
      case 'large': return 32;
      case 'inherit': return 'inherit';
      default: return 24;
    }
  };

  const size = getSize();

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <g>
        <path 
          d="M3.75 6C3.75 4.75736 4.75736 3.75 6 3.75H8.25C9.49264 3.75 10.5 4.75736 10.5 6V8.25C10.5 9.49264 9.49264 10.5 8.25 10.5H6C4.75736 10.5 3.75 9.49264 3.75 8.25V6Z" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        <path 
          d="M3.75 15.75C3.75 14.5074 4.75736 13.5 6 13.5H8.25C9.49264 13.5 10.5 14.5074 10.5 15.75V18C10.5 19.2426 9.49264 20.25 8.25 20.25H6C4.75736 20.25 3.75 19.2426 3.75 18V15.75Z" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        <path 
          d="M13.5 6C13.5 4.75736 14.5074 3.75 15.75 3.75H18C19.2426 3.75 20.25 4.75736 20.25 6V8.25C20.25 9.49264 19.2426 10.5 18 10.5H15.75C14.5074 10.5 13.5 9.49264 13.5 8.25V6Z" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        <path 
          d="M13.5 15.75C13.5 14.5074 14.5074 13.5 15.75 13.5H18C19.2426 13.5 20.25 14.5074 20.25 15.75V18C20.25 19.2426 19.2426 20.25 18 20.25H15.75C14.5074 20.25 13.5 19.2426 13.5 18V15.75Z" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};

// Custom Assets Icon
export const AssetsIcon: React.FC<IconProps> = ({ className, style, fontSize = 'medium' }) => {
  const getSize = () => {
    switch (fontSize) {
      case 'small': return 20;
      case 'large': return 32;
      case 'inherit': return 'inherit';
      default: return 24;
    }
  };

  const size = getSize();

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <path 
        d="M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
};

// Custom Sites Icon
export const SitesIcon: React.FC<IconProps> = ({ className, style, fontSize = 'medium' }) => {
  const getSize = () => {
    switch (fontSize) {
      case 'small': return 20;
      case 'large': return 32;
      case 'inherit': return 'inherit';
      default: return 24;
    }
  };

  const size = getSize();

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <path 
        d="M19 21V5C19 3.89543 18.1046 3 17 3H7C5.89543 3 5 3.89543 5 5V21M19 21L21 21M19 21H14M5 21L3 21M5 21H10M9 6.99998H10M9 11H10M14 6.99998H15M14 11H15M10 21V16C10 15.4477 10.4477 15 11 15H13C13.5523 15 14 15.4477 14 16V21M10 21H14" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
};

// Custom People Icon
export const PeopleIcon: React.FC<IconProps> = ({ className, style, fontSize = 'medium' }) => {
  const getSize = () => {
    switch (fontSize) {
      case 'small': return 20;
      case 'large': return 32;
      case 'inherit': return 'inherit';
      default: return 24;
    }
  };

  const size = getSize();

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <path 
        d="M17 20H22V18C22 16.3431 20.6569 15 19 15C18.0444 15 17.1931 15.4468 16.6438 16.1429M17 20H7M17 20V18C17 17.3438 16.8736 16.717 16.6438 16.1429M7 20H2V18C2 16.3431 3.34315 15 5 15C5.95561 15 6.80686 15.4468 7.35625 16.1429M7 20V18C7 17.3438 7.12642 16.717 7.35625 16.1429M7.35625 16.1429C8.0935 14.301 9.89482 13 12 13C14.1052 13 15.9065 14.301 16.6438 16.1429M15 7C15 8.65685 13.6569 10 12 10C10.3431 10 9 8.65685 9 7C9 5.34315 10.3431 4 12 4C13.6569 4 15 5.34315 15 7ZM21 10C21 11.1046 20.1046 12 19 12C17.8954 12 17 11.1046 17 10C17 8.89543 17.8954 8 19 8C20.1046 8 21 8.89543 21 10ZM7 10C7 11.1046 6.10457 12 5 12C3.89543 12 3 11.1046 3 10C3 8.89543 3.89543 8 5 8C6.10457 8 7 8.89543 7 10Z" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
};

// Custom Inventory Icon
export const InventoryIcon: React.FC<IconProps> = ({ className, style, fontSize = 'medium' }) => {
  const getSize = () => {
    switch (fontSize) {
      case 'small': return 20;
      case 'large': return 32;
      case 'inherit': return 'inherit';
      default: return 24;
    }
  };

  const size = getSize();

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <path 
        d="M20 7L12 3L4 7M20 7L12 11M20 7V17L12 21M12 11L4 7M12 11V21M4 7V17L12 21" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinejoin="round"
      />
    </svg>
  );
};

// Custom Capital Planning Icon
export const CapitalPlanningIcon: React.FC<IconProps> = ({ className, style, fontSize = 'medium' }) => {
  const getSize = () => {
    switch (fontSize) {
      case 'small': return 20;
      case 'large': return 32;
      case 'inherit': return 'inherit';
      default: return 24;
    }
  };

  const size = getSize();

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <path 
        d="M9 8H15M10 8C11.6569 8 13 9.34315 13 11C13 12.6569 11.6569 14 10 14H9L12 17M9 11H15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
};

// Custom Collapse Icon
export const CollapseIcon: React.FC<IconProps> = ({ className, style, fontSize = 'medium' }) => {
  const getSize = () => {
    switch (fontSize) {
      case 'small': return 20;
      case 'large': return 32;
      case 'inherit': return 'inherit';
      default: return 24;
    }
  };

  const size = getSize();

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <path 
        d="M11 19L4 12L11 5M19 19L12 12L19 5" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
};

// Custom Expand Icon
export const ExpandIcon: React.FC<IconProps> = ({ className, style, fontSize = 'medium' }) => {
  const getSize = () => {
    switch (fontSize) {
      case 'small': return 20;
      case 'large': return 32;
      case 'inherit': return 'inherit';
      default: return 24;
    }
  };

  const size = getSize();

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <path 
        d="M13 5L20 12L13 19M5 5L12 12L5 19" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
};

// Custom Analytics Icon
export const AnalyticsIcon: React.FC<IconProps> = ({ className, style, fontSize = 'medium' }) => {
  const getSize = () => {
    switch (fontSize) {
      case 'small': return 20;
      case 'large': return 32;
      case 'inherit': return 'inherit';
      default: return 24;
    }
  };

  const size = getSize();

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <path 
        d="M10.5 6C6.35786 6 3 9.35786 3 13.5C3 17.6421 6.35786 21 10.5 21C14.6421 21 18 17.6421 18 13.5H10.5V6Z" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M13.5 10.5H21C21 6.35786 17.6421 3 13.5 3V10.5Z" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
};

// Custom Settings Icon
export const SettingsIcon: React.FC<IconProps> = ({ className, style, fontSize = 'medium' }) => {
  const getSize = () => {
    switch (fontSize) {
      case 'small': return 20;
      case 'large': return 32;
      case 'inherit': return 'inherit';
      default: return 24;
    }
  };

  const size = getSize();

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <path 
        d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.2579 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.01127 9.77251C4.28053 9.5799 4.48572 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15Z" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
};

// Custom Preventive Maintenance Icon
export const PreventiveMaintenanceIcon: React.FC<IconProps> = ({ className, style, fontSize = 'medium' }) => {
  const getSize = () => {
    switch (fontSize) {
      case 'small': return 20;
      case 'large': return 32;
      case 'inherit': return 'inherit';
      default: return 24;
    }
  };

  const size = getSize();

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 18 18" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <path 
        d="M1 2C1 1.44772 1.44772 1 2 1H16C16.5523 1 17 1.44772 17 2V4C17 4.55228 16.5523 5 16 5H2C1.44772 5 1 4.55228 1 4V2Z" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M1 10C1 9.44772 1.44772 9 2 9H8C8.55228 9 9 9.44772 9 10V16C9 16.5523 8.55228 17 8 17H2C1.44772 17 1 16.5523 1 16V10Z" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M13 10C13 9.44772 13.4477 9 14 9H16C16.5523 9 17 9.44772 17 10V16C17 16.5523 16.5523 17 16 17H14C13.4477 17 13 16.5523 13 16V10Z" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
};

// Custom Cases Icon
export const CasesIcon: React.FC<IconProps> = ({ className, style, fontSize = 'medium' }) => {
  const getSize = () => {
    switch (fontSize) {
      case 'small': return 20;
      case 'large': return 32;
      case 'inherit': return 'inherit';
      default: return 24;
    }
  };

  const size = getSize();

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <path 
        d="M12 8.4V10.8M12 15.6H12.012M22.3415 4.78121C22.0958 4.79366 21.8486 4.79997 21.6 4.79997C17.9118 4.79997 14.5476 3.41344 11.9999 1.1332C9.45229 3.41335 6.08808 4.79982 2.4 4.79982C2.15133 4.79982 1.90414 4.79352 1.65856 4.78107C1.35924 5.9374 1.2 7.1501 1.2 8.4C1.2 15.1098 5.78918 20.7478 12 22.3464C18.2108 20.7478 22.8 15.1098 22.8 8.4C22.8 7.15016 22.6408 5.93749 22.3415 4.78121Z" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
};

// Custom Work Order Icon
export const WorkOrderIcon: React.FC<IconProps> = ({ className, style, fontSize = 'medium' }) => {
  const getSize = () => {
    switch (fontSize) {
      case 'small': return 20;
      case 'large': return 32;
      case 'inherit': return 'inherit';
      default: return 24;
    }
  };

  const size = getSize();

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 22 22" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <path 
        d="M10.4194 14.1762L16.25 20.0068C17.2855 21.0424 18.9645 21.0424 20 20.0068C21.0355 18.9713 21.0355 17.2924 20 16.2568L14.1233 10.3801M10.4194 14.1762L12.9155 11.1452C13.2315 10.7614 13.6542 10.52 14.1233 10.3801M10.4194 14.1762L5.76432 19.8287C5.28037 20.4164 4.55897 20.7568 3.79769 20.7568C2.39064 20.7568 1.25 19.6162 1.25 18.2092C1.25 17.4479 1.59044 16.7265 2.1781 16.2425L9.01462 10.6124M14.1233 10.3801C14.6727 10.2163 15.2858 10.1916 15.8659 10.2407C15.9925 10.2514 16.1206 10.2568 16.25 10.2568C18.7353 10.2568 20.75 8.24212 20.75 5.75684C20.75 5.09657 20.6078 4.46951 20.3524 3.90463L17.0762 7.1808C15.9605 6.92469 15.0823 6.04647 14.8262 4.9308L18.1024 1.65457C17.5375 1.39907 16.9103 1.25684 16.25 1.25684C13.7647 1.25684 11.75 3.27155 11.75 5.75684C11.75 5.88622 11.7555 6.01433 11.7662 6.14095C11.8571 7.21639 11.6948 8.40525 10.8617 9.09136L10.7596 9.17542M9.01462 10.6124L4.90901 6.50684H3.5L1.25 2.75684L2.75 1.25684L6.5 3.50684V4.91585L10.7596 9.17542M9.01462 10.6124L10.7596 9.17542M17.375 17.3818L14.75 14.7568M3.86723 18.1319H3.87473V18.1394H3.86723V18.1319Z" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
};

// Custom Smart Scheduling Calendar Icon
export const SmartSchedulingIcon: React.FC<IconProps> = ({ className, style, fontSize = 'medium' }) => {
  const getSize = () => {
    switch (fontSize) {
      case 'small': return 20;
      case 'large': return 32;
      case 'inherit': return 'inherit';
      default: return 24;
    }
  };

  const size = getSize();

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d="M5.7 0.3C6.19706 0.3 6.6 0.702944 6.6 1.2V3H17.4V1.2C17.4 0.702944 17.8029 0.3 18.3 0.3C18.7971 0.3 19.2 0.702944 19.2 1.2V3H20.1C21.8882 3 23.4 4.51178 23.4 6.3V20.1C23.4 21.8882 21.8882 23.4 20.1 23.4H3.9C2.11178 23.4 0.6 21.8882 0.6 20.1V6.3C0.6 4.51178 2.11178 3 3.9 3H4.8V1.2C4.8 0.702944 5.20294 0.3 5.7 0.3ZM21.9 11.1C21.9 10.1059 21.0941 9.3 20.1 9.3H3.9C2.90589 9.3 2.1 10.1059 2.1 11.1V20.1C2.1 21.0941 2.90589 21.9 3.9 21.9H20.1C21.0941 21.9 21.9 21.0941 21.9 20.1V11.1Z" 
        fill="currentColor"
      />
    </svg>
  );
};

// Custom Sustainability Icon
export const SustainabilityIcon: React.FC<IconProps> = ({ className, style, fontSize = 'medium' }) => {
  const getSize = () => {
    switch (fontSize) {
      case 'small': return 20;
      case 'large': return 32;
      case 'inherit': return 'inherit';
      default: return 24;
    }
  };

  const size = getSize();

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <path 
        d="M11 20C11 20 20 16 20 10C20 5.58172 16.4183 2 12 2C7.58172 2 4 5.58172 4 10C4 16 13 20 13 20" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M11 20C11 20 2 16 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 16 9 20 9 20" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M12 2V20" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M8 8L16 8" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M8 12L16 12" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M8 16L16 16" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
};
