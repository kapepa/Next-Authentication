"use client"

import { FC, useCallback, useState, useTransition } from "react";
import { CardWrapper } from "./card-wrapper";
import { RoutingEnum } from "@/enum/routing.enum";
import { ResetSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { reset } from "@/actions/reset";

const ResetForm: FC = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = useCallback((values: z.infer<typeof ResetSchema>) => {
    setError(undefined);
    setSuccess(undefined);

    startTransition(() => {
      reset(values)
      .then(data => {
        setError(data.error)
        setSuccess(data.success)
      })
      .catch(() => {
        setError("Something went wrong!")
      })
    });
  }, []);

  return (
    <CardWrapper 
      headerLabel="Forgot your password?"
      backButtonLable="Back to login"
      backButtonHref={ RoutingEnum.Login }
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input 
                      {...field}
                      placeholder="email@example.come"  
                      type="email"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormDescription>
                    This is your email.
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
          >Send reset email</Button>
        </form>
      </Form>
    </CardWrapper>
  )
}

export { ResetForm };