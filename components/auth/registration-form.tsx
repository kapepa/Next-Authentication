"use client"

import { FC, useCallback, useState, useTransition } from "react";
import { RegistrationSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { registration } from "@/actions/registration";
import { CardWrapper } from "./card-wrapper";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { Button } from "../ui/button";
import { RoutingEnum } from "@/enum/routing.enum";

const RegistrationForm: FC = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const form = useForm<z.infer<typeof RegistrationSchema>>({
    resolver: zodResolver(RegistrationSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  })

  const onSubmit = useCallback((values: z.infer<typeof RegistrationSchema>) => {
    setError(undefined);
    setSuccess(undefined);

    startTransition(() => {
      registration(values)
        .then((data) => {
          if(!!data.error) setError(data.error);
          if(!!data.success) setSuccess(data.success)
        })
        .catch(() => {
          setError("Something went wrong!");
        })
    });
  }, []);

  return (
    <CardWrapper 
      headerLabel="Create an account"
      backButtonLable="Already have an account?"
      backButtonHref={ RoutingEnum.Login }
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
          <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      placeholder="******"
                      type="text"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormDescription>
                    This is your name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      placeholder="******"
                      type="password"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormDescription>
                    This is your password.
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
          >Create an account</Button>
        </form>
      </Form>
    </CardWrapper>
  )
}

export { RegistrationForm };