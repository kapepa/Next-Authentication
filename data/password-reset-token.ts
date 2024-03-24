import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";

const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const passwordToken = await db.passwordResetToken.findUnique({ where: { token } });

    return passwordToken;
  } catch {
    return null;
  }
}

const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const passwordToken = await db.passwordResetToken.findUnique({ where: { email } });

    return passwordToken;
  } catch {
    return null;
  }
}

const createPasswordResetToken = async (data: Prisma.PasswordResetTokenCreateInput) => {
  try {
    const passwordToken = await db.passwordResetToken.create({ data });

    return passwordToken;
  } catch {
    return null;
  }
}

const deletePasswordResetToken = async (arg: Prisma.PasswordResetTokenWhereUniqueInput ) => {
  try {
    const passwordToken = await db.passwordResetToken.delete({ where: arg });

    return passwordToken;
  } catch {
    return null;
  }
}

export { getPasswordResetTokenByToken, getPasswordResetTokenByEmail, deletePasswordResetToken, createPasswordResetToken };