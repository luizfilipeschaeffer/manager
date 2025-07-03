import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { sendActivationEmail } from '@/services/email';
import { prisma } from '@/core/prisma';

export async function POST(req: NextRequest) {
  const { nome, email, senha, clientId } = await req.json();
  if (!nome || !email || !senha || !clientId) {
    return NextResponse.json({ error: 'Nome, email, senha e clientId obrigatórios' }, { status: 400 });
  }
  // Verifica se já existe usuário
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: 'E-mail já cadastrado' }, { status: 409 });
  }
  const passwordHash = await bcrypt.hash(senha, 10);
  const activationToken = uuidv4();
  await prisma.user.create({
    data: {
      name: nome,
      email,
      password: passwordHash,
      role: 'COMUM',
      clientId,
      // Campos customizados para ativação
      ativo: false,
      activationToken,
    },
  });
  await sendActivationEmail(email, activationToken);
  return NextResponse.json({ message: 'Usuário registrado. Verifique seu e-mail para ativar a conta.' }, { status: 201 });
} 