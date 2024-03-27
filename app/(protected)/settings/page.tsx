'use client'

import { logout } from "@/actions/logout";
import { useCurrentUser } from "@/hooks/use-current-user";
import { NextPage } from "next";

const SettingsPage: NextPage = () => {
  const user = useCurrentUser()
  const onClock = () => { logout() }

  return (
    <button onClick={onClock}>Sign out</button>
  )
}

export default SettingsPage;