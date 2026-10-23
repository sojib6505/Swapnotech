import React, { useEffect, useRef } from 'react';

/* ------------------------------------------------------------------ */
/*  Tweak korar jonno                                                  */
/* ------------------------------------------------------------------ */
const SIZE = 120; // glow er size (px). Aro halka chaile 90 din
const EASE = 0.14; // follow speed (0.05 = dhire, 0.3 = druto)
const OPACITY = 0.16; // glow er brightness. Aro halka chaile 0.1 din

const INTERACTIVE = 'a, button, [role="button"], summary, label[for], select, [data-cursor="hover"]';

export default function CustomCursor() {
  const rootRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    // Touch device e kichu hobe na
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined;

    const ease = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 1 : EASE;
    const root = rootRef.current;
    const target = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };
    let raf = 0;

    const loop = () => {
      pos.x += (target.x - pos.x) * ease;
      pos.y += (target.y - pos.y) * ease;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onMove = (e) => {
      if (e.pointerType === 'touch') return;
      if (root.dataset.visible !== 'true') {
        pos.x = e.clientX;
        pos.y = e.clientY;
        root.dataset.visible = 'true';
      }
      target.x = e.clientX;
      target.y = e.clientY;
    };

    const onOver = (e) => {
      const el = e.target instanceof Element ? e.target : null;
      root.dataset.hover = el && el.closest(INTERACTIVE) ? 'true' : 'false';
    };

    const onLeave = () => {
      root.dataset.visible = 'false';
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('mouseover', onOver);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <>
      <style>{`
        .cc-root {
          position: fixed; inset: 0; z-index: 40;
          pointer-events: none; opacity: 0;
          transition: opacity .4s ease;
        }
        .cc-root[data-visible="true"] { opacity: 1; }
        .cc-layer { position: fixed; top: 0; left: 0; will-change: transform; }
        .cc-glow {
          width: ${SIZE}px; height: ${SIZE}px;
          margin: -${SIZE / 2}px 0 0 -${SIZE / 2}px;
          border-radius: 9999px;
          background: radial-gradient(circle, rgba(234,88,12,${OPACITY}) 0%, rgba(234,88,12,${OPACITY / 3}) 45%, transparent 70%);
          transition: transform .4s cubic-bezier(.2,.8,.3,1), opacity .4s ease;
        }
        /* Link/button er upor gele ektu boro ar ektu ujjal */
        .cc-root[data-hover="true"] .cc-glow { transform: scale(1.5); }
      `}</style>

      <div ref={rootRef} className="cc-root" data-visible="false" data-hover="false" aria-hidden="true">
        <div ref={glowRef} className="cc-layer">
          <div className="cc-glow" />
        </div>
      </div>
    </>
  );
}