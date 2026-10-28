# Estrutura do Projeto

## Estrutura recomendada

```text
OficinaMecanicaSystem/
├── .gitignore
├── README.md
├── System/
│   ├── Backend/
│   │   ├── package.json
│   │   ├── package-lock.json
│   │   ├── server.js
│   │   └── test-api.js
│   └── Frontend/
│       ├── assets/
│       ├── components/
│       ├── config/
│       │   └── api.ts
│       ├── services/
│       │   └── api.ts
│       ├── telas/
│       ├── types/
│       ├── App.tsx
│       ├── app.json
│       ├── babel.config.js
│       ├── eas.json
│       ├── global.css
│       ├── global.d.ts
│       ├── index.ts
│       ├── LICENSE
│       ├── metro.config.js
│       ├── nativewind-env.d.ts
│       ├── package.json
│       ├── package-lock.json
│       ├── tailwind.config.js
│       └── tsconfig.json
└── docs/
    ├── README.md
    ├── DOCUMENTACAO_TECNICA.md
    ├── API.md
    ├── INSTALACAO_E_EXECUCAO.md
    ├── TESTES.md
    └── ESTRUTURA_PROJETO.md
```

## Backend

### `server.js`

Arquivo principal da API. Contém Express, CORS, arrays em memória e as 15 operações de clientes, veículos e ordens de serviço.

### `test-api.js`

Teste automatizado das operações HTTP.

### `package.json` e `package-lock.json`

Definem as dependências e versões instaladas no backend.

## Frontend

### `App.tsx`

Registra as telas e configura a navegação.

### `components/`

Contém componentes reutilizados por várias telas, reduzindo repetição de interface.

### `config/api.ts`

Centraliza o endereço do backend.

### `services/api.ts`

Centraliza a comunicação HTTP por `fetch`.

### `telas/`

Contém a tela inicial e 15 telas relacionadas às operações da API.

### `types/`

Contém os modelos TypeScript e a tipagem das rotas de navegação.

### Arquivos NativeWind e Expo

Os arquivos `babel.config.js`, `metro.config.js`, `tailwind.config.js`, `global.css`, `nativewind-env.d.ts`, `app.json` e demais configurações do Expo são necessários para o ambiente atual do frontend.

### `LICENSE`

O arquivo de licença presente no frontend pertence ao template/ecossistema Expo. Ele não é arquivo temporário do projeto e deve ser preservado.

## Itens que não fazem parte da versão final

Devem ser removidos:

- pasta `Old/` com backups de correções anteriores;
- arquivos de instrução de ferramentas de desenvolvimento que não façam parte da aplicação;
- `System/Frontend/.gitignore`, pois as regras foram consolidadas no `.gitignore` da raiz;
- documentos intermediários de etapas que foram consolidados na documentação final;
- arquivos `.patch`, `.diff` ou pastas `backup-*`, caso ainda existam localmente.

## Materiais originais

Os arquivos fornecidos pelo professor devem ser preservados como referência. Eles não são resíduos e não devem ser apagados apenas por não fazerem parte do código executável.
