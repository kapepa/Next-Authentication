import { createVerificationToken, deleteVerificationTokenById, getVerificationTokenByEmail } from '@/data/verification-token';
import { v4 as uuidv4 } from 'uuid';

const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingTiken = await getVerificationTokenByEmail(email);

  if(!!existingTiken) await deleteVerificationTokenById(existingTiken.id);

  const verificationToken = await createVerificationToken({ email, token, expires })

  return verificationToken;
}

export { generateVerificationToken };