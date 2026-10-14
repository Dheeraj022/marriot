import React from "react";
import { Metadata } from "next";
import { SITE_CONFIG } from "@/data/site-config";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | GuestAssist",
  description: "Terms and conditions of use for the GuestAssist stay enquiry assistance platform.",
};

export default function TermsOfServicePage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      <SectionHeading
        eyebrow="LEGAL DRAFT"
        title="Terms of Service"
        description="Terms governing the use of the GuestAssist stay enquiry platform."
      />

      <div className="p-4 rounded-xl bg-[#F6B936]/10 border border-[#F6B936]/30 text-xs text-[#FFD16A] flex items-start gap-3">
        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
        <p>
          <strong>Draft Copy Notice:</strong> This document is draft legal copy prepared for review by BrightSpark Leisure Services Private Limited.
        </p>
      </div>

      <div className="bg-[#06172A] border border-[#123452] rounded-2xl p-6 sm:p-10 space-y-6 text-sm text-[#C4D1DF] leading-relaxed">
        <section className="space-y-2">
          <h3 className="font-serif font-bold text-lg text-[#F7F8FA]">1. Nature of Service</h3>
          <p>
            GuestAssist is an independent information and enquiry assistance platform operated by{" "}
            <strong>{SITE_CONFIG.operatorName}</strong>. Submitting an enquiry through this platform does NOT constitute a confirmed booking, contract of carriage, or room reservation with any hotel property.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-serif font-bold text-lg text-[#F7F8FA]">2. Non-Affiliation</h3>
          <p>
            GuestAssist is independent and is not owned, operated, authorized, or endorsed by Marriott International, Inc. All brand names and property references are used descriptively to assist users in locating hotel properties.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-serif font-bold text-lg text-[#F7F8FA]">3. Verification of Rates & Policies</h3>
          <p>
            All property features, room tariffs, taxes, meal inclusions, check-in rules, and cancellation policies are established by the respective hotel management. Users must verify all final terms directly prior to executing any booking or payment.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-serif font-bold text-lg text-[#F7F8FA]">4. Limitation of Liability</h3>
          <p>
            {SITE_CONFIG.operatorName} provides informational coordination on an as-is basis and disclaims liability for inaccuracies in hotel amenities, unforeseen price alterations, or room unavailability at third-party hotel venues.
          </p>
        </section>
      </div>
    </div>
  );
}
