"use server"

import { deletePasswordResetToken, getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail, updateUser } from "@/data/user";
import { NewPasswordSchema } from "@/schemas";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

const newPassword = async (value: z.infer<typeof NewPasswordSchema>, token: string | null) => {
  if(!token) return { error: "Missing token!" };

  const result = NewPasswordSchema.safeParse(value);
  if( !result.success ) return { error: "Invalid fields!" };

  const existingToken = await getPasswordResetTokenByToken(token);
  if( !existingToken ) return { error: "Not existing token!" };

  const hasExpired = new Date(existingToken.expires) < new Date();
  if( hasExpired ) {
    await deletePasswordResetToken( { id: existingToken.id } );
    return { error: "Token has expired!" };
  }

  const existingUser = await getUserByEmail(existingToken.email);
  if( !existingUser ) return { error: "Email does not exist!" };

  const hashedPassword = await bcrypt.hash(value.password, 10);

  await updateUser( { where: { email: existingUser.email }, data: { password: hashedPassword } } )
  await deletePasswordResetToken( { id: existingToken.id } );

  return { success: "Password updated!" };
};

export { newPassword };