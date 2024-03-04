import { RegistrationSchema } from "@/schemas"
import { z } from "zod"

const registration = async (values: z.infer<typeof RegistrationSchema>) => {
  const result = RegistrationSchema.safeParse(values);

  if (!result.success) return { error: "Invalid fields!" };

  return { success: "Registration success!" }
}

export { registration };