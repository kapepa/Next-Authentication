"use client"

import { FC, useCallback } from "react";
import { Button } from "../ui/button";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { SocialEnum } from "@/enum/social.enum";
import { signIn } from "next-auth/react"

const Social: FC = () => {
  const onClick = useCallback((social: SocialEnum) => {
    signIn("github", { callbackUrl: "/settings" })
    // signIn("google", { callbackUrl: "/settings" })
    // switch (social) {
    //   case SocialEnum.GITHUB : return signIn(SocialEnum.GITHUB);
    //   case SocialEnum.GOOGLE : return signIn(SocialEnum.GOOGLE);
    // }
  }, []);

  return (
    <div className="flex items-center w-full gap-x-2">
      <Button 
        size="lg"
        className="w-full"
        variant="outline"
        onClick={onClick.bind(null, SocialEnum.GOOGLE)}
      >
        <FaGoogle className="h-5 w-5" />
      </Button>
      <Button 
        size="lg"
        className="w-full"
        variant="outline"
        onClick={onClick.bind(null, SocialEnum.GITHUB)}
      >
        <FaGithub className="h-5 w-5" />
      </Button>
    </div>
  )
};

export { Social };