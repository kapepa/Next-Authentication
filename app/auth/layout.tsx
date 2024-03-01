import { FC, ReactNode } from "react";

interface AuthLayouProps {
  children: ReactNode,
}

const AuthLayout: FC<AuthLayouProps> = ({ children }) => {
  return (
    <div>
      Auth Layout
      {children}
    </div>
  )
};

export default AuthLayout;