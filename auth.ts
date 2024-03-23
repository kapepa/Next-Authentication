import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "./auth.config"
import { db } from "./lib/db"
import { getUserByID } from "./data/user"
import { UserRole } from "@prisma/client"
import { RoutingEnum } from "./enum/routing.enum"

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

      return true;
    },
    async session({ session, user, token }) {
      if(!!token.sub && !!session.user) session.user.id = token.sub;
      if(!!token.role && !!session.user) session.user.role = token.role as UserRole;

      return session;
    },
    async jwt({ token }) {
      if(!token.sub) return token;
      const existingUser = await getUserByID(token.sub);

      if(!existingUser) return token;

      token.role = existingUser.role;
      
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