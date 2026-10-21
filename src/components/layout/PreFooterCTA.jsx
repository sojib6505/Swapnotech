import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function PreFooterCTA() {
  return (
    <section className="bg-[#09090B] text-white py-16 sm:py-20 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Let's talk about what's next.
            </h2>
            <p className="mt-3 text-lg text-zinc-400">
              Tell us what you're working on.
            </p>
          </div>
          <div>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-orange-600 hover:bg-orange-500 text-white font-medium text-base rounded-md transition-all shadow-lg hover:shadow-orange-600/20 active:scale-[0.98]"
            >
              <span>Start an Inquiry</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
