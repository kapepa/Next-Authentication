import { UserInt } from "@/interface/user";
import { db } from "@/lib/db";

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

const updateUser = async (arg: { where: Partial<UserInt>, data: Partial<UserInt> }) => {
  try {
    const user = await db.user.update({ where: arg.where, data: arg.data });

    return user;
  } catch {
    return null;
  }
}

export { getUserByEmail, getUserByID, updateUser };