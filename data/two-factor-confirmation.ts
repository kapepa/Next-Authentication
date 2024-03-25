import { db } from "@/lib/db";

const twoFactorConfirmationByUserId = async (userId: string) => {
  try {
    const twoFactorConfirmation = await db.towFactorConfirmation.findUnique({ where: { userId } });

    return twoFactorConfirmation
  } catch {
    return null;
  }
};


export { twoFactorConfirmationByUserId }