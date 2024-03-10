import { FC } from "react";
import { RoutingEnum } from "@/enum/routing.enum";
import { CardWrapper } from "./card-wrapper";
import { LuAlertTriangle } from "react-icons/lu";

const ErrorCard: FC = () => {
  return (
    <CardWrapper
      headerLabel="Oops! Something went wrong!"
      backButtonLable="Back to Login"
      backButtonHref={RoutingEnum.Login}
    >
      <div className="w-full flex justify-center items-center">
        <LuAlertTriangle className="text-destructive" size={30} />
      </div>
    </CardWrapper>
  )
}

export { ErrorCard };