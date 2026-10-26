import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import {
  CheckCircle2,
  Building2,
  ArrowRight,
  Sparkles,
  Search,
  Headphones,
  ShieldCheck,
  Info,
} from "lucide-react";
import { SITE_CONFIG } from "@/data/site-config";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CallNowButton } from "@/components/shared/CallNowButton";
import { FAQAccordion } from "@/components/shared/FAQAccordion";
import { FAQS } from "@/data/faqs";
import { RoleIndependenceSection } from "@/components/shared/RoleIndependenceSection";
import { EnquiryProcess } from "@/components/home/EnquiryProcess";

export const metadata: Metadata = {
  title: "About Guest Assist | Independent Hotel Information & Enquiry Assistance",
  description:
    "Guest Assist is operated by Brightspark Leisure Services Private Limited. We help travellers explore general hotel property information, understand accommodation options and submit stay enquiries for destinations across India.",
};

const FOUR_VALUES = [
  {
    icon: Search,
    title: "Explore 29 Locations",
    description: "Browse curated hotel property details, room configurations, and amenities across major business hubs and leisure destinations in India.",
  },
  {
    icon: Sparkles,
    title: "Simple Enquiry Flow",
    description: "Submit travel dates and guest requirements with ease. No upfront payments or binding booking commitments required.",
  },
  {
    icon: Headphones,
    title: "Stay Enquiry Assistance",
    description: "Our guest assistance team helps you understand property information and coordinates tailored recommendations for your stay.",
  },
  {
    icon: ShieldCheck,
    title: "Independent Guidance",
    description: "Transparent, informative guidance helping you verify rates, availability, and facilities directly with responsible providers.",
  },
];

