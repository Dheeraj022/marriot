# GuestAssist — Website Development Brief for Google Antigravity

## 1. Project Overview

Build a polished, responsive website for **GuestAssist**, an independent hotel information and enquiry-assistance platform operated by **BrightSpark Leisure Services Private Limited**.

The website helps visitors explore Courtyard by Marriott properties across India, review accommodation and amenity information, and submit an enquiry so the team can assist them. It is **not** an official Marriott website, does not represent Marriott International, and must not imply authorised affiliation, endorsement, inventory access, confirmed rates, or booking confirmation.

### Required stack
- **Next.js** using the App Router
- **React** with TypeScript
- **Tailwind CSS**
- Use reusable, accessible components and a clean, maintainable folder structure.
- Use Lucide icons (for example, `lucide-react`) where appropriate.
- Prefer server components by default; use client components only for interactions.
- Use semantic HTML, responsive layouts, and good keyboard accessibility.

### Main goal
Create a premium, trustworthy hotel enquiry website based on the supplied visual references:
- Dark navy / midnight-blue backgrounds
- Warm gold and amber accents
- Elegant serif section headings paired with a modern sans-serif body font
- Hotel, room, dining, pool, and destination photography
- Thin borders, subtle gradients, rounded cards, restrained shadows, and clear calls to action
- Mobile-first design, matching the supplied tall mobile layouts while scaling elegantly to desktop

Do not reproduce the Marriott brand logo or imply this is an official brand site. The property names may be used descriptively to identify the hotels listed in the directory. Use GuestAssist branding throughout.

---

## 2. Visual Design System

### Colour palette
Use Tailwind theme tokens or CSS variables:
- `--navy-950: #03101F` — page background
- `--navy-900: #06172A` — primary panels
- `--navy-800: #0A2340` — cards and elevated sections
- `--navy-700: #123452` — borders and secondary surfaces
- `--gold-500: #F6B936` — primary gold
- `--gold-400: #FFD16A` — highlights and hover states
- `--cream: #FFF8EA` — bright card / form surface where appropriate
- `--text-primary: #F7F8FA`
- `--text-secondary: #C4D1DF`
- `--text-dark: #102033`

### Typography
- Headings: elegant serif such as `Playfair Display` or `DM Serif Display`.
- Body and controls: `Inter` or `Manrope`.
- Use fluid sizing with `clamp()` for large hero titles.
- Maintain strong contrast and avoid excessively small text.

### Components and visual details
- Sticky or consistently placed header with GuestAssist logo/wordmark, navigation, and a gold **Call Now** button.
- Gold gradient buttons with dark text; outlined secondary buttons.
- Subtle card borders (`rgba(255,255,255,0.12)`), modest shadows, and smooth hover/focus transitions.
- Image overlays on hero sections for readable text.
- Keep animation restrained. Respect `prefers-reduced-motion`.
- Use image aspect ratios consistently and `object-fit: cover`.
- Use original GuestAssist branding; do not copy third-party logos.

---

## 3. Site Map and Pages

Create these routes:
1. `/` — Home page, search form, featured properties, all 29 locations in a directory/carousel, accommodation overview, and enquiry process.
2. `/enquiry` — Contact-detail form that receives and displays the visitor's submitted search details.
3. `/thank-you` — Confirmation page shown after a successful enquiry submission.
4. `/about` — About GuestAssist, operator information, values, FAQs, and property discovery.
5. `/contact` — Contact details, general enquiry form, assistance categories, and FAQs.
6. Optional: `/privacy-policy`, `/terms-of-service`, `/disclaimer`, `/cancellation-refund-policy`, `/grievance-support` as simple, editable legal-information pages. Do not invent legal terms; use clearly marked draft copy requiring review.

**Do not create 29 separate location pages.** All 29 property names must be available in the home-page location selector and directory/carousel only. Clicking a location card may preselect that location in the enquiry form; it must not open a dedicated property detail page. The primary enquiry flow is `/` → `/enquiry` → `/thank-you`.

Use a shared header and footer across all pages. Keep navigation consistent.

---

## 4. Header and Footer

### Header
- GuestAssist logo mark (simple custom geometric house/concierge icon) and text:
  - **GuestAssist**
  - *Hotel Enquiry Assistance*
- Desktop links: Home, Locations, About Us, Contact Us.
- Gold **Call Now** button using a configurable phone number.
- Mobile: logo, call icon/button, and accessible menu toggle.
- Active page state should be visible.
- Mobile menu should open/close correctly and close after navigation.

