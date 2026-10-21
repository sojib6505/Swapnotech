import React from 'react';
import { Link } from 'react-router-dom';
import { companyData } from '../../data/companyData';

export default function Footer() {
  return (
    <footer className="bg-[#050505] text-zinc-400 text-sm border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          
          {/* Brand & Purpose Column */}
          <div className="md:col-span-6 space-y-4">
            <h3 className="text-xl font-bold tracking-tight text-white">
              {companyData.name}
            </h3>
            <p className="max-w-md text-zinc-400 leading-relaxed text-[15px]">
              {companyData.shortDescription}
            </p>
            <div className="pt-2">
              <span className="inline-block px-3 py-1 bg-zinc-900 text-zinc-400 rounded text-xs font-mono border border-zinc-800">
                {companyData.contact.emailPlaceholder}
              </span>
            </div>
          </div>

          {/* Explore Links Column */}
          <div className="md:col-span-6 md:pl-12">
            <p className="text-xs font-semibold tracking-wider text-orange-500 uppercase mb-5">
              EXPLORE
            </p>
            <div className="grid grid-cols-2 gap-x-8 gap-y-3 max-w-xs">
              <div>
                <ul className="space-y-3">
                  <li>
                    <Link to="/" className="hover:text-white transition-colors">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/packages" className="hover:text-white transition-colors">
                      Packages
                    </Link>
                  </li>
                  <li>
                    <Link to="/blog" className="hover:text-white transition-colors">
                      Blog
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <ul className="space-y-3">
                  <li>
                    <Link to="/services" className="hover:text-white transition-colors">
                      Services
                    </Link>
                  </li>
                  <li>
                    <Link to="/portfolio" className="hover:text-white transition-colors">
                      Portfolio
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" className="hover:text-white transition-colors">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-900">
              <span className="inline-block text-xs font-mono text-zinc-500">
                {companyData.contact.socialPlaceholder}
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Prototype Notice */}
        <div className="pt-8 border-t border-zinc-900/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <p>© {new Date().getFullYear()} Swapno Tech · Website prototype</p>
          <p className="text-center sm:text-right">
            Content and project placeholders require approval before launch.
          </p>
        </div>
      </div>
    </footer>
  );
}
