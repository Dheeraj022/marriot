import { NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/mailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, phone, category, message } = body;

    if (!fullName || !email || !message) {
      return NextResponse.json(
        { success: false, message: "Please complete all required fields." },
        { status: 400 }
      );
    }

    // Send email notification to Hostinger inbox
    const result = await sendContactEmail({
      fullName,
      email,
      phone,
      category,
      message,
    });

    console.log(
      `[Contact API] Message from ${fullName} (${email}): ${result.success ? "Email Dispatched" : "Logged / " + result.error}`
    );

    return NextResponse.json({
      success: true,
      message: "Message received successfully. We will get back to you shortly.",
    });
  } catch (error) {
    console.error("[Contact API Error]", error);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}
