"use client";

import React from "react";
import { Phone } from "lucide-react";
import { SITE_CONFIG } from "@/data/site-config";

export function MobileFloatingCallTab() {
  return (
    <aside
      aria-label="Direct Phone Assistance"
      className="fixed right-0 top-1/2 -translate-y-1/2 z-50 md:hidden"
    >
      <a
        href={SITE_CONFIG.phoneTel}
        className="group relative flex flex-col items-center justify-between py-4 px-1.5 w-[44px] h-[190px] bg-gradient-to-b from-[#061B24] via-[#041527] to-[#020C17] border-l-2 border-t-2 border-b-2 border-[#F6B936] rounded-l-2xl animate-call-tab-glow transition-all duration-300 active:scale-95 cursor-pointer select-none"
        aria-label={`Call Guest Assist directly at ${SITE_CONFIG.phoneDisplay}`}
        title={`Call ${SITE_CONFIG.phoneDisplay}`}
      >
        {/* Subtle breathing glow effect behind border */}
        <span className="absolute -inset-0.5 rounded-l-2xl bg-gradient-to-l from-transparent via-[#F6B936]/15 to-[#F6B936]/30 -z-10 blur-[3px] pointer-events-none" />

        {/* Rotated CALL NOW Text */}
        <div className="flex-1 flex items-center justify-center w-full overflow-hidden">
          <span className="block -rotate-90 whitespace-nowrap text-[12px] font-bold tracking-[0.24em] text-[#FFE399] uppercase transition-colors group-hover:text-[#F6B936]">
            CALL NOW
          </span>
        </div>

        {/* Circular Phone Icon with gentle ringing animation */}
        <div className="relative shrink-0 flex items-center justify-center mt-1">
          {/* Subtle pulse ring around circle */}
          <span className="absolute inset-0 rounded-full bg-[#F6B936]/30 animate-ping opacity-60 pointer-events-none" />

          <div className="w-9 h-9 rounded-full bg-[#03101F] border border-[#F6B936]/80 flex items-center justify-center shadow-inner relative z-10 transition-transform group-hover:scale-105">
            <Phone className="w-4 h-4 text-[#F6B936] fill-[#F6B936]/20 transition-transform animate-phone-wiggle" />
          </div>
        </div>
      </a>
    </aside>
  );
}
