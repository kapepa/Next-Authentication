import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";

const getTwoFactorTokenByToken = async (token: string) => {
  try {
    const twoFactorToken = await db.twoFactorToken.findUnique({ where: { token } });

    return twoFactorToken;
  } catch {
    return null;
  }
};

const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    const twoFactorToken = await db.twoFactorToken.findUnique({ where: { email } });

    return twoFactorToken;
  } catch {
    return null;
  }
};

const deleteTwoFactorToken = async (arg: Prisma.TwoFactorTokenDeleteArgs) => {
  try {
    const deleteTwoFactor = await db.twoFactorToken.delete(arg);

    return deleteTwoFactor;
  } catch {
    return null;
  }
}

const createTwoFactorToken = async (arg: Prisma.TwoFactorTokenCreateArgs) => {
  try {
    const createTwoFactor = await db.twoFactorToken.create(arg);

    return createTwoFactor;
  } catch { 
    return null;
  }
}

export { getTwoFactorTokenByToken, getTwoFactorTokenByEmail, deleteTwoFactorToken, createTwoFactorToken }