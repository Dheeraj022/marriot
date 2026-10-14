import React from "react";
import { PROPERTIES } from "@/data/properties";
import { PropertyCard } from "@/components/home/PropertyCard";
import { SectionHeading } from "@/components/shared/SectionHeading";

export function FeaturedProperties() {
  const featured = PROPERTIES.filter((p) => p.isFeatured);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading
        eyebrow="PREMIER DESTINATIONS"
        title="Top Courtyard by Marriott Locations"
        description="Explore our most requested hubs across major metropolitan centers, airport gateways, and serene coastal getaways."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {featured.map((property) => (
          <PropertyCard key={property.slug} property={property} featured={true} />
        ))}
      </div>
    </section>
  );
}
