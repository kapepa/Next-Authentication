import { RoutingEnum } from '@/enum/routing.enum';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.NEXT_PUBLIC_APP_URL;

const sendVerificationToken = async (email: string, token: string) => {
  const confirmLink: string = `${domain}${RoutingEnum.Verification}?token=${token}`

  const { data, error } = await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: [email],
    subject: 'Confirm your email.',
    html: `<p>Click <a href="${confirmLink}">here</a> to cofirm email.</p>`
  });
};

const sendPassowrdResetEmail = async (email: string, token: string) => {
  const resetLink: string = `${domain}${RoutingEnum.NewPassword}?token=${token}`

  const { data, error } = await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: [email],
    subject: 'Reset your password.',
    html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`
  });
};

const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  const { data, error } = await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: [email],
    subject: '2FA Code.',
    html: `<p>Your 2FA code: ${token}</p>`
  });
}

export { sendVerificationToken, sendPassowrdResetEmail, sendTwoFactorTokenEmail };