import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { companyData } from '../../data/companyData';
import logo from "../../../public/images/logo.png"

const INTRO_KEY = 'brand-intro-played';

// Scroll korle nav kokhon compact hobe / kokhon abar expand hobe
const COMPACT_AFTER = 10;   // nicher dike eto px scroll korle compact
const EXPAND_AFTER = 8;     // upor dike eto px scroll korle expand
const RESTORE_DELAY = 900;  // scroll thamle eto ms por abar expand

// Ei session e animation age cholse kina check kore (storage block thakle o crash korbe na)
function shouldPlayIntro() {
  try {
    return window.sessionStorage.getItem(INTRO_KEY) !== '1';
  } catch (e) {
    return true;
  }
}

// Hover e ja message dekhabe. Message bodlate ba notun link er jonno ekhane edit korun.
// Link er path ba label e keyword mile gele message ashbe, na mile kichu dekhabe na (jemon Home)
const NAV_HINTS = [
  { match: 'service', text: 'Design, tech & marketing under one roof' },
  { match: 'package', text: 'Monthly plans & one-time projects' },
  { match: 'work', text: "A look at what we've built" },
  { match: 'portfolio', text: "A look at what we've built" },
  { match: 'about', text: 'Meet the team behind the work' },
  { match: 'contact', text: 'Tell us what you\u2019re planning' },
];

