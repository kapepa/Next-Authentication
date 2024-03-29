import authConfig from "./auth.config"
import NextAuth from "next-auth"
import { apiAuthPrefix, authRoutes, publicRoutes, DEFAULT_LOGIN_REDIRECT } from "./routes";
import { RoutingEnum } from "./enum/routing.enum";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if(isApiAuthRoute) return undefined;

  if(isAuthRoute) {
    if(isLoggedIn) return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    return undefined;
  }

  if(!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if(nextUrl.search) callbackUrl += nextUrl.search;

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return Response.redirect(new URL(`${RoutingEnum.Login}?callbackUrl=${encodedCallbackUrl}`, nextUrl));
  }

  return undefined;
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}