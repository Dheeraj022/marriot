import React, { Suspense } from "react";
import { Metadata } from "next";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { DisclaimerNotice } from "@/components/shared/DisclaimerNotice";
import { Loader2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Check Availability & Reserve Your Stay | Courtyard by Marriott",
  description:
    "Check live room availability, select your preferred room type, and submit your booking enquiry across 29 Courtyard by Marriott hotels in India.",
};

export default function EnquiryPage() {
  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      <SectionHeading
        eyebrow="RESERVATION ENQUIRY"
        title="Check Availability & Select Your Room"
        description="Select your dates and destination, explore available room categories across 29 Courtyard by Marriott properties, and submit your details for prompt booking assistance."
      />

      <Suspense
        fallback={
          <div className="flex flex-col items-center justify-center py-20 text-[#C4D1DF] space-y-3">
            <Loader2 className="w-8 h-8 animate-spin text-[#F6B936]" />
            <p className="text-sm">Loading stay availability...</p>
          </div>
        }
      >
        <EnquiryForm />
      </Suspense>

      <div className="max-w-4xl mx-auto pt-6">
        <DisclaimerNotice variant="card" />
      </div>
    </div>
  );
}
