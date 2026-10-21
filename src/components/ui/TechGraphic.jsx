import React from 'react';

export default function TechGraphic({ 
  label = 'IDEAS / DESIGN / DIGITAL', 
  className = '',
  aspectRatio = 'aspect-[16/10]',
  variant = 'default' 
}) {
  return (
    <div className={`relative overflow-hidden rounded-xl bg-[#141416] border border-white/10 shadow-2xl flex items-center justify-center group ${aspectRatio} ${className}`}>
      {/* Background radial gradient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_35%,rgba(249,115,22,0.22),rgba(15,15,18,0.95)_70%)]" />

      {/* Grid Pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-25 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id={`tech-grid-${label.replace(/[^a-zA-Z0-9]/g, '-')}`} width="36" height="36" patternUnits="userSpaceOnUse">
            <path d="M 36 0 L 0 0 0 36" fill="none" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="0.75" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#tech-grid-${label.replace(/[^a-zA-Z0-9]/g, '-')})`} />
      </svg>

      {/* Dynamic Concentric Rings matching the Canva reference */}
      <div className="absolute right-[12%] top-[20%] w-48 h-48 sm:w-64 sm:h-64 pointer-events-none transform -translate-y-4">
        {/* Outer Ring */}
        <div className="absolute inset-0 rounded-full border border-orange-500/20 group-hover:scale-105 transition-transform duration-700 ease-out" />
        {/* Mid Ring */}
        <div className="absolute inset-4 rounded-full border border-white/20" />
        {/* Core Ring */}
        <div className="absolute inset-10 rounded-full border border-orange-500/40 shadow-[0_0_20px_rgba(249,115,22,0.3)]" />
        {/* Center Accent */}
        <div className="absolute inset-20 rounded-full bg-gradient-to-tr from-orange-600/30 to-amber-500/10 blur-sm" />
      </div>

      {/* Modern subtle perspective plane lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        <line x1="0" y1="100%" x2="100%" y2="0" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" strokeDasharray="4 4" />
        <line x1="20%" y1="100%" x2="80%" y2="0" stroke="rgba(249,115,22,0.4)" strokeWidth="0.5" />
      </svg>

      {/* Label tag at bottom left */}
      <div className="absolute bottom-4 left-5 z-10 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
        <span className="text-[11px] font-mono tracking-widest text-zinc-300 uppercase font-medium">
          {label}
        </span>
      </div>
    </div>
  );
}
