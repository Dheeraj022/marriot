export interface EnquirySearchParams {
  propertySlug?: string;
  propertyName?: string;
  checkIn?: string;
  checkOut?: string;
  adults?: number;
  rooms?: number;
  children?: number;
  roomType?: string;
  roomTypeName?: string;
  roomCategory?: string;
}

export interface EnquiryPayload {
  propertyName: string;
  propertySlug: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  rooms: number;
  children?: number;
  roomType?: string;
  roomTypeName?: string;
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
  summary?: Record<string, unknown>;
}
