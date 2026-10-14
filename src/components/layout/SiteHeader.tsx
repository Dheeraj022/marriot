"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Info, Compass } from "lucide-react";
import { SITE_CONFIG } from "@/data/site-config";
import { CallNowButton } from "@/components/shared/CallNowButton";
import { MobileMenu } from "@/components/layout/MobileMenu";

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Top Advisory Banner */}
      <div className="bg-[#06172A] border-b border-[#123452] px-4 py-1.5 text-xs text-[#C4D1DF] hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 truncate">
            <Info className="w-3.5 h-3.5 text-[#F6B936] shrink-0" />
            <span className="truncate">
              <strong className="text-[#F7F8FA]">Courtyard by Marriott:</strong> 29 Premier Hotels & Resorts Across India
            </span>
          </div>
          <div className="flex items-center gap-4 shrink-0 text-xs">
            <span className="text-[#8ba2bc]">Dedicated Stay Assistance:</span>
            <a
              href={SITE_CONFIG.phoneTel}
              className="text-[#FFD16A] hover:underline font-semibold"
            >
              {SITE_CONFIG.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className="sticky top-0 z-40 w-full bg-[#03101F]/90 backdrop-blur-md border-b border-white/10 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group focus:outline-none">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#FFE399] via-[#F6B936] to-[#b37c15] p-[1.5px] shadow-lg shadow-[#F6B936]/20 transition-transform duration-300 group-hover:scale-105">
              <div className="w-full h-full bg-[#03101F] rounded-[10px] flex items-center justify-center relative overflow-hidden">
                <Compass className="w-5 h-5 text-[#F6B936] transition-transform duration-500 group-hover:rotate-45" />
              </div>
            </div>
            <div>
              <span className="block font-serif font-bold text-xl text-[#F7F8FA] tracking-wide group-hover:text-[#FFD16A] transition-colors">
                {SITE_CONFIG.name}
              </span>
              <span className="block text-[11px] text-[#C4D1DF] tracking-wider uppercase font-medium">
                {SITE_CONFIG.tagline}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
            {SITE_CONFIG.navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`transition-colors duration-200 relative py-1 ${
                    isActive
                      ? "text-[#FFD16A] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#F6B936]"
                      : "text-[#C4D1DF] hover:text-[#F7F8FA]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Call Now & Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <CallNowButton />
            </div>

            <div className="sm:hidden">
              <CallNowButton variant="compact" />
            </div>

            {/* Mobile Hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-lg text-[#C4D1DF] hover:text-[#F7F8FA] hover:bg-[#0A2340] focus:outline-none focus:ring-2 focus:ring-[#F6B936]"
              aria-label="Open mobile navigation"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        currentPath={pathname}
      />
    </>
  );
}
