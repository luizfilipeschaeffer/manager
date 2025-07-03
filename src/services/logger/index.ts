// Logger central para ações e auditoria

export type LogLevel = 'info' | 'warn' | 'error' | 'audit';

export interface LogEntry {
  timestamp: Date;
  level: LogLevel;
  action: string;
  data?: unknown;
  userId?: string;
  clienteId?: string;
}

// Mock de persistência (array em memória)
const logs: LogEntry[] = [];

export function log(level: LogLevel, action: string, data?: unknown, userId?: string, clienteId?: string) {
  const entry: LogEntry = {
    timestamp: new Date(),
    level,
    action,
    data,
    userId,
    clienteId,
  };
  logs.push(entry);
  // Futuramente: persistir no banco de dados (PostgreSQL)
  // Exemplo: await prisma.log.create({ data: entry })
  if (process.env.NODE_ENV !== 'production') {
    // Log no console para debug
    // eslint-disable-next-line no-console
    console.log(`[${entry.timestamp.toISOString()}] [${level}] [${action}]`, { userId, clienteId, data });
  }
}

export function getLogs() {
  return logs;
} 