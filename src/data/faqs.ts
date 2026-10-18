export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

export const FAQS: FAQItem[] = [
  {
    question: "What is Guest Assist?",
    answer:
      "Guest Assist is a customer assistance website operated by Brightspark Leisure Services Private Limited. It provides general hotel property information, stay guidance and enquiry assistance for destinations in India.",
    category: "About Guest Assist",
  },
  {
    question: "Is Guest Assist the official website of Marriott or any listed hotel?",
    answer:
      "No. Guest Assist is independently operated and is not the official website of Marriott International or any listed hotel. We do not claim hotel affiliation or authorization.",
    category: "Independence & Affiliation",
  },
  {
    question: "Does submitting an enquiry confirm my reservation?",
    answer:
      "No. Submitting an enquiry is a request for information and assistance. Your stay is not confirmed unless the responsible booking provider confirms the reservation.",
    category: "Enquiries & Reservations",
  },
  {
    question: "Can Guest Assist guarantee room rates or availability?",
    answer:
      "No. Rates, availability, amenities and booking conditions can change. Please verify the latest details with the relevant property or booking provider.",
    category: "Rates & Availability",
  },
  {
    question: "How can I request stay details?",
    answer:
      "Use the Request Stay Details form or call the contact number displayed on our website. Please provide accurate travel dates and guest details so we can understand your request.",
    category: "Request Process",
  },
  {
    question: "Does Guest Assist collect payment for hotel bookings?",
    answer:
      "An enquiry does not require you to assume that a reservation or payment has been processed. Before making any payment, verify the responsible booking provider, payment recipient, final amount and applicable terms. If Guest Assist's actual payment process changes, this answer must be updated.",
    category: "Payments & Terms",
  },
  {
    question: "Which destinations does Guest Assist cover?",
    answer:
      "Guest Assist focuses on hotel information and enquiry assistance for destinations within India.",
    category: "Destinations",
  },
  {
    question: "How do I verify property details?",
    answer:
      "You can contact the relevant property or consult its official website to verify facilities, current rates, availability and booking terms.",
    category: "Property Verification",
  },
];
