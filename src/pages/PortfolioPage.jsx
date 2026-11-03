import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Play, X } from 'lucide-react';
import { categories, portfolioItems } from "../data/portfolioData";

/* ---------- shared bits ---------- */

const TONES = {
  orange: 'from-orange-400 to-orange-600 text-white',
  dark: 'from-zinc-800 to-zinc-950 text-white',
  sand: 'from-orange-50 to-orange-200 text-orange-900',
  stone: 'from-zinc-100 to-zinc-300 text-zinc-800',
};
const ASPECT = { square: 'aspect-square', portrait: 'aspect-[4/5]', landscape: 'aspect-[4/3]' };
const CARD =
  'group block w-full overflow-hidden rounded-2xl border border-zinc-200 bg-white text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-zinc-200/70';

// Image na thakle gradient placeholder. item.image thakle seta dekhabe.
function Art({ tone = 'stone', image, className = '', children }) {
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br ${TONES[tone]} ${className}`}>
      {image ? (
        <img src={image} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/20 blur-2xl" />
      )}
      {children}
    </div>
  );
}

function Tag({ children }) {
  return <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600">{children}</span>;
}

/* ---------- modal (case study / video / lightbox) ---------- */

function Dialog({ onClose, onPrev, onNext, size = 'max-w-3xl', children }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
      if (e.key === 'ArrowRight' && onNext) onNext();
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, onPrev, onNext]);

  const arrow =
    'absolute top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-zinc-900 shadow transition-colors hover:bg-white';

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-zinc-950/70 backdrop-blur-sm" onClick={onClose} />
      <div className={`pf-pop relative max-h-[90vh] w-full ${size} overflow-y-auto rounded-2xl bg-white shadow-2xl`}>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-zinc-900 shadow hover:bg-white"
        >
          <X className="h-4 w-4" />
        </button>
        {onPrev && <button type="button" onClick={onPrev} aria-label="Previous" className={`${arrow} left-3`}><ChevronLeft className="h-5 w-5" /></button>}
        {onNext && <button type="button" onClick={onNext} aria-label="Next" className={`${arrow} right-3`}><ChevronRight className="h-5 w-5" /></button>}
        {children}
      </div>
    </div>
  );
}

/* ---------- category cards ---------- */

function BrandCard({ item, onOpen }) {
  return (
    <button type="button" onClick={() => onOpen(item)} className={CARD}>
      <Art tone={item.tone} image={item.image} className="aspect-[16/10] p-5">
        <span className="absolute left-5 top-5 text-4xl font-semibold opacity-90">Aa</span>
        <div className="absolute inset-x-5 bottom-5 flex items-end justify-between">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/90 text-2xl font-bold text-zinc-950 shadow">
            {item.title[0]}
          </span>
          <span className="flex gap-1.5">
            {item.colors.map((c) => (
              <span key={c} className="h-8 w-8 rounded-full border-2 border-white/80 shadow" style={{ background: c }} />
            ))}
          </span>
        </div>
      </Art>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-zinc-950">{item.title}</h3>
        <p className="mt-1 text-sm text-zinc-500">{item.tagline}</p>
        <div className="mt-4 flex flex-wrap gap-2">{item.tags.map((t) => <Tag key={t}>{t}</Tag>)}</div>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-950 transition-colors group-hover:text-orange-600">
          View case study <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </button>
  );
}

function DesignTile({ item, onOpen }) {
  return (
    <button type="button" onClick={() => onOpen(item)} className="group relative block w-full overflow-hidden rounded-2xl">
      <Art tone={item.tone} image={item.image} className={`${ASPECT[item.aspect]} transition-transform duration-500 group-hover:scale-[1.03]`} />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-zinc-950/80 to-transparent p-4 text-left text-white opacity-100 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100">
        <p className="text-sm font-semibold">{item.title}</p>
        <p className="text-xs text-zinc-300">{item.client}</p>
      </div>
    </button>
  );
}

function VideoCard({ item, onOpen, grid }) {
  const wide = item.format === 'wide';
  return (
    <button type="button" onClick={() => onOpen(item)} className={`group block w-full text-left ${grid && wide ? 'col-span-2' : ''}`}>
      <Art
        tone={item.tone}
        image={item.image}
        className={`${wide ? 'aspect-video' : 'aspect-[9/16]'} rounded-2xl transition-transform duration-300 group-hover:-translate-y-1`}
      >
        <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform duration-300 group-hover:scale-110">
          <Play className="ml-0.5 h-5 w-5 fill-orange-600 text-orange-600" />
        </span>
        <span className="absolute bottom-3 right-3 rounded-md bg-zinc-950/70 px-2 py-0.5 text-xs font-medium text-white">{item.duration}</span>
      </Art>
      <p className="mt-3 text-sm font-semibold text-zinc-950">{item.title}</p>
      <p className="text-xs text-zinc-500">{item.client} · {item.year}</p>
    </button>
  );
}

function WebCard({ item }) {
  return (
    <div className={CARD}>
      <div className="flex items-center gap-3 border-b border-zinc-200 bg-zinc-50 px-4 py-2.5">
        <span className="flex gap-1.5">
          {[0, 1, 2].map((i) => <span key={i} className="h-2.5 w-2.5 rounded-full bg-zinc-300" />)}
        </span>
        <span className="flex-1 truncate rounded-md bg-white px-3 py-1 text-center text-xs text-zinc-500">{item.domain}</span>
      </div>
      <Art tone={item.tone} image={item.image} className="aspect-[16/10]">
        {!item.image && (
          <div className="absolute inset-x-6 top-6 space-y-3">
            <div className="h-3 w-1/3 rounded-full bg-white/60" />
            <div className="h-8 w-3/4 rounded-lg bg-white/70" />
            <div className="h-3 w-1/2 rounded-full bg-white/50" />
            <div className="grid grid-cols-3 gap-3 pt-3">
              {[0, 1, 2].map((i) => <div key={i} className="h-16 rounded-lg bg-white/40" />)}
            </div>
          </div>
        )}
      </Art>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-zinc-950">{item.title}</h3>
        <p className="mt-1 text-sm text-zinc-500">{item.summary}</p>
        <div className="mt-4 flex flex-wrap gap-2">{item.stack.map((s) => <Tag key={s}>{s}</Tag>)}</div>
        {item.liveUrl && (
          <a
            href={item.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-950 transition-colors hover:text-orange-600"
          >
            Visit live site <ArrowUpRight className="h-4 w-4" />
          </a>
        )}
      </div>
    </div>
  );
}

function MarketingCard({ item }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-zinc-200/70">
      <div className="h-1 bg-gradient-to-r from-orange-500 to-orange-300" />
      <div className="p-6">
        <div className="flex flex-wrap gap-2">{item.channels.map((c) => <Tag key={c}>{c}</Tag>)}</div>
        <h3 className="mt-4 text-lg font-semibold text-zinc-950">{item.title}</h3>
        <p className="mt-1 text-sm text-zinc-500">{item.goal}</p>
        <dl className="mt-6 grid grid-cols-3 gap-3 border-t border-zinc-100 pt-5">
          {item.metrics.map((m, i) => (
            <div key={m.label}>
              <dd className={`text-2xl font-bold tracking-tight sm:text-3xl ${i === 0 ? 'text-orange-600' : 'text-zinc-950'}`}>{m.value}</dd>
              <dt className="mt-0.5 text-xs text-zinc-500">{m.label}</dt>
            </div>
          ))}
        </dl>
        <p className="mt-5 text-xs text-zinc-400">{item.client} · {item.year}</p>
      </div>
    </div>
  );
}

/* ---------- dialog contents ---------- */

function CaseStudy({ item }) {
  return (
    <div>
      <Art tone={item.tone} image={item.image} className="aspect-[16/7]">
        <span className="absolute bottom-5 left-6 text-5xl font-semibold opacity-90">Aa</span>
      </Art>
      <div className="space-y-6 p-6 sm:p-8">
        <div>
          <h3 className="text-2xl font-bold text-zinc-950">{item.title}</h3>
          <p className="mt-1 text-sm text-zinc-500">{item.client} · {item.year}</p>
        </div>
        <section>
          <h4 className="text-sm font-semibold text-orange-600">The brief</h4>
          <p className="mt-1.5 text-sm leading-relaxed text-zinc-600">{item.summary}</p>
        </section>
        <section>
          <h4 className="text-sm font-semibold text-orange-600">The identity</h4>
          <div className="mt-3 flex flex-wrap items-center gap-4">
            {item.colors.map((c) => (
              <div key={c} className="flex items-center gap-2">
                <span className="h-9 w-9 rounded-lg border border-zinc-200" style={{ background: c }} />
                <span className="font-mono text-xs text-zinc-500">{c}</span>
              </div>
            ))}
            <span className="text-sm text-zinc-600">Typeface: <b className="text-zinc-950">{item.font}</b></span>
          </div>
        </section>
        <section>
          <h4 className="text-sm font-semibold text-orange-600">In use</h4>
          <div className="mt-3 grid grid-cols-3 gap-3">
            {['Stationery', 'Signage', 'Social'].map((label, i) => (
              <Art key={label} tone={['stone', 'sand', 'dark'][i]} className="flex aspect-[4/3] items-end rounded-xl p-3">
                <span className="relative text-xs font-medium">{label}</span>
              </Art>
            ))}
          </div>
        </section>
        <Link to="/contact" className="inline-flex items-center gap-2 rounded-xl bg-zinc-950 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-800">
          Start a similar project <ArrowRight className="h-4 w-4 text-orange-500" />
        </Link>
      </div>
    </div>
  );
}

function VideoPlayer({ item }) {
  const wide = item.format === 'wide';
  return (
    <div className="p-4 pt-14 sm:p-6 sm:pt-14">
      <div className={`mx-auto overflow-hidden rounded-xl bg-zinc-950 ${wide ? 'aspect-video w-full' : 'aspect-[9/16] max-h-[65vh]'}`}>
        {item.videoUrl ? (
          <iframe
            src={item.videoUrl}
            title={item.title}
            className="h-full w-full"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-6 text-center text-zinc-400">
            <Play className="h-8 w-8 text-orange-500" />
            <p className="text-sm">Placeholder. <code className="text-zinc-300">videoUrl</code> add korle ekhane video cholbe.</p>
          </div>
        )}
      </div>
      <p className="mt-4 text-base font-semibold text-zinc-950">{item.title}</p>
      <p className="text-sm text-zinc-500">{item.client} · {item.year}</p>
    </div>
  );
}

/* ---------- page ---------- */

export default function PortfolioPage() {
  const [params, setParams] = useSearchParams();
  const raw = params.get('category');
  const category = categories.some((c) => c.id === raw) ? raw : 'all';
  const current = categories.find((c) => c.id === category);
  const [open, setOpen] = useState(null);

  const byCat = (id) => portfolioItems.filter((i) => i.category === id);
  const items = category === 'all' ? portfolioItems.filter((i) => i.featured) : byCat(category);

  const setCategory = (id) => setParams(id === 'all' ? {} : { category: id }, { replace: true });
  const close = () => setOpen(null);

  // Design lightbox er prev/next
  const designs = byCat('design');
  const di = open && open.category === 'design' ? designs.findIndex((d) => d.id === open.id) : -1;
  const step = (dir) => setOpen(designs[(di + dir + designs.length) % designs.length]);

  // Scroll reveal
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-visible'); observer.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [category]);

  const renderCard = (item, grid) => {
    switch (item.category) {
      case 'branding': return <BrandCard item={item} onOpen={setOpen} />;
      case 'design': return <DesignTile item={item} onOpen={setOpen} />;
      case 'video': return <VideoCard item={item} onOpen={setOpen} grid={grid} />;
      case 'web': return <WebCard item={item} />;
      default: return <MarketingCard item={item} />;
    }
  };

  let content;
  if (category === 'video') {
    content = <div className="grid grid-cols-2 items-start gap-5 lg:grid-cols-4">{items.map((i) => <React.Fragment key={i.id}>{renderCard(i, true)}</React.Fragment>)}</div>;
  } else if (category === 'branding' || category === 'web' || category === 'marketing') {
    const cols = category === 'branding' ? 'lg:grid-cols-3' : '';
    content = <div className={`grid grid-cols-1 items-start gap-6 md:grid-cols-2 ${cols}`}>{items.map((i) => <React.Fragment key={i.id}>{renderCard(i)}</React.Fragment>)}</div>;
  } else {
    // design + all => masonry
    const cols = category === 'design' ? 'columns-2 lg:columns-3' : 'columns-1 sm:columns-2 lg:columns-3';
    content = (
      <div className={`${cols} gap-5`}>
        {items.map((i) => <div key={i.id} className="mb-5 break-inside-avoid">{renderCard(i)}</div>)}
      </div>
    );
  }

  return (
    <div className="bg-white">
      <style>{`
        @keyframes pf-fade { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
        @keyframes pf-pop { from { opacity: 0; transform: translateY(16px) scale(.97); } to { opacity: 1; transform: none; } }
        /* Hero orb float */
        @keyframes pf-orb-float {
          0%, 100% { transform: translateY(0) scale(1); }
          50%       { transform: translateY(-14px) scale(1.06); }
        }
        @keyframes pf-orb-float2 {
          0%, 100% { transform: translateY(0) scale(1); }
          50%       { transform: translateY(10px) scale(0.96); }
        }
        .pf-fade { animation: pf-fade .4s ease-out both; }
        .pf-pop { animation: pf-pop .3s cubic-bezier(.22,.9,.3,1) both; }
        .pf-tabs::-webkit-scrollbar { display: none; }
        .pf-orb-1 { animation: pf-orb-float 6s ease-in-out infinite; }
        .pf-orb-2 { animation: pf-orb-float2 8s ease-in-out infinite; }
        .pf-orb-3 { animation: pf-orb-float 10s ease-in-out infinite; }
        /* CTA dot grid */
        .pf-cta-dots {
          background-image: radial-gradient(circle, rgba(249,115,22,.18) 1px, transparent 1.3px);
          background-size: 26px 26px;
        }
        /* Scroll reveal */
        .reveal { opacity: 0; transform: translateY(24px); transition: opacity .6s ease, transform .6s cubic-bezier(.22,.9,.3,1); }
        .reveal.is-visible { opacity: 1; transform: none; }
        .reveal-delay-1 { transition-delay: .1s; }
        .reveal-delay-2 { transition-delay: .2s; }
        @media (prefers-reduced-motion: reduce) {
          .pf-fade, .pf-pop { animation: none; }
          .pf-orb-1, .pf-orb-2, .pf-orb-3 { animation: none; }
          .reveal { opacity: 1; transform: none; transition: none; }
        }
      `}</style>

      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* Main existing orb — now animated */}
        <div
          className="pf-orb-1 pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl"
          aria-hidden="true"
        />
        {/* Additional orbs */}
        <div
          className="pf-orb-2 pointer-events-none absolute left-1/3 top-1/2 -translate-y-1/2 h-56 w-56 rounded-full"
          style={{ background: 'radial-gradient(closest-side, rgba(249,115,22,.10), transparent 100%)' }}
          aria-hidden="true"
        />
        <div
          className="pf-orb-3 pointer-events-none absolute -left-16 bottom-0 h-72 w-72 rounded-full bg-orange-500/06 blur-2xl"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-16 sm:px-6 sm:pt-24 lg:px-8">
          <span className="text-sm font-semibold text-orange-600">Portfolio</span>
          <h1 className="mt-3 max-w-3xl text-4xl font-extrabold tracking-tight text-zinc-950 sm:text-5xl lg:text-6xl">
            Work we're{' '}
            <span className="relative text-orange-600">
              proud of.
              {/* Dramatic underline accent */}
              <span
                className="pointer-events-none absolute -bottom-1 left-0 right-0 h-[3px] rounded-full"
                style={{ background: 'linear-gradient(90deg, #F97316, #FDBA74 60%, transparent)' }}
                aria-hidden="true"
              />
            </span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-lg">
            Branding, design, video, web and marketing. Pick a category to see how each one comes together.
          </p>
        </div>
      </section>

      {/* STICKY TABS */}
      <div className="sticky top-20 z-30 border-b border-zinc-100 bg-white/90 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="pf-tabs flex gap-2 overflow-x-auto py-3 [scrollbar-width:none]" role="tablist" aria-label="Portfolio categories">
            {categories.map((c) => (
              <button
                key={c.id}
                role="tab"
                aria-selected={category === c.id}
                onClick={() => setCategory(c.id)}
                className={`shrink-0 rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                  category === c.id
                    ? 'bg-orange-600 text-white shadow-md shadow-orange-200'
                    : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-950'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <section className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
        <div key={category} className="pf-fade">
          <p className="mb-8 max-w-xl text-base text-zinc-600 reveal">{current.blurb}</p>
          <div className="reveal reveal-delay-1">{content}</div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-zinc-950 px-6 py-14 text-center sm:px-12">
          {/* Dot grid overlay */}
          <div className="pf-cta-dots pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
          <div
            className="pointer-events-none absolute -bottom-20 left-1/2 h-56 w-96 -translate-x-1/2 rounded-full bg-orange-500/20 blur-3xl"
            aria-hidden="true"
          />
          {/* Extra orb top right */}
          <div
            className="pointer-events-none absolute right-10 top-6 h-28 w-28 rounded-full"
            style={{ background: 'radial-gradient(closest-side, rgba(249,115,22,.22), transparent 100%)' }}
            aria-hidden="true"
          />
          <h2 className="relative text-2xl font-bold tracking-tight text-white sm:text-4xl">Have a project in mind?</h2>
          <p className="relative mx-auto mt-3 max-w-xl text-zinc-400">Tell us what you're building and we'll shape a plan around it.</p>
          <Link
            to="/contact"
            className="relative mt-8 inline-flex items-center gap-2 rounded-xl bg-orange-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-orange-500 hover:shadow-lg hover:shadow-orange-500/30"
          >
            Talk to us <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* DIALOGS */}
      {open?.category === 'branding' && <Dialog onClose={close}><CaseStudy item={open} /></Dialog>}
      {open?.category === 'video' && <Dialog onClose={close} size={open.format === 'wide' ? 'max-w-4xl' : 'max-w-md'}><VideoPlayer item={open} /></Dialog>}
      {open?.category === 'design' && (
        <Dialog onClose={close} size="max-w-2xl" onPrev={() => step(-1)} onNext={() => step(1)}>
          <Art tone={open.tone} image={open.image} className={`${ASPECT[open.aspect]} max-h-[70vh] w-full`} />
          <div className="p-5">
            <p className="text-base font-semibold text-zinc-950">{open.title}</p>
            <p className="text-sm text-zinc-500">{open.client} · {open.year}</p>
          </div>
        </Dialog>
      )}
    </div>
  );
}
