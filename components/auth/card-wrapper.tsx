"use client"

import { FC, ReactNode, useMemo } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Header } from "./header";
import { Social } from "./social";
import { BackButton } from "./back-button";
import { RoutingEnum } from "@/enum/routing.enum";

interface CardWrapperProps {
  children: ReactNode,
  headerLabel: string,
  backButtonLable: string,
  backButtonHref: RoutingEnum,
  showSocial?: boolean,
};

const CardWrapper: FC<CardWrapperProps> = (props) => {
  const { children, headerLabel, showSocial, backButtonHref, backButtonLable } = props;

  const header = useMemo(() => {
    return (
      <CardHeader>
        <Header label={ headerLabel } />
      </CardHeader>
    )
  }, [ headerLabel ]);

  const social = useMemo(() => {
    if(!showSocial) return null;

    return (
      <CardFooter>
        <Social/>
      </CardFooter>
    )
  }, [ showSocial ])

  return (
    <Card className="w-[400px] shadow-md">
      { header }
      <CardContent>
        {children}
      </CardContent>
      { social }
      <CardFooter>
        <BackButton
          href={backButtonHref}
          label={backButtonLable}
        />
      </CardFooter>
    </Card>
  )
}

export { CardWrapper };