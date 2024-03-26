'use client'

import { logout } from "@/actions/logout";
import { useCurrentUser } from "@/hooks/use-current-user";
import { NextPage } from "next";
import { useSession } from "next-auth/react"

const SettingsPage: NextPage = () => {
  const user = useCurrentUser()
  const onClock = () => { logout() }

  return (
    <div className="bg-white p-10 rounded-xl">
      <button onClick={onClock}>Sign out</button>
    </div>
  )
}

export default SettingsPage;