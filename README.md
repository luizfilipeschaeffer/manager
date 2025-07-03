# Plataforma Multi-Tenant Modular

## Descrição
Plataforma web SaaS multi-tenant, escalável e modular, desenvolvida com Next.js, TypeScript, Prisma e PostgreSQL. Cada cliente (tenant) possui dados isolados, módulos ativáveis e gestão avançada de usuários, permissões e relatórios.

## Principais Características
- Estrutura multi-tenant: dados isolados por cliente_id
- Módulos dinâmicos ativáveis por cliente
- Autenticação JWT com claims customizadas (sub, cliente_id, role)
- Painel administrativo para gestão de clientes, módulos e usuários
- Camadas extras: Logs/Auditoria, Eventos, Notificações, Métricas
- Arquitetura modular e escalável

## Tecnologias Utilizadas
- Next.js (App Router)
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT (jsonwebtoken)
- TailwindCSS
- Zod
- eventemitter3 (ou similar)

## Estrutura de Pastas
```
/app/                   ← Páginas (Next.js App Router)
/modules/               ← Módulos ativáveis (cada um com seu mini back-end)
/lib/                   ← Funções utilitárias gerais
/middleware.ts          ← Controle de tenant, módulos, auth
/services/              ← Integrações externas (banco, APIs, email, etc)
/repositories/          ← Repositórios globais (se necessário)
/usecases/              ← Casos de uso globais (se necessário)
/controllers/           ← Controllers globais (se necessário)
/auth/                  ← JWT, login, helpers de sessão
/types/                 ← Tipagens globais e DTOs
/logs/                  ← Camada de logs/auditoria
/events/                ← Camada de eventos (opcional)
/notifications/         ← Notificações internas/externas
/metrics/               ← Métricas de uso
```

## Diagrama da Arquitetura

> Veja o arquivo `memory-bank/systemPatterns.md` para o diagrama visual completo em Mermaid.

## Setup Básico
1. Clone o repositório
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure o banco de dados PostgreSQL e as variáveis de ambiente
4. Rode as migrações Prisma:
   ```bash
   npx prisma migrate dev
   ```
5. Inicie o projeto:
   ```bash
   npm run dev
   ```

## Documentação
Toda a documentação de contexto, padrões e decisões está na pasta `memory-bank/`.

---

Desenvolvido por [Seu Nome]. 