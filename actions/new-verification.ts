"use server"

import { getUserByEmail, updateUser } from "@/data/user";
import { deleteVerificationToken, getVerificationTokenByToken } from "@/data/verification-token";

const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) return { error: "Token does not exist!" };

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) return { error: "Toke has expired!" };

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) return { error: "Email does not exist!" };

  await updateUser({
    where: { id: existingUser.id },
    data: { 
      emailVerified: new Date(),
      email: existingToken.email,
    }
  });

  await deleteVerificationToken( { where: { id: existingToken.id } } );

  return { success: "Email verified!" };
};

export { newVerification };