### Footer
- GuestAssist brand and short independent-service description.
- Links: Home, Locations, About Us, Contact Us, Privacy Policy, Terms of Service, Disclaimer, Cancellation & Refund Policy, Grievance & Support.
- Configurable email and phone details.
- Copyright: `© {current year} GuestAssist. Operated by BrightSpark Leisure Services Private Limited.`
- Include a clear, readable independence disclaimer, not hidden in tiny text.

---

## 5. Home Page Requirements

Build the home page in this order.

### 5.1 Hero section with enquiry search form
- Large hotel/resort image with a dark gradient overlay.
- Eyebrow: `BUSINESS | LEISURE | FAMILY | EVENTS`
- Suggested heading: **Explore Courtyard by Marriott Hotels Across India**
- Supporting copy: `Find property information and submit a stay enquiry for your preferred location.`
- Search card containing:
  1. **Select Location** — searchable combobox/dropdown listing all 29 properties
  2. **Check-in Date**
  3. **Check-out Date**
  4. **Number of Adults**
  5. Optional: **Number of Rooms** and **Children** if retained in the design
- Keep the form simple and visually prominent.
- Validate required inputs: location, check-in date, check-out date, and number of adults.
- Check-out must be after check-in. Prevent past check-in dates.
- Show inline validation and accessible error text.
- The primary button label should be **Continue to Enquiry** or **Check Availability** (use **Check Availability** if matching the supplied design).
- When the user clicks the button with valid details, navigate to `/enquiry` and pass the selected location, dates, and guest counts as query parameters or through safe shared form state.
- Do not show room-category results and do not create a property-specific results page.
- Do not navigate to any external hotel booking website.
- This is an **enquiry-only flow**. Do not claim live inventory, guaranteed availability, or real-time room availability.
- If required fields are missing or dates are invalid, show validation and stay on the home page.

### 5.2 No room-results step
Do not add a room-results page or require the visitor to select a room category. The intended flow has only these steps:
1. User selects a property/location.
2. User selects check-in and check-out dates.
3. User enters the number of adults (and optional room/child counts if included).
4. User clicks **Check Availability**.
5. Navigate directly to `/enquiry`, where the search details are shown as a summary and carried into hidden or read-only form fields.
6. User enters name, email address, and phone number, then submits.
7. After the server successfully accepts the enquiry, navigate to `/thank-you`.

Do not show room-category cards in this flow. Room categories may be removed from the search and form entirely unless the site owner explicitly requests them again.

### 5.3 Enquiry form — `/enquiry`
This is the next step after the home-page search. Keep the form focused and short.

At the top, show a heading such as **Complete Your Stay Enquiry** and a summary card containing the search details already supplied:
- Selected Location
- Check-in Date
- Check-out Date
- Number of Adults
- Number of Rooms / Children, only if those fields are included in the search

These search values must be carried forward automatically. Do not ask the visitor to type them again. Use read-only display fields or hidden validated fields as appropriate.

Required visitor fields:
- Full Name
- Email Address
- Phone Number

Optional:
- Special request / message, only if it does not make the form unnecessarily long.

Requirements:
- Client-side and server-side validation.
- Phone and email validation.
- Consent checkbox with a link to the privacy policy if appropriate.
- Clear loading, success, and failure states.
- On success, show a polished accessible success modal or popup:
  - Heading: **Thank You!**
  - Message: `Your enquiry has been submitted successfully. Our team will contact you shortly.`
  - Clearly say that submitting an enquiry is not a booking confirmation.
- The UI must not claim success until the backend confirms submission.
- If no backend is configured, implement a clearly documented development/demo handler and do not pretend an email was sent. Make the success state configurable and only activate it for a successful handler response.
- Add spam protection appropriate to the chosen backend (for example, server-side rate limiting and a honeypot field).

### 5.4 Thank-you page — `/thank-you`
After the enquiry API returns a successful response, redirect to `/thank-you`.
- Show a clear success icon and heading: **Thank You!**
- Message: `Your enquiry has been submitted successfully. Our team will contact you shortly.`
- Include a brief reminder: `This is an enquiry request, not a confirmed hotel booking.`
- Add buttons to return Home and Call Now (only if a verified phone number is configured).
- Do not show this page as a successful submission if the API failed. Keep the visitor on `/enquiry`, preserve their entered details, and display a helpful error.
- Do not put personal contact details in the URL. The URL may contain a non-sensitive enquiry reference ID if generated by the backend.

