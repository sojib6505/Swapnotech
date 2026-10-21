import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { blogCategories, featuredArticle, articlesData } from '../data/blogData';
import TechGraphic from '../components/ui/TechGraphic';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeArticleModal, setActiveArticleModal] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredArticles = useMemo(() => {
    return articlesData.filter((article) => {
      const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
      const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            article.summary.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="bg-white">
      {/* HERO SECTION (Dark Banner matching 05-blog.png) */}
      <section className="bg-[#0A0A0A] text-white pt-16 pb-20 sm:pt-20 sm:pb-24 border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-mono font-semibold tracking-wider text-orange-500 uppercase block">
              JOURNAL
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Notes on building forward.
            </h1>
            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed pt-2">
              Editable articles on creative, technology and marketing decisions.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURED ARTICLE & ARTICLES GRID */}
      <section className="py-16 sm:py-24 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Featured Article Box (matching 05-blog.png) */}
          <div className="bg-white rounded-xl border border-zinc-200/90 p-6 sm:p-8 lg:p-10 shadow-sm mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-6">
                <TechGraphic
                  label={featuredArticle.visualPlaceholder}
                  className="w-full"
                  aspectRatio="aspect-[16/10]"
                />
              </div>
              <div className="lg:col-span-6 space-y-4">
                <span className="inline-block px-2.5 py-0.5 rounded bg-zinc-100 text-zinc-700 text-xs font-mono">
                  {featuredArticle.badge}
                </span>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-zinc-950 leading-tight">
                  {featuredArticle.title}
                </h2>

                <p className="text-xs font-mono text-zinc-400">
                  {featuredArticle.author} · {featuredArticle.date}
                </p>

                <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
                  {featuredArticle.summary}
                </p>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveArticleModal(featuredArticle)}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-900 hover:text-orange-600 transition-colors"
                  >
                    <span>Read featured article</span>
                    <span className="text-orange-600">→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Search & Filter Controls */}
          <div className="space-y-6 mb-12">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2.5">
              {blogCategories.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
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

            {/* Search Input matching 05-blog.png */}
            <div className="max-w-md">
              <label htmlFor="search-input" className="block text-xs font-bold text-zinc-800 mb-2">
                Search articles
              </label>
              <div className="relative">
                <input
                  id="search-input"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search article titles"
                  className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 bg-white text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                />
                <Search className="w-4 h-4 text-zinc-400 absolute right-3.5 top-3 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Articles Cards Grid (3 Columns) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredArticles.length > 0 ? (
              filteredArticles.map((article) => (
                <div
                  key={article.id}
                  className="rounded-xl border border-zinc-200/80 bg-white p-7 shadow-sm hover:border-zinc-300 transition-all flex flex-col justify-between"
                >
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded bg-zinc-100 text-zinc-700 text-xs font-mono mb-4">
                      {article.badge}
                    </span>

                    <h3 className="text-lg font-bold text-zinc-950 mb-2 leading-snug">
                      {article.title}
                    </h3>

                    <p className="text-xs font-mono text-zinc-400 mb-4">
                      {article.author} · {article.date}
                    </p>

                    <p className="text-sm text-zinc-600 line-clamp-2 leading-relaxed">
                      {article.summary}
                    </p>
                  </div>

                  <div className="pt-6 mt-4 border-t border-zinc-100">
                    <button
                      type="button"
                      onClick={() => setActiveArticleModal(article)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-900 hover:text-orange-600 transition-colors"
                    >
                      <span>Read article</span>
                      <span className="text-orange-600">→</span>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-12 text-center text-zinc-500 text-sm">
                No articles match your current search or category filter.
              </div>
            )}
          </div>

          {/* Pagination Controls matching 05-blog.png */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="px-4 py-2 rounded-full border border-zinc-300 text-xs font-medium text-zinc-700 hover:border-zinc-900 disabled:opacity-40 disabled:pointer-events-none transition-colors"
            >
              ← Previous
            </button>
            <span className="text-xs font-mono text-zinc-600">
              Page {currentPage} of 2
            </span>
            <button
              type="button"
              disabled={currentPage === 2}
              onClick={() => setCurrentPage((p) => Math.min(2, p + 1))}
              className="px-4 py-2 rounded-full border border-zinc-300 text-xs font-medium text-zinc-700 hover:border-zinc-900 disabled:opacity-40 disabled:pointer-events-none transition-colors"
            >
              Next →
            </button>
          </div>

        </div>
      </section>

      {/* Article Detail Modal */}
      {activeArticleModal && (
        <Modal
          isOpen={!!activeArticleModal}
          onClose={() => setActiveArticleModal(null)}
          title={activeArticleModal.title}
        >
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-zinc-100 text-zinc-800 text-xs font-mono font-medium">
                {activeArticleModal.badge}
              </span>
              <span className="text-xs font-mono text-zinc-500">
                {activeArticleModal.author} · {activeArticleModal.date}
              </span>
            </div>

            <p className="text-sm font-medium text-zinc-700 italic border-l-2 border-orange-500 pl-3 py-1">
              {activeArticleModal.summary}
            </p>

            <div className="text-sm text-zinc-600 leading-relaxed space-y-3 pt-2 whitespace-pre-line border-t border-zinc-100">
              {activeArticleModal.content || (
                `As digital teams scale their capabilities, having consistent frameworks for strategic decisions prevents costly rework.\n\nFrom defining visual design tokens to organizing content models and establishing clear customer inquiry pathways, deliberate restraint is the secret to high-performing digital platforms.\n\n[Full article content placeholder. Approved editorial copy can be loaded here before production launch.]`
              )}
            </div>

            <div className="pt-4 border-t border-zinc-100 flex justify-end">
              <Button onClick={() => setActiveArticleModal(null)} variant="outline-dark" size="sm">
                Close Article
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
