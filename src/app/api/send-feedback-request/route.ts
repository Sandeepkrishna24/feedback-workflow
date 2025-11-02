import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { toEmail } = await request.json();

  try {
    const response = await resend.emails.send({
      from: "HR <onboarding@resend.dev>",
      to: toEmail,
      subject: "Feedback Request Link",
      html: `<p>Please fill out this feedback form: <a href="http://localhost:3000/feedback">Feedback Form</a></p>`,
    });
    console.log("Resend API response:", response);
    return NextResponse.json({ success: true, info: response });
  } catch (error) {
    console.error("Resend error:", error);
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
