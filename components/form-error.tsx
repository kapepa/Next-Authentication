"use client"

import { FC } from "react";
import { FiAlertCircle } from "react-icons/fi";

interface FormErrorProps {
  message?: string
}

const FormError: FC<FormErrorProps> = (props) => {
  const { message } = props;

  if(!message) return null;

  return (
    <div 
      className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive"
    >
      <FiAlertCircle
        className="h-6 w-6"
      />
      <p>{message}</p>
    </div>
  )
}

export { FormError };