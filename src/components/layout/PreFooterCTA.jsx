import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function PreFooterCTA() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('cta-visible');
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="cta-section relative overflow-hidden bg-[#09090B] text-white py-20 sm:py-28 border-t border-zinc-900"
    >
      <style>{`
        /* ── Floating orbs ── */
        .cta-orb-1 {
          position: absolute;
          width: 600px;
          height: 600px;
          left: -180px;
          top: 50%;
          transform: translateY(-50%);
          background: radial-gradient(closest-side, rgba(249,115,22,.20), rgba(249,115,22,.06) 55%, transparent 100%);
          pointer-events: none;
          animation: ctaFloat1 8s ease-in-out infinite alternate;
        }
        .cta-orb-2 {
          position: absolute;
          width: 420px;
          height: 420px;
          right: -80px;
          bottom: -60px;
          background: radial-gradient(closest-side, rgba(253,186,116,.14), transparent 80%);
          pointer-events: none;
          animation: ctaFloat2 10s ease-in-out infinite alternate;
        }
        .cta-orb-3 {
          position: absolute;
          width: 200px;
          height: 200px;
          right: 25%;
          top: -40px;
          background: radial-gradient(closest-side, rgba(249,115,22,.10), transparent 80%);
          pointer-events: none;
        }

        @keyframes ctaFloat1 {
          from { transform: translateY(-55%) scale(1); }
          to   { transform: translateY(-45%) scale(1.06); }
        }
        @keyframes ctaFloat2 {
          from { transform: scale(1) rotate(0deg); }
          to   { transform: scale(1.08) rotate(6deg); }
        }

        /* ── Dot grid ── */
        .cta-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(249,115,22,.08) 1px, transparent 1.3px);
          background-size: 26px 26px;
          pointer-events: none;
        }

        /* ── Top sheen line ── */
        .cta-sheen-line {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(249,115,22,.0) 10%,
            rgba(249,115,22,.6) 30%,
            rgba(253,186,116,.9) 50%,
            rgba(249,115,22,.6) 70%,
            rgba(249,115,22,.0) 90%,
            transparent 100%
          );
          animation: sheenSlide 4s ease-in-out infinite;
        }
        @keyframes sheenSlide {
          0%   { opacity: .4; background-position: -100% 0; }
          50%  { opacity: 1; }
          100% { opacity: .4; background-position: 200% 0; }
        }

        /* ── Decorative horizontal rule ── */
        .cta-divider {
          width: 48px;
          height: 2px;
          background: linear-gradient(90deg, #F97316, #FDBA74);
          border-radius: 99px;
          margin-bottom: 1.25rem;
        }

        /* ── Heading accent ── */
        .cta-period {
          background: linear-gradient(135deg, #F97316, #FDBA74);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* ── Glowing button ── */
        .cta-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.875rem 1.75rem;
          background: linear-gradient(135deg, #F97316 0%, #EA580C 100%);
          color: #fff;
          font-weight: 600;
          font-size: 1rem;
          border-radius: 0.5rem;
          border: 1px solid rgba(249,115,22,.4);
          box-shadow: 0 0 0 0 rgba(249,115,22,.5), 0 4px 20px rgba(249,115,22,.3);
          transition: box-shadow .3s ease, transform .2s ease, background .3s ease;
          text-decoration: none;
          position: relative;
          overflow: hidden;
        }
        .cta-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,.12) 0%, transparent 60%);
          pointer-events: none;
        }
        .cta-btn:hover {
          background: linear-gradient(135deg, #FB923C 0%, #F97316 100%);
          box-shadow: 0 0 0 3px rgba(249,115,22,.25), 0 8px 32px rgba(249,115,22,.45);
          transform: translateY(-2px);
        }
        .cta-btn:active { transform: scale(.98); }

        /* ── Scroll-reveal ── */
        .cta-content {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity .65s cubic-bezier(.22,.9,.3,1), transform .65s cubic-bezier(.22,.9,.3,1);
        }
        .cta-visible .cta-content { opacity: 1; transform: translateY(0); }

        @media (prefers-reduced-motion: reduce) {
          .cta-orb-1, .cta-orb-2 { animation: none; }
          .cta-sheen-line { animation: none; }
          .cta-content { opacity: 1 !important; transform: none !important; transition: none !important; }
        }
      `}</style>

      {/* Decorative elements */}
      <div className="cta-sheen-line" aria-hidden="true" />
      <div className="cta-orb-1" aria-hidden="true" />
      <div className="cta-orb-2" aria-hidden="true" />
      <div className="cta-orb-3" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="cta-content flex flex-col md:flex-row md:items-center md:justify-between gap-10">
          <div>
            <div className="cta-divider" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Let's talk about what's next<span className="cta-period">.</span>
            </h2>
            <p className="mt-3 text-lg text-zinc-400">
              Tell us what you're working on.
            </p>
          </div>
          <div className="shrink-0">
            <Link to="/contact" className="cta-btn">
              <span>Start an Inquiry</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
