import React from "react";
import { Metadata } from "next";
import { SITE_CONFIG } from "@/data/site-config";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Mail, PhoneCall, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Grievance & Support | Courtyard by Marriott",
  description: "Customer grievance resolution and guest support contacts for Courtyard by Marriott India.",
};

export default function GrievanceSupportPage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      <SectionHeading
        eyebrow="SUPPORT & RESOLUTION"
        title="Guest Support & Grievance Redressal"
        description="We are committed to prompt, courteous, and transparent resolution of all guest concerns."
      />

      <div className="bg-[#06172A] border border-[#123452] rounded-2xl p-6 sm:p-10 space-y-6 text-sm text-[#C4D1DF] leading-relaxed">
        <section className="space-y-2">
          <h3 className="font-serif font-bold text-lg text-[#F7F8FA]">1. Guest Assistance Desk</h3>
          <p>
            For any queries, feedback, or concerns regarding your stay enquiry, property coordination, or platform assistance, please reach out to our dedicated support desk:
          </p>

          <div className="mt-3 p-4 rounded-xl bg-[#03101F] border border-[#123452] space-y-2">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#F6B936]" />
              <span>Email: <a href={`mailto:${SITE_CONFIG.supportEmail}`} className="text-[#FFD16A] underline">{SITE_CONFIG.supportEmail}</a></span>
            </div>
            <div className="flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-[#F6B936]" />
              <span>Helpline: <a href={SITE_CONFIG.phoneTel} className="text-[#FFD16A] font-semibold">{SITE_CONFIG.phoneDisplay}</a></span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#F6B936]" />
              <span>Address: {SITE_CONFIG.operatorName}, India</span>
            </div>
          </div>
        </section>

        <section className="space-y-2">
          <h3 className="font-serif font-bold text-lg text-[#F7F8FA]">2. Grievance Officer Details</h3>
          <p>
            In compliance with applicable consumer service and digital intermediary guidelines, the details for our designated grievance desk are:
          </p>
          <div className="p-4 rounded-xl bg-[#03101F] border border-[#123452] text-xs space-y-1">
            <p><strong>Designation:</strong> Guest Grievance Redressal Officer</p>
            <p><strong>Entity:</strong> {SITE_CONFIG.name} India Central Desk</p>
            <p><strong>Email:</strong> {SITE_CONFIG.email}</p>
            <p><strong>Response Timeline:</strong> Initial response within 24 to 48 hours; resolution within 15 business days.</p>
          </div>
        </section>

        <section className="space-y-2">
          <h3 className="font-serif font-bold text-lg text-[#F7F8FA]">3. Property-Specific Queries</h3>
          <p>
            If your query pertains to an on-property stay experience, specific food & beverage service, or billing statement from a past checkout, our central team can coordinate directly with the duty manager or front office team of the respective hotel location.
          </p>
        </section>
      </div>
    </div>
  );
}
