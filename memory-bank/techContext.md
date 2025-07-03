# Tech Context

## Tecnologias Utilizadas
- Next.js (App Router) para frontend e backend
- TypeScript para tipagem estática
- Prisma como ORM
- PostgreSQL como banco de dados relacional
- JWT para autenticação (claims customizadas: sub, cliente_id, role)
- TailwindCSS para estilização
- Zod para validação de dados
- EventEmitter (ou lib leve) para eventos

## Setup de Desenvolvimento
- Projeto monorepo (frontend/backend integrados via Next.js)
- Prisma configurado para multi-tenant (chave cliente_id)
- Ambiente de desenvolvimento com Docker recomendado para PostgreSQL
- Scripts para geração de tipos e migrações Prisma
- Estrutura modular: cada módulo em /modules possui controllers, usecases, repositories, types
- Camadas extras: logs/auditoria, eventos, notificações, métricas

## Restrições Técnicas
- Todas as tabelas devem conter cliente_id para isolamento
- Módulos só podem ser acessados se habilitados para o cliente (tabela relacional cliente_modulos)
- Middleware obrigatório para autenticação, autorização e validação de módulos
- JWT deve conter claims customizadas (sub, cliente_id, role)

## Dependências
- next, react, typescript, prisma, @prisma/client, tailwindcss, zod, jsonwebtoken, pg, eventemitter3 (ou similar) 