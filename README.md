# Courtyard by Marriott — Hotel Directory & Stay Enquiry Platform

Courtyard by Marriott is a premier hotel directory and stay enquiry platform showcasing all 29 **Courtyard by Marriott** hotels and resorts across India.

The platform enables travellers across India to explore destinations, review room categories and amenities, and submit stay enquiries for swift reservation coordination and availability guidance.

---

## 🌟 Key Features

* **Complete 29 Properties Directory:** Covers all 29 Courtyard by Marriott locations across North, South, West, East, and Central India.
* **Smart Stay Search:** Search by destination with instant date validation, check-in/out logic, and guest counters.
* **Seamless Enquiry Flow:** Carries search preferences forward into the enquiry form with client and server-side validation.
* **Spam Protection:** Integrated honeypot and sanitized input processing.
* **Unique Reference Generation:** Submissions receive immediate tracking references (e.g., `CY-2026-XXXXX`).
* **Luxury Design System:** Midnight navy backgrounds (`#03101F`, `#06172A`, `#0A2340`) paired with warm gold accents (`#F6B936`, `#FFD16A`), glassmorphism, and Playfair Display serif headings.
* **Fully Responsive & Accessible:** Optimized for mobile touch navigation and desktop keyboard accessibility.
* **Complete Legal Suite:** Policy pages covering Privacy Policy, Terms of Service, Information Notice, Cancellation & Refund Policy, and Grievance Support.

---

## 🛠️ Technology Stack

* **Framework:** [Next.js](https://nextjs.org/) (App Router)
* **Language:** TypeScript
* **UI Library:** React 19
* **Styling:** Tailwind CSS v4
* **Typography:** Playfair Display (Serif) & Inter (Sans-serif)
* **Icons:** [Lucide React](https://lucide.dev/)

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Dheeraj022/marriot.git
cd marriot
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for production
```bash
npm run build
npm start
```

### 5. Linting
```bash
npm run lint
```

---

## 📂 Project Structure

```text
src/
├── app/
│   ├── layout.tsx                     # Root layout with fonts & metadata
│   ├── globals.css                    # Tailwind CSS v4 design tokens
│   ├── page.tsx                       # Homepage (Hero, Directory, Amenities)
│   ├── enquiry/page.tsx               # Dedicated enquiry form
│   ├── thank-you/page.tsx             # Submission confirmation page
│   ├── about/page.tsx                 # About Courtyard by Marriott
│   ├── contact/page.tsx               # Contact page & assistance form
│   ├── privacy-policy/page.tsx        # Privacy policy
│   ├── terms-of-service/page.tsx      # Terms of service
│   ├── disclaimer/page.tsx            # Information & stay notice
│   ├── cancellation-refund-policy/    # Cancellation terms
│   ├── grievance-support/             # Grievance redressal mechanism
│   ├── robots.ts & sitemap.ts         # SEO metadata
│   └── api/enquiry/route.ts           # Enquiry submission API endpoint
├── components/
│   ├── layout/                        # SiteHeader, SiteFooter, MobileMenu
│   ├── home/                          # HeroSearch, Directory, Cards, Amenities
│   ├── forms/                         # EnquiryForm, ContactForm
│   └── shared/                        # CallNowButton, SectionHeading, Accordion
├── data/
│   ├── properties.ts                  # All 29 Courtyard locations in India
│   ├── site-config.ts                 # Brand & contact configuration
│   ├── room-categories.ts             # Accommodation & dining data
│   └── faqs.ts                        # Service FAQs & disclosures
├── lib/                               # Date utilities & validation
└── types/                             # Property & Enquiry TypeScript interfaces
```

---

## 🏢 Contact Information

* **Platform:** Courtyard by Marriott India
* **Email:** enquiries@courtyardbymarriott.in
* **Helpline:** +91 92790 22649
* **Headquarters:** Bengaluru, Karnataka, India
