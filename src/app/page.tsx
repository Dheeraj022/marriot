import React from "react";
import { Metadata } from "next";
import { HeroSearch } from "@/components/home/HeroSearch";
import { FeaturedProperties } from "@/components/home/FeaturedProperties";
import { PropertyDirectory } from "@/components/home/PropertyDirectory";
import { AccommodationSection } from "@/components/home/AccommodationSection";
import { AmenitiesSection } from "@/components/home/AmenitiesSection";
import { NearbyDestinations } from "@/components/home/NearbyDestinations";
import { ActivitiesSection } from "@/components/home/ActivitiesSection";
import { DiningSection } from "@/components/home/DiningSection";
import { EnquiryProcess } from "@/components/home/EnquiryProcess";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FAQAccordion } from "@/components/shared/FAQAccordion";
import { DisclaimerNotice } from "@/components/shared/DisclaimerNotice";
import { FAQS } from "@/data/faqs";

export const metadata: Metadata = {
  title: "Courtyard by Marriott | Explore 29 Hotels Across India",
  description:
    "Explore 29 Courtyard by Marriott hotels across India. Check room categories, hotel amenities, and submit an enquiry for personalized stay assistance.",
};

export default function HomePage() {
  return (
    <div className="space-y-6">
      {/* 1. Hero & Central Search */}
      <HeroSearch />

      {/* 2. Top Featured Properties */}
      <FeaturedProperties />

      {/* 3. Comprehensive 29-Property Directory & Carousel with Region Filters */}
      <PropertyDirectory />

      {/* 4. Accommodation Categories */}
      <AccommodationSection />

      {/* 5. Activities & Traveller Types */}
      <ActivitiesSection />

      {/* 6. Signature Amenities */}
      <AmenitiesSection />

      {/* 7. Nearby Destinations */}
      <NearbyDestinations />

      {/* 8. Dining & Culinary Concepts */}
      <DiningSection />

      {/* 8. 4-Step Transparent Enquiry Process */}
      <EnquiryProcess />

      {/* 9. FAQs Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="FREQUENTLY ASKED QUESTIONS"
          title="Stay Enquiry & Reservation FAQs"
          description="Clear answers regarding room options, stay enquiries, booking procedures, and property details."
        />
        <FAQAccordion items={FAQS} />
      </section>

      {/* 10. Stay Notice */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <DisclaimerNotice variant="card" />
      </div>
    </div>
  );
}
