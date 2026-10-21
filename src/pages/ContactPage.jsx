import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CheckCircle2, AlertCircle, Mail, Phone, Share2 } from 'lucide-react';
import { companyData } from '../data/companyData';
import { servicesData } from '../data/servicesData';
import Button from '../components/ui/Button';

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

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: '',
    success: false,
  });

  useEffect(() => {
    if (prefilledService) {
      setFormData((prev) => ({ ...prev, serviceInterest: prefilledService }));
    }
  }, [prefilledService]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.contactInfo.trim() || !formData.message.trim()) {
      setFormStatus({
        submitted: true,
        error: 'Please fill in all required fields (Name, Contact Info, and Message).',
        success: false,
      });
      return;
    }

    // Interactive prototype handling: save to state
    setFormStatus({
      submitted: true,
      error: '',
      success: true,
    });

    // Reset after 6 seconds or keep success visible
  };

  return (
    <div className="bg-white">
      {/* HERO SECTION (Dark Banner matching 06-contact.png) */}
      <section className="bg-[#0A0A0A] text-white pt-16 pb-20 sm:pt-20 sm:pb-24 border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-mono font-semibold tracking-wider text-orange-500 uppercase block">
              CONTACT
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Tell us what you’re building.
            </h1>
            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed pt-2">
              Share a little about your project, and start a conversation about the support you need.
            </p>
          </div>
        </div>
      </section>

      {/* FORM & INFO SPLIT SECTION */}
      <section className="py-16 sm:py-24 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Form */}
            <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-xl border border-zinc-200/90 shadow-sm">
              <div className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 mb-3">
                  Start an inquiry
                </h2>
                <div className="inline-block px-3 py-1 bg-zinc-100 text-zinc-600 rounded text-xs font-mono">
                  {companyData.contact.formNoticePlaceholder}
                </div>
              </div>

              {formStatus.success ? (
                <div className="p-6 bg-orange-50 border border-orange-200 rounded-lg text-zinc-800 space-y-3">
                  <div className="flex items-center gap-2 text-orange-600 font-bold">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Inquiry Received</span>
                  </div>
                  <p className="text-sm leading-relaxed">
                    Thank you, <strong>{formData.name}</strong>. Your inquiry has been registered in this prototype interface. In production, this connects to your designated team mailbox or CRM.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setFormStatus({ submitted: false, error: '', success: false });
                      setFormData({
                        name: '',
                        contactInfo: '',
                        serviceInterest: '',
                        budgetRange: '',
                        message: '',
                      });
                    }}
                    className="text-xs font-semibold text-orange-600 underline hover:text-orange-700 pt-2 block"
                  >
                    Submit another response
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {formStatus.error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded text-xs text-red-700 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{formStatus.error}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name * */}
                    <div>
                      <label htmlFor="name" className="block text-xs font-bold text-zinc-800 mb-2">
                        Name *
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 bg-white text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                      />
                    </div>

                    {/* Email or Phone * */}
                    <div>
                      <label htmlFor="contactInfo" className="block text-xs font-bold text-zinc-800 mb-2">
                        Email or Phone *
                      </label>
                      <input
                        id="contactInfo"
                        name="contactInfo"
                        type="text"
                        required
                        value={formData.contactInfo}
                        onChange={handleChange}
                        placeholder="Your email or phone number"
                        className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 bg-white text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Service Interest */}
                    <div>
                      <label htmlFor="serviceInterest" className="block text-xs font-bold text-zinc-800 mb-2">
                        Service Interest *
                      </label>
                      <select
                        id="serviceInterest"
                        name="serviceInterest"
                        value={formData.serviceInterest}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 bg-white text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                      >
                        <option value="">Select an interest</option>
                        {servicesData.map((s) => (
                          <option key={s.id} value={s.title}>
                            {s.title}
                          </option>
                        ))}
                        <option value="General Collaboration / Quote">General Collaboration / Quote</option>
                      </select>
                    </div>

                    {/* Optional Budget Range */}
                    <div>
                      <label htmlFor="budgetRange" className="block text-xs font-bold text-zinc-800 mb-2">
                        Optional Budget Range
                      </label>
                      <input
                        id="budgetRange"
                        name="budgetRange"
                        type="text"
                        value={formData.budgetRange}
                        onChange={handleChange}
                        placeholder="Optional — use your preferred currency"
                        className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 bg-white text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                      />
                    </div>
                  </div>

                  {/* Message * */}
                  <div>
                    <label htmlFor="message" className="block text-xs font-bold text-zinc-800 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="What would you like to discuss?"
                      className="w-full px-4 py-3 rounded-lg border border-zinc-300 bg-white text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                    />
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="px-7 py-3 bg-orange-600 hover:bg-orange-500 text-white font-medium text-sm rounded-md transition-all shadow-sm active:scale-[0.98]"
                    >
                      Send Inquiry
                    </button>
                  </div>

                  <p className="text-xs font-mono text-zinc-400 pt-2 border-t border-zinc-100">
                    {companyData.contact.privacyNoticePlaceholder}
                  </p>
                </form>
              )}
            </div>

            {/* Right Column: Other ways to connect */}
            <div className="lg:col-span-5 space-y-8 lg:pt-4">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 mb-6">
                  Other ways to connect
                </h3>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-zinc-900 mb-1 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-orange-500" />
                    <span>Email</span>
                  </h4>
                  <p className="text-xs font-mono text-zinc-500 bg-zinc-100/80 p-2 rounded inline-block">
                    {companyData.contact.emailPlaceholder}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-zinc-900 mb-1 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-orange-500" />
                    <span>Phone</span>
                  </h4>
                  <p className="text-xs font-mono text-zinc-500 bg-zinc-100/80 p-2 rounded inline-block">
                    {companyData.contact.phonePlaceholder}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-zinc-900 mb-1 flex items-center gap-2">
                    <Share2 className="w-4 h-4 text-orange-500" />
                    <span>Social</span>
                  </h4>
                  <p className="text-xs font-mono text-zinc-500 bg-zinc-100/80 p-2 rounded inline-block">
                    {companyData.contact.socialPlaceholder}
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-zinc-200">
                <p className="text-xs text-zinc-500 leading-relaxed italic">
                  Please replace these details and review the form workflow before publishing.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
