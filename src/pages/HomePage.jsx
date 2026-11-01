import React, { useState } from 'react';
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

export default function HomePage() {
  const [activeModalProject, setActiveModalProject] = useState(null);

  // Take first 2 projects for the Selected Work section
  const selectedProjects = portfolioData.slice(0, 2);

  return (
    <div className="bg-white">
      {/* 1. HERO SECTION (Dark Banner matching 01-home.png) */}
      <Hero/>

      {/* 2. WHAT WE DO (Services Summary matching 01-home.png) */}
      <section className="py-20 sm:py-28 bg-white border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <div className="group p-8 rounded-xl border border-zinc-200/80 bg-white hover:border-zinc-400 hover:shadow-sm transition-all duration-200 flex flex-col justify-between">
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
            <div className="group p-8 rounded-xl border border-zinc-200/80 bg-white hover:border-zinc-400 hover:shadow-sm transition-all duration-200 flex flex-col justify-between">
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
            <div className="group p-8 rounded-xl border border-zinc-200/80 bg-white hover:border-zinc-400 hover:shadow-sm transition-all duration-200 flex flex-col justify-between">
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

      {/* 3. SELECTED WORK (Portfolio Highlight matching 01-home.png) */}
      <PortfolioPreview/>

      {/* 4. WAYS TO WORK TOGETHER (Packages matching 01-home.png) */}
      <section className="py-20 sm:py-28 bg-white border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-mono font-semibold tracking-wider text-orange-600 uppercase block">
                WAYS TO WORK TOGETHER
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 leading-tight">
                Support shaped around your needs.
              </h2>
              <p className="text-base text-zinc-600 leading-relaxed">
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
              <div className="p-8 sm:p-10 rounded-xl border border-zinc-200/90 bg-zinc-50/50 shadow-sm">
                <span className="text-xs font-mono font-semibold tracking-wider text-zinc-500 uppercase block mb-3">
                  PACKAGE PREVIEW
                </span>
                <h3 className="text-2xl font-bold text-zinc-950 mb-3">
                  Content Creation
                </h3>
                <p className="text-sm text-zinc-600 mb-6 leading-relaxed">
                  A starting point for planning and producing business content.
                </p>
                <Link
                  to="/packages"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-900 hover:text-orange-600 transition-colors"
                >
                  <span>View example package</span>
                  <span className="text-orange-600">→</span>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. FROM THE BLOG (Articles matching 01-home.png) */}
      <section className="py-20 sm:py-28 bg-[#FAFAFA] border-b border-zinc-100">
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
            <div className="p-7 rounded-xl bg-white border border-zinc-200/80 shadow-sm flex flex-col justify-between hover:border-zinc-300 transition-all">
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded bg-zinc-100 text-zinc-700 text-xs font-mono mb-4">
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
            <div className="p-7 rounded-xl bg-white border border-zinc-200/80 shadow-sm flex flex-col justify-between hover:border-zinc-300 transition-all">
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded bg-zinc-100 text-zinc-700 text-xs font-mono mb-4">
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
            <div className="p-7 rounded-xl bg-white border border-zinc-200/80 shadow-sm flex flex-col justify-between hover:border-zinc-300 transition-all">
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded bg-zinc-100 text-zinc-700 text-xs font-mono mb-4">
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

      {/* 6. ABOUT SWAPNO TECH (matching 01-home.png) */}
      <section className="py-20 sm:py-28 bg-white border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            <div className="lg:col-span-4">
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
      <ClientLogos/>
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
