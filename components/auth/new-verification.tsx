"use client"

import { FC, useCallback, useEffect } from "react";
import { CardWrapper } from "./card-wrapper";
import { RoutingEnum } from "@/enum/routing.enum";
import { PuffLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";

const NewVerificationForm: FC = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    console.log(token)
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit])

  return (
    <CardWrapper
      headerLabel="Confirming your verification."
      backButtonLable="Back to login"
      backButtonHref={RoutingEnum.Login}
    >
      <div className="flex items-center w-full justify-center">
        <PuffLoader />
      </div>
    </CardWrapper>
  )
}

export { NewVerificationForm };