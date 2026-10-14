import React from "react";
import { Metadata } from "next";
import { SITE_CONFIG } from "@/data/site-config";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Mail, PhoneCall, MapPin, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Grievance & Support | GuestAssist",
  description: "Customer grievance redressal mechanism and support contacts for GuestAssist.",
};

export default function GrievanceSupportPage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      <SectionHeading
        eyebrow="SUPPORT & RESOLUTION"
        title="Grievance Redressal & Support"
        description="We are committed to prompt and transparent resolution of user concerns."
      />

      <div className="p-4 rounded-xl bg-[#F6B936]/10 border border-[#F6B936]/30 text-xs text-[#FFD16A] flex items-start gap-3">
        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
        <p>
          <strong>Draft Copy Notice:</strong> Grievance redressal procedure in accordance with applicable consumer protection guidelines in India.
        </p>
      </div>

      <div className="bg-[#06172A] border border-[#123452] rounded-2xl p-6 sm:p-10 space-y-6 text-sm text-[#C4D1DF] leading-relaxed">
        <section className="space-y-2">
          <h3 className="font-serif font-bold text-lg text-[#F7F8FA]">1. Support Mechanism</h3>
          <p>
            For any queries or concerns regarding stay enquiry assistance, communication preferences, or information displayed on GuestAssist, please contact our support desk:
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
              <span>Address: {SITE_CONFIG.operatorName}, {SITE_CONFIG.address.city}, {SITE_CONFIG.address.state}</span>
            </div>
          </div>
        </section>

        <section className="space-y-2">
          <h3 className="font-serif font-bold text-lg text-[#F7F8FA]">2. Grievance Officer Details</h3>
          <p>
            In compliance with Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, the Grievance Officer details for BrightSpark Leisure Services Private Limited are:
          </p>
          <div className="p-4 rounded-xl bg-[#03101F] border border-[#123452] text-xs space-y-1">
            <p><strong>Designation:</strong> Grievance Redressal Officer</p>
            <p><strong>Entity:</strong> {SITE_CONFIG.operatorName}</p>
            <p><strong>Email:</strong> grievance@brightsparkleisure.com</p>
            <p><strong>Response Timeline:</strong> Acknowledgement within 48 hours; resolution within 15 business days.</p>
          </div>
        </section>

        <section className="space-y-2">
          <h3 className="font-serif font-bold text-lg text-[#F7F8FA]">3. Third-Party Hotel Grievances</h3>
          <p>
            Please note that service quality, billing disputes, room assignments, and facility maintenance at actual hotel premises are the sole responsibility of the respective hotel management. However, our team will provide guidance and appropriate hotel management contact points upon request.
          </p>
        </section>
      </div>
    </div>
  );
}
