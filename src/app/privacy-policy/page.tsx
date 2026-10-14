import React from "react";
import { Metadata } from "next";
import { SITE_CONFIG } from "@/data/site-config";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | GuestAssist",
  description: "Privacy policy and data handling practices for GuestAssist, operated by BrightSpark Leisure Services Private Limited.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      <SectionHeading
        eyebrow="LEGAL DRAFT"
        title="Privacy Policy"
        description="Draft document outlining how visitor stay enquiries and contact details are handled."
      />

      <div className="p-4 rounded-xl bg-[#F6B936]/10 border border-[#F6B936]/30 text-xs text-[#FFD16A] flex items-start gap-3">
        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
        <p>
          <strong>Draft Copy Notice:</strong> This privacy policy is a draft document provided for review by BrightSpark Leisure Services Private Limited and legal advisors before final commercial deployment.
        </p>
      </div>

      <div className="bg-[#06172A] border border-[#123452] rounded-2xl p-6 sm:p-10 space-y-6 text-sm text-[#C4D1DF] leading-relaxed">
        <section className="space-y-2">
          <h3 className="font-serif font-bold text-lg text-[#F7F8FA]">1. Data Controller Information</h3>
          <p>
            GuestAssist is an independent information and enquiry assistance service operated by{" "}
            <strong>{SITE_CONFIG.operatorName}</strong> ({SITE_CONFIG.address.city}, {SITE_CONFIG.address.state}, India).
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-serif font-bold text-lg text-[#F7F8FA]">2. Information We Collect</h3>
          <p>When you submit a stay enquiry on GuestAssist, we collect only information necessary to assist with your enquiry:</p>
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
            <li>Coordinate property guidance and availability information.</li>
            <li>Prevent automated spam and protect website infrastructure.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h3 className="font-serif font-bold text-lg text-[#F7F8FA]">4. No Financial Information Stored</h3>
          <p>
            GuestAssist does not process hotel payments, credit card details, or financial deposits. All room reservations and monetary transactions occur directly between the guest and the hotel property or authorized booking channels.
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
