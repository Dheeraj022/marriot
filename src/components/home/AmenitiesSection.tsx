import React from "react";
import {
  Utensils,
  Wine,
  Waves,
  Sparkles,
  Dumbbell,
  Calendar,
  Wifi,
  Car,
  ShieldAlert,
} from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";

const AMENITIES = [
  {
    icon: Utensils,
    title: "Signature Dining",
    desc: "All-day restaurants offering global breakfast buffets, authentic regional cuisine, and live cooking stations.",
  },
  {
    icon: Wine,
    title: "Lounge & Evening Bar",
    desc: "Sophisticated social settings for handcrafted cocktails, premium spirits, and gourmet tapas.",
  },
  {
    icon: Waves,
    title: "Swimming Pools",
    desc: "Scenic outdoor, infinity, and rooftop pools designed for invigorating morning laps and relaxing afternoon leisure.",
  },
  {
    icon: Dumbbell,
    title: "24/7 Fitness Centres",
    desc: "Equipped with advanced cardio gear, free weights, and dedicated stretching zones to keep your routine active.",
  },
  {
    icon: Sparkles,
    title: "Spa & Wellness",
    desc: "Rejuvenating therapies, steam rooms, and therapeutic wellness treatments at select full-service properties.",
  },
  {
    icon: Calendar,
    title: "Meetings & Grand Banquets",
    desc: "Flexible pillarless ballrooms and audiovisual-enabled boardrooms ideal for corporate summits and milestone celebrations.",
  },
  {
    icon: Wifi,
    title: "High-Speed Wi-Fi",
    desc: "Reliable high-bandwidth wireless internet throughout public areas, event halls, and guest accommodations.",
  },
  {
    icon: Car,
    title: "Transit & Airport Connectivity",
    desc: "Strategic proximity to international airports, valet parking assistance, and seamless city taxi coordination.",
  },
];

export function AmenitiesSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading
        eyebrow="HOTEL EXPERIENCES"
        title="Curated Hospitality & Lifestyle Amenities"
        description="Discover standard amenities commonly available across Courtyard by Marriott hotels in India."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {AMENITIES.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#06172A] border border-[#123452] hover:border-[#F6B936]/40 transition-all duration-300 group hover:-translate-y-1 shadow-md shadow-[#03101F]"
            >
              <div className="w-12 h-12 rounded-xl bg-[#0A2340] border border-[#123452] flex items-center justify-center text-[#F6B936] group-hover:scale-110 group-hover:border-[#F6B936]/60 transition-all duration-300 mb-4">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#F7F8FA] mb-2 group-hover:text-[#FFD16A] transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-[#C4D1DF] leading-relaxed">{item.desc}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-8 p-4 rounded-xl bg-[#06172A]/70 border border-[#123452]/70 text-xs text-[#8ba2bc] text-center max-w-3xl mx-auto flex items-center justify-center gap-2">
        <ShieldAlert className="w-4 h-4 text-[#F6B936] shrink-0" />
        <span>
          Note: Specific facilities, operating hours, and service availability vary by property. Our team will verify exact amenities for your chosen destination upon enquiry.
        </span>
      </div>
    </section>
  );
}
