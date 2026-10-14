"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
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
} from "lucide-react";
import { PROPERTIES } from "@/data/properties";
import { getTodayDateString, getTomorrowDateString } from "@/lib/utils";
import { validateSearchParams, SearchValidationErrors } from "@/lib/validation";

interface HeroSearchProps {
  initialPropertySlug?: string;
}

export function HeroSearch({ initialPropertySlug }: HeroSearchProps) {
  const router = useRouter();

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
  const [rooms, setRooms] = useState<number>(1);
  const [children, setChildren] = useState<number>(0);
  const [errors, setErrors] = useState<SearchValidationErrors>({});
  const [guestPickerOpen, setGuestPickerOpen] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const guestPickerRef = useRef<HTMLDivElement>(null);

  // Click outside listener
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (guestPickerRef.current && !guestPickerRef.current.contains(event.target as Node)) {
        setGuestPickerOpen(false);
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
    // If checkout is before or same as new checkin, automatically move checkout to checkin + 1 day
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

    const selectedProp = PROPERTIES.find((p) => p.slug === selectedSlug);

    // Build URL query string
    const query = new URLSearchParams({
      property: selectedSlug,
      propertyName: selectedProp ? selectedProp.name : "",
      checkIn,
      checkOut,
      adults: adults.toString(),
      rooms: rooms.toString(),
      children: children.toString(),
    });

    router.push(`/enquiry?${query.toString()}`);
  };

  const selectedProperty = PROPERTIES.find((p) => p.slug === selectedSlug);

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
        {/* Navy Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#03101F] via-[#03101F]/80 to-[#03101F]/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#03101F] via-transparent to-[#03101F]/80" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto space-y-10 text-center">
        {/* Hero Eyebrow & Titles */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#06172A]/90 border border-[#F6B936]/30 backdrop-blur-md shadow-lg shadow-[#03101F]">
            <span className="w-2 h-2 rounded-full bg-[#F6B936] animate-pulse" />
            <span className="text-xs font-semibold tracking-widest text-[#FFD16A] uppercase">
              BUSINESS • LEISURE • FAMILY • EVENTS
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-extrabold text-[#F7F8FA] tracking-tight leading-[1.15]">
            Explore <span className="text-gold-gradient">Courtyard by Marriott</span> Hotels Across India
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-[#C4D1DF] max-w-2xl mx-auto font-light leading-relaxed">
            Find property information, compare destinations, and submit your stay enquiry for dedicated assistance across 29 premier locations.
          </p>
        </div>

        {/* Central Search Card */}
        <div className="bg-[#06172A]/95 border border-[#123452] p-5 sm:p-7 md:p-8 rounded-2xl shadow-2xl backdrop-blur-xl max-w-5xl mx-auto text-left relative">
          <form onSubmit={handleSubmit} noValidate>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
              {/* Location Selector (5 cols) */}
              <div className="md:col-span-4 relative" ref={dropdownRef}>
                <label
                  htmlFor="location-search"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#FFD16A] mb-2 flex items-center gap-1.5"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#F6B936]" />
                  <span>Select Location (29 Properties)</span>
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
                      placeholder="Type city or hotel name..."
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
                      className="absolute left-0 right-0 top-full mt-2 z-50 max-h-64 overflow-y-auto bg-[#0A2340] border border-[#123452] rounded-xl shadow-2xl divide-y divide-white/5 py-1"
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
              <div className="md:col-span-2">
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
              <div className="md:col-span-2">
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

              {/* Guests & Rooms Popover (2 cols) */}
              <div className="md:col-span-2 relative" ref={guestPickerRef}>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#FFD16A] mb-2 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#F6B936]" />
                  <span>Guests & Rooms</span>
                </label>

                <button
                  type="button"
                  onClick={() => setGuestPickerOpen(!guestPickerOpen)}
                  className="w-full text-left bg-[#0A2340] border border-[#123452] rounded-xl px-3.5 py-3 text-sm text-[#F7F8FA] flex items-center justify-between hover:border-[#F6B936]/60 transition-all"
                >
                  <span className="truncate">
                    {adults} Ad • {rooms} Rm {children > 0 ? `• ${children} Ch` : ""}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#8ba2bc] transition-transform duration-200 ${
                      guestPickerOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {guestPickerOpen && (
                  <div className="absolute right-0 top-full mt-2 z-50 w-64 bg-[#0A2340] border border-[#123452] rounded-xl shadow-2xl p-4 space-y-4">
                    {/* Adults Stepper */}
                    <div className="flex items-center justify-between text-sm">
                      <div>
                        <span className="block font-medium text-[#F7F8FA]">Adults</span>
                        <span className="block text-xs text-[#8ba2bc]">Age 12+</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setAdults(Math.max(1, adults - 1))}
                          className="w-7 h-7 rounded-lg bg-[#123452] text-[#F7F8FA] flex items-center justify-center font-bold hover:bg-[#F6B936] hover:text-[#03101F] transition-colors"
                        >
                          -
                        </button>
                        <span className="w-5 text-center font-semibold text-[#F7F8FA]">
                          {adults}
                        </span>
                        <button
                          type="button"
                          onClick={() => setAdults(Math.min(10, adults + 1))}
                          className="w-7 h-7 rounded-lg bg-[#123452] text-[#F7F8FA] flex items-center justify-center font-bold hover:bg-[#F6B936] hover:text-[#03101F] transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Rooms Stepper */}
                    <div className="flex items-center justify-between text-sm">
                      <div>
                        <span className="block font-medium text-[#F7F8FA]">Rooms</span>
                        <span className="block text-xs text-[#8ba2bc]">Required</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setRooms(Math.max(1, rooms - 1))}
                          className="w-7 h-7 rounded-lg bg-[#123452] text-[#F7F8FA] flex items-center justify-center font-bold hover:bg-[#F6B936] hover:text-[#03101F] transition-colors"
                        >
                          -
                        </button>
                        <span className="w-5 text-center font-semibold text-[#F7F8FA]">
                          {rooms}
                        </span>
                        <button
                          type="button"
                          onClick={() => setRooms(Math.min(5, rooms + 1))}
                          className="w-7 h-7 rounded-lg bg-[#123452] text-[#F7F8FA] flex items-center justify-center font-bold hover:bg-[#F6B936] hover:text-[#03101F] transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Children Stepper */}
                    <div className="flex items-center justify-between text-sm">
                      <div>
                        <span className="block font-medium text-[#F7F8FA]">Children</span>
                        <span className="block text-xs text-[#8ba2bc]">Age 0-11</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setChildren(Math.max(0, children - 1))}
                          className="w-7 h-7 rounded-lg bg-[#123452] text-[#F7F8FA] flex items-center justify-center font-bold hover:bg-[#F6B936] hover:text-[#03101F] transition-colors"
                        >
                          -
                        </button>
                        <span className="w-5 text-center font-semibold text-[#F7F8FA]">
                          {children}
                        </span>
                        <button
                          type="button"
                          onClick={() => setChildren(Math.min(6, children + 1))}
                          className="w-7 h-7 rounded-lg bg-[#123452] text-[#F7F8FA] flex items-center justify-center font-bold hover:bg-[#F6B936] hover:text-[#03101F] transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setGuestPickerOpen(false)}
                      className="w-full py-1.5 rounded-lg bg-[#F6B936] text-[#03101F] text-xs font-bold hover:bg-[#FFD16A] transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                )}
              </div>

              {/* Submit Button (2 cols) */}
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl btn-gold text-sm font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-[#F6B936]/25"
                >
                  <Search className="w-4 h-4 text-[#102033]" />
                  <span>Check Availability</span>
                </button>
              </div>
            </div>

            {/* Selected Property preview hint */}
            {selectedProperty && (
              <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs text-[#C4D1DF]">
                <span>
                  Selected: <strong className="text-[#FFD16A]">{selectedProperty.name}</strong> ({selectedProperty.city})
                </span>
                <span className="text-[#8ba2bc]">{selectedProperty.tagline}</span>
              </div>
            )}
          </form>

          {/* Under-search Advisory / Independence notice */}
          <div className="mt-4 pt-3 border-t border-white/5 flex items-start gap-2 text-xs text-[#8ba2bc]">
            <ShieldAlert className="w-4 h-4 text-[#F6B936] shrink-0 mt-0.5" />
            <p>
              <strong>Enquiry-Only Service:</strong> This search submits a stay request to our assistance coordinators, not a real-time booking confirmation. Rates and room availability are subject to direct hotel verification.
            </p>
          </div>
        </div>

        {/* Hero Feature Highlights Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto pt-4">
          <div className="p-3 rounded-xl bg-[#06172A]/80 border border-[#123452] backdrop-blur-sm">
            <span className="block text-xl font-bold text-[#FFD16A] font-serif">29</span>
            <span className="block text-xs text-[#C4D1DF]">Pan-India Locations</span>
          </div>
          <div className="p-3 rounded-xl bg-[#06172A]/80 border border-[#123452] backdrop-blur-sm">
            <span className="block text-xl font-bold text-[#FFD16A] font-serif">100%</span>
            <span className="block text-xs text-[#C4D1DF]">Transparent Guidance</span>
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
    </section>
  );
}
