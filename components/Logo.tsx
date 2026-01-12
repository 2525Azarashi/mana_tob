
import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "h-12 w-auto" }) => {
  // 新しい Google Drive のファイルID: 1iYmtlqdNO7gzaH9OGTdb5EJMtsnXr81Y
  const logoUrl = "https://lh3.googleusercontent.com/d/1iYmtlqdNO7gzaH9OGTdb5EJMtsnXr81Y";

  return (
    <div className={`relative flex items-center ${className}`}>
      <img 
        src={logoUrl} 
        alt="mntb logo" 
        className="h-full w-auto object-contain"
        onError={(e) => {
          const target = e.currentTarget;
          target.style.display = 'none';
          const fallback = target.nextElementSibling as HTMLElement;
          if (fallback) {
            fallback.classList.remove('hidden');
            fallback.classList.add('block');
          }
        }}
      />
      
      {/* フォールバック用SVG (画像がない時、または読み込み失敗時だけ表示) */}
      <svg
        viewBox="0 0 520 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto overflow-visible hidden"
      >
        <defs>
          <linearGradient id="grad-blue-mntb" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1E56B6" />
            <stop offset="100%" stopColor="#164BA1" />
          </linearGradient>
          <linearGradient id="grad-sky-mntb" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#29ABE2" />
            <stop offset="100%" stopColor="#1E56B6" />
          </linearGradient>
          <clipPath id="door-view-clip">
            <path d="M192 88 C 192 70, 260 70, 260 88 V 165 H 192 V 88Z" />
          </clipPath>
        </defs>
        <g id="letter-m">
          <path d="M20 170 V90 L45 55 L70 90 L105 40 L140 85 L165 90 V170 H135 V105 L105 70 L70 110 L45 85 V170 H20Z" fill="#1E56B6" />
          <path d="M45 55 L60 75 L35 75 Z" fill="#154085" opacity="0.3" />
          <path d="M105 40 L125 65 L85 65 Z" fill="#154085" opacity="0.3" />
          <g stroke="white" strokeWidth="2.5" fill="none">
            <circle cx="30" cy="130" r="3.5" fill="white" />
            <path d="M30 130 V155 H45" />
            <circle cx="45" cy="155" r="3.5" fill="white" />
            <circle cx="155" cy="135" r="3.5" fill="white" />
            <path d="M155 135 V150 H140 V165" />
            <circle cx="140" cy="165" r="3.5" fill="white" />
          </g>
        </g>
        <g id="letter-n">
          <path d="M185 85 C 185 60, 275 60, 275 85 V170 H245 V85 C 245 78, 215 78, 215 85 V170 H185 V85Z" fill="#1E56B6" />
          <g clipPath="url(#door-view-clip)">
            <rect x="215" y="85" width="30" height="85" fill="#FFFFFF" />
            <path d="M215 85 L235 100 V150 L215 170 Z" fill="#F1F5F9" />
            <path d="M245 85 L235 100 V150 L245 170 Z" fill="#E2E8F0" />
            <path d="M215 85 L195 75 V160 L215 170 Z" fill="#854D27" stroke="#5D361B" strokeWidth="1" />
          </g>
        </g>
        <g id="letter-t" transform="translate(290, 25)">
          <path d="M25 25 H45 V5 H65 V25 H85 V45 H65 V65 H45 V45 H25 V25Z" fill="#F7931E" />
          <path d="M48 30 H62 M55 23 V37" stroke="white" strokeWidth="2.5" />
          <path d="M55 135 C 55 110, 80 100, 110 90 L125 105 V60 H70 L85 75 C 65 90, 55 110, 55 135Z" fill="#F7931E" />
          <path d="M75 35 L115 -5 L125 5 L135 -15 L105 -25 L115 -5 Z" fill="#F7931E" />
        </g>
        <g id="letter-b" transform="translate(405, 10)">
          <rect x="0" y="0" width="28" height="160" fill="url(#grad-sky-mntb)" />
          <g stroke="white" strokeWidth="2.5" fill="none">
            <circle cx="10" cy="30" r="3.5" fill="white" />
            <path d="M10 30 L20 45 V70" />
            <circle cx="20" cy="70" r="3.5" fill="white" />
          </g>
          <path d="M28 80 C 28 60, 110 60, 110 120 C 110 180, 28 180, 28 160 H60 C 60 150, 82 150, 82 120 C 82 90, 60 90, 60 80 H28 Z" fill="url(#grad-sky-mntb)" />
          <path d="M52 105 L95 130 L52 155 Z" fill="#FFD600" />
        </g>
      </svg>
    </div>
  );
};

export default Logo;
