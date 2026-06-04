import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  company?: string;
  country?: string;
  message?: string;
};

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

  if (!body.name || !body.company || !body.country || !body.message) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const transport = createTransport();
  const toAddress = process.env.CONTACT_TO_EMAIL ?? "hello@daffodilgroup.com";

  await transport.sendMail({
    to: toAddress,
    from: process.env.CONTACT_FROM_EMAIL ?? "no-reply@daffodilgroup.com",
    replyTo: process.env.CONTACT_REPLY_TO_EMAIL ?? undefined,
    subject: `New Daffodil inquiry from ${body.name}`,
    text: [
      `Name: ${body.name}`,
      `Company: ${body.company}`,
      `Country: ${body.country}`,
      "",
      body.message,
    ].join("\n"),
  });

  return NextResponse.json({ ok: true });
}
