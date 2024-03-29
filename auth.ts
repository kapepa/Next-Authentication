import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "./auth.config"
import { db } from "./lib/db"
import { getUserByID } from "./data/user"
import { UserRole } from "@prisma/client"
import { RoutingEnum } from "./enum/routing.enum"
import { deleteFactorConfirmation, twoFactorConfirmationByUserId } from "./data/two-factor-confirmation"
import { getAccountByUserId } from "./data/account"

export const { 
  handlers: { GET, POST }, 
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: RoutingEnum.Login,
    error: RoutingEnum.Error,
  },
  events: {
    async linkAccount ({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() }
      })
    }
  },
  callbacks: {
    async signIn({ user, account }) {
      if(account && account.provider !== "credentials") return true;
      if(!user.id) return false;

      const existingUser = await getUserByID(user.id);
      if(!existingUser || !existingUser.emailVerified) return false;

      if(existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await twoFactorConfirmationByUserId(existingUser.id);

        if(!twoFactorConfirmation) return false;

        await deleteFactorConfirmation({ where: { id: twoFactorConfirmation.id } })
      };

      return true;
    },
    async session({ session, user, token }) {
      if(!!token.sub && !!session.user) session.user.id = token.sub;
      if(!!token.role && !!session.user) session.user.role = token.role as UserRole;
      if(!!session.user) session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
      if(!!session.user && token.name && token.email){
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.isOAuth = token.isOAuth as boolean;
      }

      return session;
    },
    async jwt({ token }) {
      if(!token.sub) return token;
      const existingUser = await getUserByID(token.sub);

      if(!existingUser) return token;

      const existingAccount = await getAccountByUserId(existingUser.id);

      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;
      token.isOAuth = !!existingAccount;
      
      return token;
    },
    // async redirect({url, baseUrl}) {
    //   return url.startsWith(baseUrl) ? url : baseUrl + '/protected/client';
    // }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
})