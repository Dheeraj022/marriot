export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

export const FAQS: FAQItem[] = [
  {
    question: "What is the Courtyard by Marriott India platform?",
    answer:
      "Courtyard by Marriott India is a comprehensive directory and stay enquiry platform showcasing all 29 Courtyard by Marriott hotels and resorts across India. We assist leisure and business travellers with property information, amenities, conference facilities, and stay coordination.",
    category: "Overview",
  },
  {
    question: "Does submitting a stay enquiry confirm my reservation?",
    answer:
      "Submitting an enquiry transmits your travel dates, destination property, guest count, and preferences to our reservations coordination team. Our team will contact you promptly to provide exact room availability, rates, and complete your reservation directly.",
    category: "Enquiries & Bookings",
  },
  {
    question: "How are room rates and availability confirmed?",
    answer:
      "Room rates, taxes, and real-time inventory are confirmed based on your dates and party size. Our team coordinates directly with the respective Courtyard by Marriott property to secure the best available tariff, seasonal packages, or corporate rates for your stay.",
    category: "Rates & Availability",
  },
  {
    question: "How are payments, deposits, and cancellations handled?",
    answer:
      "No payments or credit card details are required when submitting an enquiry on this website. All financial transactions, room guarantees, deposits, and cancellation terms are handled securely during reservation confirmation in accordance with hotel policy.",
    category: "Payments & Policies",
  },
  {
    question: "How quickly will my stay enquiry be processed?",
    answer:
      "Our guest assistance team reviews your selected Courtyard by Marriott property, dates, and requirements, typically responding within 2 to 4 business hours via phone or email to provide availability details and booking guidance.",
    category: "Process",
  },
  {
    question: "What details should I provide in my enquiry for faster assistance?",
    answer:
      "Providing your arrival and departure dates, guest count, preferred room tier (e.g., Deluxe, Executive, Suite), and special requests (such as airport transfers, extra beds, or meeting facilities) ensures we tailor your reservation promptly.",
    category: "Process",
  },
  {
    question: "Can I enquire about corporate group stays or conferences?",
    answer:
      "Yes. You can specify group requirements, conference rooms, or banquet needs in your enquiry form, or contact our reservations desk directly by clicking 'Call Now'. We gladly assist corporate travel coordinators and event planners across all 29 Indian destinations.",
    category: "Group & Corporate Stays",
  },
];
