import { db } from "@/lib/db";

const getTwoFactorTokenByToken = async (token: string) => {
  try {
    const twoFactorToken = await db.towFactorToken.findUnique({ where: { token } });

    return twoFactorToken;
  } catch {
    return null;
  }
};

const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    const twoFactorToken = await db.towFactorToken.findUnique({ where: { email } });

    return twoFactorToken;
  } catch {
    return null;
  }
};

const deleteTwoFactorToken = async (arg) => {
  try {
    const deleteTwoFactor = await db.towFactorToken.delete(arg);

    return deleteTwoFactor;
  } catch {
    return null;
  }
}

export { getTwoFactorTokenByToken, getTwoFactorTokenByEmail, deleteTwoFactorToken }