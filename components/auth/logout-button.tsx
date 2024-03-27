"use client"

import { FC, useCallback } from "react";
import { logout } from "@/actions/logout";

interface LogoutButtonProps {
  children: React.ReactNode,
}

const LogoutButton: FC<LogoutButtonProps> = ({ children }) => {
  const onLogout = useCallback(() => {
    logout();
  }, [])

  return (
    <span
      onClick={onLogout}
      className="cursor-pointer"
    >
      { children }
    </span>
  )
}

export { LogoutButton };