import { cn } from "@/lib/utils";
import { FC } from "react";
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ["600"],
})
 
interface HeaderProps {
  label: string,
}

const Header: FC<HeaderProps> = (prosp) => {
  const { label } = prosp;

  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <h1 className={ cn("text-3xl font-semibold", poppins.className) }>
        Auth
      </h1>
      <p className="text-muted-foreground text-sm">
        { label }
      </p>
    </div>
  )
}

export { Header };