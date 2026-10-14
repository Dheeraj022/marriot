"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Calendar,
  Users,
  Moon,
  ShieldCheck,
  Send,
  AlertCircle,
  Loader2,
  Edit3,
} from "lucide-react";
import { PROPERTIES } from "@/data/properties";
import { formatDateDisplay, calculateNights } from "@/lib/utils";
import { validateEnquiryForm, EnquiryFormValidationErrors } from "@/lib/validation";
import { SITE_CONFIG } from "@/data/site-config";

export function EnquiryForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Search parameters from query string
  const propertySlug = searchParams.get("property") || searchParams.get("propertySlug") || "courtyard-mumbai-international-airport";
  const propertyNameParam = searchParams.get("propertyName");
  const checkIn = searchParams.get("checkIn") || searchParams.get("checkin") || "";
  const checkOut = searchParams.get("checkOut") || searchParams.get("checkout") || "";
  const adults = parseInt(searchParams.get("adults") || "2", 10);
  const rooms = parseInt(searchParams.get("rooms") || "1", 10);
  const children = parseInt(searchParams.get("children") || "0", 10);
  const roomCategoryParam = searchParams.get("roomCategory") || "";
  const messageParam = searchParams.get("message") || "";

  // Lookup matched property or default to first
  const property =
    PROPERTIES.find((p) => p.slug === propertySlug) ||
    PROPERTIES.find((p) => p.name === propertyNameParam) ||
    PROPERTIES[0];

  const totalNights = checkIn && checkOut ? calculateNights(checkIn, checkOut) : 1;

  // Form inputs state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState(
    roomCategoryParam ? `Interested in ${roomCategoryParam}. ${messageParam}` : messageParam
  );
  const [consent, setConsent] = useState(true);
  const [honeypot, setHoneypot] = useState("");

  // Submission state
  const [errors, setErrors] = useState<EnquiryFormValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    // Validate client-side
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
          checkIn: checkIn || "To be confirmed",
          checkOut: checkOut || "To be confirmed",
          adults,
          rooms,
          children,
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

      // Store non-sensitive summary in sessionStorage for the confirmation page
      if (typeof window !== "undefined") {
        sessionStorage.setItem(
          "guestassist_last_enquiry",
          JSON.stringify({
            referenceId: data.referenceId,
            propertyName: property.name,
            checkIn,
            checkOut,
            adults,
            rooms,
            children,
            fullName,
          })
        );
      }

      // Redirect to thank-you page with reference ID
      router.push(`/thank-you?ref=${encodeURIComponent(data.referenceId)}`);
    } catch (err) {
      console.error("Submission error:", err);
      setServerError("Network error. Please check your internet connection and try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Search Details Summary Card (Values carried forward automatically) */}
      <div className="bg-[#06172A] border border-[#123452] rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-white/10">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#FFD16A] block mb-1">
              Your Requested Stay Details
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#F7F8FA]">
              {property.name}
            </h2>
            <p className="text-xs text-[#8ba2bc]">
              {property.city}, {property.state} • {property.region} India
            </p>
          </div>

          <Link
            href={`/?property=${property.slug}&checkIn=${checkIn}&checkOut=${checkOut}&adults=${adults}&rooms=${rooms}&children=${children}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0A2340] border border-[#123452] text-xs font-semibold text-[#FFD16A] hover:border-[#F6B936] transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Modify Dates / Property</span>
          </Link>
        </div>

        {/* Stay Parameters Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-5 text-sm">
          <div className="space-y-1">
            <span className="text-xs text-[#8ba2bc] flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#F6B936]" />
              Check-in Date
            </span>
            <span className="font-semibold text-[#F7F8FA] block">
              {checkIn ? formatDateDisplay(checkIn) : "Dates to be confirmed"}
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-xs text-[#8ba2bc] flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#F6B936]" />
              Check-out Date
            </span>
            <span className="font-semibold text-[#F7F8FA] block">
              {checkOut ? formatDateDisplay(checkOut) : "Dates to be confirmed"}
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-xs text-[#8ba2bc] flex items-center gap-1">
              <Moon className="w-3.5 h-3.5 text-[#F6B936]" />
              Duration
            </span>
            <span className="font-semibold text-[#F7F8FA] block">
              {totalNights} {totalNights === 1 ? "Night" : "Nights"}
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-xs text-[#8ba2bc] flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-[#F6B936]" />
              Guests & Rooms
            </span>
            <span className="font-semibold text-[#F7F8FA] block">
              {adults} {adults === 1 ? "Adult" : "Adults"} • {rooms} {rooms === 1 ? "Room" : "Rooms"}
              {children > 0 ? ` • ${children} Ch` : ""}
            </span>
          </div>
        </div>
      </div>

      {/* Main Enquiry Form */}
      <div className="bg-[#06172A] border border-[#123452] rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="border-b border-white/10 pb-4">
          <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#F7F8FA]">
            Contact & Stay Preferences
          </h3>
          <p className="text-xs sm:text-sm text-[#C4D1DF] mt-1">
            Enter your details below. Our stay assistance team will review availability and contact you shortly.
          </p>
        </div>

        {/* Server Error Banner */}
        {serverError && (
          <div className="p-4 rounded-xl bg-rose-500/15 border border-rose-500/40 text-sm text-rose-300 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-rose-400" />
            <p>{serverError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          {/* Honeypot field for anti-spam (visually hidden) */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="website_url">Leave empty</label>
            <input
              id="website_url"
              type="text"
              name="website_url"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="space-y-1.5 sm:col-span-2">
              <label
                htmlFor="fullName"
                className="block text-xs font-semibold uppercase tracking-wider text-[#C4D1DF]"
              >
                Full Name <span className="text-rose-400">*</span>
              </label>
              <input
                id="fullName"
                type="text"
                required
                placeholder="e.g. Rahul Sharma"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
                }}
                className={`w-full bg-[#0A2340] border rounded-xl px-4 py-3 text-sm text-[#F7F8FA] placeholder-[#8ba2bc] focus:outline-none transition-all ${
                  errors.fullName
                    ? "border-rose-500 focus:ring-1 focus:ring-rose-500"
                    : "border-[#123452] focus:border-[#F6B936] focus:ring-1 focus:ring-[#F6B936]"
                }`}
              />
              {errors.fullName && (
                <p className="text-xs text-rose-400 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.fullName}</span>
                </p>
              )}
            </div>

            {/* Email Address */}
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="block text-xs font-semibold uppercase tracking-wider text-[#C4D1DF]"
              >
                Email Address <span className="text-rose-400">*</span>
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="e.g. rahul@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                }}
                className={`w-full bg-[#0A2340] border rounded-xl px-4 py-3 text-sm text-[#F7F8FA] placeholder-[#8ba2bc] focus:outline-none transition-all ${
                  errors.email
                    ? "border-rose-500 focus:ring-1 focus:ring-rose-500"
                    : "border-[#123452] focus:border-[#F6B936] focus:ring-1 focus:ring-[#F6B936]"
                }`}
              />
              {errors.email && (
                <p className="text-xs text-rose-400 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.email}</span>
                </p>
              )}
            </div>

            {/* Phone Number */}
            <div className="space-y-1.5">
              <label
                htmlFor="phone"
                className="block text-xs font-semibold uppercase tracking-wider text-[#C4D1DF]"
              >
                Mobile Number <span className="text-rose-400">*</span>
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3.5 rounded-l-xl border border-r-0 border-[#123452] bg-[#03101F] text-xs font-medium text-[#C4D1DF]">
                  +91
                </span>
                <input
                  id="phone"
                  type="tel"
                  required
                  placeholder="9876543210"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                  }}
                  className={`w-full bg-[#0A2340] border rounded-r-xl px-4 py-3 text-sm text-[#F7F8FA] placeholder-[#8ba2bc] focus:outline-none transition-all ${
                    errors.phone
                      ? "border-rose-500 focus:ring-1 focus:ring-rose-500"
                      : "border-[#123452] focus:border-[#F6B936] focus:ring-1 focus:ring-[#F6B936]"
                  }`}
                />
              </div>
              {errors.phone && (
                <p className="text-xs text-rose-400 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.phone}</span>
                </p>
              )}
            </div>
          </div>

          {/* Optional Message / Special Requests */}
          <div className="space-y-1.5">
            <label
              htmlFor="message"
              className="block text-xs font-semibold uppercase tracking-wider text-[#C4D1DF]"
            >
              Special Requests or Room Preferences (Optional)
            </label>
            <textarea
              id="message"
              rows={3}
              placeholder="e.g. Preferred room type (Deluxe/Suite), airport pickup assistance, dietary preferences, or early check-in enquiry..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-[#0A2340] border border-[#123452] rounded-xl px-4 py-3 text-sm text-[#F7F8FA] placeholder-[#8ba2bc] focus:outline-none focus:border-[#F6B936] focus:ring-1 focus:ring-[#F6B936] transition-all resize-none"
            />
          </div>

          {/* Privacy Consent Checkbox */}
          <div className="space-y-1">
            <label className="flex items-start gap-3 cursor-pointer text-xs text-[#C4D1DF] select-none">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => {
                  setConsent(e.target.checked);
                  if (errors.consent) setErrors((prev) => ({ ...prev, consent: undefined }));
                }}
                className="mt-0.5 rounded border-[#123452] bg-[#0A2340] text-[#F6B936] focus:ring-[#F6B936] focus:ring-offset-0 w-4 h-4 cursor-pointer"
              />
              <span className="leading-relaxed">
                I agree to allow GuestAssist coordinators from {SITE_CONFIG.operatorName} to contact me via phone, WhatsApp, or email regarding this stay enquiry. I have reviewed the{" "}
                <Link href="/privacy-policy" className="text-[#FFD16A] underline hover:text-[#FFF8EA]">
                  Privacy Policy
                </Link>{" "}
                and acknowledge that this is an enquiry, not a confirmed hotel reservation.
              </span>
            </label>
            {errors.consent && (
              <p className="text-xs text-rose-400 flex items-center gap-1 mt-1 pl-7">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.consent}</span>
              </p>
            )}
          </div>

          {/* Submit Button & Clear Advisory */}
          <div className="pt-2 space-y-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 rounded-xl btn-gold text-base font-bold flex items-center justify-center gap-2.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-xl shadow-[#F6B936]/25"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-[#102033]" />
                  <span>Submitting Stay Enquiry...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 text-[#102033]" />
                  <span>Submit Stay Enquiry</span>
                </>
              )}
            </button>

            <div className="p-4 rounded-xl bg-[#03101F]/80 border border-[#123452] text-xs text-[#8ba2bc] text-center flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#F6B936] shrink-0" />
              <span>
                Zero booking fees • Independent enquiry assistance • No payment details requested
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