### 5.5 Call Now
- Use a configurable phone number from central site configuration.
- Render links as `tel:+91...`.
- Use `Call Now` buttons on the hero, location cards, property detail pages, contact page, and footer where appropriate.
- Never invent phone numbers. Use a placeholder configuration value until the real number is provided.
- If different properties have verified direct phone numbers, use those; otherwise use the central enquiry number and make that distinction clear.

### 5.6 Featured properties
Show a compact “Top Courtyard by Marriott Locations” section, followed by the complete directory. The featured cards may include:
- Mumbai International Airport
- Bengaluru Hebbal
- Pune Chakan
- Ahmedabad
- Chennai
- Gurugram Downtown

Verify whether each is one of the supplied property names before publishing; if a name is not in the 29-property list below, use a supplied name instead.

Each card:
- Image
- Property name
- City/state if verified
- Link to `/locations/[slug]`
- **Call Now**
- **Request Stay Details**

### 5.7 All 29 locations directory
The home page must show all 29 supplied properties, in a responsive carousel/grid with region filters if practical. Include:
- Search/filter by property name or city
- Filter chips: All, West, South, North, East (only assign a region where accurate)
- Carousel controls and accessible pagination if a carousel is used
- On small screens, cards must be touch-scrollable without breaking page width
- Each card: image, exact property name, city/state only if verified, **Request Stay Details**, and optionally **Call Now**.
- The Request button should navigate to `/enquiry` with that location preselected and ask the visitor for check-in/out dates and adults if they have not already supplied them. Prefer taking the visitor back to the home search with location preselected when dates/guest counts are missing.
- Call Now uses the configured number.
- Do not link cards to individual property detail pages.
- Do not omit any supplied location.

Use the following initial directory data exactly as supplied by the user:

1. Courtyard by Marriott Agra
2. Courtyard by Marriott Amritsar
3. Courtyard by Marriott Vadodara
4. Courtyard by Marriott Bhopal
5. Courtyard by Marriott Bengaluru Outer Ring Road
6. Courtyard by Marriott Bengaluru Hebbal
7. Courtyard by Marriott Mumbai International Airport
8. Courtyard by Marriott Navi Mumbai
9. Courtyard by Marriott Kochi Airport
10. Courtyard by Marriott Kochi Infopark
11. Courtyard by Marriott Gurugram Downtown
12. Courtyard by Marriott Gorakhpur
13. Courtyard by Marriott Goa Colva
14. Courtyard by Marriott Hyderabad
15. Courtyard by Marriott Ghaziabad India
16. Courtyard by Marriott Nashik
17. Courtyard by Marriott Siliguri
18. Courtyard by Marriott Madurai
19. Courtyard by Marriott Ranchi
20. Courtyard by Marriott Chennai
21. Courtyard by Marriott Pune Chakan
22. Courtyard by Marriott Mahabaleshwar
23. Courtyard by Marriott Pune Hinjewadi
24. Courtyard by Marriott Bilaspur
25. Courtyard by Marriott Raipur
26. Courtyard by Marriott Surat
27. Courtyard by Marriott Shillong
28. Courtyard by Marriott Tiruchirappalli
29. Courtyard by Marriott Tirupati

Store this data in a single typed data module such as `src/data/properties.ts`. Give each property a stable slug. Keep property names centralized so search, cards, detail pages, and form options use the same source of truth.

---

## 6. Property Detail Page — `/locations/[slug]`

Build a reusable template for all 29 properties.

Include:
- Breadcrumbs: Home > Locations > [Property]
- Hero image, exact property name, and a short neutral description
- **Call Now** and **Request Stay Details** CTAs
- A search / enquiry form preselected to the current property
- Room-category options
- Amenities section
- Nearby destinations section
- Dining / facilities section
- FAQs
- Independence and enquiry disclaimer

Important content accuracy rules:
- Do not invent property-specific amenities, room types, addresses, phone numbers, distances, ratings, or nearby attractions.
- Keep unverified sections configurable and either show only verified information or label it as general information to be confirmed.
- Use placeholder image mappings in data configuration, or royalty-free image sources with permission to use them.
- Do not scrape or hotlink copyrighted images without checking permission.
- If a property has no verified content beyond its name, provide a useful enquiry page without fabricated specifics.

