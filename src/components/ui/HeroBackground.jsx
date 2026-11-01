import { useEffect, useState } from "react";

const WORDS = "CREATIVE • TECHNOLOGY • MARKETING • ";
const PERIOD = 500; // ek ta WORDS er length (svg unit)
const RIBBON_TEXT = WORDS.repeat(6);
const TEXT_LEN = PERIOD * 6;

const RIBBON_D = "M -140 660 C 260 800, 760 720, 1010 500 S 1380 130, 1580 210";
const BACK_D = "M -120 230 C 280 90, 760 270, 1080 430 S 1500 700, 1620 600";

const PARTICLES = [
  { l: 52, t: 18, s: 4, d: 0, u: 9 },
  { l: 58, t: 46, s: 3, d: 2.8, u: 14 },
  { l: 63, t: 72, s: 3, d: 1.5, u: 11 },
  { l: 71, t: 30, s: 5, d: 0.8, u: 13 },
  { l: 76, t: 86, s: 4, d: 1.1, u: 12 },
  { l: 80, t: 64, s: 3, d: 2.2, u: 10 },
  { l: 88, t: 22, s: 4, d: 3, u: 12 },
  { l: 94, t: 48, s: 3, d: 0.4, u: 9 },
];

export default function HeroBackground() {
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    const onChange = (e) => setReduce(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <style>{`
        .hb-wash {
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 60% 75% at 86% 38%, rgba(255,237,213,.95), transparent 70%),
            radial-gradient(ellipse 50% 60% at 8% 105%, rgba(255,247,237,.95), transparent 70%),
            linear-gradient(180deg, #ffffff 0%, #fffbf7 100%);
        }
        .hb-blob { position: absolute; will-change: transform; }
        .hb-a {
          right: -6%; top: -15%; width: 58%; height: 125%;
          background: radial-gradient(closest-side, rgba(249,115,22,.22), rgba(249,115,22,.07) 55%, transparent 100%);
          animation: hb-drift-a 16s ease-in-out infinite alternate;
        }
        .hb-b {
          right: 22%; bottom: -40%; width: 44%; height: 90%;
          background: radial-gradient(closest-side, rgba(253,186,116,.32), rgba(253,186,116,.10) 55%, transparent 100%);
          animation: hb-drift-b 20s ease-in-out infinite alternate;
        }
        .hb-gridwrap {
          position: absolute; inset: 0;
          -webkit-mask-image: radial-gradient(ellipse 85% 90% at 40% 50%, #000 0%, transparent 75%);
          mask-image: radial-gradient(ellipse 85% 90% at 40% 50%, #000 0%, transparent 75%);
        }
        .hb-grid {
          position: absolute; inset: 0; opacity: .5;
          background-image: radial-gradient(circle, rgba(24,24,27,.15) 1px, transparent 1.3px);
          background-size: 26px 26px;
        }
        .hb-readfade {
          position: absolute; inset: 0;
          background: linear-gradient(90deg, rgba(255,255,255,.8) 0%, rgba(255,255,255,.35) 40%, transparent 65%);
        }
        .hb-ribbon { animation: hb-ribbon-float 14s ease-in-out infinite alternate; will-change: transform; }
        .hb-dot {
          position: absolute; border-radius: 9999px; background: #F97316;
          box-shadow: 0 0 12px rgba(249,115,22,.6);
          animation: hb-float 10s ease-in-out infinite alternate;
        }
        @keyframes hb-drift-a { from { transform: translate3d(0,0,0) scale(1); } to { transform: translate3d(-4%,6%,0) scale(1.08); } }
        @keyframes hb-drift-b { from { transform: translate3d(0,0,0) scale(1); } to { transform: translate3d(5%,-6%,0) scale(1.1); } }
        @keyframes hb-ribbon-float { from { transform: translate3d(0,-8px,0) rotate(-.3deg); } to { transform: translate3d(0,10px,0) rotate(.3deg); } }
        @keyframes hb-float {
          from { transform: translate3d(0,0,0); opacity: .25; }
          to   { transform: translate3d(0,-20px,0); opacity: .9; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hb-blob, .hb-ribbon, .hb-dot { animation: none; }
        }
      `}</style>

      {/* warm white wash + orange aurora */}
      <div className="hb-wash" />
      <div className="hb-blob hb-a" />
      <div className="hb-blob hb-b" />

      {/* dot grid */}
      <div className="hb-gridwrap">
        <div className="hb-grid" />
      </div>

      {/* orange ribbon with moving text */}
      <svg
        className="hb-ribbon absolute inset-0 h-full w-full opacity-60 sm:opacity-100"
        viewBox="0 0 1440 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="hb-orange" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1440" y2="0">
            <stop offset="0" stopColor="#FDBA74" />
            <stop offset="0.55" stopColor="#F97316" />
            <stop offset="1" stopColor="#FB923C" />
          </linearGradient>

          <linearGradient id="hb-sheen" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="520" y2="0">
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset="0.5" stopColor="#fff" stopOpacity="0.6" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
            {!reduce && (
              <animateTransform
                attributeName="gradientTransform"
                type="translate"
                from="-520 0"
                to="1500 0"
                dur="9s"
                repeatCount="indefinite"
              />
            )}
          </linearGradient>

          {/* left e ribbon fade hoye jabe, jate headline clean thake */}
          <linearGradient id="hb-fade" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1440" y2="0">
            <stop offset="0.15" stopColor="#fff" stopOpacity="0" />
            <stop offset="0.5" stopColor="#fff" stopOpacity="0.55" />
            <stop offset="0.8" stopColor="#fff" stopOpacity="1" />
          </linearGradient>
          <mask id="hb-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="1440" height="800">
            <rect width="1440" height="800" fill="url(#hb-fade)" />
          </mask>

          <filter id="hb-blur" x="-10%" y="-30%" width="120%" height="160%">
            <feGaussianBlur stdDeviation="14" />
          </filter>

          <path id="hb-ribbon-path" d={RIBBON_D} />
        </defs>

        <g mask="url(#hb-mask)">
          {/* pichoner halka ribbon (depth) */}
          <path d={BACK_D} fill="none" stroke="#FDBA74" strokeOpacity="0.35" strokeWidth="38" strokeLinecap="round" />
          <path
            d={BACK_D}
            fill="none"
            stroke="#F97316"
            strokeOpacity="0.4"
            strokeWidth="1.5"
            strokeDasharray="2 10"
            transform="translate(0 -28)"
          />

          {/* glow */}
          <path
            d={RIBBON_D}
            fill="none"
            stroke="#F97316"
            strokeOpacity="0.3"
            strokeWidth="54"
            strokeLinecap="round"
            filter="url(#hb-blur)"
            transform="translate(0 30)"
          />

          {/* main ribbon */}
          <path d={RIBBON_D} fill="none" stroke="url(#hb-orange)" strokeWidth="54" strokeLinecap="round" />

          {/* upor er edge highlight */}
          <path
            d={RIBBON_D}
            fill="none"
            stroke="#fff"
            strokeOpacity="0.22"
            strokeWidth="7"
            strokeLinecap="round"
            transform="translate(0 -17)"
          />

          {/* sheen: ribbon er upor diye alo bhese jay */}
          <path d={RIBBON_D} fill="none" stroke="url(#hb-sheen)" strokeWidth="54" strokeLinecap="round" />

          {/* ribbon er text */}
          <text
            fill="#fff"
            fillOpacity="0.92"
            fontSize="15"
            fontWeight="600"
            dy="5"
            style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}
          >
            <textPath
              href="#hb-ribbon-path"
              startOffset="0"
              textLength={TEXT_LEN}
              lengthAdjust="spacing"
            >
              {RIBBON_TEXT}
              {!reduce && (
                <animate
                  attributeName="startOffset"
                  from="0"
                  to={-PERIOD}
                  dur="14s"
                  repeatCount="indefinite"
                />
              )}
            </textPath>
          </text>
        </g>
      </svg>

      {/* left e text er readability er jonno halka white fade */}
      <div className="hb-readfade" />

      {/* floating orange dots */}
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className="hb-dot"
          style={{
            left: `${p.l}%`,
            top: `${p.t}%`,
            width: p.s,
            height: p.s,
            animationDuration: `${p.u}s`,
            animationDelay: `${p.d}s`,
          }}
        />
      ))}
    </div>
  );
}