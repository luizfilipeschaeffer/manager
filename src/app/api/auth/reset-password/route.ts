import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
// Importar o mock de usuários do registro
import { users } from '../register/route';

export async function POST(req: NextRequest) {
  const { token, senha } = await req.json();
  if (!token || !senha) {
    return NextResponse.json({ error: 'Token e nova senha obrigatórios' }, { status: 400 });
  }
  const user = users.find(u => u.recoveryToken === token);
  if (!user || !user.recoveryTokenExpires || user.recoveryTokenExpires < Date.now()) {
    return NextResponse.json({ error: 'Token inválido ou expirado' }, { status: 400 });
  }
  user.passwordHash = await bcrypt.hash(senha, 10);
  user.recoveryToken = null;
  user.recoveryTokenExpires = null;
  return NextResponse.json({ message: 'Senha redefinida com sucesso!' });
} 