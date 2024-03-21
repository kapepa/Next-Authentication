import { UserInt } from "@/interface/user";
import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";

const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } });

    return user;
  } catch {
    return null;
  }
}

const getUserByID = async (id: string) => {
  try {
    const user = await db.user.findFirst({ where: { id } });

    return user;
  } catch {
    return null;
  }
}

const updateUser = async (data: Prisma.UserDelegate<UserInt>) => {
  try {
    const user = await db.user.update();

    return user;
  } catch {
    return null;
  }
}

export { getUserByEmail, getUserByID, updateUser };