import { auth } from "@/auth"

const currentUser = async () => {
  const current = await auth();
  
  return current?.user;
}

export { currentUser }