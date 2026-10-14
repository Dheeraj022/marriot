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
      roomType,
      roomTypeName,
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
    const referenceId = `CY-${new Date().getFullYear()}-${randomHex}`;

    // Operational log
    console.log(
      `[Enquiry Service] New Enquiry: Ref ${referenceId} | ${propertyName} | Room: ${roomTypeName || roomType || "Standard"} | ${checkIn} to ${checkOut} | ${adults} Adults | Guest: ${fullName} (${phone}, ${email}) | Note: ${Boolean(message)}`
    );

    return NextResponse.json({
      success: true,
      referenceId,
      message:
        "Thank you for your enquiry! We have received your details and will contact you shortly to assist with your booking.",
      summary: {
        propertyName,
        propertySlug,
        checkIn,
        checkOut,
        adults: Number(adults) || 1,
        rooms: Number(rooms) || 1,
        children: Number(children) || 0,
        roomType: roomType || "deluxe-room",
        roomTypeName: roomTypeName || "Deluxe Room",
        fullName,
        email,
        phone,
        message: message || "",
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
