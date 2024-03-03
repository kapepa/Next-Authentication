"use client"

import { FC } from "react";
import { FaRegCheckCircle } from "react-icons/fa";

interface FormSuccessProps {
  message?: string
}

const FormSuccess: FC<FormSuccessProps> = (props) => {
  const { message } = props;

  if(!message) return null;

  return (
    <div 
      className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500"
    >
      <FaRegCheckCircle
        className="h-5 w-5"
      />
      <p>{message}</p>
    </div>
  )
}

export { FormSuccess };