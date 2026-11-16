import React from 'react';

interface ArundaryLogoProps {
  size?: number | string;
  variant?: 'circular' | 'horizontal' | 'minimal' | 'badge';
  color?: 'default' | 'white' | 'dark';
  className?: string;
}

export const ArundaryLogo: React.FC<ArundaryLogoProps> = ({
  size = 64,
  variant = 'circular',
  color = 'default',
  className = '',
}) => {
  const primaryStroke =
    color === 'white' ? '#FFFFFF' : color === 'dark' ? '#1C1917' : '#2D241E';
  const accentFill =
    color === 'white' ? 'rgba(255,255,255,0.1)' : '#F5EBE1';
  const textFill =
    color === 'white' ? '#FFFFFF' : color === 'dark' ? '#1C1917' : '#2B2118';
  const warmTerracotta =
    color === 'white' ? '#FFFFFF' : '#8C6A4B';

  const numericSize = typeof size === 'number' ? size : parseInt(size as string, 10) || 64;

  const circularSVG = (
    <svg
      width={numericSize}
      height={numericSize}
      viewBox="0 0 240 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform duration-300 hover:scale-[1.02]"
      aria-label="Arundary Cafe and Space Logo"
    >
      {/* Outer subtle decorative glow / circle */}
      <circle cx="120" cy="120" r="114" stroke={primaryStroke} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.4" />
      <circle cx="120" cy="120" r="110" stroke={primaryStroke} strokeWidth="2.5" />
      <circle cx="120" cy="120" r="104" stroke={primaryStroke} strokeWidth="1" />

      {/* Decorative star dots on circle sides */}
      <circle cx="28" cy="120" r="2.5" fill={warmTerracotta} />
      <circle cx="212" cy="120" r="2.5" fill={warmTerracotta} />
      <polygon points="28,114 30,119 35,120 30,121 28,126 26,121 21,120 26,119" fill={warmTerracotta} />
      <polygon points="212,114 214,119 219,120 214,121 212,126 210,121 205,120 210,119" fill={warmTerracotta} />

      {/* Circular Text Path - Top ARUNDARY */}
      <defs>
        <path
          id="textPathTop"
          d="M 32,120 A 88,88 0 0,1 208,120"
          fill="none"
        />
        <path
          id="textPathBottom"
          d="M 208,120 A 88,88 0 0,1 32,120"
          fill="none"
        />
      </defs>

      <text
        fill={textFill}
        fontSize="21"
        fontFamily="'Playfair Display', Georgia, serif"
        fontWeight="700"
        letterSpacing="8"
      >
        <textPath href="#textPathTop" startOffset="50%" textAnchor="middle">
          ARUNDARY
        </textPath>
      </text>

      {/* Circular Text Path - Bottom CAFE AND SPACE */}
      <text
        fill={warmTerracotta}
        fontSize="10.5"
        fontFamily="'Plus Jakarta Sans', sans-serif"
        fontWeight="600"
        letterSpacing="4"
      >
        <textPath href="#textPathBottom" startOffset="50%" textAnchor="middle">
          CAFE AND SPACE
        </textPath>
      </text>

      {/* Inner Central Emblem Container */}
      <circle cx="120" cy="120" r="66" stroke={primaryStroke} strokeWidth="1.2" fill={accentFill} />
      <circle cx="120" cy="120" r="62" stroke={primaryStroke} strokeWidth="0.8" strokeDasharray="2 2" fill="none" opacity="0.6" />

      {/* Architectural Space Arches & Botanical Coffee Illustration */}
      <g transform="translate(120, 120)">
        {/* Architectural Arch Frame */}
        <path
          d="M -30,22 L -30,-4 A 30,30 0 0,1 30,-4 L 30,22 Z"
          stroke={primaryStroke}
          strokeWidth="1.2"
          fill="none"
          opacity="0.85"
        />
        <path
          d="M -23,22 L -23,-4 A 23,23 0 0,1 23,-4 L 23,22"
          stroke={warmTerracotta}
          strokeWidth="0.8"
          fill="none"
          strokeDasharray="2 2"
          opacity="0.6"
        />

        {/* Cafe Sun / Daylight Halo behind Cup */}
        <circle cx="0" cy="-6" r="14" fill="#EAD9C8" opacity="0.6" />
        <line x1="0" y1="-26" x2="0" y2="-21" stroke={warmTerracotta} strokeWidth="1" strokeLinecap="round" />
        <line x1="-14" y1="-20" x2="-10" y2="-17" stroke={warmTerracotta} strokeWidth="1" strokeLinecap="round" />
        <line x1="14" y1="-20" x2="10" y2="-17" stroke={warmTerracotta} strokeWidth="1" strokeLinecap="round" />

        {/* Botanical Coffee Branch (Left) */}
        <path
          d="M -28,14 C -22,8 -16,4 -10,12"
          stroke={primaryStroke}
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
        />
        {/* Leaf pairs */}
        <path
          d="M -22,7 C -26,3 -25,-1 -20,1 C -17,2 -18,6 -22,7 Z"
          fill={warmTerracotta}
          opacity="0.9"
        />
        <path
          d="M -15,5 C -18,0 -16,-4 -12,-3 C -9,-2 -11,2 -15,5 Z"
          fill={primaryStroke}
          opacity="0.85"
        />
        {/* Coffee berry */}
        <circle cx="-18" cy="11" r="2.2" fill="#B3543A" />

        {/* Botanical Coffee Branch (Right) */}
        <path
          d="M 28,14 C 22,8 16,4 10,12"
          stroke={primaryStroke}
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
        />
        {/* Leaf pairs */}
        <path
          d="M 22,7 C 26,3 25,-1 20,1 C 17,2 18,6 22,7 Z"
          fill={warmTerracotta}
          opacity="0.9"
        />
        <path
          d="M 15,5 C 18,0 16,-4 12,-3 C 9,-2 11,2 15,5 Z"
          fill={primaryStroke}
          opacity="0.85"
        />
        {/* Coffee berry */}
        <circle cx="18" cy="11" r="2.2" fill="#B3543A" />

        {/* Ceramic Artisan Coffee Cup */}
        {/* Saucer */}
        <ellipse cx="0" cy="19" rx="17" ry="2.8" stroke={primaryStroke} strokeWidth="1.2" fill="#FFFFFF" />
        {/* Cup body */}
        <path
          d="M -11,6 C -11,16 11,16 11,6 Z"
          stroke={primaryStroke}
          strokeWidth="1.3"
          fill="#FAF7F2"
        />
        {/* Cup rim */}
        <ellipse cx="0" cy="6" rx="11" ry="2" stroke={primaryStroke} strokeWidth="1" fill="#4A3525" />
        {/* Cup handle */}
        <path
          d="M 10,8 C 14,8 14,13 9,14"
          stroke={primaryStroke}
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
        />
        {/* Delicate Steam */}
        <path
          d="M -4,2 C -6,-2 -3,-5 -5,-9"
          stroke={warmTerracotta}
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
          opacity="0.8"
        />
        <path
          d="M 2,1 C 0,-3 3,-6 1,-10"
          stroke={warmTerracotta}
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
          opacity="0.8"
        />

        {/* Founded Year Text */}
        <text
          x="0"
          y="31"
          textAnchor="middle"
          fill={textFill}
          fontSize="6.5"
          fontFamily="'Plus Jakarta Sans', sans-serif"
          fontWeight="700"
          letterSpacing="1.5"
          opacity="0.75"
        >
          EST. 2024
        </text>
      </g>
    </svg>
  );

  if (variant === 'circular') {
    return <div className={`inline-flex items-center justify-center ${className}`}>{circularSVG}</div>;
  }

  if (variant === 'badge') {
    return (
      <div className={`inline-flex items-center gap-3 p-1.5 rounded-full bg-[#FAF7F2] border border-[#E8DDD0] shadow-sm ${className}`}>
        {circularSVG}
        <div className="pr-4 text-left">
          <p className="font-serif-cafe text-base font-bold tracking-wider text-[#1C1917] leading-none">
            ARUNDARY
          </p>
          <p className="text-[10px] tracking-[0.2em] font-semibold text-[#8C6A4B] uppercase mt-0.5">
            Cafe and Space
          </p>
        </div>
      </div>
    );
  }

  // Horizontal Lockup
  return (
    <div className={`inline-flex items-center gap-3.5 ${className}`}>
      {circularSVG}
      <div className="flex flex-col">
        <span className="font-serif-cafe font-bold text-lg md:text-xl tracking-[0.18em] text-[#1C1917] leading-none">
          ARUNDARY
        </span>
        <span className="text-[10px] md:text-[11px] font-semibold tracking-[0.25em] text-[#8C6A4B] uppercase mt-1">
          CAFE AND SPACE
        </span>
      </div>
    </div>
  );
};
