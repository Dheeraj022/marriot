import React from "react";
import { Metadata } from "next";
import { SITE_CONFIG } from "@/data/site-config";
import { SectionHeading } from "@/components/shared/SectionHeading";

export const metadata: Metadata = {
  title: "Terms of Service | Courtyard by Marriott",
  description: "Terms and conditions of use for the Courtyard by Marriott India stay enquiry portal.",
};

export default function TermsOfServicePage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      <SectionHeading
        eyebrow="LEGAL"
        title="Terms of Service"
        description="Terms governing the use of the Courtyard by Marriott stay enquiry platform."
      />

      <div className="bg-[#06172A] border border-[#123452] rounded-2xl p-6 sm:p-10 space-y-6 text-sm text-[#C4D1DF] leading-relaxed">
        <section className="space-y-2">
          <h3 className="font-serif font-bold text-lg text-[#F7F8FA]">1. Nature of Service</h3>
          <p>
            This website provides directory information, amenities, and stay enquiry coordination for <strong>Courtyard by Marriott</strong> properties across India. Submitting an enquiry allows our guest coordinators to verify room availability, rates, and special requests for your stay.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-serif font-bold text-lg text-[#F7F8FA]">2. Enquiries and Booking Confirmation</h3>
          <p>
            An enquiry submitted through this platform does not constitute an immediate confirmed room booking until details, applicable taxes, and reservation guarantees are finalized with our reservations desk or designated booking channels.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-serif font-bold text-lg text-[#F7F8FA]">3. Verification of Rates & Policies</h3>
          <p>
            All property features, room tariffs, taxes, meal inclusions, check-in timings, and cancellation policies are established in accordance with hotel property standards. Guests receive itemized confirmation details prior to completing any room reservation.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-serif font-bold text-lg text-[#F7F8FA]">4. User Conduct</h3>
          <p>
            Users agree to provide accurate, genuine contact details and travel dates when submitting enquiries. Automated scraping, spamming, or fraudulent booking requests are strictly prohibited.
          </p>
        </section>
      </div>
    </div>
  );
}
