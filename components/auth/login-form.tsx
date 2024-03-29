"use client"

import { FC, useCallback, useState, useTransition } from "react";
import { CardWrapper } from "./card-wrapper";
import { RoutingEnum } from "@/enum/routing.enum";
import { LoginSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { login } from "@/actions/login";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const LoginForm: FC = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const urlError = searchParams.get("error") === "OAuthAccountNotLinked" ? "Email already is use with different provider!" : "";

  const [showTwoFactor, setShowTwoFactor] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = useCallback((values: z.infer<typeof LoginSchema>) => {
    setError(undefined);
    setSuccess(undefined);

    startTransition(() => {
      login(values, callbackUrl)
        .then((data) => {
          if (!!data?.error) {
            form.reset();
            setError(data.error);
          }
          if (!!data?.success) {
            form.reset();
            setSuccess(data.success);
          }
          if (data?.twoFactor) {
            setShowTwoFactor(true);
          }
        })
        .catch(() => {
          setError("Something went wrong!");
        })
    });

  }, [callbackUrl, form]);

  return (
    <CardWrapper 
      headerLabel="Welcome back"
      backButtonLable="Don't have an account?"
      backButtonHref={ RoutingEnum.Registration }
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            { 
              !showTwoFactor && 
              <>
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
              </> 
            }
            {
              showTwoFactor && 
              <>
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input 
                          {...field}
                          placeholder="123456"  
                          type="text"
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
              </>
            }
          </div>
          <FormError message={ error || urlError } />
          <FormSuccess message={ success }/>
          <Button 
            size="sm"
            variant="link"
            asChild
            className="px-0 font-normal"
          >
            <Link href={RoutingEnum.Reset} >Forgot password</Link>
          </Button>
          <Button 
            type="submit"
            className="w-full"
            disabled={isPending}
          >{ showTwoFactor ? "Confirm" : "Login" }</Button>
        </form>
      </Form>
    </CardWrapper>
  )
}

export { LoginForm };