"use client"

import { UserInfo } from "@/components/user-info";
import { useCurrentUser } from "@/hooks/use-current-user";
import { NextPage } from "next";

const ClientPage: NextPage = () => {
  const user = useCurrentUser();

  return (
    <UserInfo
      user={user}
      label="Client"
    />
  )
}

export default ClientPage;