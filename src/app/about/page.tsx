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
import { EnquiryProcess } from "@/components/home/EnquiryProcess";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Courtyard by Marriott across India — 29 premier hotels and resorts offering modern comfort, flexible workspaces, and exceptional hospitality.",
};

const FOUR_VALUES = [
  {
    icon: Search,
    title: "Explore 29 Hotels",
    description: "Discover Courtyard by Marriott properties across India with verified locations, prime city addresses, and curated facility overviews.",
  },
  {
    icon: Sparkles,
    title: "Simple Enquiry Flow",
    description: "Submit your travel dates and stay requirements in seconds with zero complicated registration or payment forms.",
  },
  {
    icon: Headphones,
    title: "Dedicated Assistance",
    description: "Our stay coordination team clarifies room specifications, amenities, and group requirements to simplify your stay planning.",
  },
  {
    icon: Building2,
    title: "Prime Destinations",
    description: "From metropolitan IT corridors to scenic hill retreats and coastal havens, find the ideal Courtyard hotel for every itinerary.",
  },
];

const GUIDING_PRINCIPLES = [
  {
    title: "Intuitive Comfort",
    desc: "Every room, suite, and public space is thoughtfully designed to empower guests to work, recharge, and connect with ease.",
  },
  {
    title: "Traveller-Focused Care",
    desc: "Every recommendation and assistance call is tailored around the guest's comfort, travel schedule, and personal preferences.",
  },
  {
    title: "Prompt & Dedicated Support",
    desc: "We prioritize swift response times, aiming to connect with every stay enquiry within 2 to 4 business hours.",
  },
  {
    title: "Flexible & Transparent Planning",
    desc: "Our platform provides comprehensive stay guidance with clear rates, amenities, and booking assistance for single and group stays.",
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
              ABOUT COURTYARD BY MARRIOTT
            </span>

            <h1 className="text-3xl sm:text-5xl font-serif font-extrabold text-[#F7F8FA] leading-tight">
              Inspiring Stays Across 29 Indian Destinations
            </h1>

            <p className="text-sm sm:text-base text-[#C4D1DF] leading-relaxed">
              Courtyard by Marriott provides premier hotel accommodations and stay enquiry assistance across India. We help travellers explore property features, compare rooms and amenities, and coordinate stay bookings conveniently.
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
          eyebrow="OUR COMMITMENT"
          title="Why Travellers Choose Courtyard by Marriott"
          description="Designed to offer clarity, responsive coordination, and comfortable hospitality for every stay in India."
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

      {/* 3. Brand Spotlight */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-[#06172A] border border-[#123452] rounded-3xl p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-xl">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-semibold tracking-wider uppercase text-[#FFD16A]">
              HOSPITALITY EXCELLENCE
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#F7F8FA]">
              Courtyard by Marriott India
            </h2>
            <p className="text-sm text-[#C4D1DF] leading-relaxed">
              Courtyard by Marriott is tailored for ambitious travellers who seek a balance between productive work and refreshing downtime. From high-tech workstations and plush bedding to vibrant all-day dining and rejuvenating pools, our properties deliver an effortless hospitality experience.
            </p>
            <p className="text-xs text-[#8ba2bc] leading-relaxed">
              With 29 strategically located hotels across North, South, West, East, and Central India, guests enjoy seamless access to major financial districts, airports, cultural landmarks, and holiday gateways.
            </p>

            <div className="pt-2 flex items-center gap-6 text-xs text-[#FFD16A]">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#F6B936]" />
                29 Prime Destinations
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#F6B936]" />
                Dedicated Stay Assistance
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#0A2340] border border-[#123452] p-6 rounded-2xl space-y-4">
            <h3 className="font-serif font-bold text-lg text-[#F7F8FA]">
              Stay Assistance Helpline
            </h3>
            <p className="text-xs text-[#C4D1DF]">
              Have questions regarding Courtyard destinations or need guidance with a group reservation?
            </p>
            <div className="p-4 rounded-xl bg-[#03101F] border border-[#123452] space-y-1">
              <span className="block text-[11px] text-[#8ba2bc] uppercase">Toll-Free Helpline</span>
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

      {/* 4. Guiding Principles */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="OUR VALUES"
          title="Our Commitment to Guests"
          description="The principles that guide our hospitality and guest coordination every day."
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
          title="Common Questions"
          description="Everything you need to know about our properties and stay enquiries."
        />
        <FAQAccordion items={FAQS.slice(0, 5)} />
      </section>

      {/* 6. Notice Card */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DisclaimerNotice variant="card" />
      </div>
    </div>
  );
}
