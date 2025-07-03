// Utilitário para envio de e-mails (mock)

import { Resend } from 'resend';
import { generateEmailTemplate } from './template';

const resend = new Resend(process.env.RESEND_API_KEY || '');
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'no-reply@seudominio.com';

export async function sendActivationEmail(email: string, activationToken: string) {
  const activationLink = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/auth/activate?token=${activationToken}`;
  const html = generateEmailTemplate({
    title: 'Ative sua conta',
    message: 'Clique no botão abaixo para ativar sua conta e começar a usar a plataforma.',
    ctaLabel: 'Ativar conta',
    ctaUrl: activationLink,
  });
  if (!process.env.RESEND_API_KEY) {
    // eslint-disable-next-line no-console
    console.log(`[MOCK] Enviando e-mail de ativação para ${email}: ${activationLink}`);
    return true;
  }
  await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: 'Ative sua conta',
    html,
  });
  return true;
}

export async function sendRecoveryEmail(email: string, recoveryToken: string) {
  const recoveryLink = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/reset-password?token=${recoveryToken}`;
  const html = generateEmailTemplate({
    title: 'Recuperação de senha',
    message: 'Clique no botão abaixo para redefinir sua senha de acesso.',
    ctaLabel: 'Redefinir senha',
    ctaUrl: recoveryLink,
  });
  if (!process.env.RESEND_API_KEY) {
    // eslint-disable-next-line no-console
    console.log(`[MOCK] Enviando e-mail de recuperação para ${email}: ${recoveryLink}`);
    return true;
  }
  await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: 'Recuperação de senha',
    html,
  });
  return true;
} 