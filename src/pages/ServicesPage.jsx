import React, { useState, useMemo } from 'react';
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

  return (
    <div className="bg-white">
      {/* HERO SECTION (Dark Banner matching 02-service.png) */}
      <section className="bg-[#0A0A0A] text-white pt-16 pb-20 sm:pt-20 sm:pb-24 border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
      <section className="py-16 sm:py-24 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2.5 mb-12">
            {serviceCategories.map((cat) => {
              const isActive = currentCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-zinc-950 text-white shadow-sm'
                      : 'bg-white text-zinc-700 border border-zinc-300 hover:border-zinc-900'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* 12 Service Cards Grid (3 Columns) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="group rounded-xl border border-zinc-200/80 bg-white p-7 shadow-sm hover:border-zinc-400 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
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
