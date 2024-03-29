"use server"

import { signIn } from "@/auth";
import { createFactorConfirmation, deleteFactorConfirmation, twoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";
import { deleteTwoFactorToken, getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { getUserByEmail } from "@/data/user";
import { sendTwoFactorTokenEmail, sendVerificationToken } from "@/lib/mail";
import { generateTwoFactorToken, generateVerificationToken } from "@/lib/tokens";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas"
import { AuthError } from "next-auth";
import { z } from "zod"

const login = async (values: z.infer<typeof LoginSchema>, callbackUrl: string | null) => {
  const result = LoginSchema.safeParse(values);

  if (!result.success) return { error: "Invalid fields!" };

  const { email, password, code } = result.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || ! existingUser.password) return { error: "Email does not exist!" };
  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(existingUser.email);

    if(!!verificationToken) await sendVerificationToken(verificationToken?.email, verificationToken?.token);

    return { success: "Confirmation email sent!" };
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

      if ( !twoFactorToken ) return { error: "Invalid code!" };
      if ( twoFactorToken.token !== code) return { error: "Invalid code!" }

      const hasExpired = new Date(twoFactorToken.expires) < new Date();
      if ( hasExpired ) return { error: "Code expired!" };

      await deleteTwoFactorToken({ where: { id: twoFactorToken.id } });

      const existingConfirmation = await twoFactorConfirmationByUserId(existingUser.id);
      if ( !!existingConfirmation ) await deleteFactorConfirmation({ where: { id: existingConfirmation.id } });

      await createFactorConfirmation({ data: { userId: existingUser.id } });

    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);

      await sendTwoFactorTokenEmail(twoFactorToken!.email, twoFactorToken!.token);
      return { twoFactor: true };
    }
  }

  try {
    await signIn("credentials", { email, password, redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT })
  } catch (err) {
    if(err instanceof AuthError) {
      switch (err.type) {
        case "CredentialsSignin": return { error: "Invalid credentials!" };
        default: return { error: "Something went wrong!" };
      }
    }

    throw err;
  }
}

export { login }