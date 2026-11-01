import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CheckCircle2, AlertCircle, Mail, Phone, Minus, Plus, Sparkles, ChevronDown, Loader2 } from 'lucide-react';
import { companyData } from '../data/companyData';
import { servicesData } from '../data/servicesData';
import { monthlyTiers, featureGroups, adSpendNote } from '../data/packagesData'; // <-- tomar packages file er path

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;

/* ---------- helpers ---------- */

const featureVal = (label, idx) => {
  for (const g of featureGroups) {
    const row = g.rows.find((r) => r.label === label);
    if (row) return row.values[idx];
  }
  return false;
};
const num = (v) => (typeof v === 'string' ? parseInt(v, 10) || 0 : 0);
const on = (v) => v !== false;

const EMPTY_CUSTOM = {
  platforms: 0, posts: 0, reels: 0, stories: 0, carousels: 0,
  metaAds: false, googleAds: false, tiktokAds: false,
  seo: false, pixel: false, reporting: false, manager: false,
};

const tierToCustom = (idx) => ({
  platforms: num(featureVal('Platforms', idx)),
  posts: num(featureVal('Static posts', idx)),
  reels: num(featureVal('Reels', idx)),
  stories: num(featureVal('Stories', idx)),
  carousels: num(featureVal('Carousel posts', idx)),
  metaAds: on(featureVal('Meta Ads', idx)),
  googleAds: on(featureVal('Google Ads', idx)),
  tiktokAds: on(featureVal('TikTok Ads', idx)),
  seo: on(featureVal('SEO', idx)),
  pixel: on(featureVal('Pixel / CAPI setup', idx)),
  reporting: on(featureVal('Analytics & reporting', idx)),
  manager: on(featureVal('Account manager', idx)),
});

const COUNTERS = [
  { key: 'platforms', label: 'Platforms' },
  { key: 'posts', label: 'Static posts' },
  { key: 'reels', label: 'Reels' },
  { key: 'stories', label: 'Stories' },
  { key: 'carousels', label: 'Carousel posts' },
];

const TOGGLES = [
  { key: 'metaAds', label: 'Meta Ads' },
  { key: 'googleAds', label: 'Google Ads' },
  { key: 'tiktokAds', label: 'TikTok Ads' },
  { key: 'seo', label: 'SEO' },
  { key: 'pixel', label: 'Pixel / CAPI setup' },
  { key: 'reporting', label: 'Analytics & reporting' },
  { key: 'manager', label: 'Account manager' },
];

const buildSummary = (basePlan, c) => {
  const base = monthlyTiers.find((t) => t.id === basePlan)?.name || 'Custom (from scratch)';
  const counts = COUNTERS.filter((x) => c[x.key] > 0).map((x) => `${x.label}: ${c[x.key]}`);
  const extras = TOGGLES.filter((x) => c[x.key]).map((x) => x.label);
  return [
    `Starting point: ${base}`,
    `Content: ${counts.length ? counts.join(', ') : 'None selected'}`,
    `Services: ${extras.length ? extras.join(', ') : 'None selected'}`,
  ].join('\n');
};

const inputCls =
  'w-full px-4 py-2.5 rounded-lg border border-zinc-300 bg-white text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all';

/* ---------- small UI parts ---------- */

