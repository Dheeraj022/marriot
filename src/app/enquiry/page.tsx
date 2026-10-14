import React, { Suspense } from "react";
import { Metadata } from "next";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { DisclaimerNotice } from "@/components/shared/DisclaimerNotice";
import { Loader2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Complete Your Stay Enquiry | GuestAssist",
  description:
    "Review your requested Courtyard by Marriott stay details and submit your enquiry for personalized stay assistance.",
};

export default function EnquiryPage() {
  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      <SectionHeading
        eyebrow="STEP 2 OF 2 • ENQUIRY ASSISTANCE"
        title="Complete Your Stay Enquiry"
        description="Your search preferences have been carried forward. Fill in your contact information below so our dedicated stay team can verify property availability and assist you."
      />

      <Suspense
        fallback={
          <div className="flex flex-col items-center justify-center py-20 text-[#C4D1DF] space-y-3">
            <Loader2 className="w-8 h-8 animate-spin text-[#F6B936]" />
            <p className="text-sm">Loading your stay preferences...</p>
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
