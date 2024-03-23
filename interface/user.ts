import { Account, UserRole } from "@prisma/client";

export interface UserInt {
  id: string
  email: string
  name: string
  password: string
  emailVerified: Date
  image: string
  role: UserRole
  accounts: Account[]
}