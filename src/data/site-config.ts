export const SITE_CONFIG = {
  name: "GuestAssist",
  tagline: "Hotel Stay Enquiry Assistance",
  operatorName: "BrightSpark Leisure Services Private Limited",
  phone: process.env.NEXT_PUBLIC_ENQUIRY_PHONE || "+91 1800 890 4567",
  phoneDisplay: "+91 1800 890 4567",
  phoneTel: "tel:+9118008904567",
  email: process.env.NEXT_PUBLIC_ENQUIRY_EMAIL || "enquiries@guestassist.in",
  supportEmail: "support@guestassist.in",
  businessHours: "Monday to Saturday, 9:00 AM – 8:00 PM IST",
  address: {
    line1: "BrightSpark Leisure Services Private Limited",
    line2: "Level 4, Tower B, Prestige Tech Park",
    line3: "Marathahalli-Sarjapur Outer Ring Road",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560103",
    country: "India",
  },
  disclaimer: {
    short:
      "GuestAssist is an independent hotel information and stay enquiry assistance service operated by BrightSpark Leisure Services Private Limited. We are not an official Marriott website and do not represent Marriott International. Enquiries submitted do not constitute a confirmed booking.",
    full:
      "GuestAssist is an independent hotel information and enquiry-assistance platform owned and operated by BrightSpark Leisure Services Private Limited. GuestAssist is NOT affiliated with, sponsored by, authorized by, or endorsed by Marriott International, Inc. or any of its subsidiaries. All hotel property names (including 'Courtyard by Marriott') are used strictly descriptively for identification purposes. Submitting a stay enquiry through GuestAssist does not constitute a guaranteed reservation or booking confirmation. Room rates, availability, policies, and reservations must be confirmed directly with the respective property or authorized booking channels.",
    enquiryNotice:
      "This is an enquiry request, not a confirmed hotel booking. Property details, rates, room options, and availability must be verified with the hotel or authorized booking provider.",
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
