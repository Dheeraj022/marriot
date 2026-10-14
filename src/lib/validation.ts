import { PROPERTIES } from "@/data/properties";

export interface SearchValidationErrors {
  location?: string;
  checkIn?: string;
  checkOut?: string;
  adults?: string;
}

export function validateSearchParams(params: {
  propertySlug?: string;
  checkIn?: string;
  checkOut?: string;
  adults?: number;
}): { isValid: boolean; errors: SearchValidationErrors } {
  const errors: SearchValidationErrors = {};

  if (!params.propertySlug || !PROPERTIES.some((p) => p.slug === params.propertySlug)) {
    errors.location = "Please select a valid Courtyard by Marriott location from the list.";
  }

  const todayStr = new Date().toISOString().split("T")[0];

  if (!params.checkIn) {
    errors.checkIn = "Please select a check-in date.";
  } else if (params.checkIn < todayStr) {
    errors.checkIn = "Check-in date cannot be in the past.";
  }

  if (!params.checkOut) {
    errors.checkOut = "Please select a check-out date.";
  } else if (params.checkIn && params.checkOut <= params.checkIn) {
    errors.checkOut = "Check-out date must be at least one day after check-in.";
  }

  if (!params.adults || params.adults < 1) {
    errors.adults = "At least 1 adult guest is required.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export interface EnquiryFormValidationErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  consent?: string;
  general?: string;
}

export function validateEnquiryForm(data: {
  fullName: string;
  email: string;
  phone: string;
  consent: boolean;
  honeypot?: string;
}): { isValid: boolean; errors: EnquiryFormValidationErrors } {
  const errors: EnquiryFormValidationErrors = {};

  // Honeypot check for bots
  if (data.honeypot && data.honeypot.trim() !== "") {
    errors.general = "Submission rejected.";
    return { isValid: false, errors };
  }

  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.fullName = "Please enter your full name (minimum 2 characters).";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  // Support 10-digit Indian numbers with optional +91 / 0 prefix, or international formats
  const cleanPhone = data.phone.replace(/[\s\-\(\)]/g, "");
  const phoneRegex = /^(\+?\d{1,3})?[6-9]\d{9}$/;
  if (!cleanPhone || cleanPhone.length < 10 || !phoneRegex.test(cleanPhone)) {
    errors.phone = "Please enter a valid 10-digit mobile number.";
  }

  if (!data.consent) {
    errors.consent = "You must agree to be contacted regarding this enquiry.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
