import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { sendActivationEmail } from '@/services/email';

// Mock banco de dados em memória
const users: any[] = [];

export async function POST(req: NextRequest) {
  const { nome, email, senha } = await req.json();
  if (!nome || !email || !senha) {
    return NextResponse.json({ error: 'Nome, email e senha obrigatórios' }, { status: 400 });
  }
  // Verifica se já existe usuário
  if (users.find(u => u.email === email)) {
    return NextResponse.json({ error: 'E-mail já cadastrado' }, { status: 409 });
  }
  const passwordHash = await bcrypt.hash(senha, 10);
  const activationToken = uuidv4();
  const novo = {
    id: uuidv4(),
    nome,
    email,
    passwordHash,
    ativo: false,
    activationToken,
  };
  users.push(novo);
  // Mock envio de e-mail de ativação
  await sendActivationEmail(email, activationToken);
  // TODO: integrar com Resend e template HTML
  // Exemplo: await sendActivationEmail(email, activationToken)
  return NextResponse.json({ message: 'Usuário registrado. Verifique seu e-mail para ativar a conta.' }, { status: 201 });
} 