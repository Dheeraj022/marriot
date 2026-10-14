import React from "react";
import Link from "next/link";
import {
  Search,
  FileText,
  Headphones,
  CalendarCheck,
  Info,
  ArrowRight,
  Building,
} from "lucide-react";

const STEPS = [
  {
    step: 1,
    icon: Search,
    title: "Search & Explore",
    description:
      "Browse hotel options in your preferred city or destination and view details.",
  },
  {
    step: 2,
    icon: FileText,
    title: "Send an Enquiry",
    description:
      "Share your travel dates, number of guests and preferences through our enquiry form or contact our team.",
  },
  {
    step: 3,
    icon: Headphones,
    title: "Get Assistance",
    description:
      "Our team will help you with available information and guide you with suitable options based on your requirements.",
  },
  {
    step: 4,
    icon: CalendarCheck,
    title: "Make Your Own Booking Decision",
    description:
      "Review the details shared and proceed directly with the hotel or booking provider of your choice. We do not process bookings or payments.",
  },
];

interface EnquiryProcessProps {
  className?: string;
  showCardWrapper?: boolean;
}

export function EnquiryProcess({
  className = "",
  showCardWrapper = true,
}: EnquiryProcessProps) {
  const content = (
    <div className="space-y-8 lg:space-y-10">
      {/* Header */}
      <div className="space-y-3">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#F7F8FA] flex items-center flex-wrap gap-2.5">
          <span>How Our</span>
          <span className="text-[#F6B936]">Enquiry Assistance</span>
          <span>Works</span>
          <span className="inline-block w-8 sm:w-12 h-[2.5px] bg-[#F6B936] rounded-full align-middle ml-1" />
        </h2>
        <p className="text-sm sm:text-base text-[#C4D1DF] max-w-2xl leading-relaxed">
          A simple and transparent process to help you find the right hotel for your next stay in India.
        </p>
      </div>

      {/* =========================================================================
          MOBILE / TABLET VIEW (< lg): Connected Vertical Timeline
          ========================================================================= */}
      <div className="lg:hidden space-y-0 pt-2">
        {STEPS.map((item, idx) => {
          const Icon = item.icon;
          const isLast = idx === STEPS.length - 1;

          return (
            <div key={item.step} className="flex items-start gap-4 sm:gap-6 relative group">
              {/* Left Column: Numbered Circle + Dashed Connecting Line */}
              <div className="flex flex-col items-center shrink-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#FFE399] via-[#F6B936] to-[#d49619] text-[#03101F] font-serif font-bold text-base sm:text-lg flex items-center justify-center shadow-lg shadow-[#F6B936]/20 z-10 transition-transform duration-200 group-hover:scale-105">
                  {item.step}
                </div>

                {!isLast && (
                  <div className="w-0 border-l-2 border-dashed border-[#F6B936]/50 min-h-[70px] sm:min-h-[80px] my-1.5" />
                )}
              </div>

              {/* Right Column: Icon Card + Step Content */}
              <div
                className={`flex items-start gap-3.5 sm:gap-5 flex-1 ${
                  !isLast ? "pb-6 sm:pb-8" : "pb-2"
                }`}
              >
                {/* Icon Card */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#06172A] border border-[#123452] flex items-center justify-center text-[#F6B936] shrink-0 shadow-md group-hover:border-[#F6B936]/40 transition-colors">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#F6B936]" />
                </div>

                {/* Text Content */}
                <div className="space-y-1 pt-1 flex-1">
                  <h3 className="font-serif font-bold text-base sm:text-lg text-[#F7F8FA]">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#C4D1DF] leading-relaxed max-w-xl">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* =========================================================================
          LAPTOP / DESKTOP VIEW (>= lg): 4-Column Horizontal Step Cards Pipeline
          ========================================================================= */}
      <div className="hidden lg:grid grid-cols-4 gap-6 relative">
        {STEPS.map((item, idx) => {
          const Icon = item.icon;
          const isLast = idx === STEPS.length - 1;

          return (
            <div
              key={item.step}
              className="bg-[#03101F]/80 border border-[#123452] hover:border-[#F6B936]/50 rounded-2xl p-6 relative flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-[#F6B936]/10 group"
            >
              {/* Card Header: Gold Circle & Icon Container */}
              <div className="flex items-center justify-between mb-5">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#FFE399] via-[#F6B936] to-[#d49619] text-[#03101F] font-serif font-bold text-base flex items-center justify-center shadow-md shadow-[#F6B936]/20 group-hover:scale-105 transition-transform">
                  {item.step}
                </div>

                <div className="w-12 h-12 rounded-xl bg-[#06172A] border border-[#123452] group-hover:border-[#F6B936]/40 flex items-center justify-center text-[#F6B936] transition-colors shadow-inner">
                  <Icon className="w-5 h-5 text-[#F6B936]" />
                </div>
              </div>

              {/* Card Body: Title & Description */}
              <div className="space-y-2 flex-1">
                <h3 className="font-serif font-bold text-base sm:text-lg text-[#F7F8FA] group-hover:text-[#FFD16A] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-[#C4D1DF] leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Sub-card step indicator tag */}
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-[#8ba2bc]">
                <span className="font-mono text-[#F6B936]">Step 0{item.step}</span>
                <span>{item.step === 4 ? "Direct Booking" : "Stay Planning"}</span>
              </div>

              {/* Pipeline Arrow Between Cards on Extra-Wide Screens */}
              {!isLast && (
                <div className="hidden xl:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-[#06172A] border border-[#F6B936]/50 items-center justify-center text-[#F6B936] shadow-lg">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Advisory / Disclaimer Notice Box */}
      <div className="rounded-2xl border border-[#F6B936] bg-[#06172A]/85 backdrop-blur-sm p-4 sm:p-5 flex items-start sm:items-center justify-between flex-col md:flex-row gap-4 shadow-xl shadow-black/30">
        <div className="flex items-start sm:items-center gap-3.5 sm:gap-4 flex-1">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-[#F6B936] flex items-center justify-center text-[#F6B936] shrink-0 mt-0.5 sm:mt-0">
            <Info className="w-4 h-4 sm:w-5 sm:h-5 text-[#F6B936]" />
          </div>
          <p className="text-xs sm:text-sm text-[#C4D1DF] leading-relaxed">
            Submitting an enquiry does not confirm a booking. Availability, rates and booking terms must be verified with the hotel or relevant booking provider.
          </p>
        </div>

        <div className="shrink-0 flex items-center gap-3 w-full md:w-auto pt-2 md:pt-0 border-t md:border-t-0 border-white/10">
          <Link
            href="/enquiry"
            className="w-full md:w-auto px-5 py-2.5 rounded-xl btn-gold text-xs font-bold inline-flex items-center justify-center gap-2 shadow-md transition-all shrink-0"
          >
            <span>Start Stay Enquiry</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#102033]" />
          </Link>
          <Link
            href="/#directory"
            className="hidden sm:inline-flex px-4 py-2.5 rounded-xl bg-[#0A2340] border border-[#123452] hover:border-[#F6B936]/40 text-xs font-semibold text-[#F7F8FA] hover:text-[#FFD16A] items-center gap-1.5 transition-colors shrink-0"
          >
            <Building className="w-3.5 h-3.5 text-[#F6B936]" />
            <span>29 Hotels</span>
          </Link>
        </div>
      </div>
    </div>
  );

  if (showCardWrapper) {
    return (
      <section className={`py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto ${className}`}>
        <div className="bg-gradient-to-b from-[#06172A] to-[#0A2340] border border-[#123452] rounded-3xl p-6 sm:p-10 md:p-12 lg:p-14 shadow-2xl relative overflow-hidden">
          {content}
        </div>
      </section>
    );
  }

  return (
    <section className={`py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto ${className}`}>
      {content}
    </section>
  );
}
