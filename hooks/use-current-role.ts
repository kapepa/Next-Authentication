import { useSession } from "next-auth/react"

const useCurrentRole = () => {
  const user = useSession();

  return user.data?.user.role
}

export { useCurrentRole }