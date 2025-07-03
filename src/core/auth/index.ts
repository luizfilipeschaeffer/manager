import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'changeme'; // Trocar para variável segura em produção
const JWT_EXPIRES_IN = '1h';

export interface AuthUser {
  id: string;
  cliente_id: string;
  role: string;
  passwordHash: string;
}

// Função para gerar JWT com claims personalizadas
export function generateJWT(user: AuthUser): string {
  return jwt.sign(
    {
      sub: user.id,
      cliente_id: user.cliente_id,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
}

// Função para validar senha
export async function validatePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// Função de login (mock, sem persistência ainda)
export async function login(username: string, password: string): Promise<string | null> {
  // TODO: Buscar usuário no banco e validar senha
  // Exemplo mock:
  const mockUser: AuthUser = {
    id: '1',
    cliente_id: 'cliente123',
    role: 'admin',
    passwordHash: await bcrypt.hash('senha123', 10),
  };
  const valid = await validatePassword(password, mockUser.passwordHash);
  if (!valid) return null;
  return generateJWT(mockUser);
} 