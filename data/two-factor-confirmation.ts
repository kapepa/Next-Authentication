import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";

const twoFactorConfirmationByUserId = async (userId: string) => {
  try {
    const twoFactorConfirmation = await db.twoFactorConfirmation.findUnique({ where: { userId } });

    return twoFactorConfirmation
  } catch {
    return null;
  }
};

const deleteFactorConfirmation = async (arg: Prisma.TwoFactorConfirmationDeleteArgs) => {
  try {
    const twoFactorConfirmation = await db.twoFactorConfirmation.delete(arg);

    return twoFactorConfirmation
  } catch {
    return null;
  }
};

const createFactorConfirmation = async (arg: Prisma.TwoFactorConfirmationCreateArgs) => {
  try {
    const twoFactorConfirmation = await db.twoFactorConfirmation.create(arg);

    return twoFactorConfirmation
  } catch {
    return null;
  }
};

export { twoFactorConfirmationByUserId, deleteFactorConfirmation, createFactorConfirmation }