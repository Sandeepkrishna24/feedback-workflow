import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { name, email, feedback } = await request.json();

  const hrEmail = process.env.HR_EMAIL || "hr@example.com";

  try {
    // Send email to HR
    await resend.emails.send({
      from: "Feedback System <onboarding@resend.dev>",
      to: hrEmail,
      subject: "New Feedback Submission",
      html: `
        <h3>New Feedback Received</h3>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Feedback:</strong><br/><pre>${feedback}</pre></li>
        </ul>
      `,
    });

    // Send thank-you email to the user
    await resend.emails.send({
      from: "Feedback Team <onboarding@resend.dev>",
      to: email,
      subject: "Thank You for Your Feedback",
      html: `
        <p>Dear ${name},</p>
        <p>Thank you for submitting your feedback! We appreciate your input.</p>
        <hr>
        <p><strong>Your Feedback:</strong></p>
        <blockquote>${feedback}</blockquote>
        <p>
          — Feedback Team
        </p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending feedback emails:", error);
    return NextResponse.json({
      success: false,
      error:
        typeof error === "object" &&
        error !== null &&
        "message" in error
          ? (error as any).message
          : String(error),
    });
  }
}
