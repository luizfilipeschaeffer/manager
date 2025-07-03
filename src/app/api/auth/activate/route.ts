import { NextRequest, NextResponse } from 'next/server';

// Importar o mock de usuários do registro
import { users } from '../register/route';

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token');
  if (!token) {
    return NextResponse.json({ error: 'Token não informado' }, { status: 400 });
  }
  const user = users.find(u => u.activationToken === token);
  if (!user) {
    return NextResponse.json({ error: 'Token inválido ou usuário não encontrado' }, { status: 404 });
  }
  if (user.ativo) {
    return NextResponse.json({ message: 'Conta já ativada' });
  }
  user.ativo = true;
  user.activationToken = null;
  return NextResponse.json({ message: 'Conta ativada com sucesso!' });
} 