"use client"

import { useCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client"
import { FC, ReactNode } from "react"
import { FormError } from "../form-error";

interface RoleGateProps {
  children: ReactNode,
  allowedRole: UserRole,
}

const RoleGate: FC<RoleGateProps> = (props) => {
  const { children, allowedRole } = props;
  const role = useCurrentRole();

  if( role !== allowedRole ) return (
    <FormError
      message="You do not have permission to view this content!"
    />
  )

  return (
    <>
      { children }
    </>
  )
}

export { RoleGate }