import { FC, ReactNode } from "react";

interface AuthLayouProps {
  children: ReactNode,
}

const AuthLayout: FC<AuthLayouProps> = ({ children }) => {
  return (
    <div className="h-full flex items-center justify-center bg-sky-500">
      {children}
    </div>
  )
};

export default AuthLayout;