import { FC, ReactNode } from "react";
import { Navbar } from "./__components/navbar";


interface ProtectedLayoutProps {
  children: ReactNode,
}

const ProtectedLayout: FC<ProtectedLayoutProps> = ({ children }) => {
  return (
    <div className="h-full w-full flex flex-col gap-y-10 items-center justify-center bg-sky-500">
      <Navbar/>
      <div className="bg-white p-10 rounded-xl">
        {children}
      </div>
    </div>
  )
}

export default ProtectedLayout;