"use client"

import { UserButton } from "@/components/auth/user-button";
import { Button } from "@/components/ui/button";
import { RoutingEnum } from "@/enum/routing.enum";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

const Navbar: FC = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-secondary flex justify-between items-center p-4 rounded-xl w-[600px] shadow-sm">
      <div className="flex gap-x-2">
        <Button
          asChild
          variant={ pathname === RoutingEnum.Server ? "default" : "outline" }
        >
          <Link href={RoutingEnum.Server}>Server</Link>
        </Button>
        <Button
          asChild
          variant={ pathname === RoutingEnum.Client ? "default" : "outline" }
        >
          <Link href={RoutingEnum.Client}>Client</Link>
        </Button>
        <Button
          asChild
          variant={ pathname === RoutingEnum.Admin ? "default" : "outline" }
        >
          <Link href={RoutingEnum.Admin}>Admin</Link>
        </Button>
        <Button
          asChild
          variant={ pathname === RoutingEnum.Settings ? "default" : "outline" }
        >
          <Link href={RoutingEnum.Settings}>Settings</Link>
        </Button>
      </div>
      <UserButton/>
    </nav>
  )
}

export { Navbar }