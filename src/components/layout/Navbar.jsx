import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { companyData } from '../../data/companyData';
import logo from "../../../public/images/logo.png"

const INTRO_KEY = 'brand-intro-played';

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

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Animation shuru hoyeche, ei session e r dekhabo na
  useEffect(() => {
    try {
      window.sessionStorage.setItem(INTRO_KEY, '1');
    } catch (e) {
      /* ignore */
    }
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-zinc-100 transition-all">
      <style>{`
        /* Brand text ta right theke ashe, halka bounce kore boshe jay. Shudhu transform + opacity, tai layout nore na */
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
        @media (prefers-reduced-motion: reduce) {
          .brand-intro { animation: none; }
        }

        /* Nav link hover e choto message pill. 0.3s por ashe, tai mouse nav er upor diye gele flicker kore na */
        .nav-hint {
          position: absolute; left: 50%; top: calc(100% + 12px);
          display: flex; align-items: center; gap: 8px;
          white-space: nowrap; pointer-events: none;
          padding: 8px 12px; border-radius: 10px;
          background: #ffedd5; color: #9a3412;
          border: 1px solid #fed7aa;
          font-size: 12px; font-weight: 600; line-height: 1;
          box-shadow: 0 12px 28px -10px rgba(234,88,12,.35);
          opacity: 0; transform: translate(-50%, 6px) scale(.96);
          transition: opacity .2s ease, transform .28s cubic-bezier(.22, .9, .3, 1);
        }
        .nav-hint::after {
          content: ''; position: absolute; top: -5px; left: 50%;
          width: 8px; height: 8px; background: #ffedd5;
          border-left: 1px solid #fed7aa; border-top: 1px solid #fed7aa;
          transform: translateX(-50%) rotate(45deg);
        }
        .nav-hint-dot { width: 6px; height: 6px; border-radius: 9999px; background: #f97316; flex-shrink: 0; }
        .nav-hint-host:hover .nav-hint,
        .nav-hint-host:focus-visible .nav-hint {
          opacity: 1; transform: translate(-50%, 0) scale(1); transition-delay: .3s;
        }
        /* Touch device e hover nei, tai dekhabo na */
        @media (hover: none) { .nav-hint { display: none; } }
        @media (prefers-reduced-motion: reduce) {
          .nav-hint { transition: opacity .15s ease; transform: translate(-50%, 0); }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <NavLink 
            to="/" 
            className="flex items-center gap-2.5 text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 hover:opacity-90 transition-opacity"
          > <img src={logo} className="w-10 h-10" alt="Swapno Tech Logo" />
            <span className={playIntro ? 'brand-intro' : undefined}>Swapno Tech</span>
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-[15px]">
            {companyData.navLinks.map((link) => {
              const hint = getNavHint(link);
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `nav-hint-host relative transition-colors duration-200 font-medium ${
                      isActive
                        ? 'text-orange-600 font-semibold'
                        : 'text-zinc-700 hover:text-zinc-950'
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
            className="md:hidden p-2 rounded-lg text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-200 bg-white px-4 pt-3 pb-6 shadow-xl animate-in fade-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col space-y-3">
            {companyData.navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-orange-50 text-orange-600 font-semibold'
                      : 'text-zinc-700 hover:bg-zinc-50 hover:text-zinc-950'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <div className="pt-2">
              <NavLink
                to="/contact"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-zinc-950 text-white rounded-lg text-sm font-medium hover:bg-zinc-800 transition-colors"
              >
                <span>Start an Inquiry</span>
                <ArrowUpRight className="w-4 h-4 text-orange-500" />
              </NavLink>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}