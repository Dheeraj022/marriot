"use client";

import React from "react";
import { PhoneCall } from "lucide-react";
import { SITE_CONFIG } from "@/data/site-config";
import { cn } from "@/lib/utils";

interface CallNowButtonProps {
  className?: string;
  variant?: "solid" | "outline" | "compact";
  customPhone?: string;
  customTel?: string;
  showIcon?: boolean;
}

export function CallNowButton({
  className,
  variant = "solid",
  customPhone,
  customTel,
  showIcon = true,
}: CallNowButtonProps) {
  const phone = customPhone || SITE_CONFIG.phoneDisplay;
  const tel = customTel || SITE_CONFIG.phoneTel;

  if (variant === "compact") {
    return (
      <a
        href={tel}
        className={cn(
          "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide btn-gold transition-all duration-200",
          className
        )}
        title={`Call ${phone}`}
      >
        {showIcon && <PhoneCall className="w-3.5 h-3.5 animate-pulse" />}
        <span>Call Now</span>
      </a>
    );
  }

  if (variant === "outline") {
    return (
      <a
        href={tel}
        className={cn(
          "inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium border border-[#F6B936]/50 text-[#FFD16A] hover:bg-[#F6B936]/10 hover:border-[#FFD16A] transition-all duration-200",
          className
        )}
      >
        {showIcon && <PhoneCall className="w-4 h-4 text-[#F6B936]" />}
        <span>Call: {phone}</span>
      </a>
    );
  }

  return (
    <a
      href={tel}
      className={cn(
        "inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold tracking-wide btn-gold transition-all duration-200 active:scale-95 shadow-md shadow-[#F6B936]/20",
        className
      )}
    >
      {showIcon && <PhoneCall className="w-4 h-4 text-[#102033]" />}
      <span>Call Now</span>
    </a>
  );
}
