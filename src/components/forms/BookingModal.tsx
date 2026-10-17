"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  X,
  Sparkles,
  Check,
  CheckCircle2,
  BedDouble,
  User,
  Phone,
  Mail,
  ShieldCheck,
  Clock,
  Loader2,
  AlertCircle,
  Building,
  Calendar,
  Users,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { Property } from "@/types/property";
import { calculateNights } from "@/lib/utils";
import { validateEnquiryForm, EnquiryFormValidationErrors } from "@/lib/validation";

export const AVAILABLE_ROOMS = [
  {
    id: "deluxe-room",
    title: "Deluxe Room",
    tagline: "Comfortable Elegance for Business & Leisure",
    description:
      "Carefully designed contemporary room featuring plush signature bedding, ergonomic workspace, and modern ensuite bathroom.",
    image:
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80",
    features: [
      "High-speed Wi-Fi",
      "Ergonomic work desk",
      "LED TV & media hub",
      "Signature bath amenities",
    ],
    bed: "1 King Bed or 2 Twin Beds",
    size: "38 m² / 409 sq ft",
    capacity: "2 Adults",
    badge: "Most Popular",
  },
  {
    id: "executive-room",
    title: "Executive Room",
    tagline: "Elevated Stays for Discerning Travellers",
    description:
      "Enhanced space with premium city or courtyard vistas, elevated amenities, and thoughtful details tailored for corporate productivity.",
    image:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
    features: [
      "High floor city vistas",
      "Complimentary buffet breakfast",
      "Enhanced bath amenities",
      "High-speed Wi-Fi",
    ],
    bed: "1 King Bed",
    size: "42 m² / 452 sq ft",
    capacity: "2 Adults",
    badge: "Executive Floor",
  },
  {
    id: "suite",
    title: "Courtyard Suite",
    tagline: "Spacious Luxury & Distinguished Ambiance",
    description:
      "Generously proportioned suite with expansive lounging area, scenic views, and curated hospitality touches for memorable family or VIP stays.",
    image:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80",
    features: [
      "Separate living room & bedroom",
      "Luxury deep soaking tub",
      "Panoramic city views",
      "VIP arrival amenities",
    ],
    bed: "1 Master King Bed",
    size: "65 m² / 700 sq ft",
    capacity: "3 Adults",
    badge: "Luxury Suite",
  },
  {
    id: "standard-room",
    title: "Standard Guest Room",
    tagline: "Essential Comfort & Modern Efficiency",
    description:
      "Smart and functional guest room equipped with all core essentials for short city transits and focused work trips.",
    image:
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80",
    features: [
      "Soundproof glazing",
      "Comfortable queen bed",
      "Rainfall shower",
      "Climate control",
    ],
    bed: "1 Queen Bed",
    size: "32 m² / 344 sq ft",
    capacity: "2 Adults",
    badge: "Smart Value",
  },
];

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: Property;
  checkIn: string;
  checkOut: string;
  adults: number;
  initialRoomType?: string;
}