---

## 7. Accommodation Page / Section

Match the reference’s accommodation layout:
- Heading: **Accommodation Options**
- Introductory copy about choosing a suitable room category.
- Cards for Standard Room, Deluxe Room, Executive Room, Suite, and verified Guest Room options.
- Each card includes a suitable room image, title, short description, and gold **Request Stay Details** button.
- The CTA should preserve the current property and search context.
- Do not state a room’s bed type, guest limit, executive-lounge access, or separate living area unless confirmed in the property data.

This can be a dedicated section on the home page or a separate route if useful. Keep room-category content centrally configured.

---

## 8. Activities, Amenities, Dining, and Nearby Destinations

Create attractive sections inspired by the supplied mobile reference.

### Activities / traveller types
Cards may cover:
- Business Travellers
- Family Stays
- Leisure Stays
- Events & Meetings

Use general, cautious copy. These describe possible traveller needs rather than guaranteeing every property has the facilities.

### Amenities
Possible amenity icons/labels:
- Dining
- Bar & Lounge
- Swimming Pool
- Spa & Wellness
- Fitness Centre
- Meeting & Event Spaces
- Business Centre
- Wi-Fi
- Parking
- Front Desk
- Laundry
- Airport Connectivity

Only display amenities as property-specific facts when verified. Otherwise mark them as examples of facilities to enquire about or keep them as general category content.

### Dining
Cards may include:
- All Day Dining
- Bar & Lounge
- Special Dining

Do not state a specific restaurant name, menu, service availability, opening time, or price without verified property data.

### Nearby destinations
Show a section that can be populated from verified property data. Do not make up distances or present generic destination images as accurate local attractions. Use placeholders until verified data is added.

---

## 9. About Page — `/about`

Use the supplied About page reference as visual guidance.

Sections:
1. Hero: **About GuestAssist** with supporting hotel image.
2. Short description:
   `GuestAssist is an independent hotel information and enquiry assistance platform operated by BrightSpark Leisure Services Private Limited. We help travellers explore property information and submit enquiries conveniently.`
3. Four value cards:
   - Explore Hotels
   - Simple Enquiry Process
   - Assistance
   - Wide Stay Options
4. **How Our Enquiry Assistance Works**:
   1. Search & Explore — browse properties and options.
   2. Send an Enquiry — share travel dates and preferences.
   3. Get Assistance — our team helps with available information.
   4. Make Your Own Booking Decision — verify details and book directly with the hotel or chosen provider.
5. Our Values:
   - Transparency
   - Traveller-Focused
   - Helpful Assistance
   - Simple & Convenient
6. Operator section:
   - BrightSpark Leisure Services Private Limited
   - Clearly explain it operates GuestAssist.
   - Do not invent registration numbers, office address, or company credentials.
7. FAQs.
8. Call / enquiry CTA.
9. Prominent independence disclaimer.

The supplied references use example contact details. Treat all numbers, emails, addresses, and opening hours shown in those images as mock content, not verified real information.

---

## 10. Contact Page — `/contact`

Follow the supplied desktop contact-page design:
- Hero banner with hotel interior image, title **Contact GuestAssist**, short intro, Call Us and Send an Enquiry CTAs.
- Two-column layout on desktop:
  - Left: contact form
  - Right: contact information cards
- On mobile, stack columns.
- Contact form fields:
  - Full Name (required)
  - Email Address (required)
  - Mobile Number (configurable as required or optional)
  - How can we help? (select)
  - Your Message (required)
  - Privacy consent if appropriate
- Contact information cards:
  - Call Us
  - Email Us
  - Our Office
  - Business Hours
- Use environment/config values and visible placeholders until verified contact information is provided. Do not use mock phone/email/address values from the screenshot as real contact details.
- “How We Can Help” cards:
  - Hotel Information
  - Enquiry Assistance
  - Travel Planning
  - General Support
- FAQs.
- Role & Independence notice.

---

## 11. FAQs and Independence Disclaimer

Add FAQs using accessible disclosure components.

Suggested FAQs:
- Is GuestAssist an official Marriott website?
- Does submitting an enquiry confirm a booking?
- Can GuestAssist guarantee room rates or availability?
- Does GuestAssist handle hotel payments or cancellations?
- How will my enquiry be handled?
- What details should I include in an enquiry?
- Can I enquire about more than one property?

