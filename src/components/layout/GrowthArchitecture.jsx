
import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from 'framer-motion';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STAGES = [
  {
    step: '01',
    title: 'BRAND',
    tagline: 'Positioning & Identity',
    detail:
      'A distinctive, authoritative brand story and visual identity that earns trust before speaking to a customer.',
  },
  {
    step: '02',
    title: 'CONTENT',
    tagline: 'Craft & Message',
    detail:
      'High-craft creative assets, videos, and copywriting designed to communicate clear value to your target market.',
  },
  {
    step: '03',
    title: 'ATTENTION',
    tagline: 'Distribution & Ads',
    detail:
      'Multi-channel acquisition across Meta and Google that captures active market attention predictably.',
  },
  {
    step: '04',
    title: 'CUSTOMER',
    tagline: 'Target Audience',
    detail:
      'Qualifying the right people and filtering high-intent buyers through conversion-focused landing pages.',
  },
  {
    step: '05',
    title: 'SALES',
    tagline: 'Conversion Funnel',
    detail:
      'Removing friction from the buying decision through seamless digital checkout and inquiry response.',
  },
  {
    step: '06',
    title: 'SYSTEM',
    tagline: 'Automated Operations',
    detail:
      'Connecting WhatsApp automation, CRM routing, and retargeting so revenue repeats without extra overhead.',
  },
  {
    step: '07',
    title: 'GROWTH',
    tagline: 'Predictable Scale',
    detail:
      'Compounding results where every dollar spent and asset produced fuels long-term business equity.',
  },
];

const ITEMS_PER_PAGE = 3;

