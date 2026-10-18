import React from "react";
import { cn } from "@/lib/utils";

interface TrustBadgeProps {
  className?: string;
}

export function TrustBadge({ className }: TrustBadgeProps) {
  return (
    <div
      className={cn(
        "hidden md:inline-flex items-center gap-2.5 sm:gap-3.5 px-5 sm:px-6 py-1.5 sm:py-2 rounded-full",
        "bg-[#06172A]/90 border border-[#F6B936]/40 text-[#FFD16A]",
        "text-xs sm:text-sm font-semibold tracking-wide shadow-lg shadow-black/30 backdrop-blur-sm",
        "transition-all duration-300 hover:border-[#FFD16A]/70 select-none",
        className
      )}
    >
      <span>Enquiry Based</span>
      <span className="text-[#F6B936]/40 font-normal">|</span>
      <span>No Booking</span>
      <span className="text-[#F6B936]/40 font-normal">|</span>
      <span>No Payment</span>
      <span className="text-[#F6B936]/40 font-normal">|</span>
      <span>Independent Service</span>
    </div>
  );
}
