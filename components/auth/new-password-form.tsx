"use client"

import { FC, useCallback, useState, useTransition } from "react";
import { CardWrapper } from "./card-wrapper";
import { RoutingEnum } from "@/enum/routing.enum";
import { NewPasswordSchema, ResetSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { useSearchParams } from "next/navigation";
import { newPassword } from "@/actions/new-password";

const NewPasswordForm: FC = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = useCallback((values: z.infer<typeof NewPasswordSchema>) => {
    setError(undefined);
    setSuccess(undefined);

    startTransition(() => {
      newPassword(values, token)
      .then(data => {
        setError(data.error)
        setSuccess(data.success)
      })
      .catch(() => {
        setError("Something went wrong!")
      })
    });
  }, [token]);

  return (
    <CardWrapper 
      headerLabel="Enter a new password"
      backButtonLable="Back to login"
      backButtonHref={ RoutingEnum.Login }
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New password</FormLabel>
                  <FormControl>
                    <Input 
                      {...field}
                      placeholder="******"  
                      type="password"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormDescription>
                    This is your new password.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={ error } />
          <FormSuccess message={ success }/>
          <Button 
            type="submit"
            className="w-full"
            disabled={isPending}
          >Reset password</Button>
        </form>
      </Form>
    </CardWrapper>
  )
}

export { NewPasswordForm };