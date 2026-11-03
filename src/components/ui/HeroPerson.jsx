import { useEffect, useState } from "react";
import heroimg from "../../../public/images/hero-human.png";

const RING_PATH = "M 20 80 a 300 64 0 1 0 600 0 a 300 64 0 1 0 -600 0";

// Ring ta human er gola/neck er kache boshano. Image onujayi shudhu ei ta change koro (jemon top-[50%], top-[60%])
const RING_TOP = "top-[56%]";

function Ring({ reduce, front = false }) {
  return (
    <svg
      viewBox="0 0 640 160"
      className={`absolute left-[-30%] ${RING_TOP} h-[28%] w-[160%] overflow-visible`}
      style={front ? { clipPath: "inset(50% 0 0 0)", zIndex: 20 } : { zIndex: 0 }}
    >
      <g transform="rotate(-12 320 80)" fill="none">
        <ellipse cx="320" cy="80" rx="300" ry="64" stroke="#F97316" strokeOpacity=".55" strokeWidth="1.4" />
        <ellipse
          cx="320"
          cy="80"
          rx="246"
          ry="52"
          stroke="#FDBA74"
          strokeOpacity=".7"
          strokeWidth="1"
          strokeDasharray="2 8"
        />

        {!reduce && (
          <circle r="4.5" fill="#F97316" className="hp-spark">
            <animateMotion dur="9s" repeatCount="indefinite" path={RING_PATH} />
          </circle>
        )}
      </g>
    </svg>
  );
}

export default function HeroPerson() {
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
      /*
        MOBILE / TABLET (< lg): hero er bottom e ekta stage, orbit er sathe same height
          - height: 420 / 500 / 540px (Hero.jsx e orbit er height er sathe mil)
          - left-[40%]: human left-center e, orbit circle right e
          - -bottom-3: float korle bottom e gap dekha jabe na
        lg (1024-1279): hide (headline er upor jeno na pore)
        xl (1280+): tomar ager desktop value ekdom same
      */
      className="pointer-events-none absolute -bottom-3 left-[40%] h-[420px] w-[300px] -translate-x-1/2 sm:h-[500px] sm:w-[360px] md:h-[540px] md:w-[400px] lg:hidden xl:bottom-0 xl:left-[56%] xl:block xl:h-[170%] xl:w-[clamp(400px,38vw,700px)]"
      style={{ zIndex: -5 }}
    >
      <style>{`
        .hp-in { animation: hp-in 1.2s cubic-bezier(.22,1,.36,1) both; }
        .hp-float { animation: hp-float 7s ease-in-out infinite; will-change: transform; }
        .hp-glow { animation: hp-glow 6s ease-in-out infinite alternate; }
        .hp-spark { filter: drop-shadow(0 0 6px rgba(249,115,22,.85)); }

        .hp-human {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: bottom center;
          filter: drop-shadow(0 24px 40px rgba(249,115,22,.18));
        }

        @keyframes hp-in {
          from { opacity: 0; transform: translate3d(0, 28px, 0); }
          to   { opacity: 1; transform: none; }
        }
        @keyframes hp-float {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg); }
          50%      { transform: translate3d(0, -12px, 0) rotate(.6deg); }
        }
        @keyframes hp-glow {
          from { transform: scale(.94); opacity: .7; }
          to   { transform: scale(1.06); opacity: 1; }
        }

        @media (prefers-reduced-motion: reduce) {
          .hp-in, .hp-float, .hp-glow { animation: none; }
        }
      `}</style>

      <div className="hp-in relative h-full w-full">
        <div className="hp-float relative h-full w-full">
          {/* Orange atmospheric glow */}
          <div
            className="hp-glow absolute bottom-[-8%] left-[-25%] right-[-25%] h-[75%]"
            style={{
              background:
                "radial-gradient(closest-side, rgba(249,115,22,.28), rgba(249,115,22,.08) 60%, transparent 100%)",
            }}
          />

          {/* Back ring */}
          <Ring reduce={reduce} />

          {/* Human PNG */}
          <img
            src={heroimg}
            alt=""
            decoding="async"
            className="hp-human relative z-10 scale-[1.03]"
            draggable="false"
          />

          {/* Front ring */}
          <Ring front reduce={reduce} />
        </div>
      </div>
    </div>
  );
}