function getNavHint(link) {
  const key = `${link.path} ${link.label}`.toLowerCase();
  const found = NAV_HINTS.find((h) => key.includes(h.match));
  return found ? found.text : null;
}

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Shudhu prothom render e decide hoy; pore state bodlay na, tai re-render e animation abar cholbe na
  const [playIntro] = useState(shouldPlayIntro);
  const location = useLocation();

  // Compact/scrolled state DOM data-attribute e thake (React state na), tai scroll e re-render hoy na
  const headerRef = useRef(null);
  const menuOpenRef = useRef(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Mobile menu khola thakle nav expanded thakbe
  useEffect(() => {
    menuOpenRef.current = mobileMenuOpen;
    if (mobileMenuOpen && headerRef.current) headerRef.current.dataset.compact = 'false';
  }, [mobileMenuOpen]);

  // Scroll: nicher dike gele compact, thamle (delay er por) ba upor dike gele abar expand
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    let lastY = window.scrollY;
    let acc = 0; // ek-i direction e joma howa scroll
    let raf = 0;
    let timer = 0;

    const setCompact = (v) => {
      const s = v ? 'true' : 'false';
      if (el.dataset.compact !== s) el.dataset.compact = s;
    };
    const armRestore = () => {
      clearTimeout(timer);
      timer = setTimeout(() => setCompact(false), RESTORE_DELAY);
    };

    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const dy = y - lastY;
      lastY = y;
      const atTop = y <= 8;
      el.dataset.scrolled = atTop ? 'false' : 'true';

      if (atTop || reduce.matches || menuOpenRef.current) {
        acc = 0;
        clearTimeout(timer);
        setCompact(false);
        return;
      }
      if (dy === 0) return;
      if (dy > 0 !== acc > 0) acc = 0; // direction bodlale reset
      acc += dy;

      if (acc > COMPACT_AFTER) {
        setCompact(true);
        armRestore();
      } else if (acc < -EXPAND_AFTER) {
        clearTimeout(timer);
        setCompact(false);
      } else if (el.dataset.compact === 'true' && dy > 0) {
        armRestore();
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, []);

  // Animation shuru hoyeche, ei session e r dekhabo na
  useEffect(() => {
    try {
      window.sessionStorage.setItem(INTRO_KEY, '1');
    } catch (e) {
      /* ignore */
    }
  }, []);

  return (
    <>
      {/* Nav ekhon fixed + floating, tai niche er content jeno na uthe sheta rakhar jonno ekta jayga (layout shift hobe na) */}
      <div className="nav-spacer" aria-hidden="true" />

      <header
        ref={headerRef}
        data-compact="false"
        data-scrolled="false"
        className={`nav-shell ${playIntro ? 'nav-intro' : ''}`}
      >
        <style>{`
          /* ---------- Size/spacing er values (expanded / compact) ---------- */
          .nav-shell {
            --ease: cubic-bezier(.22,.9,.3,1);
            --nav-radius: .125rem; /* rounded-sm. Beshi chaile .375rem (rounded-md) */
            --nav-top: 10px; --nav-h: 56px; --nav-w: 72rem;
            --logo: 40px; --brand: 1.25rem; --link-size: 15px; --link-gap: 1.25rem;
            --hint-gap: 24px; --pad-l: 16px; --pad-r: 10px;
            position: fixed; top: var(--nav-top); left: 0; right: 0; z-index: 50;
            display: flex; justify-content: center; pointer-events: none;
          }
          .nav-shell[data-compact="true"] {
            --nav-h: 53px; --nav-w: 70rem;
            --logo: 38px; --link-gap: 1.2rem; --hint-gap: 22px;
          }
          @media (min-width: 640px) {
            .nav-shell { --brand: 1.5rem; }
          }
          @media (min-width: 768px) {
            .nav-shell { --nav-top: 16px; --nav-h: 64px; --hint-gap: 29px; --pad-l: 22px; --pad-r: 24px; }
            .nav-shell[data-compact="true"] { --nav-h: 60px; --hint-gap: 27px; }
          }
          @media (min-width: 1024px) {
            .nav-shell { --link-gap: 2rem; }
            .nav-shell[data-compact="true"] { --link-gap: 1.8rem; }
          }

          /* Flow e jayga (nav er top gap + height), jate hero er position ager moto thake */
          .nav-spacer {
            height: 66px;
            background: linear-gradient(90deg, #ffffff 0%, #fffcf8 55%, #fff6ec 100%);
          }
          @media (min-width: 768px) { .nav-spacer { height: 80px; } }

          .nav-stack {
            width: min(calc(100% - 1.5rem), var(--nav-w));
            transition: width .6s var(--ease);
          }

          /* ---------- Floating glass pill ---------- */
          .nav-pill {
            position: relative; isolation: isolate; pointer-events: auto;
            display: flex; align-items: center; justify-content: space-between;
            height: var(--nav-h); padding: 0 var(--pad-r) 0 var(--pad-l);
            border-radius: var(--nav-radius);
            box-shadow:
              0 1px 0 rgba(255,255,255,.75) inset,
              0 10px 30px -14px rgba(234,88,12,.22),
              0 2px 10px -4px rgba(24,24,27,.06);
            transition: height .6s var(--ease), box-shadow .45s ease;
          }
          .nav-shell[data-scrolled="true"] .nav-pill {
            box-shadow:
              0 1px 0 rgba(255,255,255,.75) inset,
              0 18px 40px -16px rgba(234,88,12,.32),
              0 3px 12px -4px rgba(24,24,27,.10);
          }
          /* Glass: warm white + transparent orange + blur */
          .nav-glass {
            position: absolute; inset: 0; z-index: -1; border-radius: inherit; overflow: hidden; pointer-events: none;
            background:
              radial-gradient(120% 170% at 100% 0%, rgba(253,186,116,.30), transparent 55%),
              linear-gradient(135deg, rgba(255,255,255,.78), rgba(255,250,245,.66) 60%, rgba(255,237,213,.58));
            -webkit-backdrop-filter: blur(16px) saturate(1.6);
            backdrop-filter: blur(16px) saturate(1.6);
          }
          /* Scroll korle ektu beshi opaque */
          .nav-glass::before {
            content: ''; position: absolute; inset: 0; background: rgba(255,255,255,.35);
            opacity: 0; transition: opacity .45s ease;
          }
          .nav-shell[data-scrolled="true"] .nav-glass::before { opacity: 1; }
          /* Futuristic: glass er upor diye halka alo dhire dhire bhese jay (hero ribbon sheen er moto) */
          .nav-glass::after {
            content: ''; position: absolute; top: 0; bottom: 0; left: 0; width: 30%;
            background: linear-gradient(100deg, transparent, rgba(255,255,255,.18), transparent);
            transform: translateX(-130%) skewX(-18deg);
            animation: nav-glass-sheen 14s ease-in-out infinite;
            will-change: transform;
          }
          @keyframes nav-glass-sheen {
            0%, 55% { transform: translateX(-130%) skewX(-18deg); }
            100%    { transform: translateX(480%) skewX(-18deg); }
          }
          /* Delicate gradient border (orange -> white -> orange) */
          .nav-pill::before {
            content: ''; position: absolute; inset: 0; border-radius: inherit; padding: 1px; pointer-events: none;
            background: linear-gradient(120deg, rgba(249,115,22,.5), rgba(255,255,255,.4) 35%, rgba(255,255,255,.4) 65%, rgba(253,186,116,.5));
            -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
            -webkit-mask-composite: xor; mask-composite: exclude;
          }

          /* Load e nav ektu upor theke nambe */
          @keyframes nav-drop {
            from { opacity: 0; transform: translateY(-4px); }
            to   { opacity: 1; transform: none; }
          }
          .nav-intro { animation: nav-drop .7s var(--ease) backwards; }

          /* Brand + links: compact e chhoto hoy (smooth) */
          .nav-logo { width: var(--logo); height: var(--logo); transition: width .6s var(--ease), height .6s var(--ease), transform .5s ease-out; }
          .nav-brand { font-size: var(--brand); transition: font-size .6s var(--ease); }
          .nav-links { gap: var(--link-gap); font-size: var(--link-size); transition: gap .6s var(--ease), font-size .6s var(--ease); }

          /* ---------- Brand text right theke ashe, halka bounce kore boshe ---------- */
          @keyframes brand-slide-in {
            0%   { opacity: 0; transform: translateX(90px); }
            55%  { opacity: 1; transform: translateX(-6px); }
            78%  { transform: translateX(2px); }
            100% { opacity: 1; transform: translateX(0); }
          }
          .brand-intro {
            animation: brand-slide-in .85s cubic-bezier(.22, .9, .3, 1) .15s both;
            will-change: transform, opacity;
          }

          /* ---------- Nav link: hover/active e orange underline center theke baray ---------- */
          .nav-hint-host::after {
            content: ''; position: absolute; left: 0; right: 0; bottom: -7px; height: 2px; border-radius: 2px;
            background: linear-gradient(90deg, #FDBA74, #F97316);
            transform: scaleX(0); transform-origin: center;
            transition: transform .35s var(--ease);
          }
          .nav-hint-host:hover::after,
          .nav-hint-host:focus-visible::after,
          .nav-hint-host.is-active::after { transform: scaleX(1); }

          /* ---------- Hover message pill: hero er soft orange ---------- */
          .nav-hint {
            position: absolute; left: 50%; top: calc(100% + var(--hint-gap));
            display: flex; align-items: center; gap: 8px;
            white-space: nowrap; pointer-events: none;
            padding: 8px 12px; border-radius: var(--nav-radius);
            background: #FFF7ED; color: #9a3412;
            border: 1px solid #FED7AA;
            font-size: 12px; font-weight: 600; line-height: 1;
            box-shadow: 0 12px 28px -10px rgba(234,88,12,.35);
            z-index: 10;
            opacity: 0; transform: translate(-50%, 6px) scale(.96);
            transition: opacity .2s ease, transform .28s var(--ease), top .6s var(--ease);
          }
          .nav-hint::after {
            content: ''; position: absolute; top: -5px; left: 50%;
            width: 8px; height: 8px; background: #FFF7ED;
            border-left: 1px solid #FED7AA; border-top: 1px solid #FED7AA;
            transform: translateX(-50%) rotate(45deg);
          }
          .nav-hint-dot { width: 6px; height: 6px; border-radius: 9999px; background: #f97316; flex-shrink: 0; }
          .nav-hint-host:hover .nav-hint,
          .nav-hint-host:focus-visible .nav-hint {
            opacity: 1; transform: translate(-50%, 0) scale(1); transition-delay: .3s;
          }
          /* Touch device e hover nei, tai dekhabo na */
          @media (hover: none) { .nav-hint { display: none; } }

          /* ---------- Mobile drawer: pill er niche floating glass card ---------- */
          .nav-drawer-wrap {
            display: grid; grid-template-rows: 0fr; opacity: 0; visibility: hidden;
            transition: grid-template-rows .4s var(--ease), opacity .25s ease, visibility 0s linear .4s;
          }
          .nav-drawer-wrap.open {
            grid-template-rows: 1fr; opacity: 1; visibility: visible;
            transition-delay: 0s, 0s, 0s;
          }
          .nav-drawer-card {
            margin-top: 8px; pointer-events: auto; border-radius: var(--nav-radius); padding: 12px 12px 16px;
            background: linear-gradient(180deg, rgba(255,255,255,.93), rgba(255,247,237,.9));
            -webkit-backdrop-filter: blur(16px) saturate(1.5);
            backdrop-filter: blur(16px) saturate(1.5);
            border: 1px solid rgba(255,255,255,.75);
            box-shadow: 0 1px 0 rgba(255,255,255,.8) inset;
          }
          .nav-drawer-item {
            opacity: 0; transform: translateY(-8px);
            transition: opacity .3s ease, transform .4s var(--ease), background-color .2s ease, color .2s ease;
          }
          .nav-drawer-wrap.open .nav-drawer-item { opacity: 1; transform: none; }

          @media (prefers-reduced-motion: reduce) {
            .nav-intro, .brand-intro, .nav-glass::after { animation: none; }
            .nav-stack, .nav-pill, .nav-logo, .nav-brand, .nav-links, .nav-glass::before { transition: none; }
            .nav-hint { transition: opacity .15s ease; transform: translate(-50%, 0); }
            .nav-hint-host::after, .nav-drawer-wrap, .nav-drawer-item { transition: none; }
          }
        `}</style>

        <div className="nav-stack">
          <div className="nav-pill">
            <span className="nav-glass" aria-hidden="true" />

            {/* Brand Logo */}
            <NavLink
              to="/"
              className="group flex items-center gap-2.5 font-bold tracking-tight text-[#18181B] hover:opacity-90 transition-opacity"
            >
              <img
                src={logo}
                className="nav-logo group-hover:scale-105 group-hover:-rotate-6"
                alt="Swapno Tech Logo"
              />
              <span className={`nav-brand ${playIntro ? 'brand-intro' : ''}`}>Swapno Tech</span>
            </NavLink>

            {/* Desktop Navigation */}
            <nav className="nav-links hidden md:flex items-center">
              {companyData.navLinks.map((link) => {
                const hint = getNavHint(link);
                return (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) =>
                      `nav-hint-host relative transition-colors duration-200 font-medium ${
                        isActive
                          ? 'is-active text-orange-600 font-semibold'
                          : 'text-zinc-700 hover:text-[#18181B]'
                      }`
                    }
                  >
                    {link.label}
                    {hint && (
                      <span className="nav-hint" aria-hidden="true">
                        <span className="nav-hint-dot" />
                        {hint}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </nav>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-sm text-zinc-700 hover:text-orange-600 hover:bg-orange-50/80 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500"
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
            >
              <span className="relative block w-6 h-6">
                <Menu
                  className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
                    mobileMenuOpen ? 'opacity-0 rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100'
                  }`}
                />
                <X
                  className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
                    mobileMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-75'
                  }`}
                />
              </span>
            </button>
          </div>

          {/* Mobile Drawer (hamesha render hoy, tai open/close smooth) */}
          <div className={`nav-drawer-wrap md:hidden ${mobileMenuOpen ? 'open' : ''}`} aria-hidden={!mobileMenuOpen}>
            <div className="min-h-0 overflow-hidden">
              <div className="nav-drawer-card">
                <nav className="flex flex-col space-y-3">
                  {companyData.navLinks.map((link, i) => (
                    <NavLink
                      key={link.path}
                      to={link.path}
                      tabIndex={mobileMenuOpen ? 0 : -1}
                      style={{ transitionDelay: mobileMenuOpen ? `${90 + i * 50}ms` : '0ms' }}
                      className={({ isActive }) =>
                        `nav-drawer-item px-3 py-2.5 rounded-sm text-base font-medium ${
                          isActive
                            ? 'bg-orange-50 text-orange-600 font-semibold'
                            : 'text-zinc-700 hover:bg-orange-50/60 hover:text-[#18181B]'
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  ))}
                  <div
                    className="pt-2 nav-drawer-item"
                    style={{ transitionDelay: mobileMenuOpen ? `${90 + companyData.navLinks.length * 50}ms` : '0ms' }}
                  >
                    <NavLink
                      to="/contact"
                      tabIndex={mobileMenuOpen ? 0 : -1}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-orange-600 text-white rounded-sm text-sm font-semibold hover:bg-orange-700 transition-colors shadow-[0_10px_24px_-12px_rgba(234,88,12,.6)]"
                    >
                      <span>Start an Inquiry</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </NavLink>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}