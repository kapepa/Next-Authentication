"use server"

import { findOneUser, updateOneUser } from "@/data/user"
import { currentUser } from "@/lib/auth"
import { sendVerificationToken } from "@/lib/mail"
import { generateVerificationToken } from "@/lib/tokens"
import { SettingSchema } from "@/schemas"
import { z } from "zod"
import bcrypt from "bcryptjs";
import { auth } from "@/auth"

const settings = async (value: z.infer<typeof SettingSchema>) => {
  const user = await currentUser();
  const result = SettingSchema.safeParse(value);

  if (!user) return { error: "Unauthorized" }
  if (!result.success) return { error: "Invalid user property" };

  const existtingUser = await findOneUser({ where: { id: user.id } });

  if (!existtingUser) return { error: "Unauthorized" };

  if (user.isOAuth) {
    value.email = undefined;
    value.password = undefined;
    value.newPassword = undefined;
    value.isTwoFactorEnabled = undefined;
  }

  if (value.email && value.email !== user.email) {
    const existingEmailOfUser = await  findOneUser({ where: { email: value.email } });
    if (!!existingEmailOfUser) return { error: "Email already in use!" }

    const verificationToken = await generateVerificationToken(value.email);
    if (!!verificationToken) await sendVerificationToken(verificationToken.email, verificationToken.token);

    return { success: "Verification email sent!" }
  }

  if (value.password && value.newPassword && existtingUser.password) {
    const compare = await bcrypt.compare(value.password, existtingUser.password);
    if(!compare) return { error: "Incorrect password!" };

    const hash = await bcrypt.hash(value.newPassword, 10);
    value.password = hash;
    value.newPassword = undefined;
  }
  
  await updateOneUser({ where: { id: existtingUser.id }, data: { ...value } });

  return { success: "Settings updated!" }
}

export { settings }