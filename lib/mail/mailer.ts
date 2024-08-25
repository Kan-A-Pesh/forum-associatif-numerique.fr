"use server";

import { readFile } from "fs/promises";
import { createTransport } from "nodemailer";
import { z } from "zod";
import { getPublicUrl } from "../supabase/wrappers/bucket";

export default async function sendInvitationMail(to: string, tempPassword: string) {
    const zReceiver = z.string().email().safeParse(to);
    if (!zReceiver.success) return "Invalid email address";

    // send mail
    const transporter = createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT ?? "587"),
        secure: true,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    let mailTemplate = await readFile(process.env.MAIL_TEMPLATE_PATH ?? "./mail/invite.html", "utf8");
    if (!mailTemplate) return "Mail template not found";

    const link = `${process.env.NEXT_PUBLIC_URL}/signup?email=${to}&token=${tempPassword}`;

    console.log("Sending invitation mail to", to);
    console.log("Link:", link);

    mailTemplate = mailTemplate.replaceAll("{{SUPPORT_MAIL}}", process.env.NEXT_PUBLIC_SUPPORT_MAIL ?? "[!!SUPPORT_MAIL]");
    mailTemplate = mailTemplate.replaceAll("{{LINK}}", link);
    mailTemplate = mailTemplate.replaceAll("{{HEADER_IMAGE}}", (await getPublicUrl("hero.jpg", "assets")) ?? "[!!HEADER_IMAGE]");

    let subject = undefined;

    for (const line of mailTemplate.split(/\r?\n/)) {
        if (line.startsWith("Subject:")) {
            subject = line.replace("Subject:", "").trim();
        }

        if (subject) break;
    }

    const info = await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to,
        subject: subject ?? "[!!SUBJECT]",
        html: mailTemplate,
    });

    return info.accepted.length > 0 && info.rejected.length === 0 ? null : "Mail could not be sent";
}
