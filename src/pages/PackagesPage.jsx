import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, Info, ChevronDown } from 'lucide-react';
import { monthlyTiers, featureGroups, projectPackages, adSpendNote } from '../data/packagesData';

const quoteUrl = (name) => `/contact?package=${encodeURIComponent(name)}`;

/* ---------- small pieces ---------- */

function Cell({ value }) {
  if (value === true) {
    return <Check className="mx-auto h-4 w-4 text-orange-600" strokeWidth={2.5} aria-label="Included" />;
  }
  if (!value) return <span className="text-zinc-300" aria-label="Not included">—</span>;
  return <span className="text-sm font-medium text-zinc-800">{value}</span>;
}

function TierCard({ tier }) {
  const f = tier.featured;
  return (
    <div
      className={`relative flex flex-col rounded-2xl border p-6 transition-all duration-300 ${
        f
          ? 'border-zinc-800 bg-zinc-950 text-white shadow-2xl shadow-orange-500/10 lg:-translate-y-3'
          : 'border-zinc-200 bg-white text-zinc-950 hover:-translate-y-1 hover:shadow-xl hover:shadow-zinc-200/70'
      }`}
    >
      {f && (
        <span className="absolute -top-3 left-6 rounded-full bg-orange-600 px-3 py-1 text-xs font-semibold text-white">
          Most popular
        </span>
      )}
      <h3 className="text-lg font-semibold">{tier.name}</h3>
      <p className={`mt-1 min-h-[40px] text-sm ${f ? 'text-zinc-400' : 'text-zinc-500'}`}>{tier.tagline}</p>

      <div className="mt-5 flex items-baseline gap-2">
        <span className="text-5xl font-bold tracking-tight">{tier.posts}</span>
        <span className={`text-sm ${f ? 'text-zinc-400' : 'text-zinc-500'}`}>static posts / month</span>
      </div>

      <ul className={`mt-6 flex-1 space-y-3 border-t pt-6 text-sm ${f ? 'border-zinc-800' : 'border-zinc-100'}`}>
        {tier.highlights.map((h) => (
          <li key={h} className="flex items-start gap-2.5">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" strokeWidth={2.5} />
            <span className={f ? 'text-zinc-200' : 'text-zinc-700'}>{h}</span>
          </li>
        ))}
      </ul>

      <Link
        to={quoteUrl(`Monthly ${tier.name}`)}
        className={`mt-8 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
          f
            ? 'bg-orange-600 text-white hover:bg-orange-500'
            : 'border border-zinc-900 text-zinc-900 hover:bg-zinc-900 hover:text-white'
        }`}
      >
        Request a Quote <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

/* Desktop: full compare table */
function CompareTable() {
  return (
    <table className="hidden w-full border-separate border-spacing-0 text-left lg:table">
      <thead>
        <tr>
          <th className="sticky top-16 z-10 bg-white px-5 py-4 text-sm font-medium text-zinc-500">Compare plans</th>
          {monthlyTiers.map((t) => (
            <th
              key={t.id}
              className={`sticky top-16 z-10 px-5 py-4 text-center text-base font-semibold ${
                t.featured ? 'bg-orange-50 text-orange-700' : 'bg-white text-zinc-950'
              }`}
            >
              {t.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {featureGroups.map((g) => (
          <React.Fragment key={g.label}>
            <tr>
              <th colSpan={5} className="bg-zinc-50 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                {g.label}
              </th>
            </tr>
            {g.rows.map((r) => (
              <tr key={r.label}>
                <th scope="row" className="border-t border-zinc-100 px-5 py-3.5 text-sm font-normal text-zinc-700">
                  {r.label}
                </th>
                {r.values.map((v, i) => (
                  <td
                    key={i}
                    className={`border-t border-zinc-100 px-5 py-3.5 text-center ${monthlyTiers[i].featured ? 'bg-orange-50/60' : ''}`}
                  >
                    <Cell value={v} />
                  </td>
                ))}
              </tr>
            ))}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
}

/* Mobile/tablet: ek ta tier khulle shudhu tar feature list */
function CompareAccordion() {
  return (
    <div className="space-y-3 lg:hidden">
      {monthlyTiers.map((t, idx) => (
        <details key={t.id} className="group rounded-xl border border-zinc-200 bg-white" open={t.featured}>
          <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-4">
            <span className="flex items-center gap-2 font-semibold text-zinc-950">
              {t.name}
              {t.featured && <span className="rounded-full bg-orange-50 px-2 py-0.5 text-xs font-medium text-orange-700">Popular</span>}
            </span>
            <ChevronDown className="h-4 w-4 text-zinc-400 transition-transform group-open:rotate-180" />
          </summary>
          <div className="border-t border-zinc-100 px-4 pb-4">
            {featureGroups.map((g) => (
              <div key={g.label} className="pt-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">{g.label}</p>
                <dl className="space-y-2">
                  {g.rows.map((r) => (
                    <div key={r.label} className="flex items-center justify-between text-sm">
                      <dt className="text-zinc-600">{r.label}</dt>
                      <dd className="min-w-[2rem] text-right">
                        <Cell value={r.values[idx]} />
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </details>
      ))}
    </div>
  );
}

function ProjectCard({ pkg }) {
  return (
    <div className="flex flex-col rounded-2xl border border-zinc-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-zinc-200/70">
      <h3 className="text-xl font-semibold text-zinc-950">{pkg.title}</h3>
      <p className="mt-1.5 text-sm text-zinc-500">{pkg.description}</p>
      <ul className="mt-6 flex-1 space-y-3">
        {pkg.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm text-zinc-700">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
            {f}
          </li>
        ))}
      </ul>
      <Link
        to={quoteUrl(pkg.title)}
        className="mt-7 inline-flex items-center gap-2 self-start text-sm font-semibold text-zinc-950 transition-colors hover:text-orange-600"
      >
        Request a Quote <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

/* ---------- page ---------- */

// Navbar height + ektu gap. Navbar boro/choto hole eta change korun
const NAV_OFFSET = 88;

export default function PackagesPage() {
  const [tab, setTab] = useState('monthly');
  const tabsRef = useRef(null);

  // Page e dhukle hero text er por theke (tab + packages) dekhabe.
  // Hero text dekhte chaile user upore scroll korbe.
  useEffect(() => {
    if (window.location.hash) return undefined; // #anchor diye ashle tar kaj e bhag boshabo na

    const goToPackages = () => {
      if (!tabsRef.current) return;
      const top = tabsRef.current.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
      window.scrollTo({ top: Math.max(top, 0), behavior: 'auto' });
    };

    goToPackages();
    // Kono ScrollToTop component thakle seta porer moment e top e niye jay, tai abar boshai
    const raf = requestAnimationFrame(goToPackages);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="bg-white">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-16 sm:px-6 sm:pt-24 lg:px-8">
          <span className="text-sm font-semibold text-orange-600">Packages</span>
          <h1 className="mt-3 max-w-3xl text-4xl font-extrabold tracking-tight text-zinc-950 sm:text-5xl lg:text-6xl">
            Plans built around <span className="text-orange-600">your growth.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-lg">
            Pick a monthly plan or a one-time project. Every quote is shaped around your goals, so you only pay for what you need.
          </p>

          <div ref={tabsRef} className="mt-8 inline-flex rounded-full bg-zinc-100 p-1" role="tablist" aria-label="Package type">
            {[
              { id: 'monthly', label: 'Monthly Plans' },
              { id: 'projects', label: 'One-time Projects' },
            ].map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={tab === t.id}
                onClick={() => setTab(t.id)}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                  tab === t.id ? 'bg-zinc-950 text-white shadow' : 'text-zinc-600 hover:text-zinc-950'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {tab === 'monthly' ? (
        <>
          {/* TIER CARDS */}
          <section className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-6 pt-3 sm:grid-cols-2 xl:grid-cols-4">
              {monthlyTiers.map((t) => (
                <TierCard key={t.id} tier={t} />
              ))}
            </div>
            <div className="mt-8 flex items-start gap-3 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3.5 text-sm text-zinc-600">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-orange-600" />
              <p>{adSpendNote}</p>
            </div>
          </section>

          {/* COMPARE */}
          <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
            <h2 className="mb-8 text-2xl font-bold tracking-tight text-zinc-950 sm:text-3xl">Compare every feature</h2>
            <div className="rounded-2xl border border-zinc-200">
              <CompareTable />
              <CompareAccordion />
            </div>
          </section>
        </>
      ) : (
        <section className="mx-auto max-w-7xl px-4 pb-20 pt-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {projectPackages.map((p) => (
              <ProjectCard key={p.id} pkg={p} />
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-zinc-950 px-6 py-14 text-center sm:px-12">
          <div className="pointer-events-none absolute -bottom-20 left-1/2 h-56 w-96 -translate-x-1/2 rounded-full bg-orange-500/20 blur-3xl" aria-hidden="true" />
          <h2 className="relative text-2xl font-bold tracking-tight text-white sm:text-4xl">Not sure which one fits?</h2>
          <p className="relative mx-auto mt-3 max-w-xl text-zinc-400">Tell us your goal and we'll recommend a plan or build a custom one.</p>
          <Link
            to="/contact"
            className="relative mt-8 inline-flex items-center gap-2 rounded-xl bg-orange-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-500"
          >
            Talk to us <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}