export function BookingModal({
  isOpen,
  onClose,
  property,
  checkIn,
  checkOut,
  adults,
  initialRoomType = "deluxe-room",
}: BookingModalProps) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Step state: 'select-room' (Step 1) -> 'guest-details' (Step 2)
  type ModalStep = "select-room" | "guest-details";
  const [currentStep, setCurrentStep] = useState<ModalStep>("select-room");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Selected room state (default to matched initial room type or first room)
  const [selectedRoomId, setSelectedRoomId] = useState<string>(() => {
    if (initialRoomType && initialRoomType !== "all") {
      const match = AVAILABLE_ROOMS.find((r) => r.id === initialRoomType);
      if (match) return match.id;
    }
    return AVAILABLE_ROOMS[0].id;
  });

  // Reset to Step 1 whenever modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentStep("select-room");
    }
  }, [isOpen]);

  // Keep selected room in sync if initialRoomType changes
  useEffect(() => {
    if (initialRoomType && initialRoomType !== "all") {
      const match = AVAILABLE_ROOMS.find((r) => r.id === initialRoomType);
      if (match) setSelectedRoomId(match.id);
    }
  }, [initialRoomType]);

  // Handler: Select a room and automatically advance to details submit form
  const handleSelectRoomAndProceed = (roomId: string) => {
    setSelectedRoomId(roomId);
    setCurrentStep("guest-details");
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Guest details state
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(true);
  const [honeypot, setHoneypot] = useState("");

  // Validation & Submission
  const [errors, setErrors] = useState<EnquiryFormValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  // Close on Escape key & manage body scroll
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
  const activeRoom =
    AVAILABLE_ROOMS.find((r) => r.id === selectedRoomId) || AVAILABLE_ROOMS[0];

  const formatDateCompact = (dateStr: string) => {
    if (!dateStr) return "";
    try {
      const parts = dateStr.split("-");
      if (parts.length === 3) {
        const year = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const day = parseInt(parts[2], 10);
        const d = new Date(year, month, day);
        return d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
      }
      const d = new Date(dateStr);
      return isNaN(d.getTime())
        ? dateStr
        : d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
    } catch {
      return dateStr;
    }
  };

  const formattedStay = `${formatDateCompact(checkIn)} – ${formatDateCompact(checkOut)}`;

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
          propertyName: property.name,
          propertySlug: property.slug,
          checkIn,
          checkOut,
          adults,
          rooms: 1,
          roomType: activeRoom.id,
          roomTypeName: activeRoom.title,
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
          data.message || "Failed to process enquiry. Please try again or call our helpline."
        );
        setIsSubmitting(false);
        return;
      }

      // Save to sessionStorage (no prices)
      if (typeof window !== "undefined") {
        sessionStorage.setItem(
          "courtyard_last_enquiry",
          JSON.stringify({
            referenceId: data.referenceId,
            propertyName: property.name,
            propertySlug: property.slug,
            city: property.city,
            checkIn,
            checkOut,
            nights: totalNights,
            adults,
            rooms: 1,
            roomType: activeRoom.id,
            roomTypeName: activeRoom.title,
            fullName,
            phone,
            email,
            message,
          })
        );
      }

      // Redirect to thank-you page
      router.push(`/thank-you?ref=${encodeURIComponent(data.referenceId)}`);
    } catch (err) {
      console.error("Submission error:", err);
      setServerError("Network error. Please check your internet connection and try again.");
      setIsSubmitting(false);
    }
  };

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-popup-title"
      className="fixed inset-0 z-[100] overflow-y-auto bg-[#03101F]/85 backdrop-blur-md flex p-3 sm:p-5 lg:p-6 animate-in fade-in duration-200"
    >
      {/* Background click to dismiss */}
      <div
        className="fixed inset-0 -z-10"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card - m-auto ensures perfect centering & prevent clipping on all screens */}
      <div className="relative w-full max-w-4xl max-h-[92vh] sm:max-h-[90vh] bg-[#06172A] border border-[#123452] rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 m-auto">
        {/* Sticky Popup Header */}
        <div className="sticky top-0 z-30 bg-[#06172A] px-4 sm:px-6 lg:px-8 py-3 sm:py-3.5 border-b border-white/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3 truncate mr-2 sm:mr-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-[#FFE399] via-[#F6B936] to-[#b37c15] p-0.5 shadow-md flex items-center justify-center shrink-0">
              <div className="w-full h-full bg-[#03101F] rounded-[10px] flex items-center justify-center">
                <Building className="w-4 h-4 text-[#F6B936]" />
              </div>
            </div>
            <div className="truncate">
              <h2
                id="booking-popup-title"
                className="text-sm sm:text-base lg:text-lg font-serif font-bold text-[#F7F8FA] truncate"
              >
                {property.name}
              </h2>
              <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-[#8ba2bc] truncate">
                <span className="flex items-center gap-1 whitespace-nowrap text-[#C4D1DF] font-medium">
                  <Calendar className="w-3 h-3 text-[#F6B936] shrink-0" />
                  {formattedStay}
                </span>
                <span className="text-white/20">•</span>
                <span className="whitespace-nowrap">
                  {totalNights} {totalNights === 1 ? "Night" : "Nights"}
                </span>
                <span className="text-white/20">•</span>
                <span className="flex items-center gap-1 whitespace-nowrap">
                  <Users className="w-3 h-3 text-[#F6B936] shrink-0" />
                  {adults} {adults === 1 ? "Adult" : "Adults"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="p-2 sm:p-2.5 rounded-xl text-[#C4D1DF] hover:text-[#F7F8FA] hover:bg-[#0A2340] border border-[#123452] transition-colors shrink-0"
              aria-label="Close booking popup"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Popup Body */}
        <div
          ref={scrollContainerRef}
          className="p-4 sm:p-6 lg:p-8 overflow-y-auto space-y-4 sm:space-y-5 flex-1 custom-scrollbar"
        >
          {/* =========================================================================
              MODERN 2-STEP PROGRESS STEPPER
              ========================================================================= */}
          <div className="bg-[#03101F] border border-[#123452] rounded-xl sm:rounded-2xl p-2.5 sm:p-3 shadow-md">
            <div className="flex items-center justify-between gap-2 sm:gap-4">
              {/* Step 1 Indicator */}
              <button
                type="button"
                onClick={() => {
                  if (currentStep === "guest-details") setCurrentStep("select-room");
                }}
                disabled={currentStep === "select-room"}
                className={`flex items-center gap-2 sm:gap-2.5 text-left transition-opacity min-w-0 ${
                  currentStep === "select-room"
                    ? "opacity-100 cursor-default"
                    : "opacity-85 hover:opacity-100 cursor-pointer"
                }`}
              >
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all ${
                    currentStep === "select-room"
                      ? "bg-gradient-to-r from-[#FFE399] via-[#F6B936] to-[#b37c15] text-[#03101F] shadow-md shadow-[#F6B936]/30 ring-2 ring-[#F6B936]/40"
                      : "bg-emerald-500/20 border border-emerald-400 text-emerald-300"
                  }`}
                >
                  {currentStep === "select-room" ? (
                    "1"
                  ) : (
                    <Check className="w-4 h-4 stroke-[2.5]" />
                  )}
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#8ba2bc] block leading-tight">
                    Step 1
                  </span>
                  <span
                    className={`text-xs sm:text-sm font-semibold truncate block ${
                      currentStep === "select-room"
                        ? "text-[#F6B936]"
                        : "text-[#F7F8FA]"
                    }`}
                  >
                    {currentStep === "select-room"
                      ? "Choose Room"
                      : "Room Selected"}
                  </span>
                </div>
              </button>

              {/* Progress Connector Line */}
              <div className="flex-1 max-w-[80px] sm:max-w-xs h-0.5 sm:h-1 bg-[#0A2340] rounded-full overflow-hidden mx-1 sm:mx-3 shrink-0">
                <div
                  className={`h-full bg-gradient-to-r from-[#F6B936] to-emerald-400 transition-all duration-300 ${
                    currentStep === "guest-details" ? "w-full" : "w-1/2"
                  }`}
                />
              </div>

              {/* Step 2 Indicator */}
              <div
                className={`flex items-center gap-2 sm:gap-2.5 text-left transition-opacity min-w-0 ${
                  currentStep === "guest-details" ? "opacity-100" : "opacity-60"
                }`}
              >
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all ${
                    currentStep === "guest-details"
                      ? "bg-gradient-to-r from-[#FFE399] via-[#F6B936] to-[#b37c15] text-[#03101F] shadow-md shadow-[#F6B936]/30 ring-2 ring-[#F6B936]/40"
                      : "bg-[#0A2340] border border-[#123452] text-[#8ba2bc]"
                  }`}
                >
                  2
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#8ba2bc] block leading-tight">
                    Step 2
                  </span>
                  <span
                    className={`text-xs sm:text-sm font-semibold truncate block ${
                      currentStep === "guest-details"
                        ? "text-[#F6B936]"
                        : "text-[#8ba2bc]"
                    }`}
                  >
                    Guest Details
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* =========================================================================
              STEP 1: SELECT ROOM CATEGORY
              ========================================================================= */}
          {currentStep === "select-room" && (
            <div className="space-y-4 sm:space-y-5 animate-in fade-in duration-200">
              {/* Clean, Simple & Premium Section Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2 border-b border-white/5">
                <div>
                  <h3 className="font-serif font-bold text-lg sm:text-xl text-[#F7F8FA] flex items-center gap-2">
                    <span>Select Room Category</span>
                  </h3>
                  <p className="text-xs text-[#8ba2bc] mt-0.5">
                    Select any room below to proceed directly to your reservation form.
                  </p>
                </div>

                <div className="inline-flex items-center gap-2 self-start sm:self-auto px-3 py-1.5 rounded-full bg-[#0A2340] border border-[#123452] text-xs text-[#C4D1DF]">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-medium text-[#FFD16A]">4 Categories Available</span>
                </div>
              </div>

              {/* 4 Available Room Cards */}
              <div className="space-y-3 sm:space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                  {AVAILABLE_ROOMS.map((room) => {
                    const isSelected = selectedRoomId === room.id;
                    return (
                      <div
                        key={room.id}
                        onClick={() => handleSelectRoomAndProceed(room.id)}
                        className={`cursor-pointer rounded-2xl border transition-all duration-300 overflow-hidden relative flex flex-col justify-between group shadow-lg hover:shadow-2xl hover:shadow-[#F6B936]/15 hover:-translate-y-0.5 ${
                          isSelected
                            ? "bg-[#0A2340] border-[#F6B936] ring-2 ring-[#F6B936]/50"
                            : "bg-[#03101F]/70 border-[#123452] hover:border-[#F6B936] hover:bg-[#071a2e]"
                        }`}
                      >
                        {/* Top Room Photo & Badge */}
                        <div className="relative h-40 sm:h-44 w-full overflow-hidden">
                          <Image
                            src={room.image}
                            alt={room.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#06172A] via-transparent to-black/30" />

                          <div className="absolute top-3 left-3">
                            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#03101F]/80 text-[#FFD16A] border border-[#F6B936]/30 backdrop-blur-sm">
                              {room.badge}
                            </span>
                          </div>

                          <div className="absolute top-3 right-3">
                            <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 backdrop-blur-sm flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                              Available
                            </span>
                          </div>

                          <div className="absolute bottom-3 left-3 right-3">
                            <h4 className="font-serif font-bold text-base sm:text-lg text-white drop-shadow group-hover:text-[#FFD16A] transition-colors">
                              {room.title}
                            </h4>
                            <span className="text-xs text-[#C4D1DF] drop-shadow flex items-center gap-1">
                              <BedDouble className="w-3.5 h-3.5 text-[#F6B936]" />
                              {room.bed} • {room.size}
                            </span>
                          </div>
                        </div>

                        {/* Room Details & Features */}
                        <div className="p-3.5 sm:p-4 space-y-3 flex-1 flex flex-col justify-between">
                          <div className="space-y-2">
                            <p className="text-xs text-[#C4D1DF] leading-relaxed">
                              {room.description}
                            </p>

                            <div className="flex flex-wrap gap-1.5">
                              {room.features.map((feat, idx) => (
                                <span
                                  key={idx}
                                  className="px-2 py-0.5 rounded text-[11px] bg-[#03101F]/80 text-[#C4D1DF] border border-white/5"
                                >
                                  ✓ {feat}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Action Button: triggers automatic advance to details form */}
                          <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                            <span className="text-xs text-[#8ba2bc]">
                              Capacity: <strong>{room.capacity}</strong>
                            </span>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSelectRoomAndProceed(room.id);
                              }}
                              className="px-3.5 sm:px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 bg-gradient-to-b from-[#FDC858] via-[#F5A623] to-[#EE9017] text-[#0A192F] hover:brightness-105 shadow-md shadow-[#F6B936]/30 group-hover:scale-[1.02]"
                            >
                              <span>Select Room &amp; Continue</span>
                              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              STEP 2: ENTER GUEST DETAILS & SUBMIT FORM
              ========================================================================= */}
          {currentStep === "guest-details" && (
            <div className="space-y-4 sm:space-y-5 animate-in fade-in duration-200">
              {/* Selected Room Summary Strip with Change Room Action */}
              <div className="bg-[#03101F] border border-[#123452] hover:border-[#F6B936]/40 rounded-xl sm:rounded-2xl p-3 sm:p-3.5 flex items-center justify-between gap-3 shadow-md transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl overflow-hidden shrink-0 border border-white/10 bg-slate-900">
                    <Image
                      src={activeRoom.image}
                      alt={activeRoom.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#FFD16A]">
                        Selected Room
                      </span>
                      <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-0.5">
                        • Confirmed
                      </span>
                    </div>
                    <h3 className="font-serif font-bold text-sm sm:text-base text-[#F7F8FA] truncate">
                      {activeRoom.title}
                    </h3>
                    <p className="text-[11px] text-[#8ba2bc] truncate">
                      {activeRoom.bed} • {activeRoom.capacity}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setCurrentStep("select-room")}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-[#FFD16A] bg-[#0A2340] hover:bg-[#123452] border border-[#F6B936]/40 transition-colors flex items-center gap-1 shrink-0"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Change</span>
                </button>
              </div>

              {/* Step 2 Form: Enter Guest Details */}
              <div className="bg-[#03101F]/80 border border-[#123452] rounded-xl sm:rounded-2xl p-4 sm:p-6 space-y-4 sm:space-y-5">
                <div className="pb-2 sm:pb-3 border-b border-white/10">
                  <h3 className="font-serif font-bold text-base sm:text-lg text-[#F7F8FA]">
                    Enter Your Contact Details
                  </h3>
                  <p className="text-xs text-[#8ba2bc] mt-0.5">
                    We will contact you shortly to confirm your booking for {activeRoom.title}.
                  </p>
                </div>

                {/* Server Error */}
                {serverError && (
                  <div className="p-3.5 sm:p-4 rounded-xl bg-rose-500/15 border border-rose-500/40 text-xs sm:text-sm text-rose-300 flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 mt-0.5 text-rose-400" />
                    <p>{serverError}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5" noValidate>
                  {/* Anti-spam honeypot */}
                  <div className="hidden" aria-hidden="true">
                    <input
                      type="text"
                      name="popup_web_input"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {/* Guest Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="popup-fullname"
                        className="block text-xs font-semibold uppercase tracking-wider text-[#C4D1DF] flex items-center gap-1.5"
                      >
                        <User className="w-3.5 h-3.5 text-[#F6B936]" />
                        <span>Full Name <span className="text-rose-400">*</span></span>
                      </label>
                      <input
                        id="popup-fullname"
                        type="text"
                        required
                        placeholder="e.g. Rahul Sharma"
                        value={fullName}
                        onChange={(e) => {
                          setFullName(e.target.value);
                          if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
                        }}
                        className={`w-full bg-[#0A2340] border rounded-xl px-3.5 py-2.5 text-sm text-[#F7F8FA] placeholder-[#8ba2bc] focus:outline-none transition-all ${
                          errors.fullName
                            ? "border-rose-500 ring-1 ring-rose-500"
                            : "border-[#123452] focus:border-[#F6B936]"
                        }`}
                      />
                      {errors.fullName && (
                        <p className="text-xs text-rose-400 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{errors.fullName}</span>
                        </p>
                      )}
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="popup-phone"
                        className="block text-xs font-semibold uppercase tracking-wider text-[#C4D1DF] flex items-center gap-1.5"
                      >
                        <Phone className="w-3.5 h-3.5 text-[#F6B936]" />
                        <span>Phone Number <span className="text-rose-400">*</span></span>
                      </label>
                      <input
                        id="popup-phone"
                        type="tel"
                        required
                        placeholder="e.g. +91 98765 43210"
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                        }}
                        className={`w-full bg-[#0A2340] border rounded-xl px-3.5 py-2.5 text-sm text-[#F7F8FA] placeholder-[#8ba2bc] focus:outline-none transition-all ${
                          errors.phone
                            ? "border-rose-500 ring-1 ring-rose-500"
                            : "border-[#123452] focus:border-[#F6B936]"
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-xs text-rose-400 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{errors.phone}</span>
                        </p>
                      )}
                    </div>

                    {/* Email Address */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="popup-email"
                        className="block text-xs font-semibold uppercase tracking-wider text-[#C4D1DF] flex items-center gap-1.5"
                      >
                        <Mail className="w-3.5 h-3.5 text-[#F6B936]" />
                        <span>Email Address <span className="text-rose-400">*</span></span>
                      </label>
                      <input
                        id="popup-email"
                        type="email"
                        required
                        placeholder="e.g. rahul@example.com"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                        }}
                        className={`w-full bg-[#0A2340] border rounded-xl px-3.5 py-2.5 text-sm text-[#F7F8FA] placeholder-[#8ba2bc] focus:outline-none transition-all ${
                          errors.email
                            ? "border-rose-500 ring-1 ring-rose-500"
                            : "border-[#123452] focus:border-[#F6B936]"
                        }`}
                      />
                      {errors.email && (
                        <p className="text-xs text-rose-400 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="popup-message"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#C4D1DF]"
                    >
                      Special Requests (Optional)
                    </label>
                    <textarea
                      id="popup-message"
                      rows={2}
                      placeholder="e.g. Early check-in, high floor, airport shuttle, dietary preferences..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-[#0A2340] border border-[#123452] rounded-xl px-3.5 py-2 text-sm text-[#F7F8FA] placeholder-[#8ba2bc] focus:outline-none focus:border-[#F6B936] resize-none"
                    />
                  </div>

                  {/* Consent Checkbox */}
                  <div className="space-y-1">
                    <label className="flex items-start gap-2.5 cursor-pointer text-xs text-[#C4D1DF] select-none">
                      <input
                        type="checkbox"
                        checked={consent}
                        onChange={(e) => {
                          setConsent(e.target.checked);
                          if (errors.consent) setErrors((prev) => ({ ...prev, consent: undefined }));
                        }}
                        className="mt-0.5 rounded border-[#123452] bg-[#0A2340] text-[#F6B936] focus:ring-[#F6B936] w-4 h-4"
                      />
                      <span>
                        I agree to allow Courtyard by Marriott coordinators to contact me via phone, WhatsApp, or email regarding this stay enquiry.
                      </span>
                    </label>
                    {errors.consent && (
                      <p className="text-xs text-rose-400 flex items-center gap-1 pl-6">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{errors.consent}</span>
                      </p>
                    )}
                  </div>

                  {/* Step 4: Submit Button */}
                  <div className="pt-1.5 space-y-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 sm:py-4 px-6 rounded-xl btn-gold text-sm sm:text-base font-bold flex items-center justify-center gap-2.5 sm:gap-3 transition-all disabled:opacity-60 shadow-xl shadow-[#F6B936]/25"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin text-[#102033]" />
                          <span>Submitting Booking Enquiry...</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-5 h-5 text-[#102033]" />
                          <span>Submit Booking Enquiry</span>
                        </>
                      )}
                    </button>

                    <div className="p-2.5 sm:p-3 rounded-xl bg-[#03101F] border border-[#123452] text-[11px] sm:text-xs text-[#8ba2bc] text-center flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                      <span className="flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F6B936]" />
                        Zero Booking Fees
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F6B936]" />
                        Fast 2-4 Hr Response
                      </span>
                      <span>•</span>
                      <span>No payment required on enquiry</span>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
