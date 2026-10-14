import React from "react";
import { Metadata } from "next";
import { SITE_CONFIG } from "@/data/site-config";
import { SectionHeading } from "@/components/shared/SectionHeading";

export const metadata: Metadata = {
  title: "Privacy Policy | Courtyard by Marriott",
  description: "Privacy policy and data handling practices for Courtyard by Marriott India stay enquiry portal.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      <SectionHeading
        eyebrow="LEGAL & PRIVACY"
        title="Privacy Policy"
        description="How we handle your stay enquiries, contact details, and reservation preferences."
      />

      <div className="bg-[#06172A] border border-[#123452] rounded-2xl p-6 sm:p-10 space-y-6 text-sm text-[#C4D1DF] leading-relaxed">
        <section className="space-y-2">
          <h3 className="font-serif font-bold text-lg text-[#F7F8FA]">1. Data Controller Information</h3>
          <p>
            This portal is operated for <strong>{SITE_CONFIG.name}</strong> ({SITE_CONFIG.address.city}, {SITE_CONFIG.address.state}, India) to facilitate stay enquiries and customer service across our 29 Indian properties.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-serif font-bold text-lg text-[#F7F8FA]">2. Information We Collect</h3>
          <p>When you submit a stay enquiry or contact request on this website, we collect only information necessary to assist with your stay:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Full Name</li>
            <li>Email Address</li>
            <li>Mobile / Phone Number</li>
            <li>Selected destination property and intended travel dates</li>
            <li>Guest count (adults, children, room requirements)</li>
            <li>Optional preferences or special requests you include in your message</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h3 className="font-serif font-bold text-lg text-[#F7F8FA]">3. Purpose of Processing</h3>
          <p>We process collected data exclusively to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Review and respond to your hotel stay enquiry.</li>
            <li>Coordinate property guidance and room availability details.</li>
            <li>Prevent automated spam and protect website infrastructure.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h3 className="font-serif font-bold text-lg text-[#F7F8FA]">4. No Financial Information Stored</h3>
          <p>
            This website does not collect hotel payments, credit card details, or financial deposits. All room reservations and monetary transactions occur securely upon reservation confirmation.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-serif font-bold text-lg text-[#F7F8FA]">5. Contact Us Regarding Your Data</h3>
          <p>
            To request correction or deletion of your enquiry details, contact our privacy officer at{" "}
            <a href={`mailto:${SITE_CONFIG.email}`} className="text-[#FFD16A] underline">
              {SITE_CONFIG.email}
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
}
