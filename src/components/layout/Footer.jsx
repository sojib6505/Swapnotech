
import React from 'react';
import { Link } from 'react-router-dom';
import { companyData } from '../../data/companyData';
import { MessageCircle, Facebook, Phone } from 'lucide-react';
import logo from "../../../public/images/logo.png"

export default function Footer() {
  return (
    <footer className="footer-root bg-[#050505] text-zinc-400 text-sm border-t border-zinc-900 relative overflow-hidden">
      <style>{`
        /* ── Dot grid background ── */
        .footer-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(249,115,22,.06) 1px, transparent 1.3px);
          background-size: 26px 26px;
          pointer-events: none;
          z-index: 0;
        }

        /* ── Top sheen border ── */
        .footer-sheen {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(249,115,22,.0) 5%,
            rgba(249,115,22,.55) 25%,
            rgba(253,186,116,.85) 50%,
            rgba(249,115,22,.55) 75%,
            rgba(249,115,22,.0) 95%,
            transparent 100%
          );
          animation: footerSheen 5s ease-in-out infinite;
        }
        @keyframes footerSheen {
          0%   { opacity: .35; }
          50%  { opacity: 1; }
          100% { opacity: .35; }
        }

        /* ── Social icon premium hover ── */
        .footer-social {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 9999px;
          border: 1px solid rgba(255,255,255,.10);
          background: rgba(255,255,255,.04);
          color: #a1a1aa;
          transition: background .25s ease, color .25s ease, border-color .25s ease, box-shadow .25s ease, transform .2s ease;
        }
        .footer-social:hover { transform: translateY(-2px); }
        .footer-social-wa:hover {
          background: rgba(34,197,94,.18);
          color: #4ade80;
          border-color: rgba(34,197,94,.35);
          box-shadow: 0 0 16px rgba(34,197,94,.22);
        }
        .footer-social-fb:hover {
          background: rgba(59,130,246,.18);
          color: #93c5fd;
          border-color: rgba(59,130,246,.35);
          box-shadow: 0 0 16px rgba(59,130,246,.22);
        }
        .footer-social-ph:hover {
          background: rgba(249,115,22,.18);
          color: #fdba74;
          border-color: rgba(249,115,22,.35);
          box-shadow: 0 0 16px rgba(249,115,22,.22);
        }

        /* ── Orange decorative divider ── */
        .footer-divider {
          width: 36px;
          height: 2px;
          background: linear-gradient(90deg, #F97316, #FDBA74);
          border-radius: 99px;
          margin-bottom: 1.25rem;
        }

        /* ── Bottom border sheen ── */
        .footer-bottom-border {
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(249,115,22,.0) 5%,
            rgba(249,115,22,.35) 30%,
            rgba(253,186,116,.5) 50%,
            rgba(249,115,22,.35) 70%,
            rgba(249,115,22,.0) 95%,
            transparent 100%
          );
          margin-bottom: 2rem;
          animation: footerSheen 5s ease-in-out 2.5s infinite;
        }

        /* ── Nav links ── */
        .footer-link {
          color: #a1a1aa;
          transition: color .2s ease;
        }
        .footer-link:hover { color: #fff; }

        @media (prefers-reduced-motion: reduce) {
          .footer-sheen, .footer-bottom-border { animation: none; }
          .footer-social { transition: none; }
        }
      `}</style>

      {/* Top sheen line */}
      <div className="footer-sheen" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">

          {/* Brand & Purpose Column */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <img src={logo} className="w-10 h-10" alt="Swapno Tech Logo" />
              <h3 className="text-xl font-bold tracking-tight text-white">
                {companyData.name}
              </h3>
            </div>

            <p className="max-w-md text-zinc-400 leading-relaxed text-[15px]">
              {companyData.shortDescription}
            </p>

            <div className="pt-2">
              <span className="inline-block px-3 py-1 bg-zinc-900 text-zinc-400 rounded text-xs font-mono border border-zinc-800">
                {companyData.contact.emailPlaceholder}
              </span>
            </div>

            {/* Social & Contact Icons */}
            <div className="flex items-center gap-3 pt-3">
              <a
                href="https://wa.me/8801994366641?text=Hello%20Swapno%20Tech!%20I%20am%20interested%20in%20your%20services.%20Could%20you%20please%20share%20more%20details%3F"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with us on WhatsApp"
                title="WhatsApp"
                className="footer-social footer-social-wa"
              >
                <MessageCircle size={19} />
              </a>

              <a
                href="https://www.facebook.com/swapnotech"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit our Facebook page"
                title="Facebook"
                className="footer-social footer-social-fb"
              >
                <Facebook size={19} />
              </a>

              <a
                href="tel:+8801994366641"
                aria-label="Call Swapno Tech"
                title="Call us"
                className="footer-social footer-social-ph"
              >
                <Phone size={19} />
              </a>
            </div>
          </div>

          {/* Explore Links Column */}
          <div className="md:col-span-6 md:pl-12">
            <div className="footer-divider" />
            <p className="text-xs font-semibold tracking-wider text-orange-500 uppercase mb-5">
              EXPLORE
            </p>

            <div className="grid grid-cols-2 gap-x-8 gap-y-3 max-w-xs">
              <div>
                <ul className="space-y-3">
                  <li>
                    <Link to="/" className="footer-link">
                      Home
                    </Link>
                  </li>

                  <li>
                    <Link to="/packages" className="footer-link">
                      Packages
                    </Link>
                  </li>

                  {/*
                  <li>
                    <Link to="/blog" className="footer-link">
                      Blog
                    </Link>
                  </li>
                  */}
                </ul>
              </div>

              <div>
                <ul className="space-y-3">
                  <li>
                    <Link to="/services" className="footer-link">
                      Services
                    </Link>
                  </li>

                  {/*
                  <li>
                    <Link to="/portfolio" className="footer-link">
                      Portfolio
                    </Link>
                  </li>
                  */}

                  <li>
                    <Link to="/contact" className="footer-link">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal */}
        <div className="footer-bottom-border" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} Swapno Tech</p>
        </div>
      </div>
    </footer>
  );
}
