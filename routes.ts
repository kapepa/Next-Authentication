import { RoutingEnum } from "./enum/routing.enum";

const publicRoutes = [
  RoutingEnum.Home,
] as string[];

const authRoutes = [
  RoutingEnum.Login,
  RoutingEnum.Registration,
] as string[];

const apiAuthPrefix = "/api/auth";

const DEFAULT_LOGIN_REDIRECT = RoutingEnum.Settings as string;

export { publicRoutes, authRoutes, apiAuthPrefix, DEFAULT_LOGIN_REDIRECT };