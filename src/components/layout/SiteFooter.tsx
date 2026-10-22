import React from "react";
import Link from "next/link";
import { Compass, PhoneCall, Mail, MapPin, Clock, ShieldCheck } from "lucide-react";
import { SITE_CONFIG } from "@/data/site-config";
import { CallNowButton } from "@/components/shared/CallNowButton";

export function SiteFooter() {
  const currentYear = 2026;

  return (
    <footer className="bg-[#03101F] border-t border-[#123452] text-[#C4D1DF] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand & Mission (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FFE399] via-[#F6B936] to-[#b37c15] p-[1.5px] shadow-lg shadow-[#F6B936]/20">
                <div className="w-full h-full bg-[#03101F] rounded-[10px] flex items-center justify-center">
                  <Compass className="w-5 h-5 text-[#F6B936]" />
                </div>
              </div>
              <div>
                <span className="block font-serif font-bold text-xl text-[#F7F8FA] leading-tight">
                  {SITE_CONFIG.name}
                </span>
                <span className="block text-xs text-[#8ba2bc] tracking-normal font-normal mt-0.5">
                  {SITE_CONFIG.networkTagline}
                </span>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-[#C4D1DF]/90 max-w-sm">
            </p>

            <div className="pt-2">
              <CallNowButton variant="outline" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-[#F7F8FA]">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-[#FFD16A] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/locations" className="hover:text-[#FFD16A] transition-colors">
                  All 29 Locations
                </Link>
              </li>
              <li>
                <Link href="/#accommodation" className="hover:text-[#FFD16A] transition-colors">
                  Accommodation Options
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#FFD16A] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#FFD16A] transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Information */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-[#F7F8FA]">
              Legal & Policies
            </h4>
            <ul className="space-y-2 text-sm">
              {SITE_CONFIG.legalLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-[#FFD16A] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-[#F7F8FA]">
              Stay Assistance
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <PhoneCall className="w-4 h-4 text-[#F6B936] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs text-[#8ba2bc]">Phone Enquiry:</span>
                  <a href={SITE_CONFIG.phoneTel} className="text-[#FFD16A] font-semibold hover:underline">
                    {SITE_CONFIG.phoneDisplay}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#F6B936] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs text-[#8ba2bc]">Email:</span>
                  <a href={`mailto:${SITE_CONFIG.email}`} className="text-[#F7F8FA] hover:text-[#FFD16A]">
                    {SITE_CONFIG.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#F6B936] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs text-[#8ba2bc]">Hours:</span>
                  <span className="text-xs text-[#C4D1DF]">{SITE_CONFIG.businessHours}</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#F6B936] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs text-[#8ba2bc]">Operator:</span>
                  <span className="text-xs text-[#C4D1DF]">
                    {SITE_CONFIG.operatorName}
                  </span>
                  <span className="block text-[11px] text-[#8ba2bc] mt-0.5 font-mono">
                    GSTIN: {SITE_CONFIG.gst}
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Important Information & Disclaimer Cards */}
        <div className="my-8 space-y-4">
          {/* Card 1: Important Information */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#06172A] border border-[#123452] shadow-md transition-all hover:border-[#1A456C]">
            <div className="flex items-start gap-3.5 sm:gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#06261E] border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                <ShieldCheck className="w-5 h-5 stroke-[2]" />
              </div>
              <div className="space-y-1.5 flex-1 min-w-0">
                <h5 className="font-bold text-xs sm:text-sm tracking-wider uppercase text-[#F7F8FA]">
                  IMPORTANT INFORMATION
                </h5>
                <p className="text-xs sm:text-[13px] text-[#C4D1DF] leading-relaxed">
                  Prices and availability may vary by property, travel dates and occupancy. {SITE_CONFIG.name}, operated by {SITE_CONFIG.operatorName}, is an independent travel agency. Final property availability with our best assistance.
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: Disclaimer */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#06172A] border border-[#123452] shadow-md transition-all hover:border-[#1A456C]">
            <div className="flex items-start gap-3.5 sm:gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#06261E] border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                <ShieldCheck className="w-5 h-5 stroke-[2]" />
              </div>
              <div className="space-y-1.5 flex-1 min-w-0">
                <h5 className="font-bold text-xs sm:text-sm tracking-wider uppercase text-[#F7F8FA]">
                  DISCLAIMER
                </h5>
                <p className="text-xs sm:text-[13px] text-[#C4D1DF] leading-relaxed">
                  {SITE_CONFIG.name} is operated by {SITE_CONFIG.operatorName}, an independent travel agency. We are not affiliated with, endorsed by or sponsored by any hotel, resort, villa or other service provider. All brand names, logos and trademarks belong to their respective owners.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright and Operator line */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8ba2bc] gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <p>
              © {currentYear} {SITE_CONFIG.name}. Operated by {SITE_CONFIG.companyName} (GSTIN: {SITE_CONFIG.gst}). All rights reserved.
            </p>
            <p className="text-[11px] text-[#FFD16A]/90 font-medium tracking-wide">
              {SITE_CONFIG.footerAssistanceNotice}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="hover:text-[#FFD16A] transition-colors">
              Privacy
            </Link>
            <span>•</span>
            <Link href="/terms-of-service" className="hover:text-[#FFD16A] transition-colors">
              Terms
            </Link>
            <span>•</span>
            <Link href="/disclaimer" className="hover:text-[#FFD16A] transition-colors">
              Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
