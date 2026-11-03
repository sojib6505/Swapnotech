import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Sparkles, CheckCircle2 } from 'lucide-react';
import TechGraphic from '../components/ui/TechGraphic';
import HeroShowcaseVisual from '../components/ui/HeroShowcaseVisual';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import PreFooterCTA from '../components/layout/PreFooterCTA';
import { portfolioData } from '../data/portfolioData';
import HeroServicesPanel from '../components/ui/Heroservicespanel';
import ClientLogos from '../components/ui/ClientLogos';
import PortfolioPreview from '../components/ui/PortfolioPreview';
import Team from '../components/ui/Team';
import HeroOrbitVisual from '../components/ui/HeroOrbitVisual';
import Hero from '../components/layout/Hero';
import GrowthArchitecture from '../components/layout/GrowthArchitecture';
import GoalMatcher from '../components/layout/GoalMatcher';

export default function HomePage() {
  const [activeModalProject, setActiveModalProject] = useState(null);

  // Take first 2 projects for the Selected Work section
  const selectedProjects = portfolioData.slice(0, 2);

  // Scroll-reveal IntersectionObserver
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal-section').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-white">
      <style>{`
        /* ── Scroll-reveal ── */
        .reveal-section {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.65s cubic-bezier(.22,.9,.3,1), transform 0.65s cubic-bezier(.22,.9,.3,1);
        }
        .reveal-section.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .reveal-section:nth-child(2) { transition-delay: .05s; }
        .reveal-section:nth-child(3) { transition-delay: .10s; }

        /* Card stagger inside grid */
        .stagger-card:nth-child(1) { transition-delay: .05s; }
        .stagger-card:nth-child(2) { transition-delay: .15s; }
        .stagger-card:nth-child(3) { transition-delay: .25s; }

        @media (prefers-reduced-motion: reduce) {
          .reveal-section, .stagger-card { opacity: 1 !important; transform: none !important; transition: none !important; }
        }

        /* ── WHAT WE DO cards ── */
        .service-card {
          position: relative;
          overflow: hidden;
          transition: box-shadow .3s ease, border-color .3s ease, transform .3s cubic-bezier(.22,.9,.3,1);
        }
        .service-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(135deg, rgba(249,115,22,.13) 0%, transparent 60%);
          opacity: 0;
          transition: opacity .35s ease;
          pointer-events: none;
        }
        .service-card:hover::before { opacity: 1; }
        .service-card:hover {
          box-shadow: 0 0 0 1.5px rgba(249,115,22,.55), 0 8px 32px rgba(249,115,22,.10);
          border-color: rgba(249,115,22,.45) !important;
          transform: translateY(-3px);
        }
        .service-card .card-num {
          position: absolute;
          top: 16px;
          right: 20px;
          font-size: 3.5rem;
          font-weight: 900;
          line-height: 1;
          color: rgba(24,24,27,.04);
          font-variant-numeric: tabular-nums;
          pointer-events: none;
          user-select: none;
          transition: color .3s ease;
        }
        .service-card:hover .card-num { color: rgba(249,115,22,.07); }

        /* ── WAYS TO WORK TOGETHER bg ── */
        .ways-bg {
          background-color: #09090B;
          position: relative;
          overflow: hidden;
        }
        .ways-bg::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(249,115,22,.10) 1px, transparent 1.3px);
          background-size: 26px 26px;
          pointer-events: none;
        }
        .ways-orb-left {
          position: absolute;
          width: 520px;
          height: 520px;
          left: -160px;
          top: 50%;
          transform: translateY(-50%);
          background: radial-gradient(closest-side, rgba(249,115,22,.18), rgba(249,115,22,.06) 55%, transparent 100%);
          pointer-events: none;
        }
        .ways-orb-right {
          position: absolute;
          width: 380px;
          height: 380px;
          right: -80px;
          top: 10%;
          background: radial-gradient(closest-side, rgba(253,186,116,.12), transparent 80%);
          pointer-events: none;
        }
        .ways-package-card {
          background: rgba(255,255,255,.04);
          border: 1px solid rgba(255,255,255,.10);
          backdrop-filter: blur(6px);
          transition: border-color .3s ease, box-shadow .3s ease;
        }
        .ways-package-card:hover {
          border-color: rgba(249,115,22,.4);
          box-shadow: 0 0 28px rgba(249,115,22,.12);
        }

        /* ── BLOG cards ── */
        .blog-card {
          transition: box-shadow .3s ease, transform .3s cubic-bezier(.22,.9,.3,1), border-color .3s ease;
        }
        .blog-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 36px rgba(0,0,0,.09), 0 0 0 1.5px rgba(249,115,22,.25);
          border-color: rgba(249,115,22,.3) !important;
        }
        .blog-badge {
          background: linear-gradient(135deg, rgba(249,115,22,.12), rgba(253,186,116,.10));
          color: #c2410c;
          border: 1px solid rgba(249,115,22,.2);
        }

        /* ── ABOUT decorative ── */
        .about-deco-line {
          position: absolute;
          left: 0;
          top: 50%;
          width: 3px;
          height: 70%;
          transform: translateY(-50%);
          background: linear-gradient(to bottom, transparent, #F97316 30%, #FDBA74 70%, transparent);
          border-radius: 99px;
        }
      `}</style>

      {/* 1. HERO SECTION */}
      <Hero />
      <ClientLogos />

      {/* 2. WHAT WE DO */}
      <section className="py-20 sm:py-28 border-b border-zinc-100 reveal-section" style={{ background: '#fffbf7' }}>
        {/* subtle warm dot grid */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(circle, rgba(24,24,27,.06) 1px, transparent 1.3px)',
            backgroundSize: '26px 26px',
            pointerEvents: 'none',
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="mb-12">
            <span className="text-xs font-mono font-semibold tracking-wider text-orange-600 uppercase block mb-3">
              WHAT WE DO
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950">
              The right support, at the right stage.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Card 1: Design & branding */}
            <div className="stagger-card reveal-section group service-card p-8 rounded-xl border border-zinc-200/80 bg-white flex flex-col justify-between">
              <span className="card-num">01</span>
              <div>
                <h3 className="text-xl font-bold text-zinc-950 mb-3 group-hover:text-orange-600 transition-colors">
                  Design & branding
                </h3>
                <p className="text-sm text-zinc-600 leading-relaxed mb-6">
                  Visual foundations and creative assets for a consistent presence.
                </p>
              </div>
              <div>
                <Link
                  to="/services?category=creative"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-900 group-hover:text-orange-600 transition-colors"
                >
                  <span>Explore services</span>
                  <span className="text-orange-600">→</span>
                </Link>
              </div>
            </div>

            
            {/* Card 2: Web & software */}
            <div className="stagger-card reveal-section group service-card p-8 rounded-xl border border-zinc-200/80 bg-white flex flex-col justify-between">
              <span className="card-num">02</span>
              <div>
                <h3 className="text-xl font-bold text-zinc-950 mb-3 group-hover:text-orange-600 transition-colors">
                  Web & software
                </h3>
                <p className="text-sm text-zinc-600 leading-relaxed mb-6">
                  Digital experiences shaped around your business needs.
                </p>
              </div>
              <div>
                <Link
                  to="/services?category=technology"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-900 group-hover:text-orange-600 transition-colors"
                >
                  <span>Explore services</span>
                  <span className="text-orange-600">→</span>
                </Link>
              </div>
            </div>

            {/* Card 3: Content & marketing */}
            <div className="stagger-card reveal-section group service-card p-8 rounded-xl border border-zinc-200/80 bg-white flex flex-col justify-between">
              <span className="card-num">03</span>
              <div>
                <h3 className="text-xl font-bold text-zinc-950 mb-3 group-hover:text-orange-600 transition-colors">
                  Content & marketing
                </h3>
                <p className="text-sm text-zinc-600 leading-relaxed mb-6">
                  Content and campaigns with a clear purpose.
                </p>
              </div>
              <div>
                <Link
                  to="/services?category=marketing"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-900 group-hover:text-orange-600 transition-colors"
                >
                  <span>Explore services</span>
                  <span className="text-orange-600">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <GrowthArchitecture/>

      {/* 3. SELECTED WORK */}
      <PortfolioPreview />
      <GoalMatcher/>

      {/* 4. WAYS TO WORK TOGETHER */}
      <section className="ways-bg py-20 sm:py-28 border-b border-zinc-900 reveal-section">
        <div className="ways-orb-left" aria-hidden="true" />
        <div className="ways-orb-right" aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-mono font-semibold tracking-wider text-orange-500 uppercase block">
                WAYS TO WORK TOGETHER
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                Support shaped around your needs.
              </h2>
              <p className="text-base text-zinc-400 leading-relaxed">
                Explore package categories and request a tailored quote. Scope and availability can be discussed together.
              </p>
              <div>
                <Button to="/packages" variant="primary" size="md">
                  <span>Explore Packages</span>
                </Button>
              </div>
            </div>

            {/* Right Package Preview Card */}
            <div className="lg:col-span-6">
              <div className="ways-package-card p-8 sm:p-10 rounded-xl">
                <span className="text-xs font-mono font-semibold tracking-wider text-zinc-500 uppercase block mb-3">
                  PACKAGE PREVIEW
                </span>
                <h3 className="text-2xl font-bold text-white mb-3">
                  Content Creation
                </h3>
                <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
                  A starting point for planning and producing business content.
                </p>
                <Link
                  to="/packages"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-200 hover:text-orange-400 transition-colors"
                >
                  <span>View example package</span>
                  <span className="text-orange-500">→</span>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. FROM THE BLOG */}
      <section className="py-20 sm:py-28 border-b border-zinc-100 reveal-section" style={{ background: '#fffbf7' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-mono font-semibold tracking-wider text-orange-600 uppercase block mb-3">
              FROM THE BLOG
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950">
              Ideas worth exploring.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Article 1 */}
            <div className="stagger-card reveal-section blog-card p-7 rounded-xl bg-white border border-zinc-200/80 shadow-sm flex flex-col justify-between">
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded blog-badge text-xs font-mono mb-4">
                  Strategy
                </span>
                <h3 className="text-lg font-bold text-zinc-950 mb-3 leading-snug">
                  Planning a clearer digital presence
                </h3>
              </div>
              <div className="pt-4">
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-zinc-900 hover:text-orange-600 transition-colors"
                >
                  <span>Read article</span>
                  <span className="text-orange-600">→</span>
                </Link>
              </div>
            </div>

            {/* Article 2 */}
            <div className="stagger-card reveal-section blog-card p-7 rounded-xl bg-white border border-zinc-200/80 shadow-sm flex flex-col justify-between">
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded blog-badge text-xs font-mono mb-4">
                  Design
                </span>
                <h3 className="text-lg font-bold text-zinc-950 mb-3 leading-snug">
                  Making a visual system more consistent
                </h3>
              </div>
              <div className="pt-4">
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-zinc-900 hover:text-orange-600 transition-colors"
                >
                  <span>Browse articles</span>
                  <span className="text-orange-600">→</span>
                </Link>
              </div>
            </div>

            {/* Article 3 */}
            <div className="stagger-card reveal-section blog-card p-7 rounded-xl bg-white border border-zinc-200/80 shadow-sm flex flex-col justify-between">
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded blog-badge text-xs font-mono mb-4">
                  Web
                </span>
                <h3 className="text-lg font-bold text-zinc-950 mb-3 leading-snug">
                  Questions to ask before a website project
                </h3>
              </div>
              <div className="pt-4">
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-zinc-900 hover:text-orange-600 transition-colors"
                >
                  <span>Browse articles</span>
                  <span className="text-orange-600">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. ABOUT SWAPNO TECH */}
      <section className="py-20 sm:py-28 bg-white border-b border-zinc-100 reveal-section" style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Decorative orange orb */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            right: '-120px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '480px',
            height: '480px',
            background: 'radial-gradient(closest-side, rgba(249,115,22,.10), rgba(249,115,22,.03) 55%, transparent 100%)',
            pointerEvents: 'none',
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: '-60px',
            bottom: '-80px',
            width: '320px',
            height: '320px',
            background: 'radial-gradient(closest-side, rgba(253,186,116,.09), transparent 80%)',
            pointerEvents: 'none',
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            <div className="lg:col-span-4 relative pl-6">
              <div className="about-deco-line" />
              <span className="text-xs font-mono font-semibold tracking-wider text-orange-600 uppercase block">
                ABOUT SWAPNO TECH
              </span>
            </div>
            <div className="lg:col-span-8 space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 leading-tight">
                Built for businesses in motion.
              </h2>
              <p className="text-lg sm:text-xl text-zinc-600 leading-relaxed font-normal">
                Swapno Tech brings creative and technology thinking together to help entrepreneurs, startups, F-commerce businesses and growing teams build their presence and move forward.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* <Team/> */}

      {/* 7. PRE-FOOTER CTA BANNER */}
      <PreFooterCTA />

      {/* Case Study Modal for Selected Projects */}
      {activeModalProject && (
        <Modal
          isOpen={!!activeModalProject}
          onClose={() => setActiveModalProject(null)}
          title={activeModalProject.title}
        >
          <div className="space-y-6">
            <TechGraphic label={activeModalProject.visualPlaceholder} aspectRatio="aspect-[16/9]" />

            <div className="flex flex-wrap gap-2 items-center">
              <span className="px-2.5 py-0.5 bg-zinc-100 text-zinc-800 rounded text-xs font-mono font-medium">
                {activeModalProject.badgeLabel}
              </span>
              <span className="px-2.5 py-0.5 bg-orange-50 text-orange-700 rounded text-xs font-mono font-medium">
                {activeModalProject.tag}
              </span>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-zinc-900 uppercase tracking-wider mb-1">Overview</h4>
              <p className="text-zinc-600 text-sm leading-relaxed">{activeModalProject.summary}</p>
            </div>

            {activeModalProject.caseStudy && (
              <>
                <div className="border-t border-zinc-100 pt-4">
                  <h4 className="text-sm font-semibold text-zinc-900 uppercase tracking-wider mb-1">Challenge</h4>
                  <p className="text-zinc-600 text-sm leading-relaxed">{activeModalProject.caseStudy.challenge}</p>
                </div>
                <div className="border-t border-zinc-100 pt-4">
                  <h4 className="text-sm font-semibold text-zinc-900 uppercase tracking-wider mb-1">Solution</h4>
                  <p className="text-zinc-600 text-sm leading-relaxed">{activeModalProject.caseStudy.solution}</p>
                </div>
              </>
            )}

            <div className="border-t border-zinc-100 pt-4 flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {activeModalProject.techStack.map((tech) => (
                  <span key={tech} className="px-2 py-0.5 bg-zinc-100 text-zinc-600 text-xs rounded">
                    {tech}
                  </span>
                ))}
              </div>
              <Button to="/contact" variant="primary" size="sm">
                Discuss Similar Project
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
