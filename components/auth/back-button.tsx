"use client"

import { FC } from "react";
import { Button } from "../ui/button";
import { RoutingEnum } from "@/enum/routing.enum";
import Link from "next/link";

interface BackButtonProps {
  href: RoutingEnum,
  label: string,
}

const BackButton: FC<BackButtonProps> = ( props ) => {
  const { href, label } = props;

  return (
    <Button
      variant="link"
      className="font-normal w-full"
      size="sm"
       asChild
    >
      <Link  href={href}>{label}</Link>
    </Button>
  )
}

export { BackButton };