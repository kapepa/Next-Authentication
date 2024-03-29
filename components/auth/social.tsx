"use client"

import { FC, useCallback } from "react";
import { Button } from "../ui/button";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { SocialEnum } from "@/enum/social.enum";
import { signIn } from "next-auth/react"
import { useSearchParams } from "next/navigation";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

const Social: FC = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const onClick = useCallback((social: SocialEnum) => {
    switch (social) {
      case SocialEnum.GITHUB : return signIn(SocialEnum.GITHUB, { callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT });
      case SocialEnum.GOOGLE : return signIn(SocialEnum.GOOGLE, { callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT });
    }
  }, [callbackUrl]);

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