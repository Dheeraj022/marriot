import React from "react";
import { Info, ShieldAlert } from "lucide-react";
import { SITE_CONFIG } from "@/data/site-config";
import { cn } from "@/lib/utils";

interface DisclaimerNoticeProps {
  className?: string;
  variant?: "banner" | "card" | "subtle";
  customText?: string;
}

export function DisclaimerNotice({
  className,
  variant = "subtle",
  customText,
}: DisclaimerNoticeProps) {
  if (variant === "banner") {
    return (
      <aside
        aria-label="Independent Platform Disclaimer"
        className={cn(
          "w-full bg-[#06172A]/90 border-b border-[#123452] px-4 py-2.5 text-xs text-[#C4D1DF] flex items-center justify-center gap-2 text-center",
          className
        )}
      >
        <Info className="w-3.5 h-3.5 text-[#F6B936] shrink-0" />
        <span>
          <strong className="text-[#F7F8FA]">Independent Stay Assistance:</strong>{" "}
          {customText || SITE_CONFIG.disclaimer.short}
        </span>
      </aside>
    );
  }

  if (variant === "card") {
    return (
      <aside
        aria-label="Independent Platform Disclaimer"
        className={cn(
          "bg-[#06172A] border border-[#123452] rounded-xl p-5 text-sm text-[#C4D1DF] relative overflow-hidden",
          className
        )}
      >
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-[#F6B936]/10 text-[#F6B936] shrink-0">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div className="space-y-1.5">
            <h4 className="text-sm font-semibold text-[#F7F8FA] tracking-wide uppercase">
              Independent Service & Enquiry Notice
            </h4>
            <p className="text-xs leading-relaxed text-[#C4D1DF]">
              {customText || SITE_CONFIG.disclaimer.full}
            </p>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside
      aria-label="Independent Platform Disclaimer"
      className={cn(
        "rounded-lg bg-[#06172A]/70 border border-[#123452]/70 px-4 py-2.5 text-xs text-[#C4D1DF]/90 flex items-start gap-2.5",
        className
      )}
    >
      <Info className="w-4 h-4 text-[#F6B936] shrink-0 mt-0.5" />
      <span className="leading-relaxed">
        {customText || SITE_CONFIG.disclaimer.enquiryNotice}
      </span>
    </aside>
  );
}
