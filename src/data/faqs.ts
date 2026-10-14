export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

export const FAQS: FAQItem[] = [
  {
    question: "Is GuestAssist an official Marriott website?",
    answer:
      "No. GuestAssist is an independent hotel information and stay enquiry assistance platform operated by BrightSpark Leisure Services Private Limited. We are not an official representative, affiliate, or brand portal of Marriott International or any hotel chain. Hotel trademarks and names are used solely for descriptive and identification purposes.",
    category: "General & Independence",
  },
  {
    question: "Does submitting an enquiry confirm a booking?",
    answer:
      "No. Submitting an enquiry through GuestAssist does not create or confirm a hotel booking. Your submission forwards your requested travel dates, guest count, and preferences to our enquiry assistance team, who will reach out with guidance and assist you in proceeding directly with the hotel or authorized booking channels.",
    category: "Enquiries & Bookings",
  },
  {
    question: "Can GuestAssist guarantee room rates or real-time availability?",
    answer:
      "No. Hotel room inventory, dynamic tariffs, taxes, and promotional offers fluctuate continuously and are managed exclusively by the respective hotel property. Our team provides informational assistance and helps clarify property options, but final rates and room availability must be verified directly upon booking.",
    category: "Rates & Availability",
  },
  {
    question: "Does GuestAssist handle hotel payments, deposits, or cancellations?",
    answer:
      "No. GuestAssist does not collect hotel payments, room charges, or booking deposits. Any financial transaction or reservation is handled directly with the chosen hotel property or through verified authorized booking providers according to their official terms and cancellation policies.",
    category: "Payments & Policies",
  },
  {
    question: "How will my enquiry be handled once submitted?",
    answer:
      "Once you submit your enquiry, our stay assistance coordinators review your requested Courtyard by Marriott location, check-in and check-out dates, and guest specifications. We typically respond within 2 to 4 business hours via phone or email to provide property details and assist with next steps.",
    category: "Process",
  },
  {
    question: "What details should I include in my enquiry for faster assistance?",
    answer:
      "Providing accurate check-in and check-out dates, total number of adult guests and children, preferred room category (e.g. Deluxe, Executive, Suite), and any specific requirements (such as airport transfer, vegetarian dining, or meeting space) allows our team to assist you effectively.",
    category: "Process",
  },
  {
    question: "Can I enquire about multiple Courtyard properties or corporate group stays?",
    answer:
      "Yes. You can mention multiple locations or group requirements in the message section of your enquiry form, or reach out to our team directly via the contact page or by clicking 'Call Now'. We gladly assist corporate travel coordinators and event planners.",
    category: "Special Enquiries",
  },
];
