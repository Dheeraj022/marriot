import React from "react";
import { Metadata } from "next";
import { SectionHeading } from "@/components/shared/SectionHeading";

export const metadata: Metadata = {
  title: "Cancellation & Refund Policy | Courtyard by Marriott",
  description: "Information regarding cancellation and refund terms for Courtyard by Marriott hotel stays across India.",
};

export default function CancellationRefundPolicyPage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      <SectionHeading
        eyebrow="POLICY GUIDELINES"
        title="Cancellation & Refund Policy"
        description="Clarification on booking cancellations, reservation deposits, and refund conditions."
      />

      <div className="bg-[#06172A] border border-[#123452] rounded-2xl p-6 sm:p-10 space-y-6 text-sm text-[#C4D1DF] leading-relaxed">
        <section className="space-y-2">
          <h3 className="font-serif font-bold text-lg text-[#F7F8FA]">1. No Fees for Stay Enquiries</h3>
          <p>
            Submitting a stay enquiry through this website is completely complimentary. No upfront deposits or processing fees are charged at the time of submitting an enquiry.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-serif font-bold text-lg text-[#F7F8FA]">2. Property Specific Cancellation Terms</h3>
          <p>
            When your reservation is finalized with a Courtyard by Marriott property, the specific cancellation schedule, deposit requirements, and refund terms governing your room rate category apply:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Flexible / Best Available Rates:</strong> Typically allow penalty-free cancellation up to 24-48 hours prior to check-in.</li>
            <li><strong>Prepaid / Promotional Offers:</strong> May be non-refundable or incur cancellation charges as specified in your booking confirmation.</li>
            <li><strong>Group & Event Bookings:</strong> Customized cancellation and attrition schedules are outlined in your group agreement.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h3 className="font-serif font-bold text-lg text-[#F7F8FA]">3. Assistance with Booking Modifications</h3>
          <p>
            If you need assistance modifying your travel dates, room count, or special requests for an enquiry coordinated with our team, please contact our helpline at <strong>+91 1800 890 4567</strong> or your assigned stay coordinator.
          </p>
        </section>
      </div>
    </div>
  );
}
