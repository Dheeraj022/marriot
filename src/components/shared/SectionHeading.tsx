import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  centered?: boolean;
  className?: string;
  titleClassName?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  centered = true,
  className,
  titleClassName,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "space-y-3 mb-10 md:mb-14",
        centered ? "text-center mx-auto max-w-3xl" : "text-left max-w-3xl",
        className
      )}
    >
      {eyebrow && (
        <div className={cn("inline-flex items-center", centered ? "justify-center" : "justify-start")}>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-[#F6B936]/10 text-[#FFD16A] border border-[#F6B936]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F6B936] inline-block animate-pulse" />
            {eyebrow}
          </span>
        </div>
      )}

      <h2
        className={cn(
          "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#F7F8FA] tracking-tight leading-tight",
          titleClassName
        )}
      >
        {title}
      </h2>

      {description && (
        <p className="text-sm md:text-base text-[#C4D1DF] leading-relaxed max-w-2xl mx-auto">
          {description}
        </p>
      )}

      <div className={cn("pt-1", centered ? "flex justify-center" : "flex justify-start")}>
        <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#F6B936] to-transparent opacity-80" />
      </div>
    </div>
  );
}
