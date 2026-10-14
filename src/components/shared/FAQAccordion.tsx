"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { FAQItem } from "@/data/faqs";
import { cn } from "@/lib/utils";

interface FAQAccordionProps {
  items: FAQItem[];
  className?: string;
}

export function FAQAccordion({ items, className }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={cn("space-y-4 max-w-4xl mx-auto", className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `faq-panel-${index}`;
        const headerId = `faq-header-${index}`;

        return (
          <div
            key={index}
            className={cn(
              "rounded-xl border transition-all duration-300 overflow-hidden",
              isOpen
                ? "bg-[#06172A] border-[#F6B936]/40 shadow-lg shadow-[#03101F]/80"
                : "bg-[#0A2340]/60 border-[#123452]/70 hover:border-[#F6B936]/20"
            )}
          >
            <button
              id={headerId}
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggle(index)}
              className="w-full text-left px-5 py-4 md:px-6 md:py-5 flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F6B936] transition-colors"
            >
              <div className="flex items-center gap-3">
                <HelpCircle
                  className={cn(
                    "w-5 h-5 shrink-0 transition-colors duration-200",
                    isOpen ? "text-[#F6B936]" : "text-[#8ba2bc]"
                  )}
                />
                <span
                  className={cn(
                    "font-medium text-base md:text-lg transition-colors duration-200",
                    isOpen ? "text-[#FFD16A]" : "text-[#F7F8FA]"
                  )}
                >
                  {item.question}
                </span>
              </div>
              <ChevronDown
                className={cn(
                  "w-5 h-5 shrink-0 text-[#C4D1DF] transition-transform duration-300",
                  isOpen ? "rotate-180 text-[#F6B936]" : ""
                )}
              />
            </button>

            {isOpen && (
              <div
                id={panelId}
                role="region"
                aria-labelledby={headerId}
                className="px-5 pb-5 md:px-6 md:pb-6 text-sm md:text-base text-[#C4D1DF] leading-relaxed border-t border-white/5 pt-3"
              >
                <p>{item.answer}</p>
                {item.category && (
                  <div className="mt-3 inline-block">
                    <span className="text-[11px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-[#123452] text-[#FFD16A]">
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
