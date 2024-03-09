import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "./auth.config"
import { db } from "./lib/db"
import { getUserByID } from "./data/user"
import { UserRole } from "@prisma/client"

export const { 
  handlers: { GET, POST }, 
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if(!user.id) return false;

      const existingUser = await getUserByID(user.id);
      if(!existingUser || !existingUser.emailVerified) return false;

      return true
    },
    async session({ session, user, token }) {
      console.log(user)
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
    async redirect({url, baseUrl}) {
      console.log('url', url);
      console.log('baseUrl', baseUrl);
      
      return url.startsWith(baseUrl) ? url : baseUrl + '/protected/client';
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
})