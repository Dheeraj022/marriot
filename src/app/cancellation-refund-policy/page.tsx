import React from "react";
import { Metadata } from "next";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Cancellation & Refund Policy | GuestAssist",
  description: "Information regarding cancellation and refund terms for stays coordinated via GuestAssist.",
};

export default function CancellationRefundPolicyPage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      <SectionHeading
        eyebrow="POLICY GUIDELINES"
        title="Cancellation & Refund Policy"
        description="Clarification on booking cancellations, deposits, and refunds."
      />

      <div className="p-4 rounded-xl bg-[#F6B936]/10 border border-[#F6B936]/30 text-xs text-[#FFD16A] flex items-start gap-3">
        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
        <p>
          <strong>Draft Copy Notice:</strong> This policy outlines standard operational procedures regarding booking cancellations and refunds.
        </p>
      </div>

      <div className="bg-[#06172A] border border-[#123452] rounded-2xl p-6 sm:p-10 space-y-6 text-sm text-[#C4D1DF] leading-relaxed">
        <section className="space-y-2">
          <h3 className="font-serif font-bold text-lg text-[#F7F8FA]">1. No Fees Charged by GuestAssist</h3>
          <p>
            GuestAssist is an enquiry assistance service and charges zero consultation fees to travellers submitting stay enquiries. Because no payments or deposits are collected on this website, no refunds are processed directly by GuestAssist.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-serif font-bold text-lg text-[#F7F8FA]">2. Hotel Specific Cancellation Rules</h3>
          <p>
            When you finalize a room reservation directly with a Courtyard by Marriott property or an authorized booking agency, their specific cancellation schedule, deposit requirements, and refund conditions apply. Standard rules typically vary by rate category:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Flexible / Best Available Rates:</strong> Often permit cancellation without penalty up to 24-48 hours before check-in.</li>
            <li><strong>Prepaid / Promotional Rates:</strong> May be non-refundable or incur cancellation fees as determined by hotel policy.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h3 className="font-serif font-bold text-lg text-[#F7F8FA]">3. Assistance with Booking Modifications</h3>
          <p>
            If you need assistance contacting a hotel property to modify travel dates or clarify cancellation timelines for an enquiry we assisted with, our team will gladly provide the direct contact details of the hotel management.
          </p>
        </section>
      </div>
    </div>
  );
}
