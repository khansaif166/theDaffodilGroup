import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  email?: string;
  company?: string;
  country?: string;
  subject?: string;
  message?: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function createTransport() {
  if (
    process.env.SMTP_HOST &&
    process.env.SMTP_PORT &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS
  ) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  return nodemailer.createTransport({
    jsonTransport: true,
  });
}

export async function POST(request: Request) {
  const body = (await request.json()) as ContactPayload;
  const name = body.name?.trim();
  const email = body.email?.trim();
  const company = body.company?.trim();
  const country = body.country?.trim();
  const subject = body.subject?.trim();
  const message = body.message?.trim();

  if (!name) {
    return NextResponse.json({ error: "Please enter your full name." }, { status: 400 });
  }

  if (!email || !emailPattern.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  if (!message || message.length < 20) {
    return NextResponse.json(
      { error: "Please include a message of at least 20 characters." },
      { status: 400 },
    );
  }

  const transport = createTransport();
  const toAddress = process.env.CONTACT_TO_EMAIL ?? "hello@thedaffodilgroup.com";

  await transport.sendMail({
    to: toAddress,
    from: process.env.CONTACT_FROM_EMAIL ?? "no-reply@thedaffodilgroup.com",
    replyTo: email,
    subject: subject
      ? `${subject} - ${name}`
      : `New Daffodil inquiry from ${name}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      `Company: ${company || "Not provided"}`,
      `Country: ${country || "Not provided"}`,
      `Subject: ${subject || "Not provided"}`,
      "",
      message,
    ].join("\n"),
  });

  return NextResponse.json({ ok: true });
}
