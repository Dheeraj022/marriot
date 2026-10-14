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
} from "lucide-react";
import { SITE_CONFIG } from "@/data/site-config";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CallNowButton } from "@/components/shared/CallNowButton";
import { FAQAccordion } from "@/components/shared/FAQAccordion";
import { FAQS } from "@/data/faqs";
import { DisclaimerNotice } from "@/components/shared/DisclaimerNotice";

export const metadata: Metadata = {
  title: "About Us | GuestAssist - Operated by BrightSpark Leisure Services",
  description:
    "Learn about GuestAssist, an independent stay enquiry assistance service operated by BrightSpark Leisure Services Private Limited.",
};

const FOUR_VALUES = [
  {
    icon: Search,
    title: "Explore 29 Hotels",
    description: "Discover Courtyard by Marriott properties across India with verified locations and curated facility overviews.",
  },
  {
    icon: Sparkles,
    title: "Simple Enquiry Flow",
    description: "Submit your travel dates and stay requirements in seconds with zero complicated registration or payment forms.",
  },
  {
    icon: Headphones,
    title: "Personalized Assistance",
    description: "Our dedicated team clarifies room specifications, amenities, and group requirements to simplify your stay planning.",
  },
  {
    icon: Building2,
    title: "Wide Destination Choices",
    description: "From metropolitan IT hubs to serene hill retreats and coastal havens, find the right destination for any itinerary.",
  },
];

const GUIDING_PRINCIPLES = [
  {
    title: "Transparency First",
    desc: "We clearly declare our independent status and never mislead visitors into believing we are an official brand portal.",
  },
  {
    title: "Traveller-Focused Care",
    desc: "Every recommendation and assistance call is tailored around the visitor's comfort, itinerary, and specific preferences.",
  },
  {
    title: "Prompt & Helpful Assistance",
    desc: "We prioritize swift response times, aiming to connect with every enquiry within 2 to 4 business hours.",
  },
  {
    title: "Convenient & No-Pressure",
    desc: "Our platform provides free stay guidance. You retain full freedom to verify rates and confirm with your preferred booking provider.",
  },
];

export default function AboutPage() {
  return (
    <div className="py-12 sm:py-16 space-y-20">
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
          <div className="absolute inset-0 bg-gradient-to-r from-[#03101F] via-[#03101F]/90 to-[#03101F]/60" />

          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-[#F6B936]/15 text-[#FFD16A] border border-[#F6B936]/30">
              ABOUT GUESTASSIST
            </span>

            <h1 className="text-3xl sm:text-5xl font-serif font-extrabold text-[#F7F8FA] leading-tight">
              Simplifying Your Stay Enquiries Across India
            </h1>

            <p className="text-sm sm:text-base text-[#C4D1DF] leading-relaxed">
              GuestAssist is an independent hotel information and enquiry assistance platform operated by{" "}
              <strong className="text-[#F7F8FA]">{SITE_CONFIG.operatorName}</strong>. We help travellers
              explore property information and coordinate stay enquiries conveniently.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link href="/#directory" className="btn-gold px-6 py-3 rounded-xl text-sm font-bold flex items-center gap-2">
                <span>Browse All 29 Locations</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <CallNowButton variant="outline" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Core Pillars / Value Cards */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="OUR FOCUS"
          title="Why Travellers Rely on GuestAssist"
          description="Designed to offer clarity, responsive coordination, and transparent guidance for every domestic stay."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FOUR_VALUES.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div
                key={idx}
                className="bg-[#06172A] border border-[#123452] p-6 rounded-2xl space-y-3 hover:border-[#F6B936]/40 transition-all shadow-md"
              >
                <div className="w-12 h-12 rounded-xl bg-[#0A2340] border border-[#123452] flex items-center justify-center text-[#F6B936]">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif font-bold text-lg text-[#F7F8FA]">{val.title}</h3>
                <p className="text-xs text-[#C4D1DF] leading-relaxed">{val.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Operator Spotlight */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-[#06172A] border border-[#123452] rounded-3xl p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-xl">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-semibold tracking-wider uppercase text-[#FFD16A]">
              OPERATOR SPOTLIGHT
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#F7F8FA]">
              BrightSpark Leisure Services Private Limited
            </h2>
            <p className="text-sm text-[#C4D1DF] leading-relaxed">
              GuestAssist is proudly conceived, developed, and maintained by{" "}
              <strong>BrightSpark Leisure Services Private Limited</strong>, an Indian enterprise dedicated
              to delivering reliable concierge advisory and stay enquiry facilitation.
            </p>
            <p className="text-xs text-[#8ba2bc] leading-relaxed">
              We act as an independent information facilitator between potential hotel guests and property
              details. We do not claim official affiliation or inventory ownership, maintaining the highest
              standards of transparency across every enquiry touchpoint.
            </p>

            <div className="pt-2 flex items-center gap-6 text-xs text-[#FFD16A]">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#F6B936]" />
                Registered Indian Company
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#F6B936]" />
                Independent Operations
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#0A2340] border border-[#123452] p-6 rounded-2xl space-y-4">
            <h3 className="font-serif font-bold text-lg text-[#F7F8FA]">
              Stay Assistance Helpline
            </h3>
            <p className="text-xs text-[#C4D1DF]">
              Have questions regarding Courtyard destinations or need guidance with a group booking?
            </p>
            <div className="p-4 rounded-xl bg-[#03101F] border border-[#123452] space-y-1">
              <span className="block text-[11px] text-[#8ba2bc] uppercase">Toll-Free Assistance</span>
              <a href={SITE_CONFIG.phoneTel} className="text-lg font-bold text-[#FFD16A] hover:underline">
                {SITE_CONFIG.phoneDisplay}
              </a>
              <span className="block text-[10px] text-[#8ba2bc]">{SITE_CONFIG.businessHours}</span>
            </div>
            <CallNowButton className="w-full justify-center" />
          </div>
        </div>
      </section>

      {/* 4. Our Guiding Principles */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="CORE VALUES"
          title="Our Commitment to Travellers"
          description="The values that steer our operations and customer coordination every day."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {GUIDING_PRINCIPLES.map((principle, idx) => (
            <div
              key={idx}
              className="bg-[#06172A] border border-[#123452] p-6 rounded-2xl space-y-2 hover:border-[#F6B936]/40 transition-colors"
            >
              <h3 className="font-serif font-bold text-base text-[#FFD16A]">
                {principle.title}
              </h3>
              <p className="text-xs text-[#C4D1DF] leading-relaxed">
                {principle.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. FAQs */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="FREQUENTLY ASKED"
          title="Questions About Our Service"
          description="Everything you need to know about our role and the stay enquiry process."
        />
        <FAQAccordion items={FAQS.slice(0, 5)} />
      </section>

      {/* 6. Independence Notice Card */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DisclaimerNotice variant="card" />
      </div>
    </div>
  );
}