export default function GrowthArchitecture() {
  const [activeStage, setActiveStage] = useState(0);
  const [mobileStartIndex, setMobileStartIndex] = useState(0);

  const sectionRef = useRef(null);

  const reduced = useReducedMotion();

  const totalPages = Math.ceil(
    STAGES.length / ITEMS_PER_PAGE
  );

  const currentPage = Math.floor(
    mobileStartIndex / ITEMS_PER_PAGE
  );

  const mobileStages = STAGES.slice(
    mobileStartIndex,
    mobileStartIndex + ITEMS_PER_PAGE
  );

  // Mobile navigation
  const goToNextPage = () => {
    setMobileStartIndex((prev) =>
      Math.min(
        prev + ITEMS_PER_PAGE,
        (totalPages - 1) * ITEMS_PER_PAGE
      )
    );
  };

  const goToPreviousPage = () => {
    setMobileStartIndex((prev) =>
      Math.max(prev - ITEMS_PER_PAGE, 0)
    );
  };

  const goToPage = (pageIndex) => {
    setMobileStartIndex(pageIndex * ITEMS_PER_PAGE);
  };

  // GSAP Scroll Animation
  useEffect(() => {
    if (reduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        {
          y: 24,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  const headerVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.6,
        ease: 'easeOut',
      },
    }),
  };

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden pt-14 pb-16 sm:pt-20 sm:pb-24 border-b border-black/[0.06] bg-[#FFFCF9] text-[#18181B] transition-colors"
    >
      {/* Subtle futuristic background */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -top-40 -right-32 h-[420px] w-[420px] rounded-full bg-orange-200/20 blur-[120px]" />

        <div className="absolute bottom-0 -left-40 h-[350px] w-[350px] rounded-full bg-orange-100/30 blur-[110px]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'radial-gradient(#F97316 0.7px, transparent 0.7px)',
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-14 gap-6">

          {reduced ? (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono text-xs uppercase tracking-widest text-[#F97316]">
                  01 / Framework
                </span>

                <span className="text-neutral-400">/</span>

                <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">
                  Signature Interaction
                </span>
              </div>

              <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-black uppercase">
                Growth Architecture.
              </h2>

              <p className="text-sm sm:text-base text-neutral-600 max-w-md">
                Growth is not a single tactic. It is a connected sequence. If one link fails, revenue leaks.
              </p>
            </div>
          ) : (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="space-y-3"
            >
              <motion.div
                variants={headerVariants}
                custom={0}
                className="flex items-center gap-2 mb-3"
              >
                <span className="font-mono text-xs uppercase tracking-widest text-[#F97316]">
                  01 / Framework
                </span>

                <span className="text-neutral-400">/</span>

                <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">
                  Signature Interaction
                </span>
              </motion.div>

              <motion.h2
                variants={headerVariants}
                custom={1}
                className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-black uppercase"
              >
                Growth Architecture.
              </motion.h2>

              <motion.p
                variants={headerVariants}
                custom={2}
                className="text-sm sm:text-base text-neutral-600 max-w-md"
              >
                Growth is not a single tactic. It is a connected sequence. If one link fails, revenue leaks.
              </motion.p>
            </motion.div>
          )}
        </div>

        {/* MOBILE: 3 Options + Navigation */}
        <div className="lg:hidden mb-8 sm:mb-10">

          {/* Navigation */}
          <div className="flex items-center justify-between mb-3">

            <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
              Select a Stage
            </span>

            <div className="flex items-center gap-2">

              <span className="font-mono text-[10px] text-neutral-400">
                {String(currentPage + 1).padStart(2, '0')}
                {' / '}
                {String(totalPages).padStart(2, '0')}
              </span>

              <button
                type="button"
                onClick={goToPreviousPage}
                disabled={mobileStartIndex === 0}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-black/10 bg-white text-[#18181B] disabled:opacity-30 transition-all"
                aria-label="Previous options"
              >
                <ArrowLeft size={16} />
              </button>

              <button
                type="button"
                onClick={goToNextPage}
                disabled={
                  mobileStartIndex >=
                  (totalPages - 1) * ITEMS_PER_PAGE
                }
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#18181B] text-white hover:bg-[#F97316] disabled:opacity-30 transition-all"
                aria-label="Next options"
              >
                <ArrowRight size={16} />
              </button>

            </div>
          </div>

          {/* Mobile Options */}
          <div className="grid grid-cols-3 gap-2">

            {mobileStages.map((stage) => {
              const idx = STAGES.findIndex(
                (item) => item.step === stage.step
              );

              const isSelected = activeStage === idx;

              return (
                <button
                  key={stage.step}
                  type="button"
                  onClick={() => setActiveStage(idx)}
                  aria-pressed={isSelected}
                  className={`relative min-w-0 min-h-[76px] rounded-lg border p-2.5 text-left transition-all duration-300 ${
                    isSelected
                      ? 'bg-[#18181B] text-white border-[#18181B]'
                      : 'bg-white text-[#18181B] border-black/[0.08] hover:border-[#F97316]/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">

                    <span
                      className={`font-mono text-[10px] ${
                        isSelected
                          ? 'text-[#F97316]'
                          : 'text-neutral-400'
                      }`}
                    >
                      {stage.step}
                    </span>

                    {isSelected && (
                      <CheckCircle2
                        size={13}
                        className="text-[#F97316]"
                      />
                    )}

                  </div>

                  <div className="font-bold text-[11px] leading-tight tracking-wide">
                    {stage.title}
                  </div>

                  <div
                    className={`mt-1 text-[9px] leading-tight ${
                      isSelected
                        ? 'text-neutral-300'
                        : 'text-neutral-500'
                    }`}
                  >
                    {stage.tagline}
                  </div>

                  {isSelected && (
                    <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#F97316]" />
                  )}
                </button>
              );
            })}

          </div>

          {/* Page Indicators */}
          <div className="flex justify-center gap-1.5 mt-4">

            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => goToPage(index)}
                className={`h-1 rounded-full transition-all ${
                  currentPage === index
                    ? 'w-6 bg-[#F97316]'
                    : 'w-1.5 bg-neutral-300'
                }`}
                aria-label={`Show option group ${index + 1}`}
                aria-current={
                  currentPage === index ? 'true' : undefined
                }
              />
            ))}

          </div>
        </div>

        {/* DESKTOP: Original 7-Column Stage Grid - Unchanged */}
        <div className="hidden lg:grid grid-cols-7 gap-3 mb-8 sm:mb-10">

          {STAGES.map((stage, idx) => {
            const isSelected = activeStage === idx;

            return (
              <button
                key={stage.step}
                onClick={() => setActiveStage(idx)}
                aria-pressed={isSelected}
                className={`text-left p-4 sm:p-5 border rounded-lg transition-all duration-300 cursor-pointer relative overflow-hidden ${
                  isSelected
                    ? 'bg-[#18181B] text-white border-[#18181B] shadow-[0_8px_28px_rgba(249,115,22,0.12)]'
                    : 'bg-white/75 backdrop-blur-sm text-[#18181B] border-black/[0.07] hover:border-[#F97316]/50 hover:bg-orange-50/40'
                }`}
              >
                <div className="flex items-center justify-between mb-4">

                  <span
                    className={`font-mono text-xs ${
                      isSelected
                        ? 'text-[#F97316]'
                        : 'text-neutral-400'
                    }`}
                  >
                    {stage.step}
                  </span>

                  {idx < 6 && (
                    <ArrowRight
                      className={`w-3 h-3 hidden lg:block ${
                        isSelected
                          ? 'text-[#F97316]'
                          : 'text-neutral-300'
                      }`}
                    />
                  )}

                </div>

                <div className="font-display font-bold text-sm sm:text-base tracking-wide uppercase">
                  {stage.title}
                </div>

                <div
                  className={`text-[11px] font-mono mt-1 ${
                    isSelected
                      ? 'text-neutral-300'
                      : 'text-neutral-500'
                  }`}
                >
                  {stage.tagline}
                </div>

                {isSelected && (
                  <motion.span
                    layoutId="growth-active-indicator"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-[#F97316]"
                    transition={{ duration: 0.3 }}
                  />
                )}

              </button>
            );
          })}

        </div>

        {/* Dynamic Architectural Detail Frame */}
        <div className="p-6 sm:p-10 lg:p-12 bg-white/80 backdrop-blur-md border border-black/[0.07] rounded-xl shadow-[0_12px_45px_rgba(24,24,27,0.035)] relative overflow-hidden">

          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-100/30 blur-[90px] rounded-full pointer-events-none" />

          <AnimatePresence mode="wait">

            <motion.div
              key={activeStage}
              initial={
                reduced
                  ? false
                  : { opacity: 0, y: 12 }
              }
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={
                reduced
                  ? undefined
                  : { opacity: 0, y: -8 }
              }
              transition={{
                duration: 0.3,
                ease: 'easeOut',
              }}
              className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >

              <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-neutral-200 pb-6 lg:pb-0 lg:pr-8">

                <span className="font-mono text-xs uppercase tracking-widest text-[#F97316]">
                  Stage {STAGES[activeStage].step} in Focus
                </span>

                <h3 className="font-display text-3xl sm:text-4xl font-bold tracking-tight uppercase text-[#18181B] mt-2">
                  {STAGES[activeStage].title}
                </h3>

                <p className="font-mono text-xs text-neutral-500 mt-1">
                  {STAGES[activeStage].tagline}
                </p>

              </div>

              <div className="lg:col-span-8 lg:pl-4">

                <p className="text-lg sm:text-xl text-neutral-800 leading-relaxed">
                  {STAGES[activeStage].detail}
                </p>

                <div className="mt-6 flex items-center gap-3 text-xs font-mono text-neutral-500">

                  <CheckCircle2 className="w-4 h-4 text-[#F97316]" />

                  <span>
                    Engineered into every Swapno Tech engagement
                  </span>

                </div>

              </div>

            </motion.div>

          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
