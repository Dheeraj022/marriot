export const SITE_CONFIG = {
  name: "GuestAssist",
  brandName: "GuestAssist",
  tagline: "Hotels & Resorts in India",
  companyName: "BrightSpark Leisure Services Private Limited",
  operatorName: "BrightSpark Leisure Services Private Limited",
  phone: process.env.NEXT_PUBLIC_ENQUIRY_PHONE || "+91 1800 890 4567",
  phoneDisplay: "+91 1800 890 4567",
  phoneTel: "tel:+9118008904567",
  email: process.env.NEXT_PUBLIC_ENQUIRY_EMAIL || "enquiries@courtyardbymarriott.in",
  supportEmail: "support@courtyardbymarriott.in",
  businessHours: "Monday to Sunday, 24/7 Guest Assistance",
  address: {
    line1: "Courtyard by Marriott India",
    line2: "Central Reservations & Guest Relations",
    line3: "Outer Ring Road",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560103",
    country: "India",
  },
  disclaimer: {
    short:
      "Explore 29 Courtyard by Marriott hotels and resorts across India. Submit your stay enquiry for custom room rates, packages, and dedicated assistance.",
    full:
      "GuestAssist is an independent hotel information and stay enquiry assistance platform operated by BrightSpark Leisure Services Private Limited. We help travellers explore Courtyard by Marriott properties across India, review accommodations and amenities, and submit stay enquiries. GuestAssist is not the owner, operator, or official representative of Marriott International or any Courtyard by Marriott property unless specifically stated.",
    enquiryNotice:
      "Submit your stay enquiry to receive tailored room recommendations, best available rates, and booking coordination directly from our GuestAssist team.",
  },
  navigation: [
    { label: "Home", href: "/" },
    { label: "Locations", href: "/#directory" },
    { label: "Accommodation", href: "/#accommodation" },
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contact" },
  ],
  legalLinks: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms-of-service" },
    { label: "Disclaimer", href: "/disclaimer" },
    { label: "Cancellation & Refund Policy", href: "/cancellation-refund-policy" },
    { label: "Grievance & Support", href: "/grievance-support" },
  ],
};
