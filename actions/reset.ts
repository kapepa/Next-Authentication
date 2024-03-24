"use server"

import { deletePasswordResetToken, getPasswordResetTokenByEmail } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import { sendPassowrdResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";
import { ResetSchema } from "@/schemas"
import { z } from "zod"

const reset = async (values: z.infer<typeof ResetSchema>) => {
  const result = ResetSchema.safeParse(values);
  if(!result.success) return { error: "Invalid email!" };
  
  const { email } = result.data;
  const existingUser = await getUserByEmail(email);

  const existingReset = await getPasswordResetTokenByEmail(email);
  if(!!existingReset) await deletePasswordResetToken({ email });

  if(!existingUser) return { error: "Email not found!" };
  
  const resetToken = await generatePasswordResetToken(email);

  await sendPassowrdResetEmail(resetToken!.email, resetToken!.token);

  return { success: "Reset email sent!" }
};

export { reset };