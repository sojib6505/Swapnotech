
import React from 'react';
import { Link } from 'react-router-dom';
import { companyData } from '../../data/companyData';
import { MessageCircle, Facebook, Phone } from 'lucide-react';
import logo from "../../../public/images/logo.png"

export default function Footer() {
  return (
    <footer className="bg-[#050505] text-zinc-400 text-sm border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">

          {/* Brand & Purpose Column */}
          <div className="md:col-span-6 space-y-4">
           <div className="flex items-center gap-3">
             <img src={logo} className="w-10 h-10" alt="Swapno Tech Logo" />
             <h3 className="text-xl font-bold tracking-tight text-white">
              {companyData.name}
            </h3>
           </div>

            <p className="max-w-md text-zinc-400 leading-relaxed text-[15px]">
              {companyData.shortDescription}
            </p>

            <div className="pt-2">
              <span className="inline-block px-3 py-1 bg-zinc-900 text-zinc-400 rounded text-xs font-mono border border-zinc-800">
                {companyData.contact.emailPlaceholder}
              </span>
            </div>

            {/* Social & Contact Icons */}
            <div className="flex items-center gap-3 pt-3">
              <a
                href="https://wa.me/8801994366641?text=Hello%20Swapno%20Tech!%20I%20am%20interested%20in%20your%20services.%20Could%20you%20please%20share%20more%20details%3F"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with us on WhatsApp"
                title="WhatsApp"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 text-zinc-400 hover:bg-green-600 hover:text-white hover:border-green-600 transition-all duration-200"
              >
                <MessageCircle size={19} />
              </a>

              <a
                href="https://www.facebook.com/swapnotech"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit our Facebook page"
                title="Facebook"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 text-zinc-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-200"
              >
                <Facebook size={19} />
              </a>

              <a
                href="tel:+8801994366641"
                aria-label="Call Swapno Tech"
                title="Call us"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 text-zinc-400 hover:bg-orange-600 hover:text-white hover:border-orange-600 transition-all duration-200"
              >
                <Phone size={19} />
              </a>
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

                  {/*
                  <li>
                    <Link to="/blog" className="hover:text-white transition-colors">
                      Blog
                    </Link>
                  </li>
                  */}
                </ul>
              </div>

              <div>
                <ul className="space-y-3">
                  <li>
                    <Link to="/services" className="hover:text-white transition-colors">
                      Services
                    </Link>
                  </li>

                  {/*
                  <li>
                    <Link to="/portfolio" className="hover:text-white transition-colors">
                      Portfolio
                    </Link>
                  </li>
                  */}

                  <li>
                    <Link to="/contact" className="hover:text-white transition-colors">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal */}
        <div className="pt-8 border-t border-zinc-900/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <p>© {new Date().getFullYear()} Swapno Tech</p>
        </div>
      </div>
    </footer>
  );
}
