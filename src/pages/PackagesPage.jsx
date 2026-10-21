import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { packagesData } from '../data/packagesData';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';

export default function PackagesPage() {
  const [activePackageExample, setActivePackageExample] = useState(null);

  return (
    <div className="bg-white">
      {/* HERO SECTION (Dark Banner matching 03-packages.png) */}
      <section className="bg-[#0A0A0A] text-white pt-16 pb-20 sm:pt-20 sm:pb-24 border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-mono font-semibold tracking-wider text-orange-500 uppercase block">
              PACKAGES
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              A starting point for collaboration.
            </h1>
            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed pt-2">
              Browse focus areas and ask for a quote shaped around your needs. Tier names are editable placeholders; pricing and scope are not confirmed.
            </p>
          </div>
        </div>
      </section>

      {/* PACKAGES GRID SECTION */}
      <section className="py-16 sm:py-24 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {packagesData.map((pkg) => (
              <div
                key={pkg.id}
                className="rounded-xl border border-zinc-200/90 bg-white p-8 sm:p-10 shadow-sm flex flex-col justify-between hover:border-zinc-300 transition-all duration-200"
              >
                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded bg-zinc-100 text-zinc-600 text-xs font-mono mb-4">
                    {pkg.tierLabel}
                  </span>

                  <h3 className="text-2xl sm:text-3xl font-bold text-zinc-950 mb-3">
                    {pkg.title}
                  </h3>

                  <p className="text-sm sm:text-base text-zinc-600 mb-6 leading-relaxed">
                    {pkg.description}
                  </p>

                  <div className="py-3 border-y border-zinc-100 mb-6">
                    <p className="text-xs font-mono font-medium text-zinc-500 tracking-wider uppercase">
                      {pkg.tiers.join(' · ')}
                    </p>
                  </div>

                  <ul className="space-y-2.5 mb-8">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-zinc-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-zinc-100">
                  {pkg.hasExampleLink && (
                    <button
                      type="button"
                      onClick={() => setActivePackageExample(pkg)}
                      className="text-xs font-semibold text-zinc-900 hover:text-orange-600 transition-colors inline-flex items-center gap-1"
                    >
                      <span>View example</span>
                      <span className="text-orange-600">→</span>
                    </button>
                  )}
                  <Button
                    to={`/contact?package=${encodeURIComponent(pkg.title)}`}
                    variant="primary"
                    size="sm"
                    className="ml-auto"
                  >
                    Request a Quote
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Example Package Modal */}
      {activePackageExample && (
        <Modal
          isOpen={!!activePackageExample}
          onClose={() => setActivePackageExample(null)}
          title={`Example Scope: ${activePackageExample.title}`}
        >
          <div className="space-y-4">
            <span className="inline-block px-2.5 py-0.5 rounded bg-orange-50 text-orange-700 text-xs font-mono font-medium">
              Sample Package Structure
            </span>
            <p className="text-sm text-zinc-600 leading-relaxed">
              Every client project has unique business goals, timelines, and technical requirements. While our tiers give you a structured starting point, our final scope is always customized after our initial inquiry conversation.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
              <div className="p-3.5 rounded border border-zinc-200 bg-zinc-50">
                <span className="text-xs font-bold text-zinc-900 uppercase">Starter</span>
                <p className="text-xs text-zinc-500 mt-1">Core foundational assets for new ventures.</p>
              </div>
              <div className="p-3.5 rounded border border-orange-200 bg-orange-50/40">
                <span className="text-xs font-bold text-orange-700 uppercase">Growth</span>
                <p className="text-xs text-zinc-500 mt-1">Scalable production for expanding businesses.</p>
              </div>
              <div className="p-3.5 rounded border border-zinc-200 bg-zinc-50">
                <span className="text-xs font-bold text-zinc-900 uppercase">Custom</span>
                <p className="text-xs text-zinc-500 mt-1">Full bespoke engagement tailored to enterprise needs.</p>
              </div>
            </div>
            <div className="pt-4 border-t border-zinc-100 flex justify-end">
              <Button
                to={`/contact?package=${encodeURIComponent(activePackageExample.title)}`}
                variant="primary"
                size="sm"
              >
                Discuss Custom Quote
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
