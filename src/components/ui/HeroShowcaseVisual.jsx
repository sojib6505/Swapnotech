import React from 'react';
import { 
  Globe, 
  ArrowUpRight, 
  Sparkles, 
  Smartphone, 
  Layers, 
  CheckCircle2, 
  Code2, 
  Palette, 
  TrendingUp 
} from 'lucide-react';

export default function HeroShowcaseVisual() {
  return (
    <div className="relative w-full max-w-xl mx-auto lg:max-w-none select-none">
      
      {/* Background ambient lighting/glow */}
      <div 
        className="absolute -inset-4 sm:-inset-6 bg-gradient-to-tr from-orange-600/15 via-orange-500/5 to-transparent rounded-3xl blur-2xl pointer-events-none" 
        aria-hidden="true" 
      />

      {/* Main Composition Container */}
      <div className="relative pt-4 pb-8 sm:pb-12 px-2 sm:px-4">

        {/* 1. DESKTOP BROWSER FRAME */}
        <div className="relative rounded-xl overflow-hidden bg-[#121215] border border-zinc-700/60 shadow-2xl transition-all duration-300">
          
          {/* Browser Window Header */}
          <div className="h-9 bg-[#1A1A1E] border-b border-zinc-800 px-3.5 flex items-center justify-between">
            {/* Window Controls */}
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
            </div>

            {/* Browser Address Bar */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-[#0E0E10] border border-zinc-800/80 text-[11px] text-zinc-400 font-mono tracking-tight max-w-[210px] w-full mx-2 justify-center">
              <Globe className="w-3 h-3 text-orange-500 shrink-0" />
              <span className="truncate text-zinc-300">swapnotech/work</span>
            </div>

            {/* Subtle action indicator */}
            <div className="flex items-center gap-1 text-[10px] text-zinc-500 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="hidden sm:inline">LIVE</span>
            </div>
          </div>

          {/* Browser Webpage Content (Realistic Client Work Showcase) */}
          <div className="p-4 sm:p-5 bg-[#0C0C0E] text-zinc-100 font-sans space-y-4">
            
            {/* Mock Navigation Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-orange-600 flex items-center justify-center text-[10px] font-bold text-white">
                  S
                </div>
                <span className="text-xs font-bold tracking-tight text-white">
                  HAMAR 
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-3 text-[11px] text-zinc-400 font-medium">
                <span className="text-zinc-200">Solutions</span>
                <span>Catalog</span>
                <span>Case Study</span>
              </div>
              <div className="px-2.5 py-1 rounded bg-zinc-800 text-[10px] font-medium text-zinc-200 border border-zinc-700/60">
                Client Project
              </div>
            </div>

            {/* Mock Hero Banner */}
            <div className="space-y-2 pt-1">
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-orange-950/40 border border-orange-500/30 text-[10px] font-medium text-orange-400">
                <span className="w-1 h-1 rounded-full bg-orange-500" />
                <span>Web Architecture & E-Commerce</span>
              </div>
              <h4 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug">
                Engineered for speed, built for conversion.
              </h4>
              <p className="text-[12px] text-zinc-400 leading-relaxed max-w-sm">
                Custom full-stack web storefront with responsive catalog filtering and high-performance checkout flows.
              </p>
            </div>

            {/* Mock Interactive Cards Grid */}
            <div className="grid grid-cols-3 gap-2.5 pt-1">
              {/* Card 1: Tech */}
              <div className="p-2.5 rounded-lg bg-[#151518] border border-zinc-800/80 space-y-1">
                <div className="flex items-center justify-between text-zinc-400">
                  <Code2 className="w-3.5 h-3.5 text-orange-500" />
                  <span className="text-[9px] font-mono text-zinc-500">CORE</span>
                </div>
                <p className="text-[11px] font-bold text-white">React & Node</p>
                <p className="text-[9px] text-zinc-400">Modular System</p>
              </div>

              {/* Card 2: Design */}
              <div className="p-2.5 rounded-lg bg-[#151518] border border-zinc-800/80 space-y-1">
                <div className="flex items-center justify-between text-zinc-400">
                  <Palette className="w-3.5 h-3.5 text-zinc-300" />
                  <span className="text-[9px] font-mono text-zinc-500">UI/UX</span>
                </div>
                <p className="text-[11px] font-bold text-white">Minimal Identity</p>
                <div className="flex items-center gap-1 pt-0.5">
                  <span className="w-2 h-2 rounded-full bg-white border border-zinc-600" />
                  <span className="w-2 h-2 rounded-full bg-zinc-900 border border-zinc-600" />
                  <span className="w-2 h-2 rounded-full bg-orange-500" />
                </div>
              </div>

              {/* Card 3: Growth */}
              <div className="p-2.5 rounded-lg bg-[#151518] border border-zinc-800/80 space-y-1">
                <div className="flex items-center justify-between text-zinc-400">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-[9px] font-mono text-emerald-400">SEO</span>
                </div>
                <p className="text-[11px] font-bold text-white">Conversion</p>
                <p className="text-[9px] text-emerald-400 font-mono">Optimized Flow</p>
              </div>
            </div>

          </div>
        </div>

        {/* 2. OVERLAPPING MOBILE PREVIEW FRAME */}
        <div className="absolute -bottom-2 sm:-bottom-4 -right-1 sm:right-2 w-[160px] sm:w-[190px] rounded-2xl overflow-hidden bg-[#111113] border-2 border-zinc-700 shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-20 transition-transform duration-300 hover:-translate-y-1">
          
          {/* Mobile Speaker / Camera Notch */}
          <div className="h-5 bg-[#18181C] flex items-center justify-center">
            <div className="w-10 h-1.5 rounded-full bg-zinc-800" />
          </div>

          {/* Mobile Screen Viewport */}
          <div className="p-3 bg-[#0A0A0C] text-zinc-100 font-sans space-y-2">
            
            {/* Mobile Header */}
            <div className="flex items-center justify-between border-b border-zinc-800/60 pb-1.5">
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                <span className="text-[9px] font-bold text-white">AutoReply AI</span>
              </div>
              <span className="text-[8px] font-mono px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-400">
                SaaS
              </span>
            </div>

            {/* Mobile Content Card */}
            <div className="p-2 rounded-md bg-[#161619] border border-zinc-800/90 space-y-1">
              <p className="text-[9px] font-bold text-white leading-tight">
                Automated Customer Inquiries
              </p>
              <p className="text-[8px] text-zinc-400 leading-normal">
                Smart messaging triage for growing F-commerce stores.
              </p>
            </div>

            {/* Mobile Action Pill */}
            <div className="flex items-center justify-between pt-0.5">
              <span className="text-[8px] font-mono text-zinc-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Responsive</span>
              </span>
              <span className="text-[8px] text-orange-400 font-medium">Explore →</span>
            </div>

          </div>

          {/* Mobile Bottom Home Bar */}
          <div className="h-3 bg-[#18181C] flex items-center justify-center">
            <div className="w-12 h-1 rounded-full bg-zinc-700" />
          </div>
        </div>

        {/* 3. TASTEFUL FLOATING BADGE (Creative Agency Touch) */}
        <div className="hidden sm:flex absolute -top-1 left-2 sm:-left-3 z-20 items-center gap-2 px-3 py-1.5 rounded-full bg-[#18181B]/95 border border-zinc-700/80 shadow-lg text-[11px] text-zinc-200 backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5 text-orange-500" />
          <span className="font-medium">Design • Technology • Marketing</span>
        </div>

      </div>
    </div>
  );
}
