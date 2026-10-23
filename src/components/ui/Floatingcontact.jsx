import React from 'react';
import { Phone } from 'lucide-react';

// 👉 Nijer number ekhane din (country code soho, + ba space chhara)
const PHONE_NUMBER = '8801994366641';

// 👉 WhatsApp e click korle ei message ta auto-fill hoye jabe
const DEFAULT_MESSAGE =
  "Hello! I visited your website and I'd like to know more about your services.";

// lucide-react e WhatsApp logo nei, tai inline SVG
function WhatsAppIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.05 21.8h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88zM20.52 3.45A11.8 11.8 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.16-3.48-8.4z" />
    </svg>
  );
}

export default function FloatingContact({
  phone = PHONE_NUMBER,
  message = DEFAULT_MESSAGE,
}) {
  const callHref = `tel:+${phone}`;
  const whatsappHref = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <>
      <style>{`
        /* Button ta halka upore-niche korbe, shadow ta o sathe boro/chhoto hobe */
        @keyframes fc-float {
          0%, 100% {
            transform: translateY(0);
            box-shadow: 0 6px 16px -2px rgba(234, 88, 12, 0.35), 0 2px 6px rgba(0, 0, 0, 0.35);
          }
          50% {
            transform: translateY(-9px);
            box-shadow: 0 16px 28px -4px rgba(234, 88, 12, 0.5), 0 4px 10px rgba(0, 0, 0, 0.3);
          }
        }
        .fc-bob { animation: fc-float 3.2s ease-in-out infinite; }
        .fc-bob-delay { animation-delay: -1.6s; }
        @media (prefers-reduced-motion: reduce) {
          .fc-bob { animation: none; box-shadow: 0 8px 20px -4px rgba(234, 88, 12, 0.4); }
        }
      `}</style>

      {/* CALL: desktop ar mobile duitate left side e */}
      <a
        href={callHref}
        aria-label="Call us directly"
        className="group fixed z-50 left-4 bottom-5 md:left-6 md:bottom-6 transition-transform duration-300 hover:scale-110 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 rounded-full"
        style={{ marginBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        <span className="fc-bob fc-bob-delay flex items-center justify-center w-14 h-14 rounded-full bg-orange-600 text-white">
          <Phone className="w-6 h-6" strokeWidth={2} />
        </span>
        {/* Tooltip (shudhu desktop e, mouse hover korle) */}
        <span className="pointer-events-none hidden md:block absolute left-full top-1/2 -translate-y-1/2 ml-3 whitespace-nowrap rounded-lg bg-[#18181B] border border-zinc-700 px-3 py-1.5 text-xs font-medium text-white opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
          Direct Call
        </span>
      </a>

      {/* WHATSAPP: sob screen e right side */}
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Message us on WhatsApp"
        className="group fixed z-50 right-4 bottom-5 md:right-6 md:bottom-6 transition-transform duration-300 hover:scale-110 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 rounded-full"
        style={{ marginBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        <span className="fc-bob flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white">
          <WhatsAppIcon className="w-7 h-7" />
        </span>
        <span className="pointer-events-none hidden md:block absolute right-full top-1/2 -translate-y-1/2 mr-3 whitespace-nowrap rounded-lg bg-[#18181B] border border-zinc-700 px-3 py-1.5 text-xs font-medium text-white opacity-0 translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
          WhatsApp
        </span>
      </a>
    </>
  );
}