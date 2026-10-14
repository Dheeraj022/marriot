import React from "react";
import Link from "next/link";
import { Search, Send, Headphones, CheckCircle, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";

const STEPS = [
  {
    step: "01",
    icon: Search,
    title: "Search & Explore",
    description: "Browse 29 Courtyard by Marriott locations across India. Select your destination, preferred dates, and guest specifications.",
  },
  {
    step: "02",
    icon: Send,
    title: "Send Your Enquiry",
    description: "Submit our simple enquiry form. No credit cards or payment deposits required at any point on GuestAssist.",
  },
  {
    step: "03",
    icon: Headphones,
    title: "Get Dedicated Assistance",
    description: "Our stay coordinators review property features, clarify amenities, and assist with custom requirements within 2-4 business hours.",
  },
  {
    step: "04",
    icon: CheckCircle,
    title: "Confirm Directly",
    description: "Verify rates, policies, and room availability directly with the hotel or authorized booking provider to complete your stay reservation.",
  },
];

export function EnquiryProcess() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="bg-gradient-to-b from-[#06172A] to-[#0A2340] border border-[#123452] rounded-3xl p-8 sm:p-12 md:p-16 relative overflow-hidden shadow-2xl">
        <SectionHeading
          eyebrow="TRANSPARENT WORKFLOW"
          title="How Our Stay Enquiry Assistance Works"
          description="We make planning your Courtyard hotel stay straightforward, transparent, and completely pressure-free."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
          {STEPS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-[#03101F]/60 border border-[#123452] p-6 rounded-2xl relative space-y-4 hover:border-[#F6B936]/40 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif font-black text-2xl text-[#F6B936]/40">
                    {item.step}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-[#F6B936]/15 border border-[#F6B936]/30 flex items-center justify-center text-[#FFD16A]">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="font-serif font-bold text-lg text-[#F7F8FA]">
                  {item.title}
                </h3>

                <p className="text-xs text-[#C4D1DF] leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA Banner at bottom */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h4 className="font-serif font-bold text-xl text-[#F7F8FA]">
              Ready to submit your stay enquiry?
            </h4>
            <p className="text-xs text-[#C4D1DF]">
              Fast assistance across all 29 Indian destinations with zero service fees.
            </p>
          </div>

          <Link
            href="/#directory"
            className="btn-gold px-6 py-3 rounded-xl text-sm font-bold inline-flex items-center gap-2 shadow-lg shrink-0"
          >
            <span>Explore Properties</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
