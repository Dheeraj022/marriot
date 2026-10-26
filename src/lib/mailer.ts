import nodemailer from "nodemailer";

export interface EnquiryEmailPayload {
  referenceId: string;
  propertyName: string;
  propertySlug?: string;
  checkIn: string;
  checkOut: string;
  adults?: number | string;
  rooms?: number | string;
  children?: number | string;
  roomType?: string;
  roomTypeName?: string;
  fullName: string;
  email: string;
  phone: string;
  message?: string;
}

export interface ContactEmailPayload {
  fullName: string;
  email: string;
  phone?: string;
  category?: string;
  message: string;
}

function getTransporter() {
  const host = process.env.SMTP_HOST || "smtpout.secureserver.net";
  const port = Number(process.env.SMTP_PORT) || 465;
  const secure = process.env.SMTP_SECURE !== "false" && port === 465;
  const user = process.env.SMTP_USER || "info@guestassists.com";
  const pass = process.env.SMTP_PASSWORD || "Guestassists@123890#";

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
}

/**
 * Send an email notification for a new property stay enquiry
 */
export async function sendEnquiryEmail(payload: EnquiryEmailPayload): Promise<{ success: boolean; error?: string }> {
  const toEmail = process.env.ENQUIRY_TO_EMAIL || "info@guestassists.com";
  const fromEmail = process.env.ENQUIRY_FROM_EMAIL || "info@guestassists.com";

  const subject = `[New Stay Enquiry] ${payload.propertyName} - ${payload.fullName} (Ref: ${payload.referenceId})`;

  const textContent = `
New Stay Enquiry Received
----------------------------------------
Reference ID: ${payload.referenceId}
Property: ${payload.propertyName}
Check-in: ${payload.checkIn}
Check-out: ${payload.checkOut}
Room Category: ${payload.roomTypeName || payload.roomType || "Standard"}
Guests: ${payload.adults || 1} Adults, ${payload.children || 0} Children, ${payload.rooms || 1} Rooms

Guest Contact Information
----------------------------------------
Full Name: ${payload.fullName}
Phone: ${payload.phone}
Email: ${payload.email}
Special Requests: ${payload.message || "None specified"}

----------------------------------------
Guest Assists Enquiry Service
`.trim();

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Stay Enquiry</title>
</head>
<body style="margin: 0; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; color: #1e293b;">
  <div style="max-width: 620px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.06);">
    
    <!-- Header -->
    <div style="background-color: #03101F; padding: 24px 30px; border-bottom: 3px solid #F6B936;">
      <h1 style="margin: 0; font-size: 20px; font-weight: bold; color: #F7F8FA; letter-spacing: -0.02em;">
        Guest Assists <span style="color: #F6B936;">• New Stay Enquiry</span>
      </h1>
      <p style="margin: 6px 0 0 0; font-size: 13px; color: #94a3b8;">
        Reference Code: <strong style="color: #FFD16A;">${payload.referenceId}</strong>
      </p>
    </div>

    <!-- Main Content -->
    <div style="padding: 28px 30px;">
      
      <!-- Property & Dates Card -->
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px 20px; margin-bottom: 24px;">
        <h2 style="margin: 0 0 14px 0; font-size: 16px; color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">
          🏨 Stay Details
        </h2>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr>
            <td style="padding: 6px 0; color: #64748b; width: 140px;">Property:</td>
            <td style="padding: 6px 0; font-weight: 600; color: #0f172a;">${payload.propertyName}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #64748b;">Check-in Date:</td>
            <td style="padding: 6px 0; font-weight: 600; color: #0f172a;">${payload.checkIn}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #64748b;">Check-out Date:</td>
            <td style="padding: 6px 0; font-weight: 600; color: #0f172a;">${payload.checkOut}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #64748b;">Room Category:</td>
            <td style="padding: 6px 0; font-weight: 600; color: #b45309;">${payload.roomTypeName || payload.roomType || "Standard Room"}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #64748b;">Guests / Rooms:</td>
            <td style="padding: 6px 0; color: #0f172a;">
              ${payload.adults || 1} Adults${payload.children ? `, ${payload.children} Children` : ""}${payload.rooms ? ` • ${payload.rooms} Room(s)` : ""}
            </td>
          </tr>
        </table>
      </div>

      <!-- Guest Details Card -->
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px 20px; margin-bottom: 24px;">
        <h2 style="margin: 0 0 14px 0; font-size: 16px; color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">
          👤 Guest Contact Details
        </h2>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr>
            <td style="padding: 6px 0; color: #64748b; width: 140px;">Full Name:</td>
            <td style="padding: 6px 0; font-weight: 600; color: #0f172a;">${payload.fullName}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #64748b;">Phone Number:</td>
            <td style="padding: 6px 0;">
              <a href="tel:${payload.phone}" style="color: #0284c7; text-decoration: none; font-weight: 600;">${payload.phone}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #64748b;">Email Address:</td>
            <td style="padding: 6px 0;">
              <a href="mailto:${payload.email}" style="color: #0284c7; text-decoration: none; font-weight: 600;">${payload.email}</a>
            </td>
          </tr>
          ${
            payload.message
              ? `
          <tr>
            <td style="padding: 8px 0; color: #64748b; vertical-align: top;">Special Requests:</td>
            <td style="padding: 8px 0; color: #334155; font-style: italic; background: #ffffff; padding: 8px 12px; border-radius: 6px; border: 1px dashed #cbd5e1;">
              "${payload.message}"
            </td>
          </tr>`
              : ""
          }
        </table>
      </div>

      <!-- Quick Action Buttons -->
      <div style="text-align: center; padding-top: 10px;">
        <a href="tel:${payload.phone}" style="display: inline-block; background-color: #0f172a; color: #ffffff; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-size: 13px; font-weight: 600; margin-right: 8px;">
          📞 Call Guest
        </a>
        <a href="mailto:${payload.email}?subject=Regarding%20your%20stay%20enquiry%20at%20${encodeURIComponent(payload.propertyName)}%20(${payload.referenceId})" style="display: inline-block; background-color: #f59e0b; color: #0f172a; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-size: 13px; font-weight: 700;">
          ✉️ Reply to Email
        </a>
      </div>

    </div>

    <!-- Footer -->
    <div style="background-color: #f1f5f9; padding: 16px 30px; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; text-align: center;">
      This enquiry was submitted on the Guest Assists platform for Courtyard by Marriott properties.
    </div>

  </div>
</body>
</html>
`.trim();

  try {
    const transporter = getTransporter();
    const info = await transporter.sendMail({
      from: `"Guest Assists Reservations" <${fromEmail}>`,
      to: toEmail,
      replyTo: `${payload.fullName} <${payload.email}>`,
      subject,
      text: textContent,
      html: htmlContent,
    });

    console.log(`[Mailer] Enquiry email sent successfully: MessageId ${info.messageId}`);
    return { success: true };
  } catch (error: any) {
    console.error("[Mailer] Error dispatching enquiry email:", error?.message || error);
    return { success: false, error: error?.message || "Failed to send email" };
  }
}

/**
 * Send an email notification for a Contact Form submission
 */
export async function sendContactEmail(payload: ContactEmailPayload): Promise<{ success: boolean; error?: string }> {
  const toEmail = process.env.ENQUIRY_TO_EMAIL || "info@guestassists.com";
  const fromEmail = process.env.ENQUIRY_FROM_EMAIL || "info@guestassists.com";

  const subject = `[Contact Form Message] ${payload.category || "General"} from ${payload.fullName}`;

  const textContent = `
New Contact Message Received
----------------------------------------
From: ${payload.fullName}
Email: ${payload.email}
Phone: ${payload.phone || "Not provided"}
Category: ${payload.category || "General Inquiry"}

Message:
${payload.message}
----------------------------------------
Guest Assists Contact Service
`.trim();

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Contact Message</title>
</head>
<body style="margin: 0; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; color: #1e293b;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.06);">
    <div style="background-color: #03101F; padding: 20px 28px; border-bottom: 3px solid #F6B936;">
      <h1 style="margin: 0; font-size: 18px; font-weight: bold; color: #F7F8FA;">
        Guest Assists • Contact Form Message
      </h1>
      <p style="margin: 4px 0 0 0; font-size: 12px; color: #94a3b8;">
        Category: <strong style="color: #FFD16A;">${payload.category || "General"}</strong>
      </p>
    </div>
    <div style="padding: 24px 28px;">
      <p style="font-size: 14px; margin: 0 0 8px 0;"><strong>Sender:</strong> ${payload.fullName}</p>
      <p style="font-size: 14px; margin: 0 0 8px 0;"><strong>Email:</strong> <a href="mailto:${payload.email}">${payload.email}</a></p>
      ${payload.phone ? `<p style="font-size: 14px; margin: 0 0 8px 0;"><strong>Phone:</strong> <a href="tel:${payload.phone}">${payload.phone}</a></p>` : ""}
      <div style="margin-top: 16px; padding: 14px 18px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px;">
        <strong style="display: block; font-size: 13px; color: #64748b; margin-bottom: 6px;">Message:</strong>
        <p style="margin: 0; font-size: 14px; color: #1e293b; line-height: 1.6; white-space: pre-wrap;">${payload.message}</p>
      </div>
    </div>
    <div style="background-color: #f1f5f9; padding: 14px 28px; font-size: 12px; color: #64748b; text-align: center;">
      Submitted via Guest Assists website contact form.
    </div>
  </div>
</body>
</html>
`.trim();

  try {
    const transporter = getTransporter();
    const info = await transporter.sendMail({
      from: `"Guest Assists Contact" <${fromEmail}>`,
      to: toEmail,
      replyTo: `${payload.fullName} <${payload.email}>`,
      subject,
      text: textContent,
      html: htmlContent,
    });

    console.log(`[Mailer] Contact message email sent successfully: MessageId ${info.messageId}`);
    return { success: true };
  } catch (error: any) {
    console.error("[Mailer] Error dispatching contact email:", error?.message || error);
    return { success: false, error: error?.message || "Failed to send email" };
  }
}
