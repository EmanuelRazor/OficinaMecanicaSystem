# OficinaMecanicaSystem

Aplicação acadêmica para gerenciamento de uma oficina mecânica.

O sistema possui um frontend mobile desenvolvido com React Native, Expo e TypeScript e um backend desenvolvido com Node.js e Express. A comunicação entre as duas camadas é realizada por uma API REST consumida com `fetch`.

## Funcionalidades

O aplicativo permite:

- cadastrar, consultar, editar e excluir clientes;
- cadastrar, consultar, editar e excluir veículos;
- vincular veículos a clientes;
- cadastrar, consultar, editar e excluir ordens de serviço;
- vincular ordens de serviço a veículos;
- controlar o status e o valor das ordens de serviço.

## Tecnologias

### Frontend

- React Native
- Expo
- TypeScript
- React Navigation
- NativeWind
- Fetch API

### Backend

- Node.js
- Express
- CORS
- Dados armazenados em memória

## Estrutura principal

```text
OficinaMecanicaSystem/
├── System/
│   ├── Backend/
│   │   ├── server.js
│   │   ├── test-api.js
│   │   └── package.json
│   └── Frontend/
│       ├── App.tsx
│       ├── components/
│       ├── config/
│       ├── services/
│       ├── telas/
│       └── types/
└── docs/
```

## API

A API utiliza a porta `3000` e possui 15 operações principais, distribuídas entre clientes, veículos e ordens de serviço.

A comunicação do frontend é centralizada em:

```text
System/Frontend/services/api.ts
```

O endereço do backend é configurado em:

```text
System/Frontend/config/api.ts
```

## Execução rápida

### Backend

```bash
cd System/Backend
npm install
npm start
```

### Frontend

```bash
cd System/Frontend
npm install
npx expo start
```

No Windows PowerShell também pode ser utilizado:

```powershell
npx.cmd expo start
```

## Teste da API

Com o backend em execução:

```bash
cd System/Backend
npm run test:api
```

O teste percorre as 15 operações documentadas da API.

## Documentação

A documentação técnica está disponível na pasta `docs/`:

- `DOCUMENTACAO_TECNICA.md`
- `API.md`
- `INSTALACAO_E_EXECUCAO.md`
- `TESTES.md`
- `ESTRUTURA_PROJETO.md`

Os arquivos originais fornecidos no curso podem ser mantidos na mesma pasta como material de referência.
