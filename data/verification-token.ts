import { VerificationTokenInt } from "@/interface/verification-token";
import { db } from "@/lib/db";
import { Prisma } from "@prisma/client"

const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await db.verificationToken.findFirst({ where: { email } });

    return verificationToken;
  } catch {
    return null;
  }
}

const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await db.verificationToken.findUnique({ where: { token } });

    return verificationToken;
  } catch {
    return null;
  }
}

const deleteVerificationTokenById = async (id: string) => {
  try {
    await db.verificationToken.delete({ where: { id } })
  } catch {
    return null;
  }
}

interface Foo {
  attribute1: string;
  optional2?: string;
  excludePlease: string;
}

const createVerificationToken = async (data: Omit<VerificationTokenInt, "id">) => {
  try {
    const createToken = await db.verificationToken.create({ data });

    return createToken;
  } catch {
    return null;
  }
}

const deleteVerificationToken = async ({ where }: { where: Prisma.VerificationTokenWhereUniqueInput }) => {
  try {
    const deleteToken = await db.verificationToken.delete({ where });

    return deleteToken;
  } catch {
    return null;
  }
}


export { 
  getVerificationTokenByEmail, 
  getVerificationTokenByToken, 
  createVerificationToken, 
  deleteVerificationTokenById, 
  deleteVerificationToken,
};