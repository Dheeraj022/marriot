"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export function ContactForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState("Stay Enquiry Assistance");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!fullName.trim() || !email.trim() || !message.trim()) {
      setError("Please complete all required fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, phone, category, message }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to submit message");
      }

      setSubmitted(true);
      setIsSubmitting(false);
    } catch (err: any) {
      setError(err?.message || "Unable to submit message. Please try calling our helpline.");
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-[#0A2340] border border-[#123452] rounded-2xl p-8 text-center space-y-4">
        <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-400/40">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="font-serif font-bold text-2xl text-[#F7F8FA]">Message Received!</h3>
        <p className="text-sm text-[#C4D1DF] max-w-md mx-auto leading-relaxed">
          Thank you for reaching out, <strong>{fullName}</strong>. Our stay assistance team will respond to your query at{" "}
          <strong className="text-[#FFD16A]">{email}</strong> within 2 to 4 business hours.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setMessage("");
          }}
          className="px-5 py-2.5 rounded-lg btn-outline-gold text-xs font-semibold"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#06172A] border border-[#123452] rounded-2xl p-6 sm:p-8 shadow-xl">
      <div className="mb-6 space-y-1">
        <h3 className="font-serif font-bold text-xl text-[#F7F8FA]">Send Us a Message</h3>
        <p className="text-xs text-[#C4D1DF]">
          Fill out the form below and an enquiry coordinator will get back to you promptly.
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-xs text-rose-300 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {/* Full Name */}
        <div className="space-y-1">
          <label htmlFor="contact-name" className="block text-xs font-semibold text-[#C4D1DF] uppercase">
            Full Name <span className="text-rose-400">*</span>
          </label>
          <input
            id="contact-name"
            type="text"
            required
            placeholder="e.g. Priya Nair"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full bg-[#0A2340] border border-[#123452] rounded-xl px-4 py-2.5 text-sm text-[#F7F8FA] placeholder-[#8ba2bc] focus:outline-none focus:border-[#F6B936] focus:ring-1 focus:ring-[#F6B936]"
          />
        </div>

        {/* Email & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label htmlFor="contact-email" className="block text-xs font-semibold text-[#C4D1DF] uppercase">
              Email Address <span className="text-rose-400">*</span>
            </label>
            <input
              id="contact-email"
              type="email"
              required
              placeholder="e.g. priya@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#0A2340] border border-[#123452] rounded-xl px-4 py-2.5 text-sm text-[#F7F8FA] placeholder-[#8ba2bc] focus:outline-none focus:border-[#F6B936] focus:ring-1 focus:ring-[#F6B936]"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="contact-phone" className="block text-xs font-semibold text-[#C4D1DF] uppercase">
              Mobile Number
            </label>
            <input
              id="contact-phone"
              type="tel"
              placeholder="+91 9876543210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-[#0A2340] border border-[#123452] rounded-xl px-4 py-2.5 text-sm text-[#F7F8FA] placeholder-[#8ba2bc] focus:outline-none focus:border-[#F6B936] focus:ring-1 focus:ring-[#F6B936]"
            />
          </div>
        </div>

        {/* Category Select */}
        <div className="space-y-1">
          <label htmlFor="contact-category" className="block text-xs font-semibold text-[#C4D1DF] uppercase">
            How Can We Help You?
          </label>
          <select
            id="contact-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-[#0A2340] border border-[#123452] rounded-xl px-4 py-2.5 text-sm text-[#F7F8FA] focus:outline-none focus:border-[#F6B936] focus:ring-1 focus:ring-[#F6B936]"
          >
            <option value="Stay Enquiry Assistance">Stay Enquiry Assistance</option>
            <option value="Property Information">Property Information & Amenities</option>
            <option value="Group & Corporate Travel">Group / Corporate Travel Coordination</option>
            <option value="Meeting & Event Facilities">Meeting & Event Facilities</option>
            <option value="General Support">General Support / Feedback</option>
          </select>
        </div>

        {/* Message */}
        <div className="space-y-1">
          <label htmlFor="contact-message" className="block text-xs font-semibold text-[#C4D1DF] uppercase">
            Your Message <span className="text-rose-400">*</span>
          </label>
          <textarea
            id="contact-message"
            rows={4}
            required
            placeholder="Tell us about your destination preferences, travel dates, or specific queries..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full bg-[#0A2340] border border-[#123452] rounded-xl px-4 py-2.5 text-sm text-[#F7F8FA] placeholder-[#8ba2bc] focus:outline-none focus:border-[#F6B936] focus:ring-1 focus:ring-[#F6B936] resize-none"
          />
        </div>

        {/* Consent */}
        <div className="space-y-1">
          <label className="flex items-start gap-2.5 cursor-pointer text-xs text-[#8ba2bc] select-none">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-0.5 rounded border-[#123452] bg-[#0A2340] text-[#F6B936] focus:ring-[#F6B936]"
            />
            <span>
              I authorize Guest Assists representatives to respond to my enquiry via email or phone.
            </span>
          </label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 rounded-xl btn-gold text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#F6B936]/20"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Sending Message...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4 text-[#102033]" />
              <span>Submit Message</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
