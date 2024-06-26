import { UserRole } from "@prisma/client"
import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      role: UserRole
      isTwoFactorEnabled: Boolean,
      isOAuth: Boolean
    } & DefaultSession["user"]
  }
  interface User {
    role: UserRole
    isTwoFactorEnabled: Boolean,
    isOAuth: Boolean
  }
}