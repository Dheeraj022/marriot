import React from "react";
import { Metadata } from "next";
import { SITE_CONFIG } from "@/data/site-config";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { RoleIndependenceSection } from "@/components/shared/RoleIndependenceSection";

export const metadata: Metadata = {
  title: "Disclaimer & Information Notice",
  description: "Website disclaimer and stay enquiry information notice for Courtyard by Marriott India.",
};

export default function DisclaimerPage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
      <SectionHeading
        eyebrow="NOTICE"
        title="Disclaimer & Information Notice"
        description="Important information regarding stay enquiries, room tariffs, and property details."
      />

      <RoleIndependenceSection className="px-0 sm:px-0 lg:px-0" />

      <div className="bg-[#06172A] border border-[#123452] rounded-3xl p-6 sm:p-10 space-y-6 text-sm text-[#C4D1DF] leading-relaxed shadow-xl">
        <section className="space-y-4">
          <div className="flex items-center gap-2.5 pb-2 border-b border-white/10">
            <h2 className="font-serif font-bold text-2xl text-[#FFD16A]">
              Property Information Disclaimer
            </h2>
          </div>

          <p className="leading-relaxed">
            Property names, descriptions, images, amenities and other details are presented for general informational purposes and may change. We aim to keep information useful, but visitors should independently verify important details with the relevant property or booking provider.
          </p>

          <p className="leading-relaxed">
            Submitting a request through Guest Assist does not guarantee room availability, rates or a confirmed reservation. Any final booking, payment, cancellation or refund terms must be confirmed with the party responsible for the reservation.
          </p>

          <p className="leading-relaxed font-medium text-[#F7F8FA]">
            Guest Assist is operated by Brightspark Leisure Services Private Limited and is independent of the hotels listed on this website. Unless a specific relationship is accurately disclosed and can be substantiated, Guest Assist does not represent itself as a hotel owner, operator, manager or authorized booking agent.
          </p>

          <p className="leading-relaxed text-xs text-[#8ba2bc]">
            All third-party names and trademarks belong to their respective owners. Their appearance is for identification and informational purposes only; it does not imply affiliation or endorsement.
          </p>
        </section>

        <section className="space-y-2 pt-4 border-t border-white/10">
          <h3 className="font-serif font-bold text-lg text-[#F7F8FA]">Real-Time Availability & Reference Details</h3>
          <p>
            While every effort is made to maintain up-to-date descriptions, amenities, and photographic representations of all 29 Courtyard by Marriott hotels in India, seasonal operations, facility renovations, and room availability may vary. Room allocations and special concessions are confirmed upon reservation.
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-[#8ba2bc] pt-1">
            <li>Amenities shown are for reference only. Availability, access, timings and inclusions may vary.</li>
            <li>Dining information is for reference only. Timings, availability and charges may vary.</li>
          </ul>
        </section>

        <section className="space-y-2 pt-4 border-t border-white/10">
          <h3 className="font-serif font-bold text-lg text-[#F7F8FA]">Stay Enquiries & Assistance</h3>
          <p>
            Enquiry submissions facilitate personalized booking assistance, group coordination, and banquet requirements. For any clarifications with your stay planning, please contact our dedicated guest assistance desk at{" "}
            <a href={SITE_CONFIG.phoneTel} className="text-[#FFD16A] underline font-semibold">
              {SITE_CONFIG.phoneDisplay}
            </a>{" "}
            or email{" "}
            <a href={`mailto:${SITE_CONFIG.email}`} className="text-[#FFD16A] underline font-semibold">
              {SITE_CONFIG.email}
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
}
