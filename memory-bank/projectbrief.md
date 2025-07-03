# Project Brief

## Objetivo
Desenvolver uma plataforma web multi-tenant para gestão de clientes (tenants), usuários, permissões e módulos dinâmicos, utilizando Next.js, TypeScript, Prisma e PostgreSQL.

## Requisitos Principais
- Estrutura multi-tenant: cada cliente (empresa) é um tenant, com dados isolados por cliente_id.
- Cadastro e gestão de clientes (tenants) com painel administrativo (/admin).
- Gestão de usuários e permissões (admin, gerente, comum) com autenticação JWT.
- Módulos dinâmicos carregados conforme habilitação por cliente (ex: CRM, Financeiro, Chamados).
- Middleware para injeção e validação de cliente_id e módulos habilitados.
- Isolamento de dados em todas as tabelas por cliente_id.
- Monitoramento e relatórios de uso por cliente e módulo.

## Tecnologias
- Next.js (App Router)
- TypeScript
- Prisma (multi-tenant via chave estrangeira)
- PostgreSQL
- JWT para autenticação
- TailwindCSS para UI
- Zod para validações 