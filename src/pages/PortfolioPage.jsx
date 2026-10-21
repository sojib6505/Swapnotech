import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { portfolioData, portfolioCategories } from '../data/portfolioData';
import TechGraphic from '../components/ui/TechGraphic';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';

export default function PortfolioPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get('category') || 'all';

  const [activeProjectModal, setActiveProjectModal] = useState(null);

  const filteredProjects = useMemo(() => {
    if (currentCategory === 'all') return portfolioData;
    return portfolioData.filter((p) => p.category === currentCategory);
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
      {/* HERO SECTION (Dark Banner matching 04-protfolio.png) */}
      <section className="bg-[#0A0A0A] text-white pt-16 pb-20 sm:pt-20 sm:pb-24 border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-mono font-semibold tracking-wider text-orange-500 uppercase block">
              PORTFOLIO
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Work, ideas and possibilities.
            </h1>
            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed pt-2">
              Project entries below are clearly marked placeholders, ready to replace with approved work.
            </p>
          </div>
        </div>
      </section>

      {/* FILTER TABS & PORTFOLIO GRID SECTION */}
      <section className="py-16 sm:py-24 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2.5 mb-12">
            {portfolioCategories.map((cat) => {
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

          {/* 3-Column Portfolio Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group rounded-xl border border-zinc-200/80 bg-white p-5 shadow-sm hover:border-zinc-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Aspect-Ratio Tech Visual */}
                  <div className="mb-5 overflow-hidden rounded-lg">
                    <TechGraphic
                      label={project.visualPlaceholder}
                      className="w-full group-hover:scale-[1.01] transition-transform duration-300"
                      aspectRatio="aspect-[16/10]"
                    />
                  </div>

                  {/* Badge & Title */}
                  <div className="space-y-2">
                    <span className="inline-block px-2.5 py-0.5 rounded bg-zinc-100 text-zinc-700 text-xs font-mono">
                      {project.badgeLabel}
                    </span>

                    <h3 className="text-xl font-bold text-zinc-950 pt-1 group-hover:text-orange-600 transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-sm text-zinc-600 line-clamp-2 leading-relaxed">
                      {project.summary}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-zinc-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setActiveProjectModal(project)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-900 hover:text-orange-600 transition-colors"
                  >
                    <span>Explore case study</span>
                    <span className="text-orange-600">→</span>
                  </button>
                  <span className="text-[11px] font-mono text-zinc-400">
                    {project.category}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Case Study Modal */}
      {activeProjectModal && (
        <Modal
          isOpen={!!activeProjectModal}
          onClose={() => setActiveProjectModal(null)}
          title={activeProjectModal.title}
        >
          <div className="space-y-6">
            <TechGraphic label={activeProjectModal.visualPlaceholder} aspectRatio="aspect-[16/9]" />

            <div className="flex flex-wrap gap-2 items-center">
              <span className="px-2.5 py-0.5 bg-zinc-100 text-zinc-800 rounded text-xs font-mono font-medium">
                {activeProjectModal.badgeLabel}
              </span>
              <span className="px-2.5 py-0.5 bg-orange-50 text-orange-700 rounded text-xs font-mono font-medium">
                {activeProjectModal.tag}
              </span>
              <span className="px-2.5 py-0.5 bg-zinc-50 border border-zinc-200 text-zinc-600 rounded text-xs font-mono">
                {activeProjectModal.status}
              </span>
            </div>

            <div>
              <h4 className="text-xs font-mono font-semibold text-zinc-500 uppercase tracking-wider mb-1.5">Overview</h4>
              <p className="text-zinc-700 text-sm leading-relaxed">{activeProjectModal.summary}</p>
            </div>

            {activeProjectModal.caseStudy && (
              <div className="space-y-4 border-t border-zinc-100 pt-4">
                <div>
                  <h4 className="text-xs font-mono font-semibold text-zinc-500 uppercase tracking-wider mb-1.5">Challenge</h4>
                  <p className="text-zinc-600 text-sm leading-relaxed">{activeProjectModal.caseStudy.challenge}</p>
                </div>
                <div>
                  <h4 className="text-xs font-mono font-semibold text-zinc-500 uppercase tracking-wider mb-1.5">Solution</h4>
                  <p className="text-zinc-600 text-sm leading-relaxed">{activeProjectModal.caseStudy.solution}</p>
                </div>
                <div>
                  <h4 className="text-xs font-mono font-semibold text-zinc-500 uppercase tracking-wider mb-2">Key Deliverables</h4>
                  <div className="flex flex-wrap gap-2">
                    {activeProjectModal.caseStudy.deliverables.map((item, idx) => (
                      <span key={idx} className="px-2.5 py-1 bg-zinc-100 text-zinc-700 text-xs rounded-md">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="border-t border-zinc-100 pt-5 flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {activeProjectModal.techStack.map((tech) => (
                  <span key={tech} className="px-2 py-0.5 bg-zinc-100 text-zinc-600 text-xs rounded">
                    {tech}
                  </span>
                ))}
              </div>
              <Button to="/contact" variant="primary" size="sm">
                Inquire About Similar Project
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
