"use client"

import { FC, useCallback, useLayoutEffect, useMemo, useState, useTransition } from "react";
import { CardWrapper } from "./card-wrapper";
import { RoutingEnum } from "@/enum/routing.enum";
import { PuffLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { newVerification } from "@/actions/new-verification";
import { FormSuccess } from "../form-success";
import { FormError } from "../form-error";

const NewVerificationForm: FC = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if(!token) return setError("Missing token!");

    startTransition(() => {
      newVerification(token)
      .then(data => {
        setSuccess(data.success);
        setError(data.error)
      })
      .catch(() => setError("Something went wrong!"));
    })

  }, [token]);

  const isSuccess = useMemo(() => {
    if(!success) return null;

    return <FormSuccess message={success} />
  }, [success]);

  const isError = useMemo(() => {
    if(!error) return null;

    return <FormError message={error} />
  }, [error])

  const isLoader = useMemo(() => {
    if(isPending || !!error || !!success) return null;
    return <PuffLoader />
  }, [isPending, error, success]);

  useLayoutEffect(() => {
    onSubmit();
  }, [onSubmit])

  return (
    <CardWrapper
      headerLabel="Confirming your verification."
      backButtonLable="Back to login"
      backButtonHref={RoutingEnum.Login}
    >
      <div className="flex items-center w-full justify-center">
        { isLoader }
        { isSuccess }
        { isError }
      </div>
    </CardWrapper>
  )
}

export { NewVerificationForm };