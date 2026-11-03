
import { useEffect, useRef } from "react";
import { clients, clientsSection } from "../../data/clients";

// Title er upor chhoto eyebrow lekha dekhate chaile true koro
const SHOW_EYEBROW = false;

// Prottek logo er jonno koto second (boro = dhire, choto = druto)
const SECONDS_PER_LOGO = 4;

function ClientItem({ client }) {
  const content = client.logo ? (
    <img
      src={client.logo}
      alt={client.name}
      decoding="async"
      draggable="false"
      className="client-logo max-h-12 w-auto max-w-full object-contain sm:max-h-14"
    />
  ) : (
    <span className="client-logo-text whitespace-nowrap text-lg font-semibold tracking-tight sm:text-xl">
      {client.name}
    </span>
  );

  // Logo boro korar jonno item er height ebong width adjust kora hoyeche
  const cls =
    "group flex h-16 w-40 shrink-0 items-center justify-center px-4 outline-none sm:h-[76px] sm:w-44";

  return client.url ? (
    <a
      href={client.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={client.name}
      className={cls}
    >
      {content}
    </a>
  ) : (
    <div className={cls} aria-label={client.name}>
      {content}
    </div>
  );
}

export default function ClientLogos() {
  const wrapRef = useRef(null);
  const trackRef = useRef(null);

  const hasClients = clients.length > 0;

  // Client kom hole screen bhore rakhar jonno duplicate kore nei
  const base = clients.length < 8 ? [...clients, ...clients] : clients;
  const track = [...base, ...base];
  const baseCount = base.length;

  // Smooth marquee + hover e gradually pause/resume
  useEffect(() => {
    const el = trackRef.current;
    const wrap = wrapRef.current;

    if (!el || !wrap || typeof el.animate !== "function") return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const anim = el.animate(
      [
        { transform: "translate3d(-50%, 0, 0)" },
        { transform: "translate3d(0, 0, 0)" },
      ],
      {
        duration: baseCount * SECONDS_PER_LOGO * 1000,
        iterations: Infinity,
        easing: "linear",
      }
    );

    let rate = 1;
    let target = 1;
    let raf = 0;

    const step = () => {
      rate += (target - rate) * 0.09;

      if (Math.abs(target - rate) < 0.01) {
        rate = target;
      }

      anim.playbackRate = rate;
      raf = rate === target ? 0 : requestAnimationFrame(step);
    };

    const go = (t) => {
      target = t;
      if (!raf) raf = requestAnimationFrame(step);
    };

    const enter = () => go(0);
    const leave = () => go(1);

    wrap.addEventListener("mouseenter", enter);
    wrap.addEventListener("mouseleave", leave);

    return () => {
      wrap.removeEventListener("mouseenter", enter);
      wrap.removeEventListener("mouseleave", leave);
      cancelAnimationFrame(raf);
      anim.cancel();
    };
  }, [baseCount]);

  if (!hasClients) return null;

  return (
    <section
      aria-labelledby="clients-heading"
      className="relative overflow-hidden py-4 sm:py-5"
      style={{ background: '#fffbf7' }}
    >
      <style>{`
        /* Default logo: dark grayscale */
        .client-logo {
          filter: grayscale(1) brightness(.35) contrast(1.1);
          opacity: .75;
          transition:
            filter .5s ease,
            opacity .5s ease,
            transform .5s cubic-bezier(.22,.9,.3,1);
        }

        /* Hover/focus: original logo color */
        .group:hover .client-logo,
        .group:focus-visible .client-logo {
          filter: none;
          opacity: 1;
          transform: scale(1.06);
        }

        /* Text logo */
        .client-logo-text {
          color: #3f3f46;
          transition: color .4s ease;
        }

        .group:hover .client-logo-text,
        .group:focus-visible .client-logo-text {
          color: #ea580c;
        }

        .clients-track {
          will-change: transform;
          backface-visibility: hidden;
        }

        /* ── Marquee border with warm tone ── */
        .clients-marquee-inner {
          border-top: 1px solid rgba(249,115,22,.12);
          border-bottom: 1px solid rgba(249,115,22,.12);
          background: rgba(255,255,255,.85);
        }

        /* ── Premium left/right warm fade ── */
        .clients-fade-left {
          background: linear-gradient(to right, #fffbf7 0%, rgba(255,251,247,.85) 45%, transparent 100%);
        }
        .clients-fade-right {
          background: linear-gradient(to left, #fffbf7 0%, rgba(255,251,247,.85) 45%, transparent 100%);
        }

        /* ── Heading premium style ── */
        .clients-heading {
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: .08em;
          text-transform: uppercase;
          color: #3f3f46;
          background: linear-gradient(135deg, #18181b 0%, #52525b 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        @media (prefers-reduced-motion: reduce) {
          .client-logo,
          .client-logo-text {
            transition: none;
          }
        }
      `}</style>

      <div className="mx-auto max-w-xl px-6 text-center">
        {SHOW_EYEBROW && (
          <p className="mb-1 text-xs font-medium text-orange-600">
            {clientsSection.eyebrow}
          </p>
        )}

        <h2
          id="clients-heading"
          className="clients-heading mb-0 sm:text-base"
        >
          {clientsSection.heading}
        </h2>
      </div>

      <div
        ref={wrapRef}
        className="clients-marquee relative mt-3 overflow-hidden clients-marquee-inner sm:mt-4"
      >
        <ul
          ref={trackRef}
          className="clients-track flex w-max items-center py-1"
        >
          {track.map((client, i) => (
            <li key={`${client.id}-${i}`} aria-hidden={i >= baseCount}>
              <ClientItem client={client} />
            </li>
          ))}
        </ul>

        {/* Warm-tinted soft fade on left */}
        <div
          aria-hidden="true"
          className="clients-fade-left pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-28"
        />

        {/* Warm-tinted soft fade on right */}
        <div
          aria-hidden="true"
          className="clients-fade-right pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-28"
        />
      </div>
    </section>
  );
}