function Stepper({ label, value, onChange }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-zinc-200 bg-white px-3 py-2">
      <span className="text-sm text-zinc-700">{label}</span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label={`Decrease ${label}`}
          onClick={() => onChange(Math.max(0, value - 1))}
          className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-100 text-zinc-700 transition-colors hover:bg-zinc-200"
        >
          <Minus className="h-3.5 w-3.5" />
        </button>
        <span className="w-6 text-center text-sm font-semibold text-zinc-950">{value}</span>
        <button
          type="button"
          aria-label={`Increase ${label}`}
          onClick={() => onChange(Math.min(99, value + 1))}
          className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-600 text-white transition-colors hover:bg-orange-500"
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

function Toggle({ label, checked, onChange }) {
  return (
    <label
      className={`flex cursor-pointer items-center gap-2.5 rounded-lg border px-3 py-2 text-sm transition-colors ${
        checked ? 'border-orange-400 bg-orange-50 text-orange-900' : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300'
      }`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 rounded border-zinc-300 text-orange-600 focus:ring-orange-500"
      />
      {label}
    </label>
  );
}

/* ---------- page ---------- */

export default function ContactPage() {
  const [searchParams] = useSearchParams();
  const prefilledService = searchParams.get('service') || searchParams.get('package') || '';

  const [formData, setFormData] = useState({
    name: '',
    contactInfo: '',
    serviceInterest: '',
    budgetRange: '',
    message: '',
  });
  const [customize, setCustomize] = useState(false);
  const [basePlan, setBasePlan] = useState('');
  const [custom, setCustom] = useState(EMPTY_CUSTOM);
  const [botcheck, setBotcheck] = useState(false); // honeypot
  const [formStatus, setFormStatus] = useState({ loading: false, error: '', success: false });

  const applyPlan = (id) => {
    setBasePlan(id);
    const idx = monthlyTiers.findIndex((t) => t.id === id);
    setCustom(idx === -1 ? EMPTY_CUSTOM : tierToCustom(idx));
  };

  useEffect(() => {
    if (!prefilledService) return;
    setFormData((prev) => ({ ...prev, serviceInterest: prefilledService }));

    // ?package=growth ba ?package=Growth hole auto customize open hobe
    const p = prefilledService.toLowerCase();
    const tier = monthlyTiers.find((t) => t.id === p || t.name.toLowerCase() === p);
    if (tier) {
      setCustomize(true);
      applyPlan(tier.id);
    }
  }, [prefilledService]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const setNum = (key) => (v) => setCustom((prev) => ({ ...prev, [key]: v }));
  const setFlag = (key) => (v) => setCustom((prev) => ({ ...prev, [key]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formStatus.loading) return;

    if (!formData.name.trim() || !formData.contactInfo.trim() || !formData.message.trim()) {
      setFormStatus({ loading: false, success: false, error: 'Please fill in all required fields (Name, Contact Info, and Message).' });
      return;
    }
    if (!WEB3FORMS_KEY) {
      setFormStatus({ loading: false, success: false, error: 'Form is not configured yet. Please contact us by email or phone.' });
      return;
    }

    setFormStatus({ loading: true, error: '', success: false });

    const isEmail = formData.contactInfo.includes('@');
    const payload = {
      access_key: WEB3FORMS_KEY,
      subject: `New inquiry from ${formData.name}`,
      from_name: 'Website Contact Form',
      botcheck,
      Name: formData.name,
      'Email or Phone': formData.contactInfo,
      'Service Interest': formData.serviceInterest || 'Not selected',
      'Budget Range': formData.budgetRange || 'Not given',
      'Custom Package': customize ? buildSummary(basePlan, custom) : 'Not customized',
      Message: formData.message,
      ...(isEmail ? { email: formData.contactInfo } : {}), // email hole Gmail e Reply dilei client er kache jabe
    };

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setFormStatus({ loading: false, error: '', success: true });
      } else {
        setFormStatus({ loading: false, success: false, error: data.message || 'Something went wrong. Please try again.' });
      }
    } catch {
      setFormStatus({ loading: false, success: false, error: 'Network error. Please check your connection and try again.' });
    }
  };

  const resetForm = () => {
    setFormStatus({ loading: false, error: '', success: false });
    setFormData({ name: '', contactInfo: '', serviceInterest: '', budgetRange: '', message: '' });
    setCustomize(false);
    setBasePlan('');
    setCustom(EMPTY_CUSTOM);
  };

  return (
    <div className="bg-white">
      {/* HERO */}
      <section className="bg-[#0A0A0A] text-white pt-16 pb-20 sm:pt-20 sm:pb-24 border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-mono font-semibold tracking-wider text-orange-500 uppercase block">CONTACT</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Tell us what you’re building.
            </h1>
            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed pt-2">
              Share a little about your project, and start a conversation about the support you need.
            </p>
          </div>
        </div>
      </section>

      {/* FORM & INFO */}
      <section className="py-16 sm:py-24 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Form */}
            <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-xl border border-zinc-200/90 shadow-sm">
              <div className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950">Start an inquiry</h2>
              </div>

              {formStatus.success ? (
                <div className="p-6 bg-orange-50 border border-orange-200 rounded-lg text-zinc-800 space-y-3" role="status">
                  <div className="flex items-center gap-2 text-orange-600 font-bold">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Inquiry Received</span>
                  </div>
                  <p className="text-sm leading-relaxed">
                    Thank you, <strong>{formData.name}</strong>. We’ve received your message and will get back to you soon.
                  </p>
                  <button type="button" onClick={resetForm} className="text-xs font-semibold text-orange-600 underline hover:text-orange-700 pt-2 block">
                    Submit another response
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {formStatus.error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded text-xs text-red-700 flex items-center gap-2" role="alert">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{formStatus.error}</span>
                    </div>
                  )}

                  {/* Honeypot: bot ra fill kore, manush dekhe na */}
                  <input
                    type="checkbox"
                    name="botcheck"
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                    checked={botcheck}
                    onChange={(e) => setBotcheck(e.target.checked)}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-xs font-bold text-zinc-800 mb-2">Name *</label>
                      <input id="name" name="name" type="text" required value={formData.name} onChange={handleChange} placeholder="Your name" className={inputCls} />
                    </div>
                    <div>
                      <label htmlFor="contactInfo" className="block text-xs font-bold text-zinc-800 mb-2">Email or Phone *</label>
                      <input id="contactInfo" name="contactInfo" type="text" required value={formData.contactInfo} onChange={handleChange} placeholder="Your email or phone number" className={inputCls} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="serviceInterest" className="block text-xs font-bold text-zinc-800 mb-2">Service Interest</label>
                      <select id="serviceInterest" name="serviceInterest" value={formData.serviceInterest} onChange={handleChange} className={inputCls}>
                        <option value="">Select an interest</option>
                        {servicesData.map((s) => (
                          <option key={s.id} value={s.title}>{s.title}</option>
                        ))}
                        <option value="General Collaboration / Quote">General Collaboration / Quote</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="budgetRange" className="block text-xs font-bold text-zinc-800 mb-2">Optional Budget Range</label>
                      <input id="budgetRange" name="budgetRange" type="text" value={formData.budgetRange} onChange={handleChange} placeholder="Optional — use your preferred currency" className={inputCls} />
                    </div>
                  </div>

                  {/* ---------- CUSTOMIZE YOUR PACKAGE (optional) ---------- */}
                  <div className="rounded-xl border border-zinc-200 bg-zinc-50/60">
                    <button
                      type="button"
                      onClick={() => setCustomize((v) => !v)}
                      aria-expanded={customize}
                      className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left"
                    >
                      <span className="flex items-center gap-2.5">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
                          <Sparkles className="h-4 w-4" />
                        </span>
                        <span>
                          <span className="block text-sm font-bold text-zinc-900">
                            Customize your package <span className="font-medium text-zinc-400">(optional)</span>
                          </span>
                          <span className="block text-xs text-zinc-500">Build a plan that fits you, and we’ll quote it.</span>
                        </span>
                      </span>
                      <ChevronDown className={`h-5 w-5 shrink-0 text-zinc-500 transition-transform ${customize ? 'rotate-180' : ''}`} />
                    </button>

                    {customize && (
                      <div className="space-y-5 border-t border-zinc-200 p-4">
                        <div>
                          <label htmlFor="basePlan" className="block text-xs font-bold text-zinc-800 mb-2">Start from a plan</label>
                          <select id="basePlan" value={basePlan} onChange={(e) => applyPlan(e.target.value)} className={inputCls}>
                            <option value="">Start from scratch</option>
                            {monthlyTiers.map((t) => (
                              <option key={t.id} value={t.id}>{t.name}</option>
                            ))}
                          </select>
                          <p className="mt-1.5 text-xs text-zinc-500">Plan select korle tar default value gulo niche boshe jabe, tumi ichchhamoto bodlate parbe.</p>
                        </div>

                        <div>
                          <p className="text-xs font-bold text-zinc-800 mb-2">Monthly content</p>
                          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                            {COUNTERS.map((x) => (
                              <Stepper key={x.key} label={x.label} value={custom[x.key]} onChange={setNum(x.key)} />
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="text-xs font-bold text-zinc-800 mb-2">Ads, growth & support</p>
                          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                            {TOGGLES.map((x) => (
                              <Toggle key={x.key} label={x.label} checked={custom[x.key]} onChange={setFlag(x.key)} />
                            ))}
                          </div>
                        </div>

                        <p className="text-xs text-zinc-500">{adSpendNote}</p>
                      </div>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-bold text-zinc-800 mb-2">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="What would you like to discuss?"
                      className={`${inputCls} py-3`}
                    />
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={formStatus.loading}
                      className="inline-flex items-center gap-2 px-7 py-3 bg-orange-600 hover:bg-orange-500 disabled:cursor-not-allowed disabled:opacity-70 text-white font-medium text-sm rounded-md transition-all shadow-sm active:scale-[0.98]"
                    >
                      {formStatus.loading && <Loader2 className="h-4 w-4 animate-spin" />}
                      {formStatus.loading ? 'Sending...' : 'Send Inquiry'}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Right column */}
            <div className="lg:col-span-5 space-y-8 lg:pt-4">
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 mb-6">Other ways to connect</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-zinc-900 mb-1 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-orange-500" />
                    <span>Email</span>
                  </h4>
                  <p className="text-xs font-mono text-zinc-500 bg-zinc-100/80 p-2 rounded inline-block">{companyData.contact.emailPlaceholder}</p>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-zinc-900 mb-1 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-orange-500" />
                    <span>Phone</span>
                  </h4>
                  <p className="text-xs font-mono text-zinc-500 bg-zinc-100/80 p-2 rounded inline-block">{companyData.contact.phonePlaceholder}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}