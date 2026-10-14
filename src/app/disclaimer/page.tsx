import React from "react";
import { Metadata } from "next";
import { SITE_CONFIG } from "@/data/site-config";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ShieldAlert, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Disclaimer & Non-Affiliation Notice | GuestAssist",
  description: "Official independence disclosure and legal disclaimer for GuestAssist.",
};

export default function DisclaimerPage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      <SectionHeading
        eyebrow="LEGAL DISCLOSURE"
        title="Disclaimer & Non-Affiliation Notice"
        description="Clear statement of independence, non-endorsement, and enquiry limitations."
      />

      <div className="p-4 rounded-xl bg-[#F6B936]/10 border border-[#F6B936]/30 text-xs text-[#FFD16A] flex items-start gap-3">
        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
        <p>
          <strong>Draft Copy Notice:</strong> This document represents the current operational disclaimer for BrightSpark Leisure Services Private Limited.
        </p>
      </div>

      <div className="bg-[#06172A] border border-[#123452] rounded-2xl p-6 sm:p-10 space-y-6 text-sm text-[#C4D1DF] leading-relaxed">
        <div className="p-5 rounded-xl bg-[#03101F] border border-[#123452] flex items-start gap-3 text-xs sm:text-sm text-[#F7F8FA]">
          <ShieldAlert className="w-6 h-6 text-[#F6B936] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            {SITE_CONFIG.disclaimer.full}
          </p>
        </div>

        <section className="space-y-2">
          <h3 className="font-serif font-bold text-lg text-[#F7F8FA]">Descriptive Use of Trademarks</h3>
          <p>
            Any references to &quot;Courtyard&quot;, &quot;Marriott&quot;, or property names are made solely under descriptive fair use for the purpose of identifying specific geographical properties in India for prospective guests seeking enquiry assistance. No commercial affiliation, sponsorship, or brand authorization is expressed or implied.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-serif font-bold text-lg text-[#F7F8FA]">No Real-Time Inventory Guarantee</h3>
          <p>
            GuestAssist does not claim direct API connections to live hotel reservations or guaranteed room allocations. All room availability and special concessions are subject to final confirmation by the hotel property.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-serif font-bold text-lg text-[#F7F8FA]">Operator Entity</h3>
          <p>
            GuestAssist is operated by <strong>{SITE_CONFIG.operatorName}</strong>, registered in Bengaluru, Karnataka, India.
          </p>
        </section>
      </div>
    </div>
  );
}
