import React from "react";
import { Metadata } from "next";
import { LocationsDirectoryView } from "@/components/locations/LocationsDirectoryView";

export const metadata: Metadata = {
  title: "All 29 Courtyard by Marriott Hotels in India | Locations Directory",
  description:
    "Explore all 29 Courtyard by Marriott hotels across India. Browse properties by region, view hotel amenities, compare room categories, and submit a stay enquiry.",
};

export default function LocationsPage() {
  return <LocationsDirectoryView />;
}
