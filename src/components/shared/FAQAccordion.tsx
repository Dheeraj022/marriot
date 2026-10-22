"use client";

import React, { useState } from "react";
import {
  Landmark,
  IndianRupee,
  Utensils,
  Calendar,
  HelpCircle,
  Plus,
  Minus,
} from "lucide-react";
import { FAQItem } from "@/data/faqs";
import { cn } from "@/lib/utils";

interface FAQAccordionProps {
  items: FAQItem[];
  className?: string;
}

function getFAQIcon(iconName?: string, index?: number) {
  if (iconName === "landmark" || index === 0) return Landmark;
  if (iconName === "rupee" || index === 1) return IndianRupee;
  if (iconName === "dining" || index === 2) return Utensils;
  if (iconName === "calendar" || index === 3) return Calendar;
  return HelpCircle;
}

export function FAQAccordion({ items, className }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={cn("space-y-3.5 max-w-4xl mx-auto", className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `faq-panel-${index}`;
        const headerId = `faq-header-${index}`;
        const IconComponent = getFAQIcon(item.iconName, index);

        return (
          <div
            key={index}
            className={cn(
              "rounded-2xl border transition-all duration-300 overflow-hidden bg-white shadow-sm hover:shadow-md",
              isOpen ? "border-[#D9C4A5] ring-2 ring-[#F5EFE6]" : "border-[#EBE4D8]"
            )}
          >
            <button
              id={headerId}
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggle(index)}
              className="w-full text-left px-5 py-4 sm:px-6 sm:py-4.5 flex items-center justify-between gap-4 focus:outline-none transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-3.5 sm:gap-4 flex-1 min-w-0">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#F5EFE6] text-[#8C6D46] flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105">
                  <IconComponent className="w-5 h-5 stroke-[1.8]" />
                </div>
                <span className="font-semibold text-sm sm:text-base md:text-[17px] text-[#1E293B] group-hover:text-[#0F172A] transition-colors leading-snug">
                  {item.question}
                </span>
              </div>

              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#F5EFE6] text-[#8C6D46] flex items-center justify-center shrink-0 transition-all duration-200 group-hover:bg-[#EBE2D4]">
                {isOpen ? (
                  <Minus className="w-4 h-4 stroke-[2.2]" />
                ) : (
                  <Plus className="w-4 h-4 stroke-[2.2]" />
                )}
              </div>
            </button>

            {isOpen && (
              <div
                id={panelId}
                role="region"
                aria-labelledby={headerId}
                className="px-5 pb-5 sm:px-6 sm:pb-6 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100 pt-3.5 pl-5 sm:pl-[72px]"
              >
                <p>{item.answer}</p>
                {item.category && (
                  <div className="mt-3 inline-block">
                    <span className="text-[11px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-[#F5EFE6] text-[#8C6D46]">
                      {item.category}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
