# Product Context

## Por que este projeto existe?
Empresas que contratam a plataforma precisam de uma solução centralizada para gerenciar seus próprios dados, usuários, permissões e módulos de negócio, com total isolamento e segurança entre clientes.

## Problemas que resolve
- Dificuldade de isolar dados de múltiplos clientes em sistemas tradicionais
- Necessidade de personalização de módulos por cliente
- Gestão centralizada de permissões e usuários
- Relatórios e monitoramento de uso por cliente

## Como deve funcionar
- Cada cliente acessa apenas seus próprios dados
- Admins podem gerenciar clientes, módulos e usuários via painel /admin
- Módulos são carregados dinamicamente conforme habilitação
- Middleware garante segurança e isolamento de dados

## Objetivos de Experiência do Usuário
- Interface intuitiva e responsiva (TailwindCSS)
- Facilidade para admins gerenciarem clientes e módulos
- Usuários comuns acessam apenas funcionalidades permitidas
- Feedback claro em caso de acesso negado (ex: redirecionamento para /403) 