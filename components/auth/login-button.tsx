"use client"

import { RoutingEnum } from "@/enum/routing.enum";
import { useRouter } from "next/navigation";
import { FC, ReactNode, useCallback } from "react"
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { LoginForm } from "./login-form";

enum ModeEnum {
  modal = "modal",
  redirect = "redirect",
}

interface LoginButtonProps {
  children: ReactNode,
  mode?: keyof typeof ModeEnum,
  asChild?: boolean,
}

const LoginButton: FC<LoginButtonProps> = (props) => {
  const { children, mode = ModeEnum.redirect } = props;
  const router = useRouter()

  const onClick = useCallback(() => {
    router.push(RoutingEnum.Login);
  }, []);

  if(mode === ModeEnum.modal) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
        <DialogContent className="p-0 w-auto bg-transparent border-none">
          <LoginForm/>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <span 
      className="cursor-pointer"
      onClick={onClick}
    >
      {children}
    </span>
  )
}

export { LoginButton }