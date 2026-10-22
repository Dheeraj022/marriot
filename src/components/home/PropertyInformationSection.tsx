import React from "react";
import { SITE_CONFIG } from "@/data/site-config";

export function PropertyInformationSection() {
  return (
    <section
      aria-label="Property Information"
      className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      <div className="rounded-3xl bg-[#06172A] border border-[#123452] p-8 sm:p-12 lg:p-14 shadow-2xl relative overflow-hidden">
        {/* Subtle decorative brand glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#F6B936]/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#123452]/25 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

        <div className="relative z-10 max-w-4xl space-y-6">
          {/* Main Title with Gold Accent Underline */}
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-[42px] font-serif font-bold text-[#F7F8FA] tracking-tight">
              Property Information
            </h2>
            <div className="w-14 sm:w-16 h-[2.5px] bg-[#F6B936] mt-2.5 rounded-full" />
          </div>

          {/* Description Paragraphs */}
          <div className="space-y-5 text-sm sm:text-base text-[#C4D1DF] font-light leading-relaxed pt-2">
            <p>
              Courtyard by Marriott is a premier hospitality brand featuring 29 modern destinations across key metropolitan centers, heritage getaways, and scenic retreats in India. The destinations include diverse accommodation options, signature dining experiences, executive business facilities, and leisure amenities.
            </p>

            <p>
              This page is intended to provide general property information and enquiry assistance to travellers looking for accommodation options and related information across premier locations in India.
            </p>

            {/* Subheading & Agency Independence */}
            <div className="pt-2">
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#F7F8FA] mb-3">
                Independent Information &amp; Enquiry Service
              </h3>
              <p>
                {SITE_CONFIG.name} is operated by {SITE_CONFIG.operatorName}, an independent travel agency. We provide general property information, travel guidance and enquiry assistance. We are not the owner, operator or official representative of Courtyard by Marriott or Marriott International unless specifically stated.
              </p>
            </div>

            {/* Enquiry Notice Box */}
            <div className="pt-3">
              <div className="p-4 sm:p-5 rounded-2xl bg-[#03101F]/80 border border-[#123452] max-w-3xl shadow-inner">
                <p className="text-xs sm:text-sm text-[#C4D1DF] leading-relaxed">
                  <strong className="text-[#FFD16A] font-semibold">Enquiry Notice:</strong> Submitting an enquiry does not confirm a booking. Availability, pricing, accommodation options and inclusions are subject to confirmation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
