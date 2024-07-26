"use server";

import { ClubUserFormSchema } from "@/app/(admin)/_schema/club-user";
import sendInvitationMail from "@/lib/mail/mailer";
import { createAuthSuperClient } from "@/lib/supabase/agents/super-server";
import { ErrorStatus, SuccessStatus } from "@/types/status";
import { randomUUID } from "crypto";

export default async function createClubAdmin(data: any) {
    const result = ClubUserFormSchema.safeParse(data);
    if (!result.success) return ErrorStatus("Invalid form data", result.error.message);

    const clubUser = result.data;
    const superAuthClient = await createAuthSuperClient();
    const tempPassword = randomUUID();

    const { error } = await superAuthClient.createUser({
        email: clubUser.email,
        password: tempPassword,
        email_confirm: true,
        user_metadata: {
            club: clubUser.id,
        },
    });
    if (error) return ErrorStatus("Error creating user", error.message);

    const mailError = await sendInvitationMail(clubUser.email, tempPassword);
    if (mailError) return ErrorStatus("Error sending invitation mail", mailError);

    return SuccessStatus(null);
}
