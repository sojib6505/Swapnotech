import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Play } from 'lucide-react';
import { categories, portfolioItems } from '../../data/portfolioData';

const TONES = {
  orange: 'from-orange-400 to-orange-600',
  dark: 'from-zinc-800 to-zinc-950',
  sand: 'from-orange-100 to-orange-300',
  stone: 'from-zinc-200 to-zinc-400',
};

const MAX_ITEMS = 3;

// Sob category theke shoman bhabe pick kore, jate home e variety dekhay
function pickPreview(items, max) {
  const pool = items.some((i) => i.featured) ? items.filter((i) => i.featured) : items;
  const groups = {};
  pool.forEach((i) => (groups[i.category] ||= []).push(i));
  const lists = Object.values(groups);
  const out = [];
  for (let round = 0; out.length < max; round++) {
    let added = false;
    for (const list of lists) {
      if (list[round] && out.length < max) {
        out.push(list[round]);
        added = true;
      }
    }
    if (!added) break;
  }
  return out;
}

function PreviewTile({ item, label, big, index }) {
  const sub = item.tagline || item.summary || item.goal || item.domain;
  const meta = [item.client, item.year].filter(Boolean).join(' · ');

  return (
    <Link
      to={`/portfolio?category=${item.category}`}
      aria-label={`${item.title} - view in portfolio`}
      className={`portfolio-tile group relative isolate block min-h-[300px] overflow-hidden rounded-2xl bg-zinc-900 shadow-sm transition-shadow duration-300 hover:shadow-2xl hover:shadow-orange-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 lg:min-h-0 ${
        big ? 'md:col-span-2 lg:row-span-2' : ''
      }`}
      style={{ animationDelay: `${index * 0.12}s` }}
    >
      {/* Background: image ba gradient placeholder */}
      <div className={`absolute inset-0 bg-gradient-to-br ${TONES[item.tone] || TONES.stone}`} />
      {item.image && (
        <img
          src={item.image}
          alt={`${item.title}${item.client ? ` for ${item.client}` : ''}`}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      )}

      {/* Text readable rakhar jonno overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/30 to-zinc-950/10 transition-opacity duration-300 group-hover:from-zinc-950/95" />

      {/* Orange glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(249,115,22,.18) 0%, transparent 65%)' }}
      />

      {/* Video hole play button */}
      {item.category === 'video' && (
        <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform duration-300 group-hover:scale-110">
          <Play className="ml-0.5 h-5 w-5 fill-orange-600 text-orange-600" />
        </span>
      )}

      {/* Top row: category badge + arrow */}
      <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4 sm:p-5">
        <span className="portfolio-chip rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/30 backdrop-blur-md transition-all duration-300 group-hover:bg-orange-600/80 group-hover:ring-orange-400/50">
          {label}
        </span>
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-zinc-950 shadow transition-all duration-300 group-hover:rotate-12 group-hover:bg-orange-600 group-hover:text-white group-hover:shadow-orange-500/40">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>

      {/* Bottom: text content */}
      <div className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-6">
        {meta && <p className="mb-1.5 text-xs font-medium text-orange-300">{meta}</p>}
        <h3 className={`font-bold leading-tight tracking-tight ${big ? 'text-2xl sm:text-3xl' : 'text-xl'}`}>
          {item.title}
        </h3>
        {sub && (
          <p className={`mt-2 line-clamp-2 text-sm text-zinc-200 ${big ? 'max-w-lg' : ''}`}>{sub}</p>
        )}
      </div>
    </Link>
  );
}

