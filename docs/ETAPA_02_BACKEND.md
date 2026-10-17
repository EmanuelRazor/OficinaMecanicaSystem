# Etapa 2 — Implementação do Backend

## Objetivo

Implementar a API Node.js/Express prevista no material do curso.

## Execução

Na pasta:

```text
System/Backend
```

execute:

```bash
npm start
```

O servidor deverá responder em:

```text
http://localhost:3000
```

## Rotas

### Clientes
- GET `/clientes`
- GET `/clientes/:id`
- POST `/clientes`
- PUT `/clientes/:id`
- DELETE `/clientes/:id`

### Veículos
- GET `/veiculos`
- GET `/veiculos/:id`
- POST `/veiculos`
- PUT `/veiculos/:id`
- DELETE `/veiculos/:id`

### Ordens de serviço
- GET `/ordens-servico`
- GET `/ordens-servico/:id`
- POST `/ordens-servico`
- PUT `/ordens-servico/:id`
- DELETE `/ordens-servico/:id`

Os dados são mantidos em memória nesta etapa.
