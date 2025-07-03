import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/core/prisma';

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
  // Busca todos os clientes e módulos habilitados
  const clients = await prisma.client.findMany({
    include: {
      modules: {
        include: {
          module: true,
        },
      },
    },
  });
  // Formata resposta para incluir lista de módulos
  const result = clients.map(c => ({
    id: c.id,
    nome: c.name,
    email: c.email,
    modulos: c.modules.map(m => m.module.name),
  }));
  return NextResponse.json(result);
}

export async function POST(req: NextRequest) {
  if (!requireAuth(req)) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }
  const { nome, email, modulos } = await req.json();
  if (!nome || !email) {
    return NextResponse.json({ error: 'Nome e email obrigatórios' }, { status: 400 });
  }
  // Cria cliente
  const client = await prisma.client.create({
    data: {
      name: nome,
      email,
      modules: {
        create: (modulos || []).map((moduloName: string) => ({
          module: {
            connectOrCreate: {
              where: { name: moduloName },
              create: { name: moduloName },
            },
          },
        })),
      },
    },
    include: {
      modules: {
        include: { module: true },
      },
    },
  });
  return NextResponse.json({
    id: client.id,
    nome: client.name,
    email: client.email,
    modulos: client.modules.map(m => m.module.name),
  }, { status: 201 });
}

export async function PUT(req: NextRequest) {
  return NextResponse.json({ error: 'Não implementado com Prisma ainda' }, { status: 501 });
}

export async function DELETE(req: NextRequest) {
  return NextResponse.json({ error: 'Não implementado com Prisma ainda' }, { status: 501 });
} 