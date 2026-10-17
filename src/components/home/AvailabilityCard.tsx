"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  Calendar as CalendarIcon,
  User as UserIcon,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Check,
  X,
  MapPin,
  Building,
  Plus,
  Minus,
  AlertCircle,
} from "lucide-react";
import { Property } from "@/types/property";
import { PROPERTIES } from "@/data/properties";
import { BookingModal } from "@/components/forms/BookingModal";
import {
  getTodayDateString,
  getTomorrowDateString,
  calculateNights,
} from "@/lib/utils";

interface AvailabilityCardProps {
  initialPropertySlug?: string;
  className?: string;
  onAvailabilityCheck?: (data: {
    property: Property;
    checkIn: string;
    checkOut: string;
    rooms: number;
    adults: number;
    children: number;
  }) => void;
}

// Popular city quick chips for fast selection
const POPULAR_CITIES = [
  "All",
  "Mumbai",
  "Bengaluru",
  "Delhi NCR",
  "Goa",
  "Pune",
  "Jaipur",
  "Agra",
  "Chennai",
  "Hyderabad",
  "Kolkata",
  "Bhopal",
];

// Helper to parse YYYY-MM-DD into a local Date without UTC offset shifts
function parseYMD(str: string): Date | null {
  if (!str) return null;
  const parts = str.split("-");
  if (parts.length !== 3) return null;
  const y = parseInt(parts[0], 10);
  const m = parseInt(parts[1], 10) - 1;
  const d = parseInt(parts[2], 10);
  if (isNaN(y) || isNaN(m) || isNaN(d)) return null;
  return new Date(y, m, d);
}