export default function PortfolioPreview() {
  const sectionRef = useRef(null);
  const items = pickPreview(portfolioItems, MAX_ITEMS);
  if (!items.length) return null;

  const labelOf = (id) => categories.find((c) => c.id === id)?.label || id;
  const countOf = (id) => portfolioItems.filter((i) => i.category === id).length;
  const chips = categories.filter((c) => c.id !== 'all');

  return (
    <section
      ref={sectionRef}
      aria-labelledby="work-heading"
      className="portfolio-section relative overflow-hidden border-b border-zinc-100 py-12 sm:py-16"
    >
      <style>{`
        /* ── Section background ── */
        .portfolio-section {
          background: linear-gradient(160deg, #fffbf7 0%, #fafaf9 60%, #fff7ed 100%);
        }

        /* ── Subtle dot grid ── */
        .portfolio-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(24,24,27,.07) 1px, transparent 1.3px);
          background-size: 26px 26px;
          pointer-events: none;
          z-index: 0;
        }

        /* ── Background orb ── */
        .portfolio-orb {
          position: absolute;
          width: 500px;
          height: 500px;
          right: -120px;
          top: 50%;
          transform: translateY(-50%);
          background: radial-gradient(closest-side, rgba(249,115,22,.10), rgba(249,115,22,.03) 55%, transparent 100%);
          pointer-events: none;
          z-index: 0;
        }

        /* ── Category chip hover ── */
        .category-chip {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          border-radius: 9999px;
          background: #fff;
          padding: 0.375rem 1rem;
          font-size: 0.875rem;
          font-weight: 600;
          color: #52525b;
          box-shadow: 0 0 0 1px #e4e4e7;
          transition: color .2s ease, box-shadow .25s ease, background .25s ease;
        }
        .category-chip:hover {
          color: #ea580c;
          box-shadow: 0 0 0 1.5px rgba(249,115,22,.55), 0 2px 12px rgba(249,115,22,.12);
          background: rgba(255,247,237,.8);
        }
        .category-chip-count {
          border-radius: 9999px;
          background: #f4f4f5;
          padding: 0.05rem 0.4rem;
          font-size: 0.7rem;
          color: #71717a;
          transition: background .25s ease, color .25s ease;
        }
        .category-chip:hover .category-chip-count {
          background: rgba(249,115,22,.12);
          color: #ea580c;
        }

        /* ── Tile stagger reveal ── */
        .portfolio-tile {
          opacity: 0;
          transform: translateY(22px);
          transition: opacity .55s cubic-bezier(.22,.9,.3,1), transform .55s cubic-bezier(.22,.9,.3,1),
            box-shadow .3s ease;
        }
        .portfolio-tiles-visible .portfolio-tile {
          opacity: 1;
          transform: translateY(0);
        }
        .portfolio-tile:nth-child(1) { transition-delay: .05s; }
        .portfolio-tile:nth-child(2) { transition-delay: .17s; }
        .portfolio-tile:nth-child(3) { transition-delay: .29s; }

        /* ── Explore CTA button ── */
        .portfolio-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          border-radius: 0.75rem;
          background: #09090b;
          padding: 0.75rem 1.5rem;
          font-size: 0.875rem;
          font-weight: 600;
          color: #fff;
          border: 1px solid rgba(255,255,255,.08);
          transition: background .25s ease, box-shadow .3s ease, transform .2s ease;
        }
        .portfolio-cta-btn:hover {
          background: #18181b;
          box-shadow: 0 0 0 1.5px rgba(249,115,22,.4), 0 8px 28px rgba(249,115,22,.18);
          transform: translateY(-2px);
        }

        /* ── Portfolio section header reveal ── */
        .portfolio-header {
          opacity: 0;
          transform: translateY(16px);
          transition: opacity .55s .05s cubic-bezier(.22,.9,.3,1), transform .55s .05s cubic-bezier(.22,.9,.3,1);
        }
        .portfolio-section-visible .portfolio-header { opacity: 1; transform: translateY(0); }

        @media (prefers-reduced-motion: reduce) {
          .portfolio-tile, .portfolio-header { opacity: 1 !important; transform: none !important; transition: none !important; }
        }
      `}</style>

      {/* Background orb */}
      <div className="portfolio-orb" aria-hidden="true" />

      <PortfolioObserver sectionRef={sectionRef} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="portfolio-header mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="mb-3 block font-mono text-xs font-semibold uppercase tracking-wider text-orange-600">
              SELECTED WORK
            </span>
            <h2 id="work-heading" className="text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl">
              A look at the work.
            </h2>
            <p className="mt-2 max-w-xl text-sm text-zinc-600 sm:text-base">
              Kono ekta tile e click koro, ba nicher category theke direct oi section e jao.
            </p>
          </div>
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-900 transition-colors hover:text-orange-600"
          >
            <span>See portfolio</span>
            <span className="text-orange-600">→</span>
          </Link>
        </div>

        {/* Category shortcuts */}
        <div className="mb-8 flex flex-wrap gap-2">
          {chips.map((c) => (
            <Link
              key={c.id}
              to={`/portfolio?category=${c.id}`}
              className="category-chip"
            >
              {c.label}
              <span className="category-chip-count">{countOf(c.id)}</span>
            </Link>
          ))}
        </div>

        {/* Bento grid: prothom item boro */}
        <div className="portfolio-tiles grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[260px]">
          {items.map((item, i) => (
            <PreviewTile key={item.id} item={item} label={labelOf(item.category)} big={i === 0} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 flex justify-center">
          <Link to="/portfolio" className="portfolio-cta-btn">
            Explore full portfolio <ArrowUpRight className="h-4 w-4 text-orange-500" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// Separate observer component to avoid hook-in-condition issues
function PortfolioObserver({ sectionRef }) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add('portfolio-section-visible');
          const tilesContainer = section.querySelector('.portfolio-tiles');
          if (tilesContainer) tilesContainer.classList.add('portfolio-tiles-visible');
          observer.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [sectionRef]);

  return null;
}
