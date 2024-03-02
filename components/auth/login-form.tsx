import { FC } from "react";
import { CardWrapper } from "./card-wrapper";
import { RoutingEnum } from "@/enum/routing.enum";

const LoginForm: FC = () => {
  return (
    <CardWrapper 
      headerLabel="Welcome back"
      backButtonLable="Don't have an account?"
      backButtonHref={ RoutingEnum.Registration }
      showSocial
    >
      LoginForm
    </CardWrapper>
  )
}

export { LoginForm };