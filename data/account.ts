import { db } from "@/lib/db"

const getAccountByUserId = async (id: string) => {
  try {
    const account = await db.account.findFirst({ where: { id } });

    return account;
  } catch {
    return null;
  }
}

export { getAccountByUserId }