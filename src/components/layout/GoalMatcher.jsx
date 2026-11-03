import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GOAL_OPTIONS } from '../../data/solutionsData';
import { ArrowRight, Check, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function GoalMatcher() {
  const [selectedId, setSelectedId] = useState('start');
  const [isMobileOptionsOpen, setIsMobileOptionsOpen] = useState(false);

  const activeOption =
    GOAL_OPTIONS.find((opt) => opt.id === selectedId) || GOAL_OPTIONS[0];

  const handleOptionSelect = (optionId) => {
    setSelectedId(optionId);
    setIsMobileOptionsOpen(false);
  };

  const renderOption = (option, idx) => {
    const isSelected = option.id === selectedId;

    return (
      <motion.button
        key={option.id}
        initial={{ opacity: 0, x: -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          duration: 0.45,
          delay: idx * 0.06,
          ease: 'easeOut',
        }}
        onClick={() => handleOptionSelect(option.id)}
        aria-pressed={isSelected}
        className={`text-left px-5 py-3 sm:px-5 sm:py-3.5 border rounded-lg transition-all duration-300 cursor-pointer flex-1 min-h-[76px] lg:min-h-0 flex items-center justify-between group relative overflow-hidden ${
          isSelected
            ? 'bg-[#18181B] text-white border-[#18181B] shadow-[0_10px_30px_rgba(249,115,22,0.12)]'
            : 'bg-white/75 backdrop-blur-sm text-[#18181B] border-black/[0.07] hover:border-[#F97316]/50 hover:bg-orange-50/40 hover:-translate-y-0.5'
        }`}
      >
        {isSelected && (
          <motion.div
            layoutId="goal-active-indicator"
            className="absolute left-0 top-0 bottom-0 w-1 bg-[#F97316]"
            transition={{ duration: 0.3 }}
          />
        )}

        <div className="relative z-10">
          <div className="font-display font-bold text-base sm:text-lg tracking-tight">
            {option.label}
          </div>

          <div
            className={`text-xs font-mono mt-1.5 transition-colors ${
              isSelected
                ? 'text-neutral-300'
                : 'text-neutral-500 group-hover:text-neutral-700'
            }`}
          >
            {option.subtitle}
          </div>
        </div>

        <motion.div
          animate={{
            scale: isSelected ? 1 : 0.85,
            backgroundColor: isSelected ? '#F97316' : 'transparent',
          }}
          transition={{ duration: 0.25 }}
          className={`w-3.5 h-3.5 rounded-full shrink-0 ${
            isSelected
              ? 'border border-[#F97316]'
              : 'border border-neutral-300 group-hover:border-[#F97316]'
          }`}
        />
      </motion.button>
    );
  };

  return (
    <section className="relative isolate overflow-hidden pt-14 pb-16 sm:pt-20 sm:pb-24 border-b border-black/[0.06] bg-[#FFFCF9] text-[#18181B] transition-colors">

      {/* Futuristic Background Effects */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -top-40 -left-40 h-[400px] w-[400px] rounded-full bg-orange-200/20 blur-[120px]" />

        <div className="absolute top-1/2 -right-40 h-[420px] w-[420px] rounded-full bg-orange-100/30 blur-[130px]" />

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
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="max-w-3xl mb-10 sm:mb-12"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs uppercase tracking-widest text-[#F97316]">
              02 / Alignment
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#18181B] uppercase">
            WHAT ARE YOU TRYING TO BUILD?
          </h2>

          <p className="mt-4 text-base sm:text-lg text-neutral-600 max-w-2xl leading-relaxed">
            Select your primary objective to see how Swapno Tech configures strategy, creative, and technology for your situation.
          </p>
        </motion.div>

        {/* Interactive Problem Selector Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">

          {/* Desktop Options Column */}
          <div className="hidden lg:flex lg:col-span-5 flex-col gap-3 h-full">
            {GOAL_OPTIONS.map((option, idx) => renderOption(option, idx))}
          </div>

          {/* Mobile Goal Selector */}
          <div className="lg:hidden relative">

            <button
              type="button"
              onClick={() =>
                setIsMobileOptionsOpen((prev) => !prev)
              }
              aria-expanded={isMobileOptionsOpen}
              className="w-full flex items-center justify-between gap-4 px-5 py-4 bg-white/85 backdrop-blur-md border border-black/[0.08] rounded-xl shadow-[0_5px_20px_rgba(24,24,27,0.04)] text-left transition-all duration-300 hover:border-[#F97316]/50"
            >
              <div>
                <span className="block font-mono text-[10px] uppercase tracking-widest text-[#F97316] mb-1">
                  Choose Your Goal
                </span>

                <span className="block font-display font-bold text-base text-[#18181B]">
                  {activeOption.label}
                </span>

                <span className="block text-xs text-neutral-500 mt-0.5">
                  {activeOption.subtitle}
                </span>
              </div>

              <motion.div
                animate={{
                  rotate: isMobileOptionsOpen ? 180 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="w-9 h-9 rounded-full bg-orange-50 flex items-center justify-center shrink-0"
              >
                <ChevronDown className="w-5 h-5 text-[#F97316]" />
              </motion.div>
            </button>

            <AnimatePresence>
              {isMobileOptionsOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -8 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -8 }}
                  transition={{
                    duration: 0.3,
                    ease: 'easeInOut',
                  }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-col gap-2.5 pt-3 pb-1">
                    {GOAL_OPTIONS.map((option, idx) => {
                      const isSelected = option.id === selectedId;

                      return (
                        <motion.button
                          key={option.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.25,
                            delay: idx * 0.04,
                          }}
                          onClick={() => handleOptionSelect(option.id)}
                          aria-pressed={isSelected}
                          className={`w-full text-left px-5 py-3.5 border rounded-lg flex items-center justify-between gap-3 transition-all duration-300 ${
                            isSelected
                              ? 'bg-[#18181B] text-white border-[#18181B]'
                              : 'bg-white/80 text-[#18181B] border-black/[0.07] hover:border-[#F97316]/50'
                          }`}
                        >
                          <div>
                            <div className="font-display font-bold text-sm">
                              {option.label}
                            </div>

                            <div
                              className={`text-xs font-mono mt-1 ${
                                isSelected
                                  ? 'text-neutral-300'
                                  : 'text-neutral-500'
                              }`}
                            >
                              {option.subtitle}
                            </div>
                          </div>

                          {isSelected && (
                            <Check className="w-4 h-4 text-[#F97316] shrink-0" />
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Solution / Capability Panel */}
          <div className="lg:col-span-7 relative h-full">

            <div className="absolute -inset-4 bg-orange-100/20 blur-3xl rounded-full pointer-events-none" />

            <div className="relative h-full bg-white/80 backdrop-blur-md border border-black/[0.07] rounded-xl p-6 sm:p-9 lg:p-11 shadow-[0_12px_45px_rgba(24,24,27,0.035)] overflow-hidden">

              {/* Decorative Accent */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-orange-100/30 blur-[80px] rounded-full pointer-events-none" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedId}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="relative z-10"
                >
                  <div className="font-mono text-xs uppercase tracking-widest text-[#F97316] mb-3">
                    Matched Capability / Solution
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#18181B] mb-4">
                    {activeOption.headline}
                  </h3>

                  <p className="text-sm sm:text-base text-neutral-600 leading-relaxed mb-8">
                    {activeOption.description}
                  </p>

                  {/* Recommended Blueprint */}
                  <div className="border-t border-black/[0.07] pt-6 mb-8">
                    <div className="font-mono text-xs uppercase tracking-wider text-neutral-500 mb-4">
                      Recommended Solution Model:{' '}
                      <span className="font-bold text-[#18181B]">
                        {activeOption.solution}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {activeOption.deliverables.map((item, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: 8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.3,
                            delay: idx * 0.04,
                          }}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700"
                        >
                          <Check className="w-4 h-4 text-[#F97316] shrink-0 mt-0.5" />

                          <span>{item}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Direct Action Link */}
                  <Link
                    to="/contact"
                    className="group relative overflow-hidden inline-flex items-center gap-3 px-6 py-3.5 bg-[#F97316] hover:bg-[#EA580C] text-white text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-md transition-all duration-300 shadow-[0_5px_20px_rgba(249,115,22,0.15)] hover:shadow-[0_8px_25px_rgba(249,115,22,0.25)] hover:-translate-y-0.5"
                  >
                    <span>Build This With Swapno Tech</span>

                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}