export default function AboutPage() {
  return (
    <div className="py-12 sm:py-16 space-y-16 sm:space-y-20">
      {/* 1. Hero Banner */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden min-h-[420px] flex items-center p-8 sm:p-14 border border-[#123452] shadow-2xl">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1800&q=80')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#03101F] via-[#03101F]/95 to-[#03101F]/70" />

          <div className="relative z-10 max-w-3xl space-y-5">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-[#F6B936]/15 text-[#FFD16A] border border-[#F6B936]/30">
              INDEPENDENT ENQUIRY ASSISTANCE
            </span>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-extrabold text-[#F7F8FA] leading-tight">
              About Guest Assist
            </h1>

            <p className="text-base sm:text-lg text-[#C4D1DF] leading-relaxed font-light">
              Guest Assist is operated by Brightspark Leisure Services Private Limited. We help travellers explore general hotel property information, understand accommodation options and submit stay enquiries for destinations across India.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link href="/locations" className="btn-gold px-6 py-3.5 rounded-xl text-sm font-bold flex items-center gap-2">
                <span>Browse All 29 Locations</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <CallNowButton variant="outline" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Core About Guest Assist Narrative Card */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-[#06172A] border border-[#123452] rounded-3xl p-6 sm:p-10 md:p-12 shadow-2xl space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FFE399] via-[#F6B936] to-[#b37c15] p-[1.5px] shadow-md flex items-center justify-center shrink-0">
              <div className="w-full h-full bg-[#03101F] rounded-[10px] flex items-center justify-center">
                <Info className="w-5 h-5 text-[#F6B936]" />
              </div>
            </div>
            <div>
              <span className="text-xs font-semibold tracking-wider uppercase text-[#FFD16A] block">
                OUR MISSION & PURPOSE
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#F7F8FA]">
                About Guest Assist
              </h2>
            </div>
          </div>

          {/* Copy paragraphs formatted cleanly */}
          <div className="space-y-4 text-sm sm:text-base text-[#C4D1DF] leading-relaxed border-t border-white/10 pt-6">
            <p className="text-[#F7F8FA] font-medium text-base sm:text-lg">
              Guest Assist is operated by Brightspark Leisure Services Private Limited. We help travellers explore general hotel property information, understand accommodation options and submit stay enquiries for destinations across India.
            </p>

            <p>
              Our aim is to make the initial research process clearer and more convenient by helping visitors review property details and understand what information to verify before making a stay decision.
            </p>

            <p>
              Guest Assist provides information and enquiry assistance. We encourage travellers to confirm current rates, availability, facilities, payment arrangements and reservation terms directly with the relevant property or booking provider.
            </p>

            <div className="p-4 sm:p-5 rounded-2xl bg-[#03101F] border border-[#123452] text-xs sm:text-sm text-[#FFD16A]/95 flex items-start gap-3 mt-6">
              <ShieldCheck className="w-5 h-5 text-[#F6B936] shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                Guest Assist is an independent website and does not claim to be owned, operated, endorsed or authorized by Marriott International or any listed hotel.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-white/10 text-xs sm:text-sm text-[#C4D1DF]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#F6B936] shrink-0" />
              <span>General Property Information</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#F6B936] shrink-0" />
              <span>Stay Enquiry Guidance</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#F6B936] shrink-0" />
              <span>29 Destinations in India</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Pillars / Value Cards */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="OUR SERVICE"
          title="How Guest Assist Helps Travellers"
          description="Designed to offer clarity, responsive coordination, and transparent stay guidance across destinations in India."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FOUR_VALUES.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div
                key={idx}
                className="bg-[#06172A] border border-[#123452] p-6 rounded-2xl space-y-3 hover:border-[#F6B936]/40 transition-all shadow-md flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-[#0A2340] border border-[#123452] flex items-center justify-center text-[#F6B936]">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif font-bold text-lg text-[#F7F8FA]">{val.title}</h3>
                  <p className="text-xs text-[#C4D1DF] leading-relaxed">{val.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Assistance Helpline Card */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-[#06172A] border border-[#123452] rounded-3xl p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-xl">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-semibold tracking-wider uppercase text-[#FFD16A]">
              DEDICATED SUPPORT
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#F7F8FA]">
              Need Help With Stay Information?
            </h2>
            <p className="text-sm text-[#C4D1DF] leading-relaxed">
              Whether you are planning a business trip, family vacation, or group conference, our guest assistance team is on standby to help answer questions, share property specifications, and coordinate your stay enquiry.
            </p>
            <p className="text-xs text-[#8ba2bc] leading-relaxed">
              Explore 29 Courtyard destinations across North, South, West, East, and Central India. Request stay details online or speak with our team anytime.
            </p>
          </div>

          <div className="lg:col-span-5 bg-[#0A2340] border border-[#123452] p-6 rounded-2xl space-y-4">
            <h3 className="font-serif font-bold text-lg text-[#F7F8FA]">
              Stay Assistance Helpline
            </h3>
            <p className="text-xs text-[#C4D1DF]">
              Have questions regarding destinations or need assistance with your travel dates?
            </p>
            <div className="p-4 rounded-xl bg-[#03101F] border border-[#123452] space-y-1">
              <span className="block text-[11px] text-[#8ba2bc] uppercase">Dedicated Helpline</span>
              <a href={SITE_CONFIG.phoneTel} className="text-lg font-bold text-[#FFD16A] hover:underline">
                {SITE_CONFIG.phoneDisplay}
              </a>
              <span className="block text-[10px] text-[#8ba2bc]">{SITE_CONFIG.businessHours}</span>
            </div>
            <CallNowButton className="w-full justify-center" />
          </div>
        </div>
      </section>

      {/* How Our Enquiry Assistance Works Section */}
      <EnquiryProcess />

      {/* 5. Role & Independence Section */}
      <div className="max-w-7xl mx-auto">
        <RoleIndependenceSection />
      </div>

      {/* 6. FAQs */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="FREQUENTLY ASKED"
          title="Common Questions"
          description="Everything you need to know about Guest Assist, stay enquiries, and our independent assistance role."
        />
        <FAQAccordion items={FAQS} />
      </section>
    </div>
  );
}
