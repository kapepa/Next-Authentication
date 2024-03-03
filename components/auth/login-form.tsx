"use client"

import { FC, useCallback } from "react";
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

const LoginForm: FC = () => {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = useCallback((values: z.infer<typeof LoginSchema>) => {
    console.log(values)
  }, [])

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
          <FormError />
          <FormSuccess />
          <Button 
            type="submit"
            className="w-full"
          >Login</Button>
        </form>
      </Form>
    </CardWrapper>
  )
}

export { LoginForm };