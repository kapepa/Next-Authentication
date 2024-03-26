import { createPasswordResetToken, deletePasswordResetToken, getPasswordResetTokenByEmail } from '@/data/password-reset-token';
import { createVerificationToken, deleteVerificationTokenById, getVerificationTokenByEmail } from '@/data/verification-token';
import { v4 as uuidv4 } from 'uuid';
import crypto from "crypto"
import { createTwoFactorToken, deleteTwoFactorToken, getTwoFactorTokenByEmail } from '@/data/two-factor-token';

const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_00, 1_000_000).toString();
  const expires = new Date(new Date(). getTime() + 3600 * 1000);

  const existingToken = await getTwoFactorTokenByEmail(email);
  if(!!existingToken) await deleteTwoFactorToken({ where: { id: existingToken.id } });

  const twoFactorToken = await createTwoFactorToken({ data: { email, token, expires } });

  return twoFactorToken;
}

const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getPasswordResetTokenByEmail(email);

  if(!!existingToken) await deletePasswordResetToken({ id: existingToken.id });

  const passwordResetToken = await createPasswordResetToken({ email, token, expires });

  return passwordResetToken;
}

const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingTiken = await getVerificationTokenByEmail(email);

  if(!!existingTiken) await deleteVerificationTokenById(existingTiken.id);

  const verificationToken = await createVerificationToken({ email, token, expires })

  return verificationToken;
}

export { generateVerificationToken, generatePasswordResetToken, generateTwoFactorToken };