import React from 'react';
import {
  PenTool,
  Clapperboard,
  Globe,
  Code2,
  FileText,
  Megaphone,
  Search,
  Target,
  Gem,
  Film,
  Camera,
  Wrench,
  ArrowRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';

import { servicesData } from '../../data/servicesData';

// Prottek service er jonno icon
const iconMap = {
  'graphic-design': PenTool,
  'video-editing': Clapperboard,
  'website-development': Globe,
  'software-development': Code2,
  'content-production': FileText,
  'digital-marketing': Megaphone,
  seo: Search,
  'ads-campaigns': Target,
  branding: Gem,
  'motion-graphics': Film,
  'product-photography': Camera,
  'website-maintenance': Wrench,
};

// Category onujayi chhoto tag er color
const categoryStyle = {
  creative: { label: 'Creative', cls: 'text-orange-400 bg-orange-500/10 border-orange-500/25' },
  technology: { label: 'Technology', cls: 'text-sky-300 bg-sky-500/10 border-sky-500/25' },
  marketing: { label: 'Marketing', cls: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/25' },
};

function ServiceRow({ service }) {
  const Icon = iconMap[service.id] || Code2;
  const cat = categoryStyle[service.category];

  return (
    <li className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white/[0.04] transition-colors">
      <div className="w-10 h-10 shrink-0 rounded-lg bg-[#1B1B20] border border-zinc-800 flex items-center justify-center">
        <Icon className="w-[18px] h-[18px] text-orange-500" strokeWidth={1.8} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-white leading-tight truncate">{service.title}</p>
        <p className="text-xs text-zinc-400 leading-snug mt-0.5 truncate">{service.description}</p>
      </div>

      {cat && (
        <span className={`hidden sm:inline-block shrink-0 text-[11px] font-medium px-2 py-0.5 rounded-full border ${cat.cls}`}>
          {cat.label}
        </span>
      )}
    </li>
  );
}

export default function HeroServicesPanel({ contactHref = '#contact' }) {
  return (
    <div className="relative w-full max-w-xl mx-auto lg:max-w-none">
      {/* Component er nijossho CSS (alada config lagbe na) */}
      <style>{`
        @keyframes services-scroll {
          from { transform: translateY(0); }
          to   { transform: translateY(-50%); }
        }
        .services-track { animation: services-scroll 32s linear infinite; }
        .services-viewport:hover .services-track,
        .services-viewport:focus-within .services-track { animation-play-state: paused; }
        .services-fade {
          -webkit-mask-image: linear-gradient(to bottom, transparent 0, #000 36px, #000 calc(100% - 36px), transparent 100%);
                  mask-image: linear-gradient(to bottom, transparent 0, #000 36px, #000 calc(100% - 36px), transparent 100%);
        }
        @media (prefers-reduced-motion: reduce) {
          .services-track { animation: none; }
          .services-viewport { overflow-y: auto; }
          .services-copy { display: none; }
        }
      `}</style>

      {/* Background glow */}
      <div
        className="absolute -inset-4 sm:-inset-6 bg-gradient-to-tr from-orange-600/15 via-orange-500/5 to-transparent rounded-3xl blur-2xl pointer-events-none"
        aria-hidden="true"
      />

      <section
        aria-label="Our services"
        className="relative rounded-2xl overflow-hidden bg-[#121215] border border-zinc-700/60 shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">What we do</h3>
            <p className="text-xs text-zinc-400 mt-0.5">{servicesData.length} services, one team</p>
          </div>
          <span className="flex items-center gap-1.5 text-xs font-medium text-orange-400 bg-orange-500/10 border border-orange-500/25 px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
            Taking projects
          </span>
        </div>

        {/* Auto-scrolling list */}
        <div className="services-viewport services-fade relative h-[380px] sm:h-[420px] overflow-hidden px-2">
          <div className="services-track">
            <ul>
              {servicesData.map((s) => (
                <ServiceRow key={s.id} service={s} />
              ))}
            </ul>
            {/* Seamless loop er jonno duplicate copy */}
            <ul className="services-copy" aria-hidden="true">
              {servicesData.map((s) => (
                <ServiceRow key={`${s.id}-copy`} service={s} />
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 px-5 py-3.5 border-t border-zinc-800 bg-[#0F0F12]">
          <p className="text-xs text-zinc-400">Not sure what you need? Tell us the goal.</p>
          <Link
            to='/contact'
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-orange-600 hover:bg-orange-500 transition-colors px-3.5 py-2 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
          >
            Get a quote
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>
    </div>
  );
}