"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle,
  ArrowLeft,
  Calendar,
  Building2,
  Users,
  BedDouble,
  User,
  Phone,
  Mail,
  FileText,
  Clock,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { CallNowButton } from "@/components/shared/CallNowButton";

interface StoredEnquiry {
  referenceId?: string;
  propertyName?: string;
  city?: string;
  checkIn?: string;
  checkOut?: string;
  nights?: number;
  adults?: number;
  rooms?: number;
  roomType?: string;
  roomTypeName?: string;
  fullName?: string;
  phone?: string;
  email?: string;
  message?: string;
}

export function ThankYouView() {
  const searchParams = useSearchParams();
  const refFromUrl = searchParams.get("ref");

  const [enquiryData] = useState<StoredEnquiry | null>(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("courtyard_last_enquiry");
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

  const referenceId = refFromUrl || enquiryData?.referenceId || "CY-2026-CONFIRMED";

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Central Success Banner */}
      <div className="bg-[#06172A] border border-[#123452] rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl relative overflow-hidden">
        {/* Decorative Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-36 bg-[#F6B936]/15 blur-3xl pointer-events-none" />

        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto text-emerald-400 shadow-xl shadow-emerald-950/40 animate-in zoom-in-75 duration-300">
          <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10" />
        </div>

        <div className="space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold tracking-widest uppercase bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            ENQUIRY SUBMITTED SUCCESSFULLY
          </span>

          {/* Exact wording requested by user */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#F7F8FA] leading-tight max-w-xl mx-auto">
            Thank you for your enquiry! We have received your details and will contact you shortly to assist with your booking.
          </h1>

          <p className="text-sm sm:text-base text-[#C4D1DF] max-w-lg mx-auto leading-relaxed">
            Our Courtyard by Marriott reservations specialist is reviewing room allocations and current best available tariffs for your stay.
          </p>
        </div>

        {/* Reference Badge */}
        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-xl bg-[#0A2340] border border-[#123452] shadow-inner">
          <FileText className="w-4 h-4 text-[#F6B936]" />
          <span className="text-xs text-[#8ba2bc]">Reference Code:</span>
          <span className="font-mono text-sm font-bold text-[#FFD16A]">{referenceId}</span>
        </div>

        {/* Enquiry Summary Card */}
        {enquiryData && (
          <div className="bg-[#03101F]/70 border border-[#123452] rounded-2xl p-6 text-left space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h2 className="font-serif font-bold text-base text-[#F7F8FA] flex items-center gap-2">
                <span>Stay & Room Summary</span>
              </h2>
              {enquiryData.roomTypeName && (
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#F6B936]/15 text-[#FFD16A] border border-[#F6B936]/30">
                  {enquiryData.roomTypeName}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs sm:text-sm text-[#C4D1DF]">
              {enquiryData.propertyName && (
                <div className="flex items-center gap-2.5">
                  <Building2 className="w-4 h-4 text-[#F6B936] shrink-0" />
                  <span>
                    <strong>Property:</strong> {enquiryData.propertyName}
                    {enquiryData.city ? ` (${enquiryData.city})` : ""}
                  </span>
                </div>
              )}

              {enquiryData.roomTypeName && (
                <div className="flex items-center gap-2.5">
                  <BedDouble className="w-4 h-4 text-[#F6B936] shrink-0" />
                  <span>
                    <strong>Room Type:</strong> {enquiryData.roomTypeName}
                  </span>
                </div>
              )}

              {enquiryData.checkIn && (
                <div className="flex items-center gap-2.5">
                  <Calendar className="w-4 h-4 text-[#F6B936] shrink-0" />
                  <span>
                    <strong>Check-in:</strong> {enquiryData.checkIn}
                  </span>
                </div>
              )}

              {enquiryData.checkOut && (
                <div className="flex items-center gap-2.5">
                  <Calendar className="w-4 h-4 text-[#F6B936] shrink-0" />
                  <span>
                    <strong>Check-out:</strong> {enquiryData.checkOut}
                    {enquiryData.nights ? ` (${enquiryData.nights} Nights)` : ""}
                  </span>
                </div>
              )}

              {enquiryData.adults && (
                <div className="flex items-center gap-2.5">
                  <Users className="w-4 h-4 text-[#F6B936] shrink-0" />
                  <span>
                    <strong>Guests:</strong> {enquiryData.adults} {enquiryData.adults === 1 ? "Adult" : "Adults"}
                  </span>
                </div>
              )}

              {enquiryData.fullName && (
                <div className="flex items-center gap-2.5">
                  <User className="w-4 h-4 text-[#F6B936] shrink-0" />
                  <span>
                    <strong>Guest:</strong> {enquiryData.fullName}
                  </span>
                </div>
              )}

              {enquiryData.phone && (
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#F6B936] shrink-0" />
                  <span>
                    <strong>Phone:</strong> {enquiryData.phone}
                  </span>
                </div>
              )}

              {enquiryData.email && (
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#F6B936] shrink-0" />
                  <span>
                    <strong>Email:</strong> {enquiryData.email}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* What Happens Next Steps */}
        <div className="p-5 rounded-2xl bg-[#03101F]/60 border border-[#123452] text-left space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#FFD16A] block">
            What Happens Next:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[#C4D1DF]">
            <div className="p-3 rounded-xl bg-[#0A2340]/60 border border-white/5 space-y-1">
              <span className="font-bold text-[#F7F8FA] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#F6B936]" />
                1. Review Details
              </span>
              <p className="text-[11px] text-[#8ba2bc]">
                Our reservations team verifies room availability and promotional offers.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-[#0A2340]/60 border border-white/5 space-y-1">
              <span className="font-bold text-[#F7F8FA] flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#F6B936]" />
                2. Direct Contact
              </span>
              <p className="text-[11px] text-[#8ba2bc]">
                We reach out via phone or email within 2-4 hours to confirm your reservation.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-[#0A2340]/60 border border-white/5 space-y-1">
              <span className="font-bold text-[#F7F8FA] flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#F6B936]" />
                3. Finalize Stay
              </span>
              <p className="text-[11px] text-[#8ba2bc]">
                Your booking is secured with zero upfront fees until direct confirmation.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
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
