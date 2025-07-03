import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

// Mock banco de dados em memória
const clients: { id: string; nome: string; modulos: string[] }[] = [];

// Middleware simples para simular proteção JWT (substituir pelo middleware real depois)
function requireAuth(req: NextRequest) {
  const auth = req.headers.get('authorization');
  if (!auth || !auth.startsWith('Bearer ')) {
    return false;
  }
  // Não valida token de verdade aqui (mock)
  return true;
}

export async function GET(req: NextRequest) {
  if (!requireAuth(req)) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }
  return NextResponse.json(clients);
}

export async function POST(req: NextRequest) {
  if (!requireAuth(req)) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }
  const { nome, modulos } = await req.json();
  if (!nome) {
    return NextResponse.json({ error: 'Nome obrigatório' }, { status: 400 });
  }
  const novo = { id: uuidv4(), nome, modulos: modulos || [] };
  clients.push(novo);
  return NextResponse.json(novo, { status: 201 });
}

export async function PUT(req: NextRequest) {
  if (!requireAuth(req)) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }
  const { id, nome, modulos } = await req.json();
  const idx = clients.findIndex(c => c.id === id);
  if (idx === -1) {
    return NextResponse.json({ error: 'Cliente não encontrado' }, { status: 404 });
  }
  clients[idx] = { ...clients[idx], nome: nome || clients[idx].nome, modulos: modulos || clients[idx].modulos };
  return NextResponse.json(clients[idx]);
}

export async function DELETE(req: NextRequest) {
  if (!requireAuth(req)) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }
  const { id } = await req.json();
  const idx = clients.findIndex(c => c.id === id);
  if (idx === -1) {
    return NextResponse.json({ error: 'Cliente não encontrado' }, { status: 404 });
  }
  const excluido = clients.splice(idx, 1)[0];
  return NextResponse.json(excluido);
} 