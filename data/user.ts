import { db } from "@/lib/db";
import { Prisma } from "@prisma/client"

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

const updateUser = async ( { where, data }:{ where: Prisma.UserWhereUniqueInput, data: Prisma.UserUpdateInput } ) => {
  try {
    const user = await db.user.update( { where, data } );

    return user;
  } catch {
    return null;
  }
}

const findOneUser = async (arg: Prisma.UserFindFirstArgs) => {
  try {
    const user = await db.user.findFirst(arg);

    return user;
  } catch {
    return null;
  }
}

const updateOneUser = async (arg: Prisma.UserUpdateArgs) => {
  try {
    const user = await db.user.update(arg);

    return user;
  } catch {
    return null;
  }
}

export { getUserByEmail, getUserByID, updateUser, findOneUser, updateOneUser };