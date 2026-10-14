"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  MapPin,
  Calendar,
  Users,
  Search,
  ChevronDown,
  Building,
  Check,
  AlertCircle,
  ShieldAlert,
  BedDouble,
} from "lucide-react";
import { PROPERTIES } from "@/data/properties";
import { getTodayDateString, getTomorrowDateString } from "@/lib/utils";
import { validateSearchParams, SearchValidationErrors } from "@/lib/validation";
import { BookingModal } from "@/components/forms/BookingModal";

interface HeroSearchProps {
  initialPropertySlug?: string;
}

export const ROOM_TYPE_OPTIONS = [
  { id: "all", name: "All Room Types" },
  { id: "deluxe-room", name: "Deluxe Room" },
  { id: "executive-room", name: "Executive Room" },
  { id: "suite", name: "Courtyard Suite" },
  { id: "standard-room", name: "Standard Guest Room" },
];

export function HeroSearch({ initialPropertySlug }: HeroSearchProps) {
  const initialProp = initialPropertySlug
    ? PROPERTIES.find((p) => p.slug === initialPropertySlug)
    : null;

  const [selectedSlug, setSelectedSlug] = useState<string>(initialProp ? initialProp.slug : "");
  const [searchTerm, setSearchTerm] = useState<string>(initialProp ? initialProp.name : "");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [minDate] = useState<string>(() => getTodayDateString());
  const [checkIn, setCheckIn] = useState<string>(() => getTodayDateString());
  const [checkOut, setCheckOut] = useState<string>(() => getTomorrowDateString());
  const [adults, setAdults] = useState<number>(2);
  const [preferredRoomType, setPreferredRoomType] = useState<string>("all");
  const [errors, setErrors] = useState<SearchValidationErrors>({});
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Click outside listener
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filtered properties for autocomplete
  const filteredProperties = PROPERTIES.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectProperty = (slug: string, name: string) => {
    setSelectedSlug(slug);
    setSearchTerm(name);
    setIsDropdownOpen(false);
    if (errors.location) {
      setErrors((prev) => ({ ...prev, location: undefined }));
    }
  };

  const handleCheckInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCheckIn(val);
    if (errors.checkIn) setErrors((prev) => ({ ...prev, checkIn: undefined }));
    if (checkOut <= val) {
      const nextDay = new Date(val);
      nextDay.setDate(nextDay.getDate() + 1);
      const yyyy = nextDay.getFullYear();
      const mm = String(nextDay.getMonth() + 1).padStart(2, "0");
      const dd = String(nextDay.getDate()).padStart(2, "0");
      setCheckOut(`${yyyy}-${mm}-${dd}`);
    }
  };

  const handleCheckOutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckOut(e.target.value);
    if (errors.checkOut) setErrors((prev) => ({ ...prev, checkOut: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateSearchParams({
      propertySlug: selectedSlug,
      checkIn,
      checkOut,
      adults,
    });

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    // Open booking enquiry modal as popup
    setIsModalOpen(true);
  };

  const selectedProperty =
    PROPERTIES.find((p) => p.slug === selectedSlug) || PROPERTIES[0];

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Hero Image with Deep Navy Gradient Overlays */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center scale-105 transition-transform duration-10000"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2000&q=85')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#03101F]/85 via-[#03101F]/90 to-[#03101F]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#F6B936]/10 via-transparent to-transparent pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
        {/* Eyebrow & Main Headings */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#06172A]/90 border border-[#F6B936]/30 text-xs font-semibold tracking-widest uppercase text-[#FFD16A] shadow-lg shadow-black/40">
            <span className="w-2 h-2 rounded-full bg-[#F6B936] animate-pulse" />
            29 PROPERTIES ACROSS INDIA
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-extrabold text-[#F7F8FA] tracking-tight leading-[1.15]">
            Explore <span className="text-gold-gradient">Courtyard by Marriott</span> Hotels Across India
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-[#C4D1DF] max-w-2xl mx-auto font-light leading-relaxed">
            Find property information, check room availability, and submit your stay enquiry for personalized assistance across 29 premier locations.
          </p>
        </div>

        {/* Central Search Card - Step 1: Check Availability */}
        <div className="bg-[#06172A]/95 border border-[#123452] p-5 sm:p-7 md:p-8 rounded-2xl shadow-2xl backdrop-blur-xl max-w-5xl mx-auto text-left relative z-20">
          <div className="mb-4 flex items-center justify-between pb-3 border-b border-white/10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FFD16A] flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#F6B936]/20 text-[#FFD16A] flex items-center justify-center text-[11px] font-bold">1</span>
              Step 1: Check Availability
            </span>
            <span className="text-xs text-[#8ba2bc]">Instant availability check</span>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 items-end">
              {/* Location Selector (4 cols) */}
              <div className="sm:col-span-2 lg:col-span-4 relative z-30" ref={dropdownRef}>
                <label
                  htmlFor="location-search"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#FFD16A] mb-2 flex items-center gap-1.5"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#F6B936]" />
                  <span>Location (29 Hotels)</span>
                </label>

                <div className="relative">
                  <div className="flex items-center bg-[#0A2340] border border-[#123452] rounded-xl px-3.5 py-3 focus-within:border-[#F6B936] focus-within:ring-2 focus-within:ring-[#F6B936]/20 transition-all">
                    <Building className="w-4 h-4 text-[#8ba2bc] shrink-0 mr-2" />
                    <input
                      id="location-search"
                      type="text"
                      role="combobox"
                      aria-expanded={isDropdownOpen}
                      aria-autocomplete="list"
                      aria-controls="properties-dropdown"
                      placeholder="Select hotel or city..."
                      value={searchTerm}
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
                      className="p-1 text-[#8ba2bc] hover:text-[#FFD16A] transition-colors"
                      aria-label="Toggle location list"
                    >
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div
                      id="properties-dropdown"
                      role="listbox"
                      className="absolute left-0 right-0 top-full mt-2 z-50 max-h-52 sm:max-h-56 overflow-y-auto bg-[#071B30] border-2 border-[#F6B936]/40 rounded-xl shadow-2xl shadow-black/95 divide-y divide-white/5 py-1 backdrop-blur-xl"
                    >
                      {filteredProperties.length > 0 ? (
                        filteredProperties.map((p) => {
                          const isSelected = selectedSlug === p.slug;
                          return (
                            <button
                              key={p.slug}
                              type="button"
                              role="option"
                              aria-selected={isSelected}
                              onClick={() => handleSelectProperty(p.slug, p.name)}
                              className={`w-full text-left px-4 py-2.5 flex items-center justify-between text-sm transition-colors ${
                                isSelected
                                  ? "bg-[#F6B936]/20 text-[#FFD16A] font-semibold"
                                  : "text-[#F7F8FA] hover:bg-[#123452]/70"
                              }`}
                            >
                              <div>
                                <span className="block font-medium">{p.name}</span>
                                <span className="block text-xs text-[#8ba2bc]">
                                  {p.city}, {p.state} • {p.region}
                                </span>
                              </div>
                              {isSelected && <Check className="w-4 h-4 text-[#F6B936] shrink-0" />}
                            </button>
                          );
                        })
                      ) : (
                        <div className="px-4 py-3 text-xs text-[#8ba2bc] text-center">
                          No properties found matching &quot;{searchTerm}&quot;.
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {errors.location && (
                  <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.location}</span>
                  </p>
                )}
              </div>

              {/* Check-in Date (2 cols) */}
              <div className="lg:col-span-2">
                <label
                  htmlFor="check-in-date"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#FFD16A] mb-2 flex items-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#F6B936]" />
                  <span>Check-in</span>
                </label>
                <div className="bg-[#0A2340] border border-[#123452] rounded-xl px-3 py-3 focus-within:border-[#F6B936] focus-within:ring-2 focus-within:ring-[#F6B936]/20 transition-all">
                  <input
                    id="check-in-date"
                    type="date"
                    min={minDate}
                    value={checkIn}
                    onChange={handleCheckInChange}
                    className="w-full bg-transparent text-sm text-[#F7F8FA] focus:outline-none [color-scheme:dark]"
                  />
                </div>
                {errors.checkIn && (
                  <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.checkIn}</span>
                  </p>
                )}
              </div>

              {/* Check-out Date (2 cols) */}
              <div className="lg:col-span-2">
                <label
                  htmlFor="check-out-date"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#FFD16A] mb-2 flex items-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#F6B936]" />
                  <span>Check-out</span>
                </label>
                <div className="bg-[#0A2340] border border-[#123452] rounded-xl px-3 py-3 focus-within:border-[#F6B936] focus-within:ring-2 focus-within:ring-[#F6B936]/20 transition-all">
                  <input
                    id="check-out-date"
                    type="date"
                    min={checkIn || minDate}
                    value={checkOut}
                    onChange={handleCheckOutChange}
                    className="w-full bg-transparent text-sm text-[#F7F8FA] focus:outline-none [color-scheme:dark]"
                  />
                </div>
                {errors.checkOut && (
                  <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.checkOut}</span>
                  </p>
                )}
              </div>

              {/* Number of Adults (2 cols) */}
              <div className="lg:col-span-2">
                <label
                  htmlFor="adults-count"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#FFD16A] mb-2 flex items-center gap-1.5"
                >
                  <Users className="w-3.5 h-3.5 text-[#F6B936]" />
                  <span>Adults</span>
                </label>
                <div className="bg-[#0A2340] border border-[#123452] rounded-xl px-3 py-3 focus-within:border-[#F6B936] transition-all">
                  <select
                    id="adults-count"
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

              {/* Preferred Room Type (2 cols) */}
              <div className="lg:col-span-2">
                <label
                  htmlFor="room-type-select"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#FFD16A] mb-2 flex items-center gap-1.5"
                >
                  <BedDouble className="w-3.5 h-3.5 text-[#F6B936]" />
                  <span>Room Type</span>
                </label>
                <div className="bg-[#0A2340] border border-[#123452] rounded-xl px-3 py-3 focus-within:border-[#F6B936] transition-all">
                  <select
                    id="room-type-select"
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

            {/* Check Availability CTA Button */}
            <div className="mt-5 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-[#8ba2bc] flex items-center gap-2">
                {selectedProperty ? (
                  <span>
                    Selected: <strong className="text-[#FFD16A]">{selectedProperty.name}</strong> ({selectedProperty.city})
                  </span>
                ) : (
                  <span>Please select your destination property to check live availability</span>
                )}
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl btn-gold text-sm font-bold flex items-center justify-center gap-2.5 transition-all active:scale-95 shadow-xl shadow-[#F6B936]/25"
              >
                <Search className="w-4 h-4 text-[#102033]" />
                <span>Check Availability</span>
              </button>
            </div>
          </form>

          {/* Under-search Advisory / Independence notice */}
          <div className="mt-4 pt-3 border-t border-white/5 flex items-start gap-2 text-xs text-[#8ba2bc]">
            <ShieldAlert className="w-4 h-4 text-[#F6B936] shrink-0 mt-0.5" />
            <p>
              Direct enquiry coordination across all 29 Courtyard by Marriott hotels in India. Best rates and room allocations confirmed promptly.
            </p>
          </div>
        </div>

        {/* Hero Feature Highlights Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto pt-4 relative z-10">
          <div className="p-3 rounded-xl bg-[#06172A]/80 border border-[#123452] backdrop-blur-sm">
            <span className="block text-xl font-bold text-[#FFD16A] font-serif">29</span>
            <span className="block text-xs text-[#C4D1DF]">Pan-India Locations</span>
          </div>
          <div className="p-3 rounded-xl bg-[#06172A]/80 border border-[#123452] backdrop-blur-sm">
            <span className="block text-xl font-bold text-[#FFD16A] font-serif">4 Types</span>
            <span className="block text-xs text-[#C4D1DF]">Available Rooms</span>
          </div>
          <div className="p-3 rounded-xl bg-[#06172A]/80 border border-[#123452] backdrop-blur-sm">
            <span className="block text-xl font-bold text-[#FFD16A] font-serif">2-4 Hrs</span>
            <span className="block text-xs text-[#C4D1DF]">Enquiry Response</span>
          </div>
          <div className="p-3 rounded-xl bg-[#06172A]/80 border border-[#123452] backdrop-blur-sm">
            <span className="block text-xl font-bold text-[#FFD16A] font-serif">Free</span>
            <span className="block text-xs text-[#C4D1DF]">Stay Consultation</span>
          </div>
        </div>
      </div>

      {/* Booking Enquiry Popup Modal */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        property={selectedProperty}
        checkIn={checkIn}
        checkOut={checkOut}
        adults={adults}
        initialRoomType={preferredRoomType}
      />
    </section>
  );
}
