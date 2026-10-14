export interface EnquirySearchParams {
  propertySlug?: string;
  propertyName?: string;
  checkIn?: string;
  checkOut?: string;
  adults?: number;
  rooms?: number;
  children?: number;
  roomCategory?: string;
}

export interface EnquiryPayload {
  propertyName: string;
  propertySlug: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  rooms: number;
  children: number;
  fullName: string;
  email: string;
  phone: string;
  message?: string;
  consent: boolean;
  honeypot?: string;
}

export interface EnquiryResponse {
  success: boolean;
  referenceId?: string;
  message: string;
  errors?: Record<string, string>;
}
