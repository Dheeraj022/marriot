"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { X, Building2, MapPin, BedDouble, Info, Mail, Compass } from "lucide-react";
import { SITE_CONFIG } from "@/data/site-config";
import { CallNowButton } from "@/components/shared/CallNowButton";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  currentPath: string;
}

export function MobileMenu({ isOpen, onClose, currentPath }: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const links = [
    { label: "Home", href: "/", icon: Building2 },
    { label: "All 29 Locations", href: "/#directory", icon: MapPin },
    { label: "Accommodation", href: "/#accommodation", icon: BedDouble },
    { label: "About Us", href: "/about", icon: Info },
    { label: "Contact Us", href: "/contact", icon: Mail },
  ];

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#03101F]/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-[#06172A] border-l border-[#123452] shadow-2xl p-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#FFE399] via-[#F6B936] to-[#b37c15] p-[1.5px] shadow-md flex items-center justify-center">
                <div className="w-full h-full bg-[#03101F] rounded-[7px] flex items-center justify-center">
                  <Compass className="w-4 h-4 text-[#F6B936]" />
                </div>
              </div>
              <div>
                <span className="block font-serif font-bold text-sm text-[#F7F8FA] tracking-wide leading-tight">
                  {SITE_CONFIG.name}
                </span>
                <span className="block text-[10px] text-[#8ba2bc] tracking-normal font-normal mt-0.5">
                  {SITE_CONFIG.networkTagline}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-lg text-[#C4D1DF] hover:text-[#F7F8FA] hover:bg-[#0A2340] transition-colors focus:outline-none focus:ring-2 focus:ring-[#F6B936]"
              aria-label="Close navigation menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Nav links */}
          <nav className="py-6 space-y-1">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = currentPath === link.href;

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={onClose}
                  className={`flex items-center gap-3.5 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "bg-[#F6B936]/15 text-[#FFD16A] font-semibold border border-[#F6B936]/30"
                      : "text-[#C4D1DF] hover:bg-[#0A2340] hover:text-[#F7F8FA]"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#F6B936]" : "text-[#8ba2bc]"}`} />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom CTA & Operator Notice */}
        <div className="pt-6 border-t border-white/10 space-y-4">
          <CallNowButton className="w-full justify-center py-3 text-sm" />

          <div className="p-3 rounded-lg bg-[#03101F]/70 border border-[#123452] text-center space-y-1">
            <span className="block text-[11px] text-[#8ba2bc] uppercase tracking-wider">
              Enquiry Helpline
            </span>
            <a
              href={SITE_CONFIG.phoneTel}
              className="text-sm font-bold text-[#FFD16A] hover:underline"
            >
              {SITE_CONFIG.phoneDisplay}
            </a>
          </div>

          <p className="text-[10px] text-[#8ba2bc] text-center leading-relaxed">
            Courtyard by Marriott India. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
