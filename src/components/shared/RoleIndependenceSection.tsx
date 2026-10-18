import React from "react";
import { Check, X } from "lucide-react";
import { SITE_CONFIG } from "@/data/site-config";
import { cn } from "@/lib/utils";
import { TrustBadge } from "./TrustBadge";

interface RoleIndependenceSectionProps {
  className?: string;
  variant?: "full" | "compact";
  companyName?: string;
  brandName?: string;
  propertyScope?: string;
}

const WHAT_WE_DO = [
  "Property information & guidance",
  "Accommodation information",
  "General travel assistance",
  "Local sightseeing information",
  "Enquiry assistance",
  "Connecting travellers with relevant service providers where applicable",
];

const WHAT_WE_DONT_DO = [
  "We are not the property owner or operator.",
  "We do not represent the property officially unless stated.",
  "We do not guarantee room availability.",
  "We do not guarantee fixed prices.",
  "We do not claim the lowest or best price.",
  "We do not make misleading affiliation claims.",
  "We do not take online booking or payment through this information page.",
];

export function RoleIndependenceSection({
  className,
  companyName = SITE_CONFIG.operatorName,
  brandName = SITE_CONFIG.name,
  propertyScope = "Courtyard by Marriott, Marriott International, or any other property unless specifically stated",
}: RoleIndependenceSectionProps) {
  return (
    <section
      aria-label="Our Role & Independence"
      className={cn("w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", className)}
    >
      <div className="relative rounded-3xl bg-[#06172A] border border-[#123452] p-6 sm:p-10 lg:p-12 shadow-2xl overflow-hidden">
        {/* Subtle decorative gold ambient glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#F6B936]/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#123452]/20 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

        <div className="relative z-10 space-y-4 max-w-4xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#F7F8FA] tracking-tight">
              Our Role &amp; Independence
            </h2>
            <TrustBadge className="hidden md:inline-flex text-xs py-1.5 px-4" />
          </div>

          <p className="text-sm sm:text-base text-[#C4D1DF] leading-relaxed">
            <strong className="text-[#F7F8FA] font-medium">{brandName}</strong> is operated by{" "}
            <strong className="text-[#F7F8FA] font-medium">{companyName}</strong>, an independent travel and stay enquiry assistance agency.
          </p>

          <p className="text-sm sm:text-base text-[#C4D1DF] leading-relaxed">
            We provide general property information, guidance and enquiry assistance.
          </p>

          <p className="text-sm sm:text-base font-semibold text-[#FFD16A] leading-relaxed">
            We are not the owner, operator or official representative of {propertyScope}.
          </p>

          <p className="text-xs sm:text-sm text-[#8ba2bc] leading-relaxed pt-1">
            Property names, trademarks, images and other brand-related intellectual property belong to their respective owners.
          </p>
        </div>

        {/* Two Comparison Cards: What We Do vs What We Don't Do */}
        <div className="relative z-10 mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* What We Do Card */}
          <div className="rounded-2xl bg-[#0A2340]/60 border border-[#123452] p-6 sm:p-8 backdrop-blur-sm transition-all duration-300 hover:border-emerald-500/30 shadow-lg">
            <div className="flex items-center gap-3.5 mb-6">
              <div className="w-9 h-9 rounded-full bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                <Check className="w-5 h-5 stroke-[2.5]" />
              </div>
              <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#F7F8FA]">
                What We Do
              </h3>
            </div>

            <ul className="space-y-3.5">
              {WHAT_WE_DO.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-sm text-[#C4D1DF] leading-relaxed"
                >
                  <div className="w-5 h-5 rounded-full border border-emerald-500/50 bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[2.5]" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* What We Don't Do Card */}
          <div className="rounded-2xl bg-[#0A2340]/60 border border-[#123452] p-6 sm:p-8 backdrop-blur-sm transition-all duration-300 hover:border-rose-500/30 shadow-lg">
            <div className="flex items-center gap-3.5 mb-6">
              <div className="w-9 h-9 rounded-full bg-rose-500/10 border border-rose-500/40 flex items-center justify-center text-rose-400 shrink-0">
                <X className="w-5 h-5 stroke-[2.5]" />
              </div>
              <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#F7F8FA]">
                What We Don&apos;t Do
              </h3>
            </div>

            <ul className="space-y-3.5">
              {WHAT_WE_DONT_DO.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-sm text-[#C4D1DF] leading-relaxed"
                >
                  <div className="w-5 h-5 rounded-full border border-rose-500/50 bg-rose-500/10 flex items-center justify-center text-rose-400 shrink-0 mt-0.5">
                    <X className="w-3 h-3 stroke-[2.5]" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
