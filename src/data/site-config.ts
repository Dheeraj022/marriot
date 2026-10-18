export const SITE_CONFIG = {
  name: "GuestAssist",
  brandName: "GuestAssist",
  networkTagline: "Independent travel network partners",
  companyName: "BrightSpark Leisure Services Private Limited",
  operatorName: "BrightSpark Leisure Services Private Limited",
  gst: "07AAGCB9126M2ZA",
  phone: process.env.NEXT_PUBLIC_ENQUIRY_PHONE || "+91 1800 890 4567",
  phoneDisplay: "+91 1800 890 4567",
  phoneTel: "tel:+9118008904567",
  email: process.env.NEXT_PUBLIC_ENQUIRY_EMAIL || "info@guestassist.com",
  supportEmail: "info@guestassist.com",
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
    title: "Property Information Disclaimer",
    short:
      "Property names, descriptions, images, amenities and other details are presented for general informational purposes and may change. Visitors should independently verify important details with the relevant property or booking provider.",
    full:
      "Property names, descriptions, images, amenities and other details are presented for general informational purposes and may change. We aim to keep information useful, but visitors should independently verify important details with the relevant property or booking provider. Submitting a request through Guest Assist does not guarantee room availability, rates or a confirmed reservation. Any final booking, payment, cancellation or refund terms must be confirmed with the party responsible for the reservation. Guest Assist is operated by Brightspark Leisure Services Private Limited and is independent of the hotels listed on this website. Unless a specific relationship is accurately disclosed and can be substantiated, Guest Assist does not represent itself as a hotel owner, operator, manager or authorized booking agent. All third-party names and trademarks belong to their respective owners. Their appearance is for identification and informational purposes only; it does not imply affiliation or endorsement.",
    paragraphs: [
      "Property names, descriptions, images, amenities and other details are presented for general informational purposes and may change. We aim to keep information useful, but visitors should independently verify important details with the relevant property or booking provider.",
      "Submitting a request through Guest Assist does not guarantee room availability, rates or a confirmed reservation. Any final booking, payment, cancellation or refund terms must be confirmed with the party responsible for the reservation.",
      "Guest Assist is operated by Brightspark Leisure Services Private Limited and is independent of the hotels listed on this website. Unless a specific relationship is accurately disclosed and can be substantiated, Guest Assist does not represent itself as a hotel owner, operator, manager or authorized booking agent.",
      "All third-party names and trademarks belong to their respective owners. Their appearance is for identification and informational purposes only; it does not imply affiliation or endorsement.",
    ],
    enquiryNotice:
      "Submit your stay enquiry to receive tailored room recommendations, best available rates, and booking coordination directly from our Guest Assist team.",
  },
  navigation: [
    { label: "Home", href: "/" },
    { label: "Locations", href: "/locations" },
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
