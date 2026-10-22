"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import {
  X,
  Building2,
  MapPin,
  User,
  Phone,
  Mail,
  BedDouble,
  Calendar,
  Users,
  ArrowRight,
  Loader2,
  AlertCircle,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";
import { Property } from "@/types/property";
import { PROPERTIES } from "@/data/properties";
import {
  getTodayDateString,
  getTomorrowDateString,
  calculateNights,
  formatDateDisplay,
} from "@/lib/utils";
import { validateEnquiryForm, EnquiryFormValidationErrors } from "@/lib/validation";

interface StayDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  property?: Property;
  initialRoomType?: string;
}

const DEFAULT_ROOM_CATEGORIES = [
  "Guest Room",
  "Twin Room",
  "Premium Room",
  "Terrace Room",
  "Junior Suite",
  "Executive Suite",
];

export function StayDetailsModal({
  isOpen,
  onClose,
  property,
  initialRoomType,
}: StayDetailsModalProps) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [currentProperty, setCurrentProperty] = useState<Property>(() => property || PROPERTIES[0]);

  // Update currentProperty if property prop changes
  useEffect(() => {
    if (property) {
      setCurrentProperty(property);
    }
  }, [property]);

  // Available room categories (uniform 6 room categories)
  const roomCategories = DEFAULT_ROOM_CATEGORIES;

  // Form states
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [selectedRoomCategory, setSelectedRoomCategory] = useState<string>(() => {
    if (initialRoomType && DEFAULT_ROOM_CATEGORIES.includes(initialRoomType)) {
      return initialRoomType;
    }
    return DEFAULT_ROOM_CATEGORIES[0];
  });

  // Dates state
  const [checkIn, setCheckIn] = useState<string>(getTodayDateString());
  const [checkOut, setCheckOut] = useState<string>(getTomorrowDateString());
  const [adults, setAdults] = useState<number>(2);
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(true);
  const [honeypot, setHoneypot] = useState("");

  // Validation & Submission
  const [errors, setErrors] = useState<EnquiryFormValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Update room category if initialRoomType changes
  useEffect(() => {
    if (initialRoomType && DEFAULT_ROOM_CATEGORIES.includes(initialRoomType)) {
      setSelectedRoomCategory(initialRoomType);
    }
  }, [initialRoomType]);

  // Manage body scroll and Escape key
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "unset";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  const totalNights = calculateNights(checkIn, checkOut);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    const validation = validateEnquiryForm({
      fullName,
      email,
      phone,
      consent,
      honeypot,
    });

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          propertyName: currentProperty.name,
          propertySlug: currentProperty.slug,
          checkIn,
          checkOut,
          adults,
          rooms: 1,
          roomType: selectedRoomCategory.toLowerCase().replace(/\s+/g, "-"),
          roomTypeName: selectedRoomCategory,
          fullName,
          email,
          phone,
          message,
          consent,
          honeypot,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setServerError(
          data.message || "Failed to submit request. Please verify your details."
        );
        setIsSubmitting(false);
        return;
      }

      // Save to sessionStorage
      if (typeof window !== "undefined") {
        sessionStorage.setItem(
          "courtyard_last_enquiry",
          JSON.stringify({
            referenceId: data.referenceId,
            propertyName: currentProperty.name,
            propertySlug: currentProperty.slug,
            city: currentProperty.city,
            checkIn,
            checkOut,
            nights: totalNights,
            adults,
            rooms: 1,
            roomType: selectedRoomCategory.toLowerCase().replace(/\s+/g, "-"),
            roomTypeName: selectedRoomCategory,
            fullName,
            phone,
            email,
            message,
          })
        );
      }

      onClose();
      router.push(`/thank-you?ref=${encodeURIComponent(data.referenceId)}`);
    } catch (err) {
      console.error("Enquiry submission error:", err);
      setServerError("Network error. Please check your internet connection.");
      setIsSubmitting(false);
    }
  };

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="stay-details-modal-title"
      className="fixed inset-0 z-[100] overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 lg:p-6 animate-in fade-in duration-200"
    >
      {/* Background click to dismiss */}
      <div
        className="fixed inset-0 -z-10"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg max-h-[92vh] sm:max-h-[90vh] bg-[#06172A] border border-[#123452] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 m-auto text-left">
        {/* Modal Header */}
        <div className="sticky top-0 z-30 bg-[#06172A] px-4 sm:px-6 py-3.5 border-b border-white/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5 truncate">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#FFE399] via-[#F6B936] to-[#b37c15] p-0.5 shadow-md flex items-center justify-center shrink-0">
              <div className="w-full h-full bg-[#03101F] rounded-[9px] flex items-center justify-center">
                <Building2 className="w-4 h-4 text-[#F6B936]" />
              </div>
            </div>
            <div>
              <h2
                id="stay-details-modal-title"
                className="text-sm sm:text-base font-serif font-bold text-[#F7F8FA]"
              >
                Request Stay Details
              </h2>
              <p className="text-[11px] text-[#8ba2bc]">
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-xl text-[#C4D1DF] hover:text-[#F7F8FA] hover:bg-[#0A2340] border border-[#123452] transition-colors shrink-0 cursor-pointer"
            aria-label="Close popup form"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1 custom-scrollbar"
        >
          {/* =========================================================================
              DESTINATION / HOTEL SELECTOR & PREVIEW
              ========================================================================= */}
          <div>
            <label className="block text-xs font-semibold text-[#C4D1DF] mb-1.5">
              Select Destination / Property <span className="text-[#F6B936]">*</span>
            </label>
            <div className="relative">
              <Building2 className="w-4 h-4 text-[#F6B936] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                value={currentProperty.slug}
                onChange={(e) => {
                  const found = PROPERTIES.find((p) => p.slug === e.target.value);
                  if (found) setCurrentProperty(found);
                }}
                className="w-full bg-[#03101F] border border-slate-700 rounded-xl pl-10 pr-9 py-2.5 text-xs sm:text-sm text-[#F7F8FA] focus:outline-none focus:border-[#F6B936] focus:ring-1 focus:ring-[#F6B936] appearance-none cursor-pointer"
              >
                {PROPERTIES.map((p) => (
                  <option key={p.slug} value={p.slug} className="bg-[#06172A] text-white">
                    {p.name} — {p.city}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="bg-[#03101F] border border-[#123452] rounded-2xl p-3 sm:p-3.5 flex items-center gap-3 shadow-md">
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden shrink-0 border border-white/10 bg-slate-900">
              <img
                src={currentProperty.heroImage}
                alt={currentProperty.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#FFD16A] flex items-center gap-1 mb-0.5">
                <CheckCircle2 className="w-3 h-3 text-[#F6B936]" />
                Selected Destination
              </span>
              <h3 className="font-serif font-bold text-sm sm:text-base text-[#F7F8FA] leading-tight truncate">
                {currentProperty.name}
              </h3>
              <p className="text-xs text-[#8ba2bc] flex items-center gap-1 mt-0.5 truncate">
                <MapPin className="w-3 h-3 text-[#F6B936] shrink-0" />
                {currentProperty.city}, {currentProperty.state}
              </p>
            </div>
          </div>

          {/* =========================================================================
              GUEST CONTACT FIELDS: NAME, PHONE NO, MAIL ID
              ========================================================================= */}
          <div className="space-y-3.5">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-[#C4D1DF] mb-1.5">
                Full Name <span className="text-[#F6B936]">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  className={`w-full bg-[#03101F] border rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-[#F7F8FA] placeholder-slate-500 focus:outline-none transition-all ${errors.fullName
                    ? "border-rose-400 bg-rose-950/20"
                    : "border-slate-700 focus:border-[#F6B936] focus:ring-1 focus:ring-[#F6B936]"
                    }`}
                />
              </div>
              {errors.fullName && (
                <p className="text-rose-400 text-[11px] mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  <span>{errors.fullName}</span>
                </p>
              )}
            </div>

            {/* Phone No & Mail ID Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Phone No */}
              <div>
                <label className="block text-xs font-semibold text-[#C4D1DF] mb-1.5">
                  Phone Number <span className="text-[#F6B936]">*</span>
                </label>
                <div className="relative flex">
                  <span className="inline-flex items-center px-2.5 rounded-l-xl border border-r-0 border-slate-700 bg-[#0A2340] text-xs font-semibold text-[#FFD16A] shrink-0">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={phone}
                    onChange={(e) =>
                      setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
                    }
                    placeholder="10-digit number"
                    className={`w-full bg-[#03101F] border rounded-r-xl px-3 py-2.5 text-xs sm:text-sm text-[#F7F8FA] placeholder-slate-500 focus:outline-none transition-all ${errors.phone
                      ? "border-rose-400 bg-rose-950/20"
                      : "border-slate-700 focus:border-[#F6B936] focus:ring-1 focus:ring-[#F6B936]"
                      }`}
                  />
                </div>
                {errors.phone && (
                  <p className="text-rose-400 text-[11px] mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.phone}</span>
                  </p>
                )}
              </div>

              {/* Mail ID */}
              <div>
                <label className="block text-xs font-semibold text-[#C4D1DF] mb-1.5">
                  Email ID <span className="text-[#F6B936]">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className={`w-full bg-[#03101F] border rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-[#F7F8FA] placeholder-slate-500 focus:outline-none transition-all ${errors.email
                      ? "border-rose-400 bg-rose-950/20"
                      : "border-slate-700 focus:border-[#F6B936] focus:ring-1 focus:ring-[#F6B936]"
                      }`}
                  />
                </div>
                {errors.email && (
                  <p className="text-rose-400 text-[11px] mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Room Category Selection */}
            <div>
              <label className="block text-xs font-semibold text-[#C4D1DF] mb-1.5">
                Room Category <span className="text-[#F6B936]">*</span>
              </label>
              <div className="relative">
                <BedDouble className="w-4 h-4 text-[#F6B936] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <select
                  value={selectedRoomCategory}
                  onChange={(e) => setSelectedRoomCategory(e.target.value)}
                  className="w-full bg-[#03101F] border border-slate-700 rounded-xl pl-10 pr-9 py-2.5 text-xs sm:text-sm text-[#F7F8FA] focus:outline-none focus:border-[#F6B936] focus:ring-1 focus:ring-[#F6B936] appearance-none cursor-pointer"
                >
                  {roomCategories.map((cat) => (
                    <option key={cat} value={cat} className="bg-[#06172A] text-white">
                      {cat}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Stay Dates (2 Columns) */}
            <div className="grid grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-[#C4D1DF] mb-1.5">
                  Check-in Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    required
                    min={getTodayDateString()}
                    value={checkIn}
                    onChange={(e) => {
                      setCheckIn(e.target.value);
                      if (checkOut && checkOut <= e.target.value) {
                        setCheckOut("");
                      }
                    }}
                    className="w-full bg-[#03101F] border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-[#F7F8FA] focus:outline-none focus:border-[#F6B936] focus:ring-1 focus:ring-[#F6B936]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#C4D1DF] mb-1.5">
                  Check-out Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    required
                    min={checkIn || getTodayDateString()}
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full bg-[#03101F] border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-[#F7F8FA] focus:outline-none focus:border-[#F6B936] focus:ring-1 focus:ring-[#F6B936]"
                  />
                </div>
              </div>
            </div>

            {/* Guests Count */}
            <div>
              <label className="block text-xs font-semibold text-[#C4D1DF] mb-1.5">
                Guests
              </label>
              <div className="relative">
                <Users className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <select
                  value={adults}
                  onChange={(e) => setAdults(Number(e.target.value))}
                  className="w-full bg-[#03101F] border border-slate-700 rounded-xl pl-10 pr-9 py-2 text-xs sm:text-sm text-[#F7F8FA] focus:outline-none focus:border-[#F6B936] focus:ring-1 focus:ring-[#F6B936] appearance-none cursor-pointer"
                >
                  <option value={1} className="bg-[#06172A] text-white">1 Adult (1 Room)</option>
                  <option value={2} className="bg-[#06172A] text-white">2 Adults (1 Room)</option>
                  <option value={3} className="bg-[#06172A] text-white">3 Adults (1 Room)</option>
                  <option value={4} className="bg-[#06172A] text-white">4 Adults (2 Rooms)</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Optional Special Note */}
            <div>
              <label className="block text-xs font-semibold text-[#C4D1DF] mb-1.5">
                Special Requests or Stay Requirements <span className="text-[#8ba2bc] font-normal">(Optional)</span>
              </label>
              <textarea
                rows={2}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Airport transfer, high floor, non-smoking, early check-in, etc."
                className="w-full bg-[#03101F] border border-slate-700 rounded-xl p-3 text-xs sm:text-sm text-[#F7F8FA] placeholder-slate-500 focus:outline-none focus:border-[#F6B936] focus:ring-1 focus:ring-[#F6B936] resize-none"
              />
            </div>

            {/* Honeypot field for bot protection */}
            <input
              type="text"
              name="website_url_hp"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {/* Server Error Alert */}
          {serverError && (
            <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/40 text-xs text-rose-300 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{serverError}</span>
            </div>
          )}

          {/* Submit CTA Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-b from-[#FDC858] via-[#F5A623] to-[#EE9017] hover:brightness-105 active:scale-[0.99] text-[#0A192F] font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-[0_8px_20px_-4px_rgba(245,158,11,0.45)] hover:shadow-[0_10px_25px_-4px_rgba(245,158,11,0.55)] transition-all cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#0A192F]" />
                  <span>Submitting Stay Request...</span>
                </>
              ) : (
                <>
                  <span>Request Stay Details</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </>
              )}
            </button>
          </div>

          {/* Trust notice */}
          <p className="text-[11px] text-[#8ba2bc] text-center leading-relaxed">
            Submitting an enquiry does not confirm a booking.

          </p>
        </form>
      </div>
    </div>,
    document.body
  );
}
