import { RoutingEnum } from '@/enum/routing.enum';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const sendVerificationToken = async (email: string, token: string) => {
  const confirmLink: string = `${process.env.NEXT_PUBLIC_APP_URL}/${RoutingEnum.Verification}?token=${token}`

  const { data, error } = await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: [email],
    subject: 'Confirm your email.',
    html: `<p>Click <a href="${confirmLink}">here</a> to cofirm email.</p>`
  });
};

export { sendVerificationToken };