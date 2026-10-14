import { NextResponse } from "next/server";
import { validateEnquiryForm } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      propertyName,
      propertySlug,
      checkIn,
      checkOut,
      adults,
      rooms,
      children,
      fullName,
      email,
      phone,
      message,
      consent,
      honeypot,
    } = body;

    // Validate inputs
    const validation = validateEnquiryForm({
      fullName,
      email,
      phone,
      consent,
      honeypot,
    });

    if (!validation.isValid) {
      return NextResponse.json(
        {
          success: false,
          message: "Please correct the validation errors.",
          errors: validation.errors,
        },
        { status: 400 }
      );
    }

    if (!propertyName || !checkIn || !checkOut) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing stay dates or location information.",
        },
        { status: 400 }
      );
    }

    // Generate unique reference code
    const randomHex = Math.random().toString(36).substring(2, 7).toUpperCase();
    const referenceId = `GA-${new Date().getFullYear()}-${randomHex}`;

    // Operational log without dumping raw sensitive customer data
    console.log(
      `[Enquiry Service] New Enquiry Received: Ref ${referenceId} for ${propertyName} (${checkIn} to ${checkOut}, ${adults} Adults, customNote: ${Boolean(
        message
      )})`
    );

    return NextResponse.json({
      success: true,
      referenceId,
      message: "Your enquiry has been submitted successfully. Our team will contact you shortly.",
      summary: {
        propertyName,
        propertySlug,
        checkIn,
        checkOut,
        adults: Number(adults) || 1,
        rooms: Number(rooms) || 1,
        children: Number(children) || 0,
      },
    });
  } catch (error) {
    console.error("[Enquiry Service Error]", error);
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred while processing your enquiry. Please try again.",
      },
      { status: 500 }
    );
  }
}
