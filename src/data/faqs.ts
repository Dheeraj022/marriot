export interface FAQItem {
  question: string;
  answer: string;
  iconName?: "landmark" | "rupee" | "dining" | "calendar";
  category?: string;
}

export const FAQS: FAQItem[] = [
  {
    question: "Is GuestAssist the official Courtyard by Marriott website?",
    answer:
      "No. GuestAssist is an independent travel enquiry and guest assistance platform operated by BrightSpark Leisure Services Private Limited. We are not the official website of Courtyard by Marriott or Marriott International. We provide property information, check room availability, and assist guests with personalized stay enquiries across 29 premier locations in India.",
    iconName: "landmark",
    category: "Independence & About Us",
  },
  {
    question: "How will I receive availability and rates?",
    answer:
      "Once you submit your stay enquiry through GuestAssist, our team coordinates directly with the property to check real-time availability and shares personalized room options and pricing with you via phone, WhatsApp, or email within 2 to 4 hours.",
    iconName: "rupee",
    category: "Rates & Pricing",
  },
  {
    question: "Can you help with dining, activities and other information?",
    answer:
      "Yes. In addition to accommodation details, our team can assist you with information on signature restaurants, culinary offerings, meeting and banquet spaces, wellness amenities, and curated nearby local experiences across all 29 hotels.",
    iconName: "dining",
    category: "Services & Amenities",
  },
  {
    question: "Is the information on this website always up to date?",
    answer:
      "We strive to keep property details, room features, and amenities accurate and regularly updated. However, hotel policies, seasonal rates, and operational schedules are subject to change by property management. All details are verified for your requested dates upon enquiry.",
    iconName: "calendar",
    category: "Property Information",
  },
];