Answers must consistently state that:
- GuestAssist is an independent information and enquiry assistance platform.
- It is operated by BrightSpark Leisure Services Private Limited.
- It is not the official website or representative of Marriott International or any hotel brand.
- Enquiries do not confirm bookings.
- Rates, facilities, availability, terms, and final bookings must be verified with the hotel or chosen booking provider.
- GuestAssist does not claim to handle payments or guarantee room availability unless the service is changed and that capability is actually implemented.

Place a concise notice near search and forms:
`This is an enquiry request, not a booking confirmation. Property details, rates, room options and availability must be verified with the hotel or relevant booking provider.`

Use a more complete disclaimer in the footer and About page. Have legal copy reviewed before production.

---

## 12. Functional Behaviour

### Search and results
- All 29 properties appear in the location selector.
- The user can type to search by name.
- Check-in/out and guest information are validated.
- Submitting a valid search updates results on the same page.
- No external page navigation is required for the core search flow.
- Results are filtered by the selected property and optional room category.
- Preserve search state while opening/closing modals and scrolling.
- Add loading/disabled states during real asynchronous requests.
- Avoid pretending to query live hotel inventory.

### Request Stay Details
- Clicking a room’s request button selects the room and fills the enquiry context.
- Clicking a property card’s request button preselects the property.
- Scroll to the enquiry form or open a modal with accessible focus management.
- Pre-filled values remain editable only if that is intentional; preserve the property and room selection unless the user changes them.
- Submit to a real configured endpoint or show a clear demo-mode notice if no backend is configured.
- Return a success state only after successful submission.

### Call Now
- Use `tel:` links and a central configurable number.
- If no number is configured, disable the CTA or show “Phone number to be confirmed” rather than a false contact.

### Carousel
- Support keyboard and touch navigation.
- Include accessible labels for Previous/Next.
- Ensure cards do not overflow the viewport.
- Add visible pagination or item position on mobile where useful.

### General
- All buttons must work.
- No dead links or placeholder `href="#"` actions.
- Use proper labels and form errors.
- Use responsive layouts at mobile, tablet, and desktop widths.
- Avoid excessive animation and respect reduced-motion settings.

---

## 13. Recommended Technical Architecture

Use a structure similar to:

```text
src/
  app/
    layout.tsx
    page.tsx
    globals.css
    enquiry/
      page.tsx
    thank-you/
      page.tsx
    about/
      page.tsx
    contact/
      page.tsx
    privacy-policy/
      page.tsx
    terms-of-service/
      page.tsx
    disclaimer/
      page.tsx
  components/
    layout/
      SiteHeader.tsx
      SiteFooter.tsx
      MobileMenu.tsx
    home/
      HeroSearch.tsx
      FeaturedProperties.tsx
      PropertyDirectory.tsx
      PropertyCard.tsx
      AmenitiesSection.tsx
      DiningSection.tsx
      NearbyDestinations.tsx
      EnquiryProcess.tsx
    forms/
      EnquiryForm.tsx
      ContactForm.tsx
    shared/
      SectionHeading.tsx
      CallNowButton.tsx
      DisclaimerNotice.tsx
      FAQAccordion.tsx
      Breadcrumbs.tsx
  data/
    properties.ts
    room-categories.ts
    faqs.ts
    site-config.ts
  lib/
    validation.ts
    enquiry-service.ts
    utils.ts
  types/
    property.ts
    enquiry.ts
public/
  images/
    hero/
    properties/
    rooms/
    amenities/
```

You may adapt the exact structure as implementation requires, but keep property and room data separate from components.

### TypeScript data model
Define a `Property` type with:
- `slug`
- `name`
- optional verified `city`
- optional verified `state`
- optional `region`
- optional `heroImage`
- optional `gallery`
- optional verified `phone`
- optional verified `amenities`
- optional verified `roomCategories`
- optional verified `nearbyDestinations`
- optional `description`
- a field or metadata flag to distinguish verified from placeholder content.

Define an `EnquiryPayload` type with:
- visitor name, phone, email
- property slug and name
- check-in/out
- adults
- optional rooms/children/child ages if included in the search
- optional message
- consent status
- source page / campaign metadata when available and appropriate.

Keep sensitive visitor details out of client logs and avoid unnecessary data collection.

---

## 14. Enquiry Backend Integration

Create a clean service abstraction such as `submitEnquiry(payload)`.