// Helper to format a local Date into YYYY-MM-DD
function formatYMD(d: Date): string {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export function AvailabilityCard({
  initialPropertySlug,
  className = "",
  onAvailabilityCheck,
}: AvailabilityCardProps) {
  // Destination state
  const initialProp = initialPropertySlug
    ? PROPERTIES.find((p) => p.slug === initialPropertySlug)
    : null;

  const [selectedProperty, setSelectedProperty] = useState<Property | null>(initialProp || null);
  const [propertySearchQuery, setPropertySearchQuery] = useState("");
  const [selectedCityFilter, setSelectedCityFilter] = useState("All");
  const [isPropertyDropdownOpen, setIsPropertyDropdownOpen] = useState(false);

  // Dates state
  const [checkIn, setCheckIn] = useState<string>("");
  const [checkOut, setCheckOut] = useState<string>("");
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [datePickerStep, setDatePickerStep] = useState<"checkIn" | "checkOut">("checkIn");
  const [hoverDate, setHoverDate] = useState<string | null>(null);

  // Calendar month view state
  const [viewMonth, setViewMonth] = useState<Date>(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });

  // Rooms & Guests state (matches "1 Room, 2 Guests" from user design)
  const [rooms, setRooms] = useState<number>(1);
  const [adults, setAdults] = useState<number>(2);
  const [childrenCount, setChildrenCount] = useState<number>(0);
  const [isGuestsOpen, setIsGuestsOpen] = useState(false);

  // Errors & Modal state
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Refs for click outside
  const propertyRef = useRef<HTMLDivElement>(null);
  const guestsRef = useRef<HTMLDivElement>(null);
  const datePickerRef = useRef<HTMLDivElement>(null);

  const minDate = getTodayDateString();

  // Handle outside clicks and keyboard dismissal for dropdowns & datepicker
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (propertyRef.current && !propertyRef.current.contains(event.target as Node)) {
        setIsPropertyDropdownOpen(false);
      }
      if (guestsRef.current && !guestsRef.current.contains(event.target as Node)) {
        setIsGuestsOpen(false);
      }
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setIsDatePickerOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsPropertyDropdownOpen(false);
        setIsGuestsOpen(false);
        setIsDatePickerOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Ensure calendar popover is smoothly visible in view if opened near bottom of viewport
  useEffect(() => {
    if (isDatePickerOpen && datePickerRef.current) {
      const timer = setTimeout(() => {
        const rect = datePickerRef.current?.getBoundingClientRect();
        if (rect) {
          const popoverBottom = rect.bottom + 380;
          if (popoverBottom > window.innerHeight) {
            window.scrollBy({
              top: Math.min(popoverBottom - window.innerHeight + 24, 220),
              behavior: "smooth",
            });
          }
        }
      }, 60);
      return () => clearTimeout(timer);
    }
  }, [isDatePickerOpen]);

  // Filter properties based on search query and city chip
  const filteredProperties = PROPERTIES.filter((p) => {
    const matchesSearch =
      propertySearchQuery.trim() === "" ||
      p.name.toLowerCase().includes(propertySearchQuery.toLowerCase()) ||
      p.city.toLowerCase().includes(propertySearchQuery.toLowerCase()) ||
      p.state.toLowerCase().includes(propertySearchQuery.toLowerCase());

    const matchesCity =
      selectedCityFilter === "All" ||
      (selectedCityFilter === "Delhi NCR"
        ? ["Delhi", "Gurugram", "Noida", "Faridabad"].some(
            (c) => p.city.toLowerCase().includes(c.toLowerCase()) || p.name.toLowerCase().includes(c.toLowerCase())
          )
        : p.city.toLowerCase().includes(selectedCityFilter.toLowerCase()));

    return matchesSearch && matchesCity;
  });

  // Format date helper for clean display ("24 Oct")
  const formatDateDisplay = (dateStr: string): string => {
    if (!dateStr) return "Select Date";
    const d = parseYMD(dateStr);
    if (!d) return dateStr;
    return d.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
    });
  };

  const handleSelectProperty = (prop: Property) => {
    setSelectedProperty(prop);
    setIsPropertyDropdownOpen(false);
    setPropertySearchQuery("");
    if (validationError) setValidationError(null);
  };

  // Toggle datepicker open/focused on specific step
  const handleToggleDatePicker = (step: "checkIn" | "checkOut") => {
    if (isDatePickerOpen && datePickerStep === step) {
      setIsDatePickerOpen(false);
      return;
    }

    if (step === "checkIn" && checkIn) {
      const d = parseYMD(checkIn);
      if (d) setViewMonth(new Date(d.getFullYear(), d.getMonth(), 1));
    } else if (step === "checkOut" && checkOut) {
      const d = parseYMD(checkOut);
      if (d) setViewMonth(new Date(d.getFullYear(), d.getMonth(), 1));
    } else if (step === "checkOut" && checkIn) {
      const d = parseYMD(checkIn);
      if (d) setViewMonth(new Date(d.getFullYear(), d.getMonth(), 1));
    }

    setDatePickerStep(step);
    setIsDatePickerOpen(true);
    setIsPropertyDropdownOpen(false);
    setIsGuestsOpen(false);
  };

  // Handle clicking a date cell
  const handleSelectDate = (dateStr: string) => {
    if (validationError) setValidationError(null);

    if (datePickerStep === "checkIn") {
      setCheckIn(dateStr);
      // If current checkout is on or before new checkin, reset it
      if (checkOut && checkOut <= dateStr) {
        setCheckOut("");
      }
      // Automatically advance to checkout
      setDatePickerStep("checkOut");
    } else {
      // datePickerStep === "checkOut"
      if (!checkIn) {
        setCheckIn(dateStr);
        setDatePickerStep("checkOut");
      } else if (dateStr <= checkIn) {
        // Clicked date is earlier than or equal to checkIn: re-anchor checkIn
        setCheckIn(dateStr);
        setCheckOut("");
        setDatePickerStep("checkOut");
      } else {
        setCheckOut(dateStr);
        setIsDatePickerOpen(false);
      }
    }
  };

  // Quick Preset Actions
  const handleQuickTonight = () => {
    const t = new Date();
    const tm = new Date();
    tm.setDate(tm.getDate() + 1);
    setCheckIn(formatYMD(t));
    setCheckOut(formatYMD(tm));
    setIsDatePickerOpen(false);
    if (validationError) setValidationError(null);
  };

  const handleQuickTomorrow = () => {
    const tm = new Date();
    tm.setDate(tm.getDate() + 1);
    const dayAfter = new Date();
    dayAfter.setDate(dayAfter.getDate() + 2);
    setCheckIn(formatYMD(tm));
    setCheckOut(formatYMD(dayAfter));
    setIsDatePickerOpen(false);
    if (validationError) setValidationError(null);
  };

  const handleQuickWeekend = () => {
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0 Sun, 5 Fri, 6 Sat
    const daysUntilFriday = (5 - dayOfWeek + 7) % 7 || 7;
    const fri = new Date();
    fri.setDate(now.getDate() + (dayOfWeek === 5 ? 0 : daysUntilFriday));
    const sun = new Date(fri);
    sun.setDate(fri.getDate() + 2);
    setCheckIn(formatYMD(fri));
    setCheckOut(formatYMD(sun));
    setIsDatePickerOpen(false);
    if (validationError) setValidationError(null);
  };

  const handleClearDates = () => {
    setCheckIn("");
    setCheckOut("");
    setDatePickerStep("checkIn");
  };

  // Month navigation handlers
  const handlePrevMonth = () => {
    const today = new Date();
    const currentMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const prev = new Date(viewMonth.getFullYear(), viewMonth.getMonth() - 1, 1);
    if (prev >= currentMonthStart) {
      setViewMonth(prev);
    }
  };

  const handleNextMonth = () => {
    setViewMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  // Calendar calculations
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayStr = formatYMD(today);

  const isPrevDisabled =
    viewMonth.getFullYear() === today.getFullYear() &&
    viewMonth.getMonth() <= today.getMonth();

  const calYear = viewMonth.getFullYear();
  const calMonth = viewMonth.getMonth();
  const firstDayOfWeek = new Date(calYear, calMonth, 1).getDay();
  const daysInCalMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const blanks = Array.from({ length: firstDayOfWeek }, (_, i) => i);
  const days = Array.from({ length: daysInCalMonth }, (_, i) => i + 1);

  const nightsCount =
    checkIn && checkOut && checkOut > checkIn
      ? calculateNights(checkIn, checkOut)
      : null;

  const handleCheckAvailability = (e: React.FormEvent) => {
    e.preventDefault();

    // Default dates if user didn't pick
    const finalCheckIn = checkIn || getTodayDateString();
    const finalCheckOut =
      checkOut && checkOut > finalCheckIn ? checkOut : getTomorrowDateString();

    // Default to first property if none picked or prompt user
    let propToUse = selectedProperty;
    if (!propToUse) {
      // Auto-open property dropdown to guide user
      setIsPropertyDropdownOpen(true);
      setValidationError("Please select your destination city or property");
      return;
    }

    setValidationError(null);

    if (onAvailabilityCheck) {
      onAvailabilityCheck({
        property: propToUse,
        checkIn: finalCheckIn,
        checkOut: finalCheckOut,
        rooms,
        adults,
        children: childrenCount,
      });
    }

    // Open booking modal
    setIsModalOpen(true);
  };

  // Formatted guest string: "1 Room, 2 Guests"
  const totalGuests = adults + childrenCount;
  const guestDisplayString = `${rooms} Room${rooms > 1 ? "s" : ""}, ${totalGuests} Guest${
    totalGuests > 1 ? "s" : ""
  }`;

  return (
    <>
      <div
        className={`w-full max-w-[440px] sm:max-w-[480px] lg:max-w-5xl xl:max-w-6xl mx-auto bg-white rounded-3xl p-3.5 sm:p-4 lg:p-3 shadow-[0_20px_50px_rgba(0,0,0,0.35)] border border-slate-200/90 text-left relative z-30 transition-all ${className}`}
      >
        <form onSubmit={handleCheckAvailability} noValidate className="space-y-2.5 lg:space-y-0 lg:flex lg:items-center lg:gap-2.5">
          {/* =========================================================================
              FIELD 1: Select city or property
              ========================================================================= */}
          <div className="relative w-full lg:flex-[1.4] lg:min-w-[250px]" ref={propertyRef}>
            <button
              type="button"
              onClick={() => setIsPropertyDropdownOpen(!isPropertyDropdownOpen)}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl border text-left transition-all ${
                isPropertyDropdownOpen
                  ? "border-[#1E293B] ring-2 ring-[#1E293B]/10 bg-slate-50/50"
                  : validationError && !selectedProperty
                  ? "border-rose-400 bg-rose-50/30"
                  : "border-[#E2E8F0] hover:border-slate-300 bg-white"
              }`}
            >
              <Search className="w-5 h-5 text-[#1E293B] shrink-0 stroke-[2.2]" />
              <div className="flex-1 min-w-0">
                {selectedProperty ? (
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm sm:text-[15px] font-semibold text-[#0F172A] truncate block">
                      {selectedProperty.name}
                    </span>
                    <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full shrink-0">
                      {selectedProperty.city}
                    </span>
                  </div>
                ) : (
                  <span className="text-sm sm:text-[15px] font-medium text-[#475569] block truncate">
                    Select city or property
                  </span>
                )}
              </div>
              {selectedProperty && (
                <span
                  role="button"
                  tabIndex={0}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProperty(null);
                  }}
                  className="p-1 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
                  title="Clear destination"
                >
                  <X className="w-4 h-4" />
                </span>
              )}
            </button>

            {/* Dropdown Menu for Properties */}
            {isPropertyDropdownOpen && (
              <div className="absolute left-0 right-0 lg:w-[380px] top-full mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 p-3 max-h-[360px] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-150">
                {/* Search Input inside Dropdown */}
                <div className="relative mb-2.5">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search by city, property, or state..."
                    value={propertySearchQuery}
                    onChange={(e) => setPropertySearchQuery(e.target.value)}
                    autoFocus
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-8 py-2 text-xs sm:text-sm text-[#0F172A] placeholder-slate-400 focus:outline-none focus:border-[#1E293B] focus:bg-white transition-all"
                  />
                  {propertySearchQuery && (
                    <button
                      type="button"
                      onClick={() => setPropertySearchQuery("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Popular City Filter Chips */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-2 no-scrollbar border-b border-slate-100">
                  {POPULAR_CITIES.map((city) => (
                    <button
                      key={city}
                      type="button"
                      onClick={() => setSelectedCityFilter(city)}
                      className={`text-[11px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap transition-colors ${
                        selectedCityFilter === city
                          ? "bg-[#1E293B] text-white"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {city}
                    </button>
                  ))}
                </div>

                {/* Properties List */}
                <div className="overflow-y-auto max-h-[220px] space-y-1 pr-1 custom-scrollbar">
                  {filteredProperties.length > 0 ? (
                    filteredProperties.map((prop) => {
                      const isSelected = selectedProperty?.slug === prop.slug;
                      return (
                        <button
                          key={prop.slug}
                          type="button"
                          onClick={() => handleSelectProperty(prop)}
                          className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between text-xs transition-colors ${
                            isSelected
                              ? "bg-amber-50 text-[#0F172A] font-semibold border border-amber-300/60"
                              : "hover:bg-slate-50 text-slate-700"
                          }`}
                        >
                          <div className="flex items-start gap-2.5 min-w-0">
                            <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                            <div className="truncate">
                              <span className="block font-medium text-slate-900 truncate">
                                {prop.name}
                              </span>
                              <span className="block text-[11px] text-slate-500">
                                {prop.city}, {prop.state}
                              </span>
                            </div>
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-amber-600 shrink-0 ml-2" />}
                        </button>
                      );
                    })
                  ) : (
                    <div className="py-6 text-center text-xs text-slate-400">
                      No Courtyard by Marriott hotels found matching your search.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* =========================================================================
              FIELD 2: Check-in & Check-out Side-by-Side (Custom Luxury Date Picker)
              ========================================================================= */}
          <div className="relative w-full lg:flex-[1.7]" ref={datePickerRef}>
            <div className="grid grid-cols-2 gap-2.5 lg:gap-2">
              {/* Check-in Box Button */}
              <button
                type="button"
                onClick={() => handleToggleDatePicker("checkIn")}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-2xl border text-left transition-all ${
                  isDatePickerOpen && datePickerStep === "checkIn"
                    ? "border-[#1E293B] ring-2 ring-[#1E293B]/10 bg-slate-50/70"
                    : "border-[#E2E8F0] hover:border-slate-300 bg-white hover:bg-slate-50/40"
                }`}
              >
                <CalendarIcon className="w-5 h-5 text-[#1E293B] shrink-0 stroke-[2.2]" />
                <div className="flex flex-col min-w-0">
                  <span className="text-[11px] font-medium text-[#475569] leading-tight block">
                    Check-in
                  </span>
                  <span className="text-sm font-bold text-[#0F172A] leading-tight tracking-tight block truncate">
                    {formatDateDisplay(checkIn)}
                  </span>
                </div>
              </button>

              {/* Check-out Box Button */}
              <button
                type="button"
                onClick={() => handleToggleDatePicker("checkOut")}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-2xl border text-left transition-all ${
                  isDatePickerOpen && datePickerStep === "checkOut"
                    ? "border-[#1E293B] ring-2 ring-[#1E293B]/10 bg-slate-50/70"
                    : "border-[#E2E8F0] hover:border-slate-300 bg-white hover:bg-slate-50/40"
                }`}
              >
                <CalendarIcon className="w-5 h-5 text-[#1E293B] shrink-0 stroke-[2.2]" />
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-medium text-[#475569] leading-tight block">
                      Check-out
                    </span>
                    {nightsCount ? (
                      <span className="text-[9px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.2 rounded-full leading-tight">
                        {nightsCount}N
                      </span>
                    ) : null}
                  </div>
                  <span className="text-sm font-bold text-[#0F172A] leading-tight tracking-tight block truncate">
                    {formatDateDisplay(checkOut)}
                  </span>
                </div>
              </button>
            </div>

            {/* Custom Interactive Calendar Popover */}
            {isDatePickerOpen && (
              <div className="absolute left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-0 lg:left-0 top-full mt-2.5 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 p-4 w-[330px] sm:w-[350px] animate-in fade-in zoom-in-95 duration-150">
                {/* Step Switcher / Selected Dates Display */}
                <div className="flex items-center justify-between p-1 bg-slate-100 rounded-xl mb-3 text-xs">
                  <button
                    type="button"
                    onClick={() => setDatePickerStep("checkIn")}
                    className={`flex-1 py-1.5 px-2 rounded-lg text-center transition-all ${
                      datePickerStep === "checkIn"
                        ? "bg-white text-[#0F172A] shadow-sm font-bold border border-slate-200/60"
                        : "text-slate-600 hover:text-slate-900 font-medium"
                    }`}
                  >
                    <span className="block text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                      Check-in
                    </span>
                    <span className="truncate block font-bold text-[#0F172A]">
                      {checkIn ? formatDateDisplay(checkIn) : "Select date"}
                    </span>
                  </button>
                  <span className="px-2 text-slate-400 font-bold">→</span>
                  <button
                    type="button"
                    onClick={() => setDatePickerStep("checkOut")}
                    className={`flex-1 py-1.5 px-2 rounded-lg text-center transition-all ${
                      datePickerStep === "checkOut"
                        ? "bg-white text-[#0F172A] shadow-sm font-bold border border-slate-200/60"
                        : "text-slate-600 hover:text-slate-900 font-medium"
                    }`}
                  >
                    <span className="block text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                      Check-out
                    </span>
                    <span className="truncate block font-bold text-[#0F172A]">
                      {checkOut ? formatDateDisplay(checkOut) : "Select date"}
                    </span>
                  </button>
                </div>

                {/* Helpful Instruction Tip */}
                <div className="text-[11px] font-medium text-slate-500 mb-2 flex items-center justify-between px-1">
                  <span>
                    {datePickerStep === "checkIn"
                      ? "• Select your check-in date"
                      : "• Select your check-out date"}
                  </span>
                  {nightsCount && (
                    <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/60">
                      {nightsCount} {nightsCount === 1 ? "Night" : "Nights"}
                    </span>
                  )}
                </div>

                {/* Month Navigator Header */}
                <div className="flex items-center justify-between mb-2 px-1">
                  <span className="text-sm font-bold text-[#0F172A]">
                    {viewMonth.toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={handlePrevMonth}
                      disabled={isPrevDisabled}
                      className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
                      aria-label="Previous month"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNextMonth}
                      className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors"
                      aria-label="Next month"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Weekday Names */}
                <div className="grid grid-cols-7 gap-1 text-center mb-1">
                  {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                    <span
                      key={day}
                      className="text-[11px] font-semibold text-slate-400 py-1"
                    >
                      {day}
                    </span>
                  ))}
                </div>

                {/* Calendar Days Grid */}
                <div className="grid grid-cols-7 gap-1 text-center">
                  {blanks.map((b) => (
                    <div key={`blank-${b}`} className="w-full h-8" />
                  ))}
                  {days.map((d) => {
                    const dayDate = new Date(calYear, calMonth, d);
                    const dayStr = formatYMD(dayDate);
                    const isPast = dayStr < todayStr;
                    const isToday = dayStr === todayStr;
                    const isCheckInDate = dayStr === checkIn;
                    const isCheckOutDate = dayStr === checkOut;
                    const isInRange = Boolean(
                      checkIn && checkOut && dayStr > checkIn && dayStr < checkOut
                    );
                    const isHoverRange = Boolean(
                      datePickerStep === "checkOut" &&
                        checkIn &&
                        !checkOut &&
                        hoverDate &&
                        dayStr > checkIn &&
                        dayStr <= hoverDate
                    );

                    let cellStyle = "text-slate-700 hover:bg-slate-100";
                    if (isPast) {
                      cellStyle = "text-slate-300 cursor-not-allowed";
                    } else if (isCheckInDate) {
                      cellStyle =
                        "bg-gradient-to-b from-[#FDC858] via-[#F5A623] to-[#EE9017] text-[#0A192F] font-bold shadow-sm";
                    } else if (isCheckOutDate) {
                      cellStyle = "bg-[#0F172A] text-white font-bold shadow-sm";
                    } else if (isInRange) {
                      cellStyle = "bg-amber-100 text-amber-950 font-semibold";
                    } else if (isHoverRange) {
                      cellStyle = "bg-amber-50 text-amber-900";
                    } else if (isToday) {
                      cellStyle =
                        "font-bold text-[#0F172A] ring-1 ring-slate-300 hover:bg-slate-100";
                    }

                    return (
                      <button
                        key={`day-${d}`}
                        type="button"
                        disabled={isPast}
                        onClick={() => handleSelectDate(dayStr)}
                        onMouseEnter={() => !isPast && setHoverDate(dayStr)}
                        onMouseLeave={() => setHoverDate(null)}
                        className={`w-full h-8 flex items-center justify-center text-xs rounded-lg transition-colors ${cellStyle}`}
                      >
                        {d}
                      </button>
                    );
                  })}
                </div>

                {/* Quick Presets */}
                <div className="flex items-center gap-1.5 pt-3 border-t border-slate-100 mt-3 overflow-x-auto no-scrollbar">
                  <button
                    type="button"
                    onClick={handleQuickTonight}
                    className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors whitespace-nowrap"
                  >
                    Tonight
                  </button>
                  <button
                    type="button"
                    onClick={handleQuickTomorrow}
                    className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors whitespace-nowrap"
                  >
                    Tomorrow
                  </button>
                  <button
                    type="button"
                    onClick={handleQuickWeekend}
                    className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors whitespace-nowrap"
                  >
                    This Weekend
                  </button>
                </div>

                {/* Action Footer */}
                <div className="flex items-center justify-between pt-2.5 border-t border-slate-100 mt-2.5">
                  <button
                    type="button"
                    onClick={handleClearDates}
                    className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
                  >
                    Clear
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsDatePickerOpen(false)}
                    className="px-4 py-1.5 bg-[#0F172A] hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* =========================================================================
              FIELD 3: Rooms & Guests
              ========================================================================= */}
          <div className="relative w-full lg:flex-[1.2] lg:min-w-[190px]" ref={guestsRef}>
            <button
              type="button"
              onClick={() => setIsGuestsOpen(!isGuestsOpen)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl border text-left transition-all ${
                isGuestsOpen
                  ? "border-[#1E293B] ring-2 ring-[#1E293B]/10 bg-slate-50/50"
                  : "border-[#E2E8F0] hover:border-slate-300 bg-white"
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <UserIcon className="w-5 h-5 text-[#1E293B] shrink-0 stroke-[2.2]" />
                <div className="flex flex-col min-w-0">
                  <span className="text-[11px] font-medium text-[#475569] leading-tight block">
                    Rooms & Guests
                  </span>
                  <span className="text-sm font-bold text-[#0F172A] leading-tight tracking-tight block truncate">
                    {guestDisplayString}
                  </span>
                </div>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-[#1E293B] shrink-0 transition-transform duration-200 ${
                  isGuestsOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Guests & Rooms Popover */}
            {isGuestsOpen && (
              <div className="absolute left-0 right-0 lg:left-auto lg:right-0 lg:w-[300px] top-full mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 p-4 space-y-3.5 animate-in fade-in zoom-in-95 duration-150">
                {/* Rooms Counter */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="block text-xs font-bold text-[#0F172A]">Rooms</span>
                    <span className="block text-[11px] text-slate-500">Number of rooms required</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      disabled={rooms <= 1}
                      onClick={() => setRooms(Math.max(1, rooms - 1))}
                      className="w-7 h-7 rounded-full border border-slate-300 flex items-center justify-center text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-5 text-center text-xs font-bold text-[#0F172A]">{rooms}</span>
                    <button
                      type="button"
                      disabled={rooms >= 8}
                      onClick={() => setRooms(Math.min(8, rooms + 1))}
                      className="w-7 h-7 rounded-full border border-slate-300 flex items-center justify-center text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="border-t border-slate-100" />

                {/* Adults Counter */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="block text-xs font-bold text-[#0F172A]">Adults</span>
                    <span className="block text-[11px] text-slate-500">Ages 12 and above</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      disabled={adults <= 1}
                      onClick={() => setAdults(Math.max(1, adults - 1))}
                      className="w-7 h-7 rounded-full border border-slate-300 flex items-center justify-center text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-5 text-center text-xs font-bold text-[#0F172A]">{adults}</span>
                    <button
                      type="button"
                      disabled={adults >= 16}
                      onClick={() => setAdults(Math.min(16, adults + 1))}
                      className="w-7 h-7 rounded-full border border-slate-300 flex items-center justify-center text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="border-t border-slate-100" />

                {/* Children Counter */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="block text-xs font-bold text-[#0F172A]">Children</span>
                    <span className="block text-[11px] text-slate-500">Ages 0 to 11</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      disabled={childrenCount <= 0}
                      onClick={() => setChildrenCount(Math.max(0, childrenCount - 1))}
                      className="w-7 h-7 rounded-full border border-slate-300 flex items-center justify-center text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-5 text-center text-xs font-bold text-[#0F172A]">{childrenCount}</span>
                    <button
                      type="button"
                      disabled={childrenCount >= 8}
                      onClick={() => setChildrenCount(Math.min(8, childrenCount + 1))}
                      className="w-7 h-7 rounded-full border border-slate-300 flex items-center justify-center text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setIsGuestsOpen(false)}
                    className="w-full py-2 bg-[#1E293B] hover:bg-[#0F172A] text-white text-xs font-bold rounded-xl transition-colors shadow"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Validation Alert Message */}
          {validationError && (
            <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 flex items-center gap-2 text-rose-700 text-xs animate-in fade-in duration-200 lg:absolute lg:-bottom-12 lg:left-4 lg:shadow-md">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
              <span>{validationError}</span>
            </div>
          )}

          {/* =========================================================================
              FIELD 4: Check Availability CTA Button (Golden/Amber Gradient)
              ========================================================================= */}
          <button
            type="submit"
            className="w-full lg:w-auto py-3.5 sm:py-4 lg:py-3.5 px-6 lg:px-7 rounded-2xl bg-gradient-to-b from-[#FDC858] via-[#F5A623] to-[#EE9017] hover:brightness-105 active:scale-[0.99] text-[#0A192F] font-bold text-base flex items-center justify-center gap-2 shadow-[0_8px_20px_-4px_rgba(245,158,11,0.45)] hover:shadow-[0_10px_25px_-4px_rgba(245,158,11,0.55)] transition-all cursor-pointer whitespace-nowrap shrink-0"
          >
            <span>Check Availability</span>
            <ArrowRight className="w-5 h-5 stroke-[2.5]" />
          </button>
        </form>
      </div>

      {/* Booking Enquiry Popup Modal */}
      {selectedProperty && (
        <BookingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          property={selectedProperty}
          checkIn={checkIn || getTodayDateString()}
          checkOut={checkOut && checkOut > checkIn ? checkOut : getTomorrowDateString()}
          adults={adults}
          initialRoomType="deluxe-room"
        />
      )}
    </>
  );
}
