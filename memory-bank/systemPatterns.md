# System Patterns

## Arquitetura
- Multi-tenant com separação lógica por cliente_id em todas as tabelas
- Backend e frontend integrados via Next.js (App Router)
- Prisma como ORM para acesso ao PostgreSQL
- JWT para autenticação e autorização (claims customizadas: sub, cliente_id, role)
- Middleware para injeção e validação de cliente_id, módulos habilitados e permissões
- Dynamic import para módulos conforme habilitação do cliente
- Cada módulo em /modules possui seu próprio mini back-end (controllers, usecases, repositories, types)
- Camadas extras: Logs/Auditoria, Eventos, Notificações, Métricas

## Decisões Técnicas
- Uso de chave estrangeira cliente_id para isolar dados
- Relacionamento de módulos habilitados por cliente via tabela relacional (cliente_modulos)
- Rotas protegidas por middleware de autenticação e autorização
- Painel administrativo centralizado em /admin
- Relatórios e logs de uso por cliente e módulo
- Camada de logs/auditoria para rastreabilidade
- Camada de eventos para acoplamento de ações secundárias (opcional)
- Camada de notificações para alertas internos/externos
- Camada de métricas para monitoramento de uso

## Padrões de Design
- Separation of Concerns: módulos independentes na pasta /modules, cada um com controllers, usecases, repositories, types
- Middleware para controle de acesso, injeção de contexto e validação de módulos
- Validação de dados com Zod
- UI modular e responsiva com TailwindCSS

## Relação entre Componentes
- Usuários pertencem a um cliente (cliente_id)
- Cada módulo só é acessível se habilitado para o cliente (cliente_modulos)
- Admins podem gerenciar clientes, módulos e usuários
- Todas as queries e mutations filtram por cliente_id
- Logs/auditoria registram ações relevantes por usuário/cliente
- Eventos e notificações podem ser disparados por usecases
- Métricas coletam volume de uso por módulo/cliente/usuário 