import { useEffect, useRef } from "react";
import gsap from "gsap";
import { servicesData } from "../../data/servicesData"; // path tomar folder onujayi milao

const ORANGE = "#F97316";
const STEP = 3.8; // ek service theke porer service
const MOVE = 1.4; // orbit e move korar time
const ARC = 33.3; // pathLength=100 er 120deg
const DOT_ANGLES = [155, 170, 185, 335, 350, 5, 20];

const getTitle = (s) => s.title ?? s.name ?? "";

export default function HeroOrbitVisual({ className = "" }) {
  const boxRef = useRef(null);
  const circleRefs = useRef([]);
  const overlayRef = useRef(null);
  const arcRef = useRef(null);
  const dotsRef = useRef(null);
  const items = servicesData;
  const n = items.length;

  useEffect(() => {
    const box = boxRef.current;
    if (!box || n < 3) return;

    const circles = circleRefs.current.filter(Boolean);
    const state = { p: 0 };
    const mix = gsap.utils.interpolate("#18181B", "#A1A1AA");
    let geo = null;
    let orbit = null;
    let arcTl = null;

    const render = () => {
      if (!geo) return;
      const { D, cx, cy, R, delta } = geo;
      circles.forEach((el, i) => {
        let k = (((i - state.p) % n) + n) % n;
        if (k > n / 2) k -= n;
        const d = Math.abs(k);
        const a = Math.PI - k * delta; // orbit angle
        const x = cx + R * Math.cos(a);
        const y = cy + R * Math.sin(a);
        const opacity =
          d <= 1 ? 1 - 0.62 * d : Math.max(0, 0.38 * (1 - (d - 1) / 0.6));
        const scale = d <= 1 ? 1 - 0.14 * d : 0.86;
        el.style.transform = `translate(${x - D / 2}px, ${y - D / 2}px) scale(${scale})`;
        el.style.opacity = opacity;
        el.style.color = mix(Math.min(d, 1));
      });
    };

    const layout = () => {
      const { width: W, height: H } = box.getBoundingClientRect();
      if (!W || !H) return;

      const D = Math.min(H * 0.28, W * 0.36);
      const S = D * 1.22; // circle gulor moddhe gap
      const xm = W * 0.5; // middle circle er x
      const cx = W * 1.15; // orbit center: right edge er baire
      const R = cx - xm;
      const delta = 2 * Math.asin(Math.min(0.99, S / (2 * R)));
      geo = { D, cx, cy: H / 2, R, delta };

      circles.forEach((el) => {
        el.style.width = el.style.height = `${D}px`;
        el.style.fontSize = `${D * 0.125}px`;
      });
      const O = D * 1.3;
      const ov = overlayRef.current;
      ov.style.width = ov.style.height = `${O}px`;
      ov.style.transform = `translate(${xm - O / 2}px, ${H / 2 - O / 2}px)`;
      render();
    };

    const ro = new ResizeObserver(layout);
    ro.observe(box);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dots = gsap.utils.toArray(dotsRef.current.children);

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(arcRef.current, { strokeDasharray: `${ARC} 100`, opacity: 1 });
        gsap.set(dots, { opacity: 1 });
        return;
      }

      // 3 circle same orbit e ghure
      orbit = gsap.timeline({ repeat: -1 });
      for (let i = 0; i < n; i++) {
        orbit.to(
          state,
          { p: i + 1, duration: MOVE, ease: "power2.inOut", onUpdate: render },
          i * STEP + (STEP - MOVE)
        );
      }

      // arc + dots alada timeline
      arcTl = gsap.timeline({ repeat: -1 });
      arcTl
        .fromTo(
          arcRef.current,
          { strokeDasharray: "0.01 100", opacity: 0 },
          { strokeDasharray: `${ARC} 100`, opacity: 1, duration: 1.4, ease: "power2.out" },
          0
        )
        .fromTo(dots, { opacity: 0 }, { opacity: 1, duration: 0.4, stagger: 0.12 }, 0.5)
        .to(dots, { opacity: 0, duration: 0.4, stagger: 0.05 }, 2.3)
        .to(arcRef.current, { opacity: 0, duration: 0.7 }, 2.5)
        .to({}, { duration: 0 }, STEP);
    }, box);

    const io = new IntersectionObserver(([e]) => {
      orbit?.paused(!e.isIntersecting);
      arcTl?.paused(!e.isIntersecting);
    });
    io.observe(box);

    layout();

    return () => {
      io.disconnect();
      ro.disconnect();
      ctx.revert();
    };
  }, [n]);

  return (
    <div ref={boxRef} className={`relative w-full overflow-hidden bg-white ${className}`}>
      {/* screen reader er jonno */}
      <ul className="sr-only">
        {items.map((s, i) => (
          <li key={s.id ?? i}>{getTitle(s)}</li>
        ))}
      </ul>

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 select-none">
        {items.map((s, i) => (
          <div
            key={s.id ?? i}
            ref={(el) => (circleRefs.current[i] = el)}
            className="absolute left-0 top-0 flex items-center justify-center rounded-full border border-[#EDEDED] bg-white text-center font-serif italic will-change-transform"
            style={{ boxShadow: "0 6px 24px rgba(24,24,27,0.05)", opacity: 0 }}
          >
            <span className="px-[12%] leading-[1.15] [text-wrap:balance]">
              {getTitle(s)}
            </span>
          </div>
        ))}

        {/* active (middle) circle er arc + dots */}
        <svg
          ref={overlayRef}
          viewBox="0 0 200 200"
          className="absolute left-0 top-0 overflow-visible"
        >
          <circle cx="100" cy="100" r="96" fill="none" stroke="#F1F1F1" strokeWidth="1" />
          <circle
            ref={arcRef}
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke={ORANGE}
            strokeWidth="3"
            strokeLinecap="round"
            pathLength="100"
            strokeDasharray="0.01 100"
            transform="rotate(200 100 100)"
            style={{ opacity: 0 }}
          />
          <g ref={dotsRef} fill={ORANGE}>
            {DOT_ANGLES.map((deg) => {
              const r = (deg * Math.PI) / 180;
              return (
                <circle
                  key={deg}
                  cx={100 + 90 * Math.cos(r)}
                  cy={100 + 90 * Math.sin(r)}
                  r="2.6"
                  style={{ opacity: 0 }}
                />
              );
            })}
          </g>
        </svg>
      </div>
    </div>
  );
}