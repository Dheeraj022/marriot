import React from "react";
import { UtensilsCrossed } from "lucide-react";
import { DINING_ITEMS } from "@/data/room-categories";
import { SectionHeading } from "@/components/shared/SectionHeading";

export function DiningSection() {
  return (
    <section id="dining" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
      <SectionHeading
        eyebrow="GASTRONOMIC HIGHLIGHTS"
        title="Dining & Culinary Concepts"
        description="Indulge in rich culinary traditions, signature buffets, and artisanal cocktails crafted by talented chefs."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {DINING_ITEMS.map((item, idx) => (
          <div
            key={idx}
            className="group bg-[#06172A] border border-[#123452] rounded-2xl overflow-hidden hover:border-[#F6B936]/50 transition-all duration-300 flex flex-col justify-between shadow-xl"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0A2340]">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06172A] via-transparent to-black/30" />
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-[#03101F]/80 text-[#FFD16A] border border-[#F6B936]/30 backdrop-blur-md">
                  {item.category}
                </span>
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-[#FFD16A]">
                  <UtensilsCrossed className="w-3.5 h-3.5" />
                  <span className="font-semibold">{item.cuisine}</span>
                </div>

                <h3 className="font-serif font-bold text-xl text-[#F7F8FA] group-hover:text-[#FFD16A] transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs text-[#C4D1DF] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Under-dining notice */}
      <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-center gap-2 text-xs text-[#8ba2bc] text-center">
        <UtensilsCrossed className="w-3.5 h-3.5 text-[#F6B936] shrink-0" />
        <span>
          Dining information is for reference only. Timings, availability and charges may vary.
        </span>
      </div>
    </section>
  );
}
