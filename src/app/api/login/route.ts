import { NextRequest, NextResponse } from 'next/server';
import { login } from '@/core/auth';

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();
  if (!username || !password) {
    return NextResponse.json({ error: 'Usuário e senha obrigatórios' }, { status: 400 });
  }
  const token = await login(username, password);
  if (!token) {
    return NextResponse.json({ error: 'Credenciais inválidas' }, { status: 401 });
  }
  return NextResponse.json({ token });
} 