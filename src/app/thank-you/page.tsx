import React, { Suspense } from "react";
import { Metadata } from "next";
import { ThankYouView } from "@/components/shared/ThankYouView";
import { Loader2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Enquiry Received | GuestAssist",
  description:
    "Thank you for submitting your stay enquiry. Our dedicated team will review your requirements and assist you shortly.",
};

export default function ThankYouPage() {
  return (
    <div className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <Suspense
        fallback={
          <div className="flex flex-col items-center justify-center py-20 text-[#C4D1DF] space-y-3">
            <Loader2 className="w-8 h-8 animate-spin text-[#F6B936]" />
            <p className="text-sm">Retrieving your enquiry confirmation...</p>
          </div>
        }
      >
        <ThankYouView />
      </Suspense>
    </div>
  );
}
