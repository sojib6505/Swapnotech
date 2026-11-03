import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { servicesData, serviceCategories } from '../data/servicesData';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';

export default function ServicesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get('category') || 'all';

  const [activeDetailsModal, setActiveDetailsModal] = useState(null);

  const filteredServices = useMemo(() => {
    if (currentCategory === 'all') return servicesData;
    return servicesData.filter((service) => service.category.includes(currentCategory));
  }, [currentCategory]);

  const handleCategoryChange = (catId) => {
    if (catId === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category: catId });
    }
  };

  // Scroll reveal
  const revealRef = useRef(null);
  useEffect(() => {
    const section = revealRef.current;
    if (!section) return;
    const els = section.querySelectorAll('.reveal');
    if (!els.length) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-visible'); observer.unobserve(e.target); } }),
      { threshold: 0.12 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [filteredServices]);

  return (
    <div className="bg-white">
      <style>{`
        /* Dot grid */
        .svc-dot-grid {
          background-image: radial-gradient(circle, rgba(249,115,22,.13) 1px, transparent 1.3px);
          background-size: 26px 26px;
        }
        /* Orb */
        .svc-orb {
          background: radial-gradient(closest-side, rgba(249,115,22,.22), rgba(249,115,22,.07) 55%, transparent 100%);
        }
        /* Hero sheen line */
        @keyframes svc-sheen {
          0%   { transform: translateX(-110%); }
          100% { transform: translateX(110%); }
        }
        .svc-sheen::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent 0%, rgba(249,115,22,.55) 50%, transparent 100%);
          animation: svc-sheen 2.8s ease-in-out infinite;
        }
        /* Scroll reveal */
        .reveal { opacity: 0; transform: translateY(24px); transition: opacity .6s ease, transform .6s cubic-bezier(.22,.9,.3,1); }
        .reveal.is-visible { opacity: 1; transform: none; }
        .reveal-delay-1 { transition-delay: .1s; }
        .reveal-delay-2 { transition-delay: .2s; }
        .reveal-delay-3 { transition-delay: .3s; }
        .reveal-delay-4 { transition-delay: .4s; }
        /* Card top gradient on hover */
        .svc-card-bar { height: 3px; width: 0; background: linear-gradient(90deg, #F97316, #FDBA74); border-radius: 3px 3px 0 0; position: absolute; top: 0; left: 0; transition: width .35s cubic-bezier(.22,.9,.3,1); }
        .svc-card:hover .svc-card-bar { width: 100%; }
        .svc-card:hover { box-shadow: 0 8px 32px rgba(249,115,22,.12), 0 2px 8px rgba(0,0,0,.06); }
        /* Section warm bg */
        .svc-warm-bg {
          background: linear-gradient(160deg, #fffbf7 0%, #fff7ee 40%, #fafafa 100%);
        }
        @media (prefers-reduced-motion: reduce) {
          .reveal { opacity: 1; transform: none; transition: none; }
          .svc-sheen::after { animation: none; }
          .svc-card-bar { transition: none; }
        }
      `}</style>

      {/* HERO SECTION */}
      <section className="relative bg-[#0A0A0A] text-white pt-16 pb-20 sm:pt-20 sm:pb-28 overflow-hidden">
        {/* Dot grid overlay */}
        <div className="svc-dot-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />

        {/* Floating orange orbs */}
        <div
          className="svc-orb pointer-events-none absolute -top-24 -left-24 h-[420px] w-[420px] rounded-full"
          aria-hidden="true"
          style={{ filter: 'blur(0px)' }}
        />
        <div
          className="svc-orb pointer-events-none absolute bottom-0 right-0 h-[340px] w-[340px] rounded-full translate-x-1/3 translate-y-1/4"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full"
          style={{ background: 'radial-gradient(closest-side, rgba(249,115,22,.10), transparent 100%)' }}
          aria-hidden="true"
        />

        {/* Animated orange bottom border */}
        <div className="svc-sheen pointer-events-none absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden" aria-hidden="true">
          <div className="h-full bg-zinc-800" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-mono font-semibold tracking-wider text-orange-500 uppercase block">
              OUR SERVICES
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Creative thinking. Practical execution.
            </h1>
            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed pt-2">
              Explore the ways we can support your business. Select an area to start a conversation.
            </p>
          </div>
        </div>
      </section>

      {/* FILTER TABS & SERVICE CARDS SECTION */}
      <section ref={revealRef} className="py-16 sm:py-24 svc-warm-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2.5 mb-12 reveal">
            {serviceCategories.map((cat) => {
              const isActive = currentCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-orange-600 text-white shadow-md shadow-orange-200'
                      : 'bg-white text-zinc-700 border border-zinc-200 hover:border-orange-200 hover:text-orange-700 hover:bg-orange-50'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* 12 Service Cards Grid (3 Columns) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service, idx) => (
              <div
                key={service.id}
                className={`svc-card group relative rounded-xl border border-zinc-200/80 bg-white p-7 shadow-sm transition-all duration-300 flex flex-col justify-between overflow-hidden reveal reveal-delay-${Math.min(idx % 3 + 1, 4)}`}
              >
                {/* Top gradient bar on hover */}
                <div className="svc-card-bar" aria-hidden="true" />

                <div>
                  <h3 className="text-lg font-bold text-zinc-950 mb-3 group-hover:text-orange-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-zinc-600 leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-zinc-100">
                  {service.hasDetailsLink && (
                    <div>
                      <button
                        type="button"
                        onClick={() => setActiveDetailsModal(service)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-900 hover:text-orange-600 transition-colors"
                      >
                        <span>View service details</span>
                        <span className="text-orange-600">→</span>
                      </button>
                    </div>
                  )}
                  <div>
                    <Link
                      to={`/contact?service=${encodeURIComponent(service.title)}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-600 hover:text-orange-700 transition-colors"
                    >
                      <span>Inquire about this service</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Details Modal */}
      {activeDetailsModal && (
        <Modal
          isOpen={!!activeDetailsModal}
          onClose={() => setActiveDetailsModal(null)}
          title={activeDetailsModal.title}
        >
          <div className="space-y-4">
            <span className="inline-block px-2.5 py-0.5 rounded bg-orange-50 text-orange-700 text-xs font-mono font-medium uppercase">
              {activeDetailsModal.category}
            </span>
            <p className="text-base text-zinc-800 font-medium leading-relaxed">
              {activeDetailsModal.description}
            </p>
            <div className="border-t border-zinc-100 pt-3">
              <h4 className="text-xs font-mono font-semibold text-zinc-500 uppercase tracking-wider mb-2">Scope & Capabilities</h4>
              <p className="text-sm text-zinc-600 leading-relaxed">
                {activeDetailsModal.details}
              </p>
            </div>
            <div className="border-t border-zinc-100 pt-5 flex justify-end gap-3">
              <Button
                to={`/contact?service=${encodeURIComponent(activeDetailsModal.title)}`}
                variant="primary"
                size="sm"
              >
                Inquire About This Service
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
