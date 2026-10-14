"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import {
  Calendar,
  Users,
  Search,
  Check,
  CheckCircle2,
  AlertCircle,
  Loader2,
  MapPin,
  Building,
  BedDouble,
  Sparkles,
  ShieldCheck,
  ChevronDown,
  Clock,
  Layers,
} from "lucide-react";
import { PROPERTIES } from "@/data/properties";
import { getTodayDateString, getTomorrowDateString, calculateNights } from "@/lib/utils";
import { BookingModal } from "@/components/forms/BookingModal";

export const ROOM_TYPE_OPTIONS = [
  { id: "all", name: "All Room Types" },
  { id: "deluxe-room", name: "Deluxe Room" },
  { id: "executive-room", name: "Executive Room" },
  { id: "suite", name: "Courtyard Suite" },
  { id: "standard-room", name: "Standard Guest Room" },
];

export function EnquiryForm() {
  const searchParams = useSearchParams();

  // Read query params from URL
  const paramProperty =
    searchParams.get("property") ||
    searchParams.get("propertySlug") ||
    "courtyard-mumbai-international-airport";
  const paramPropertyName = searchParams.get("propertyName");
  const paramCheckIn = searchParams.get("checkIn") || searchParams.get("checkin");
  const paramCheckOut = searchParams.get("checkOut") || searchParams.get("checkout");
  const paramAdults = parseInt(searchParams.get("adults") || "2", 10);
  const paramRoomType = searchParams.get("roomType") || "all";
  const paramChecked = searchParams.get("checked") === "true";

  // Step 1 State: Check Availability parameters
  const [selectedSlug, setSelectedSlug] = useState<string>(paramProperty);
  const matchedProp =
    PROPERTIES.find((p) => p.slug === paramProperty) ||
    PROPERTIES.find((p) => p.name === paramPropertyName) ||
    PROPERTIES[0];

  const [searchTerm, setSearchTerm] = useState<string>(matchedProp ? matchedProp.name : "");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [minDate] = useState(() => getTodayDateString());
  const [checkIn, setCheckIn] = useState<string>(() => paramCheckIn || getTodayDateString());
  const [checkOut, setCheckOut] = useState<string>(() => paramCheckOut || getTomorrowDateString());
  const [adults, setAdults] = useState<number>(paramAdults > 0 ? paramAdults : 2);
  const [preferredRoomType, setPreferredRoomType] = useState<string>(paramRoomType || "all");

  // Popup Modal State (instead of inline dropdown/expansion)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(() => Boolean(paramChecked));
  const [hasChecked, setHasChecked] = useState<boolean>(Boolean(paramChecked || paramCheckIn));
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [searchErrors, setSearchErrors] = useState<{ location?: string; dates?: string }>({});

  // Close property dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter properties for autocomplete
  const filteredProperties = PROPERTIES.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedProperty =
    PROPERTIES.find((p) => p.slug === selectedSlug) || matchedProp || PROPERTIES[0];

  const totalNights = calculateNights(checkIn, checkOut);

  // Step 1: Check Availability Handler -> Opens Popup Modal
  const handleCheckAvailability = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchErrors({});

    if (!selectedSlug) {
      setSearchErrors({ location: "Please select a Courtyard by Marriott location." });
      return;
    }

    if (!checkIn || !checkOut || checkOut <= checkIn) {
      setSearchErrors({ dates: "Please select a valid check-in and check-out date." });
      return;
    }

    setIsChecking(true);
    setTimeout(() => {
      setIsChecking(false);
      setHasChecked(true);
      // Show as popup modal instead of inline dropdown/expansion
      setIsModalOpen(true);
    }, 350);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* =========================================================================
          STEP 1: Check Availability Search Card
          ========================================================================= */}
      <div className="bg-[#06172A] border border-[#123452] rounded-3xl p-6 sm:p-8 shadow-2xl relative z-20">
        <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#F6B936]/20 border border-[#F6B936]/40 flex items-center justify-center text-[#FFD16A] text-sm font-bold">
              1
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#F7F8FA]">
                Check Availability
              </h2>
              <p className="text-xs text-[#8ba2bc]">
                Select your destination, dates, adults, and preferred room type
              </p>
            </div>
          </div>

          {hasChecked && (
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/25 transition-colors cursor-pointer"
            >
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>Rooms Available (Click to view)</span>
            </button>
          )}
        </div>

        <form onSubmit={handleCheckAvailability} noValidate>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 items-end">
            {/* 1. Location */}
            <div className="sm:col-span-2 lg:col-span-4 relative z-30" ref={dropdownRef}>
              <label
                htmlFor="avail-location"
                className="block text-xs font-semibold uppercase tracking-wider text-[#FFD16A] mb-2 flex items-center gap-1.5"
              >
                <MapPin className="w-3.5 h-3.5 text-[#F6B936]" />
                <span>Location (29 Properties)</span>
              </label>

              <div className="relative">
                <div className="flex items-center bg-[#0A2340] border border-[#123452] rounded-xl px-3.5 py-3 focus-within:border-[#F6B936] focus-within:ring-2 focus-within:ring-[#F6B936]/20 transition-all">
                  <Building className="w-4 h-4 text-[#8ba2bc] shrink-0 mr-2" />
                  <input
                    id="avail-location"
                    type="text"
                    role="combobox"
                    aria-expanded={isDropdownOpen}
                    aria-controls="avail-properties-dropdown"
                    value={searchTerm}
                    placeholder="Select hotel or city..."
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setSelectedSlug("");
                      setIsDropdownOpen(true);
                    }}
                    onFocus={() => setIsDropdownOpen(true)}
                    className="w-full bg-transparent text-sm text-[#F7F8FA] placeholder-[#8ba2bc] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="p-1 text-[#8ba2bc] hover:text-[#FFD16A]"
                    aria-label="Toggle property list"
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        isDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>

                {isDropdownOpen && (
                  <div
                    id="avail-properties-dropdown"
                    className="absolute left-0 right-0 top-full mt-2 z-50 max-h-52 sm:max-h-56 overflow-y-auto bg-[#071B30] border-2 border-[#F6B936]/40 rounded-xl shadow-2xl shadow-black/95 divide-y divide-white/5 py-1 backdrop-blur-xl"
                  >
                    {filteredProperties.length > 0 ? (
                      filteredProperties.map((p) => {
                        const isSelected = selectedSlug === p.slug;
                        return (
                          <button
                            key={p.slug}
                            type="button"
                            onClick={() => {
                              setSelectedSlug(p.slug);
                              setSearchTerm(p.name);
                              setIsDropdownOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2.5 flex items-center justify-between text-sm transition-colors ${
                              isSelected
                                ? "bg-[#F6B936]/20 text-[#FFD16A] font-semibold"
                                : "text-[#F7F8FA] hover:bg-[#123452]/70"
                            }`}
                          >
                            <div>
                              <span className="block font-medium">{p.name}</span>
                              <span className="block text-xs text-[#8ba2bc]">
                                {p.city}, {p.state}
                              </span>
                            </div>
                            {isSelected && <Check className="w-4 h-4 text-[#F6B936]" />}
                          </button>
                        );
                      })
                    ) : (
                      <div className="px-4 py-3 text-xs text-[#8ba2bc] text-center">
                        No properties found
                      </div>
                    )}
                  </div>
                )}
              </div>

              {searchErrors.location && (
                <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{searchErrors.location}</span>
                </p>
              )}
            </div>

            {/* 2. Check-in Date */}
            <div className="lg:col-span-2">
              <label
                htmlFor="avail-checkin"
                className="block text-xs font-semibold uppercase tracking-wider text-[#FFD16A] mb-2 flex items-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5 text-[#F6B936]" />
                <span>Check-in</span>
              </label>
              <div className="bg-[#0A2340] border border-[#123452] rounded-xl px-3 py-3 focus-within:border-[#F6B936]">
                <input
                  id="avail-checkin"
                  type="date"
                  min={minDate}
                  value={checkIn}
                  onChange={(e) => {
                    const val = e.target.value;
                    setCheckIn(val);
                    if (checkOut <= val) {
                      const next = new Date(val);
                      next.setDate(next.getDate() + 1);
                      setCheckOut(next.toISOString().split("T")[0]);
                    }
                  }}
                  className="w-full bg-transparent text-sm text-[#F7F8FA] focus:outline-none [color-scheme:dark]"
                />
              </div>
            </div>

            {/* 3. Check-out Date */}
            <div className="lg:col-span-2">
              <label
                htmlFor="avail-checkout"
                className="block text-xs font-semibold uppercase tracking-wider text-[#FFD16A] mb-2 flex items-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5 text-[#F6B936]" />
                <span>Check-out</span>
              </label>
              <div className="bg-[#0A2340] border border-[#123452] rounded-xl px-3 py-3 focus-within:border-[#F6B936]">
                <input
                  id="avail-checkout"
                  type="date"
                  min={checkIn || minDate}
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full bg-transparent text-sm text-[#F7F8FA] focus:outline-none [color-scheme:dark]"
                />
              </div>
            </div>

            {/* 4. Number of Adults */}
            <div className="lg:col-span-2">
              <label
                htmlFor="avail-adults"
                className="block text-xs font-semibold uppercase tracking-wider text-[#FFD16A] mb-2 flex items-center gap-1.5"
              >
                <Users className="w-3.5 h-3.5 text-[#F6B936]" />
                <span>Adults</span>
              </label>
              <div className="bg-[#0A2340] border border-[#123452] rounded-xl px-3 py-3 focus-within:border-[#F6B936]">
                <select
                  id="avail-adults"
                  value={adults}
                  onChange={(e) => setAdults(Number(e.target.value))}
                  className="w-full bg-transparent text-sm text-[#F7F8FA] focus:outline-none cursor-pointer [color-scheme:dark]"
                >
                  <option value={1} className="bg-[#0A2340] text-white">1 Adult</option>
                  <option value={2} className="bg-[#0A2340] text-white">2 Adults</option>
                  <option value={3} className="bg-[#0A2340] text-white">3 Adults</option>
                  <option value={4} className="bg-[#0A2340] text-white">4 Adults</option>
                  <option value={5} className="bg-[#0A2340] text-white">5+ Adults</option>
                </select>
              </div>
            </div>

            {/* 5. Preferred Room Type */}
            <div className="lg:col-span-2">
              <label
                htmlFor="avail-roomtype"
                className="block text-xs font-semibold uppercase tracking-wider text-[#FFD16A] mb-2 flex items-center gap-1.5"
              >
                <BedDouble className="w-3.5 h-3.5 text-[#F6B936]" />
                <span>Room Type</span>
              </label>
              <div className="bg-[#0A2340] border border-[#123452] rounded-xl px-3 py-3 focus-within:border-[#F6B936]">
                <select
                  id="avail-roomtype"
                  value={preferredRoomType}
                  onChange={(e) => setPreferredRoomType(e.target.value)}
                  className="w-full bg-transparent text-sm text-[#F7F8FA] focus:outline-none cursor-pointer [color-scheme:dark]"
                >
                  {ROOM_TYPE_OPTIONS.map((rt) => (
                    <option key={rt.id} value={rt.id} className="bg-[#0A2340] text-white">
                      {rt.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {searchErrors.dates && (
            <p className="mt-2 text-xs text-rose-400 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{searchErrors.dates}</span>
            </p>
          )}

          {/* Action Row */}
          <div className="mt-6 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-[#C4D1DF]">
              <span>Selected Hotel: </span>
              <strong className="text-[#FFD16A]">{selectedProperty.name}</strong>
              <span className="text-[#8ba2bc]"> • {selectedProperty.city} ({totalNights} Nights)</span>
            </div>

            <button
              type="submit"
              disabled={isChecking}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl btn-gold text-sm font-bold flex items-center justify-center gap-2.5 shadow-xl shadow-[#F6B936]/20 transition-all disabled:opacity-50"
            >
              {isChecking ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#102033]" />
                  <span>Checking Availability...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 text-[#102033]" />
                  <span>Check Availability</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* =========================================================================
          Availability Status & Popup Trigger Card
          ========================================================================= */}
      {hasChecked && (
        <div className="bg-[#06172A] border-2 border-emerald-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 shrink-0 shadow-lg">
                <Sparkles className="w-6 h-6 animate-pulse" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
                  Live Inventory Status
                </span>
                <h3 className="text-lg sm:text-xl font-serif font-bold text-[#F7F8FA]">
                  Congratulations! Four room types are available for your selected dates.
                </h3>
                <p className="text-xs text-[#C4D1DF]">
                  {selectedProperty.name} • {checkIn} to {checkOut} ({totalNights} {totalNights === 1 ? "Night" : "Nights"}) • {adults} {adults === 1 ? "Adult" : "Adults"}
                </p>
              </div>
            </div>

            <div className="w-full md:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="px-6 py-3.5 rounded-xl btn-gold text-sm font-bold flex items-center justify-center gap-2.5 shadow-xl shadow-[#F6B936]/25 hover:scale-[1.02] transition-transform"
              >
                <Layers className="w-4 h-4 text-[#102033]" />
                <span>View Available Rooms & Reserve</span>
              </button>
            </div>
          </div>

          {/* Quick Perks */}
          <div className="mt-6 pt-5 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-[#C4D1DF]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>4 Room Types Available</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#F6B936] shrink-0" />
              <span>Zero Booking Fees</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#F6B936] shrink-0" />
              <span>2-4 Hr Direct Response</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Instant Reservation</span>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          POPUP MODAL: Step 2 Available Rooms & Step 3/4 Guest Details Form
          ========================================================================= */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        property={selectedProperty}
        checkIn={checkIn}
        checkOut={checkOut}
        adults={adults}
        initialRoomType={preferredRoomType}
      />
    </div>
  );
}
