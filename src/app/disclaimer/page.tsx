import React from "react";
import { Metadata } from "next";
import { SITE_CONFIG } from "@/data/site-config";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Disclaimer & Information Notice",
  description: "Website disclaimer and stay enquiry information notice for Courtyard by Marriott India.",
};

export default function DisclaimerPage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      <SectionHeading
        eyebrow="NOTICE"
        title="Disclaimer & Information Notice"
        description="Important information regarding stay enquiries, room tariffs, and property details."
      />

      <div className="bg-[#06172A] border border-[#123452] rounded-2xl p-6 sm:p-10 space-y-6 text-sm text-[#C4D1DF] leading-relaxed">
        <div className="p-5 rounded-xl bg-[#03101F] border border-[#123452] flex items-start gap-3 text-xs sm:text-sm text-[#F7F8FA]">
          <ShieldCheck className="w-6 h-6 text-[#F6B936] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            {SITE_CONFIG.disclaimer.full}
          </p>
        </div>

        <section className="space-y-2">
          <h3 className="font-serif font-bold text-lg text-[#F7F8FA]">Property Information & Real-Time Availability</h3>
          <p>
            While every effort is made to maintain up-to-date descriptions, amenities, and photographic representations of all 29 Courtyard by Marriott hotels in India, seasonal operations, facility renovations, and room availability may vary. Room allocations and special concessions are confirmed upon reservation.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-serif font-bold text-lg text-[#F7F8FA]">Stay Enquiries & Tariff Quotations</h3>
          <p>
            Enquiry submissions facilitate personalized booking assistance, group coordination, and banquet requirements. Tariffs quoted by our coordinators reflect best available rates at the time of consultation, inclusive of applicable taxes and government levies as specified.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-serif font-bold text-lg text-[#F7F8FA]">Assistance & Support</h3>
          <p>
            For any clarifications or assistance with your stay planning, please contact our dedicated guest assistance desk at <strong>{SITE_CONFIG.phoneDisplay}</strong> or email <strong>{SITE_CONFIG.email}</strong>.
          </p>
        </section>
      </div>
    </div>
  );
}
