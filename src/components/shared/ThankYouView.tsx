"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle,
  ArrowLeft,
  Calendar,
  Building2,
  Clock,
  ShieldCheck,
  FileText,
} from "lucide-react";
import { CallNowButton } from "@/components/shared/CallNowButton";

interface StoredEnquiry {
  referenceId?: string;
  propertyName?: string;
  checkIn?: string;
  checkOut?: string;
  adults?: number;
  rooms?: number;
  fullName?: string;
}

export function ThankYouView() {
  const searchParams = useSearchParams();
  const refFromUrl = searchParams.get("ref");

  const [enquiryData] = useState<StoredEnquiry | null>(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("guestassist_last_enquiry");
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch {
          return null;
        }
      }
    }
    return null;
  });

  const referenceId = refFromUrl || enquiryData?.referenceId || "GA-2026-CONFIRMED";

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Central Success Banner */}
      <div className="bg-[#06172A] border border-[#123452] rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl relative overflow-hidden">
        {/* Decorative Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-32 bg-[#F6B936]/10 blur-3xl pointer-events-none" />

        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto text-emerald-400 shadow-xl shadow-emerald-950/40">
          <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#FFD16A] inline-block">
            SUBMISSION CONFIRMED
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#F7F8FA]">
            Thank You!
          </h1>
          <p className="text-base sm:text-lg text-[#C4D1DF] max-w-xl mx-auto leading-relaxed">
            Your stay enquiry has been received successfully. Our dedicated coordinators are reviewing property options and will reach out shortly.
          </p>
        </div>

        {/* Reference Badge */}
        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-xl bg-[#0A2340] border border-[#123452]">
          <FileText className="w-4 h-4 text-[#F6B936]" />
          <span className="text-xs text-[#8ba2bc]">Reference Code:</span>
          <span className="font-mono text-sm font-bold text-[#FFD16A]">{referenceId}</span>
        </div>

        {/* Enquiry Summary Card (if available from session) */}
        {enquiryData && (
          <div className="bg-[#03101F]/70 border border-[#123452] rounded-2xl p-5 text-left space-y-3 text-xs sm:text-sm">
            <h3 className="font-serif font-bold text-base text-[#F7F8FA]">
              Summary of Requested Stay
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[#C4D1DF]">
              {enquiryData.propertyName && (
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#F6B936] shrink-0" />
                  <span>
                    <strong>Property:</strong> {enquiryData.propertyName}
                  </span>
                </div>
              )}
              {enquiryData.checkIn && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#F6B936] shrink-0" />
                  <span>
                    <strong>Check-in:</strong> {enquiryData.checkIn}
                  </span>
                </div>
              )}
              {enquiryData.checkOut && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#F6B936] shrink-0" />
                  <span>
                    <strong>Check-out:</strong> {enquiryData.checkOut}
                  </span>
                </div>
              )}
              {enquiryData.adults && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#F6B936] shrink-0" />
                  <span>
                    <strong>Guests:</strong> {enquiryData.adults} Adults, {enquiryData.rooms || 1} Room(s)
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Clear Independence Advisory Notice */}
        <div className="p-4 rounded-xl bg-[#03101F]/80 border border-[#123452] text-xs text-[#8ba2bc] text-left flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-[#F6B936] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Important Reminder:</strong> This submission is an enquiry request and not a confirmed hotel reservation. Room tariffs, inventory, and cancellation policies must be verified directly with the hotel or authorized booking provider.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#0A2340] border border-[#123452] text-sm font-semibold text-[#F7F8FA] hover:text-[#FFD16A] hover:border-[#F6B936]/50 flex items-center justify-center gap-2 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>

          <CallNowButton
            variant="solid"
            className="w-full sm:w-auto px-6 py-3"
          />
        </div>
      </div>
    </div>
  );
}
