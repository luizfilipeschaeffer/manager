import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { sendRecoveryEmail } from '@/services/email';
// Importar o mock de usuários do registro
import { users } from '../register/route';

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  if (!email) {
    return NextResponse.json({ error: 'E-mail obrigatório' }, { status: 400 });
  }
  const user = users.find(u => u.email === email);
  if (!user) {
    // Sempre retorna sucesso para não expor existência de e-mail
    return NextResponse.json({ message: 'Se o e-mail estiver cadastrado, você receberá um link para redefinir sua senha.' });
  }
  const recoveryToken = uuidv4();
  user.recoveryToken = recoveryToken;
  user.recoveryTokenExpires = Date.now() + 1000 * 60 * 30; // 30 minutos
  await sendRecoveryEmail(email, recoveryToken);
  return NextResponse.json({ message: 'Se o e-mail estiver cadastrado, você receberá um link para redefinir sua senha.' });
} 