- Validate data on the server as well as the client.
- Do not expose API keys or SMTP credentials to the browser.
- Read contact/integration values from environment variables.
- Store enquiries in a database or send them to the configured CRM/email service only after integration details are supplied.
- Add rate limiting and spam protection.
- Show meaningful errors without exposing internal stack traces.
- Log only operational metadata, not full personal enquiry payloads.
- Do not pretend an email was sent or data was stored if no service is configured.

Possible environment variables (only use those actually implemented):
```env
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_ENQUIRY_PHONE=
NEXT_PUBLIC_ENQUIRY_EMAIL=
ENQUIRY_DATABASE_URL=
ENQUIRY_EMAIL_API_KEY=
```

Document any additional provider-specific variables in `.env.example`. Do not commit real credentials.

---

## 15. SEO, Performance, and Accessibility

- Use Next.js metadata for page titles and descriptions.
- Add canonical URLs when the production domain is known.
- Use meaningful alt text for images.
- Optimise images with `next/image` where suitable.
- Use responsive image sizes and lazy-load below-the-fold images.
- Avoid layout shifts by defining image aspect ratios and dimensions.
- Create sitemap and robots configuration when the production domain is known.
- Add Open Graph metadata.
- Use one logical H1 per page and properly nested headings.
- Ensure keyboard operation, visible focus states, sufficient contrast, and accessible form labels.
- Use accessible modal focus trapping and return focus to the triggering element.
- Respect reduced motion.
- Avoid claims or structured data suggesting an official hotel booking engine.

---

## 16. Testing and Acceptance Criteria

Before considering the site complete, verify:

1. All 29 locations appear in the directory and search selector.
2. Search works on mobile and desktop.
3. Missing location, invalid dates, and invalid guest counts show helpful validation.
4. Check-out cannot be before or equal to check-in.
5. Search results appear on the same page.
6. The selected property and room category are preserved in the form.
7. Search dates, room count, adults, children, and ages carry over correctly.
8. User can submit name, phone, and email after search without re-entering search data.
9. Success modal appears only after a successful server response.
10. Failed submissions show an error and retain user input.
11. Call Now uses a verified configurable phone number.
12. No fabricated phone numbers, rates, addresses, amenities, or live availability claims are displayed.
13. All navigation, FAQ disclosures, filters, carousel controls, and buttons work.
14. All pages are responsive and keyboard accessible.
15. Footer and form disclaimer clearly communicate the independent enquiry-assistance role.
16. No secret credentials are exposed to client bundles or committed.
17. `npm run lint`, type checks, and production build complete successfully.

---

## 17. Implementation Plan for Google Antigravity

Work in this order:

1. Inspect the repository and identify existing framework/configuration before changing files.
2. Set up or confirm Next.js App Router, TypeScript, and Tailwind CSS.
3. Create the visual tokens, fonts, shared header/footer, and responsive page shell.
4. Add the central property list containing all 29 exact names.
5. Build the homepage hero and location/date/guest search form.
6. Implement same-page room-category results and selected-room state.
7. Build the enquiry form with prefilled search data and success/error handling.
8. Add featured locations and the complete 29-location directory.
9. Build reusable property detail pages.
10. Build About and Contact pages.
11. Add FAQs, disclaimers, and draft legal routes.
12. Configure image assets, SEO metadata, and accessibility.
13. Test all interactions, validation, responsive states, and production build.
14. Provide a concise completion report listing implemented routes, key files, any missing credentials/data, and commands to run the site.

### Antigravity execution instruction
Implement the working website, not just a static mockup. Do not stop after producing a plan or a screenshot. Reuse existing code where appropriate, create functional interactions, run available checks, and fix build errors. If credentials or verified business data are missing, use explicit configuration placeholders and document what is needed rather than inventing information.

---

## 18. Content and Brand Safety Checklist

- Brand: **GuestAssist**
- Operator: **BrightSpark Leisure Services Private Limited**
- Service: independent hotel information and enquiry assistance
- Property directory: 29 names supplied above
- Visual style: navy + gold, premium, responsive
- Main user journey: select location → enter check-in/check-out and number of adults → click Check Availability → `/enquiry` form with search details carried forward → enter name/email/phone → submit → `/thank-you` page
- Secondary journey: browse location card → Request Stay Details or Call Now
- No separate location pages, no room-results step, no direct booking confirmation, no fabricated live inventory, and no false official affiliation
- All sample contact details from reference images are placeholders and must not be treated as real business details
