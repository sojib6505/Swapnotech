import React from 'react';
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

function PreviewTile({ item, label, big }) {
  const sub = item.tagline || item.summary || item.goal || item.domain;
  const meta = [item.client, item.year].filter(Boolean).join(' · ');

  return (
    <Link
      to={`/portfolio?category=${item.category}`}
      aria-label={`${item.title} - view in portfolio`}
      className={`group relative isolate block min-h-[300px] overflow-hidden rounded-2xl bg-zinc-900 shadow-sm transition-shadow duration-300 hover:shadow-2xl hover:shadow-zinc-300/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 lg:min-h-0 ${
        big ? 'md:col-span-2 lg:row-span-2' : ''
      }`}
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

      {/* Video hole play button */}
      {item.category === 'video' && (
        <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform duration-300 group-hover:scale-110">
          <Play className="ml-0.5 h-5 w-5 fill-orange-600 text-orange-600" />
        </span>
      )}

      {/* Top row: category badge + arrow */}
      <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4 sm:p-5">
        <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/30 backdrop-blur-md">
          {label}
        </span>
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-zinc-950 shadow transition-all duration-300 group-hover:rotate-12 group-hover:bg-orange-600 group-hover:text-white">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>

      {/* Bottom: text content */}
     
      <div className="absolute  inset-x-0 bottom-0 p-4 text-white sm:p-6">
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
  const items = pickPreview(portfolioItems, MAX_ITEMS);
  if (!items.length) return null;

  const labelOf = (id) => categories.find((c) => c.id === id)?.label || id;
  const countOf = (id) => portfolioItems.filter((i) => i.category === id).length;
  const chips = categories.filter((c) => c.id !== 'all');

  return (
    <section
      aria-labelledby="work-heading"
      className="border-b border-zinc-100 bg-[#FAFAFA] py-12 sm:py-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
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
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-zinc-600 ring-1 ring-zinc-200 transition-colors hover:text-orange-600 hover:ring-orange-300"
            >
              {c.label}
              <span className="rounded-full bg-zinc-100 px-1.5 text-xs text-zinc-500">{countOf(c.id)}</span>
            </Link>
          ))}
        </div>

        {/* Bento grid: prothom item boro */}
  
          <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[260px]">
          {items.map((item, i) => (
            <PreviewTile key={item.id} item={item} label={labelOf(item.category)} big={i === 0} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 flex justify-center">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 rounded-xl bg-zinc-950 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-800"
          >
            Explore full portfolio <ArrowUpRight className="h-4 w-4 text-orange-500" />
          </Link>
        </div>
      </div>
    
    </section>
  );
}