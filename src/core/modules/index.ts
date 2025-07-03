// Estrutura inicial do Gerenciador de Módulos

export interface Module {
  id: string;
  name: string;
  enabled: boolean;
  // Outras propriedades específicas do módulo
}

// Registro de módulos disponíveis na plataforma
const registeredModules: Record<string, Module> = {};

export function registerModule(module: Module) {
  registeredModules[module.id] = module;
}

export function getRegisteredModules(): Module[] {
  return Object.values(registeredModules);
}

// Função para verificar se um módulo está habilitado para um cliente específico
// (Integração real com Prisma/tabela cliente_modulos será feita após setup do ORM)
// O parâmetro _clienteId será utilizado na integração futura com o banco de dados (Prisma)
export async function isModuleEnabledForClient(moduleId: string, _clienteId: string): Promise<boolean> {
  void _clienteId; // evitar erro de variável não utilizada, uso futuro
  // TODO: Integrar com Prisma e tabela cliente_modulos
  // Exemplo:
  // const result = await prisma.cliente_modulos.findFirst({ where: { moduleId, clienteId, enabled: true } });
  // return !!result;
  return registeredModules[moduleId]?.enabled ?? false;
}

// Exemplo de uso:
// registerModule({ id: 'crm', name: 'CRM', enabled: true });
// const enabled = await isModuleEnabledForClient('crm', 'cliente123'); 