"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Star,
  Sparkles,
  Building2,
  Calendar,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Award,
  Pause,
  Play,
} from "lucide-react";
import { GUEST_REVIEWS, GuestReview } from "@/data/reviews";

export function ReviewsMarquee() {
  const [isPaused, setIsPaused] = useState(false);

  // Split 24 reviews into two rows for dual-track motion
  const row1 = GUEST_REVIEWS.slice(0, 12);
  const row2 = GUEST_REVIEWS.slice(12, 24);

  // Duplicate arrays to ensure seamless infinite loop
  const track1Reviews = [...row1, ...row1];
  const track2Reviews = [...row2, ...row2];

  return (
    <section className="py-20 overflow-hidden relative border-t border-b border-white/5 bg-[#03101F]">
      {/* Scoped CSS Keyframes for Guaranteed Smooth Infinite Motion */}
      <style>{`
        @keyframes marqueeScrollLeft {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }

        @keyframes marqueeScrollRight {
          0% {
            transform: translate3d(-50%, 0, 0);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }

        .marquee-track-left {
          display: flex !important;
          width: max-content !important;
          animation: marqueeScrollLeft 52s linear infinite !important;
          will-change: transform;
        }

        .marquee-track-right {
          display: flex !important;
          width: max-content !important;
          animation: marqueeScrollRight 52s linear infinite !important;
          will-change: transform;
        }

        .marquee-track-left:hover,
        .marquee-track-right:hover {
          animation-play-state: paused !important;
        }
      `}</style>

      {/* Decorative Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#F6B936]/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center space-y-4 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#06172A] border border-[#F6B936]/30 text-xs font-semibold tracking-widest uppercase text-[#FFD16A] shadow-lg shadow-black/40">
          <Sparkles className="w-3.5 h-3.5 text-[#F6B936] animate-pulse" />
          <span>AUTHENTIC GUEST EXPERIENCES</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-extrabold text-[#F7F8FA] tracking-tight">
          Trusted by Travellers <span className="text-gold-gradient">Across India</span>
        </h2>

        <p className="text-sm sm:text-base md:text-lg text-[#C4D1DF] max-w-2xl mx-auto font-light leading-relaxed">
          Over 4.8 / 5 average rating across 29 properties. Discover authentic reviews from business leaders, couples, and families who stay with Courtyard by Marriott.
        </p>

        {/* Aggregate Stats Badges & Slider Control */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs text-[#C4D1DF]">
          <div className="flex items-center gap-2 bg-[#06172A] border border-[#123452] px-3.5 py-1.5 rounded-full">
            <div className="flex items-center text-[#F6B936]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-[#F6B936]" />
              ))}
            </div>
            <span className="font-bold text-[#F7F8FA]">4.8 / 5.0 Rating</span>
          </div>

          <div className="flex items-center gap-1.5 bg-[#06172A] border border-[#123452] px-3.5 py-1.5 rounded-full">
            <Building2 className="w-3.5 h-3.5 text-[#F6B936]" />
            <span className="font-semibold text-[#F7F8FA]">29 Pan-India Hotels</span>
          </div>

          <div className="flex items-center gap-1.5 bg-[#06172A] border border-[#123452] px-3.5 py-1.5 rounded-full">
            <Award className="w-3.5 h-3.5 text-[#F6B936]" />
            <span className="font-semibold text-[#F7F8FA]">98% Recommend</span>
          </div>

          <div className="flex items-center gap-1.5 bg-[#06172A] border border-[#123452] px-3.5 py-1.5 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5 text-[#F6B936]" />
            <span className="text-[#C4D1DF] font-semibold">Genuine Feedback</span>
          </div>

          {/* Toggle Pause / Play Button */}
          <button
            type="button"
            onClick={() => setIsPaused(!isPaused)}
            className="flex items-center gap-1.5 bg-[#0A2340] hover:bg-[#123452] border border-[#F6B936]/40 text-[#FFD16A] px-3.5 py-1.5 rounded-full transition-all cursor-pointer font-medium"
            aria-label={isPaused ? "Resume auto-scrolling reviews" : "Pause auto-scrolling reviews"}
          >
            {isPaused ? (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Resume Slider</span>
              </>
            ) : (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>Pause Slider</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Marquee Ticker Container with Gradient Fade Edges */}
      <div className="relative w-full space-y-6">
        {/* Left & Right Fade Masks */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-32 md:w-48 bg-gradient-to-r from-[#03101F] via-[#03101F]/80 to-transparent z-20" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-32 md:w-48 bg-gradient-to-l from-[#03101F] via-[#03101F]/80 to-transparent z-20" />

        {/* Track 1: Moving Left (Continuous, pauses on hover) */}
        <div className="overflow-hidden py-1">
          <div
            className="marquee-track-left flex gap-6"
            style={isPaused ? { animationPlayState: "paused" } : undefined}
          >
            {track1Reviews.map((rev, idx) => (
              <ReviewCard key={`t1-${rev.id}-${idx}`} review={rev} />
            ))}
          </div>
        </div>

        {/* Track 2: Moving Right (Continuous, pauses on hover) */}
        <div className="overflow-hidden py-1">
          <div
            className="marquee-track-right flex gap-6"
            style={isPaused ? { animationPlayState: "paused" } : undefined}
          >
            {track2Reviews.map((rev, idx) => (
              <ReviewCard key={`t2-${rev.id}-${idx}`} review={rev} />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom CTA Bar */}
      <div className="max-w-4xl mx-auto px-4 mt-10 text-center relative z-10">
        <div className="p-4 sm:p-5 rounded-2xl bg-[#06172A]/90 border border-[#123452] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="text-left space-y-0.5">
            <h3 className="font-serif font-bold text-sm sm:text-base text-[#F7F8FA]">
              Ready to experience Courtyard by Marriott hospitality?
            </h3>
            <p className="text-xs text-[#8ba2bc]">
              Explore 29 properties across India and submit your stay enquiry for fast reservation guidance.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
            <Link
              href="/enquiry"
              className="btn-gold px-5 py-2.5 rounded-xl text-xs font-bold inline-flex items-center justify-center gap-2 shadow-lg w-full sm:w-auto"
            >
              <span>Check Availability</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#102033]" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function ReviewCard({ review }: { review: GuestReview }) {
  return (
    <div className="w-[340px] sm:w-[380px] md:w-[410px] shrink-0 bg-[#06172A]/95 hover:bg-[#0A2340] border border-[#123452] hover:border-[#F6B936]/60 rounded-2xl p-5 sm:p-6 flex flex-col justify-between transition-colors duration-200 shadow-xl group">
      {/* Top Header: Avatar, Name, Rating */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3.5">
          <div className="flex items-center gap-3 truncate">
            {/* Gradient Avatar */}
            <div
              className={`w-10 h-10 rounded-full bg-gradient-to-br ${review.avatarColor} p-0.5 shadow-md shrink-0 flex items-center justify-center`}
            >
              <div className="w-full h-full bg-[#03101F]/80 rounded-full flex items-center justify-center font-bold text-xs text-[#FFD16A]">
                {review.initials}
              </div>
            </div>

            <div className="truncate">
              <h4 className="font-serif font-bold text-sm text-[#F7F8FA] group-hover:text-[#FFD16A] transition-colors truncate">
                {review.author}
              </h4>
              <span className="text-[11px] text-[#8ba2bc] block truncate">
                {review.location} • <span className="text-[#C4D1DF]">{review.tag}</span>
              </span>
            </div>
          </div>

          {/* 5 Stars */}
          <div className="flex items-center gap-0.5 shrink-0 text-[#F6B936]">
            {[...Array(review.rating)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-[#F6B936]" />
            ))}
          </div>
        </div>

        {/* Hotel Property Tag */}
        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#FFD16A] bg-[#03101F]/70 border border-white/5 px-2.5 py-1 rounded-lg mb-3 truncate">
          <Building2 className="w-3.5 h-3.5 text-[#F6B936] shrink-0" />
          <span className="truncate">{review.hotelName}</span>
        </div>

        {/* Headline */}
        <h5 className="font-serif font-bold text-sm text-[#F7F8FA] leading-snug mb-1.5">
          &ldquo;{review.headline}&rdquo;
        </h5>

        {/* Review Content */}
        <p className="text-xs text-[#C4D1DF] leading-relaxed line-clamp-3">
          {review.content}
        </p>
      </div>

      {/* Footer Details */}
      <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-[#8ba2bc]">
        <span className="flex items-center gap-1">
          <Calendar className="w-3 h-3 text-[#F6B936]" />
          {review.date}
        </span>

        <span className="flex items-center gap-1 text-[#8ba2bc] font-medium">
          <MapPin className="w-3 h-3 text-[#F6B936]" />
          {review.hotelCity}
        </span>
      </div>
    </div>
  );
}
