import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'changeme'; // Trocar para variável segura em produção

export async function middleware(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Token ausente' }, { status: 401 });
  }

  const token = authHeader.replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { cliente_id: string; sub: string; role: string };
    if (!decoded.cliente_id) {
      return NextResponse.json({ error: 'Token sem cliente_id' }, { status: 403 });
    }
    // Injeta o cliente_id no header para uso posterior
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set('x-cliente-id', decoded.cliente_id);
    return NextResponse.next({ request: { headers: requestHeaders } });
  } catch {
    return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
  }
}

// Para usar este middleware, importar e aplicar nas rotas protegidas 