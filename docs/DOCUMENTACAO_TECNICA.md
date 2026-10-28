# Documentação Técnica — OficinaMecanicaSystem

## 1. Visão geral

O OficinaMecanicaSystem é uma aplicação acadêmica para gerenciamento de uma oficina mecânica. O projeto é dividido em frontend mobile e backend HTTP.

O frontend foi desenvolvido com React Native, Expo e TypeScript. O backend foi desenvolvido com Node.js e Express. A comunicação entre as duas camadas é realizada por uma API REST consumida com a função nativa `fetch`.

## 2. Objetivo

O sistema permite gerenciar três grupos principais de informações:

- clientes;
- veículos;
- ordens de serviço.

Cada grupo possui operações de criação, consulta, atualização e exclusão.

## 3. Arquitetura

```text
Usuário
  |
  v
React Native / Expo
  |
  v
Telas do aplicativo
  |
  v
services/api.ts
  |
  | fetch()
  v
API REST
  |
  v
Node.js / Express
  |
  v
Dados em memória
```

A separação em camadas evita que cada tela implemente diretamente sua própria lógica HTTP.

## 4. Frontend

O frontend está localizado em:

```text
System/Frontend
```

### Arquivos e pastas principais

- `App.tsx`: configura o React Navigation e registra as telas.
- `components/`: componentes reutilizáveis da interface.
- `config/api.ts`: define o endereço base da API.
- `services/api.ts`: centraliza as requisições HTTP feitas com `fetch`.
- `telas/`: contém a tela inicial e as telas correspondentes às operações do sistema.
- `types/models.ts`: define os tipos de cliente, veículo e ordem de serviço.
- `types/navigation.ts`: define os parâmetros das rotas de navegação.
- `global.css`: carrega as diretivas utilizadas pelo NativeWind.
- `tailwind.config.js`: configura as classes processadas pelo NativeWind.

## 5. Backend

O backend está localizado em:

```text
System/Backend
```

### Arquivos principais

- `server.js`: implementa a API Express.
- `test-api.js`: executa o teste automatizado das 15 operações principais.
- `package.json`: declara dependências e comandos do backend.

O servidor utiliza:

```js
app.use(express.json());
app.use(cors());
```

`express.json()` permite interpretar o corpo JSON enviado pelo frontend. O CORS permite o acesso HTTP do frontend à API durante o desenvolvimento.

## 6. Modelo de dados

### Cliente

```text
id
nome
email
telefone
```

### Veículo

```text
id
clienteId
marca
modelo
placa
ano
```

O campo `clienteId` relaciona o veículo ao cliente proprietário.

### Ordem de serviço

```text
id
veiculoId
descricao
status
valor
```

O campo `veiculoId` relaciona a ordem ao veículo.

## 7. Relacionamentos

```text
Cliente
  |
  | id -> clienteId
  v
Veículo
  |
  | id -> veiculoId
  v
Ordem de Serviço
```

No cadastro de veículo, o backend verifica se o cliente informado existe. Caso contrário, retorna HTTP 400 com a mensagem `Cliente associado inexistente!`.

## 8. Comunicação com fetch

Todas as chamadas HTTP do frontend são centralizadas em `services/api.ts`.

Exemplo conceitual:

```text
ClientesListScreen
      |
      v
api.listarClientes()
      |
      v
request<Cliente[]>()
      |
      v
fetch(API_URL + "/clientes")
      |
      v
GET /clientes
      |
      v
Express
      |
      v
JSON retornado ao aplicativo
```

A mesma função base é reutilizada para GET, POST, PUT e DELETE.

## 9. Regras de negócio implementadas

1. O veículo deve estar associado a um cliente existente no momento do cadastro.
2. Uma nova ordem de serviço é criada com o status `Aberta`.
3. O status pode ser alterado posteriormente pela tela de edição da ordem.
4. Os dados são armazenados apenas em memória no backend.
5. Ao reiniciar o backend, os registros cadastrados são perdidos.

## 10. Códigos HTTP utilizados

- `200`: operação de consulta ou atualização realizada com sucesso.
- `201`: registro criado com sucesso.
- `204`: registro excluído com sucesso, sem conteúdo na resposta.
- `400`: requisição inválida por regra de negócio.
- `404`: registro solicitado não encontrado.

## 11. Navegação

O aplicativo usa React Navigation com Native Stack.

A tela `Inicio` funciona como menu principal e direciona para:

- clientes;
- veículos;
- ordens de serviço.

Cada módulo possui telas separadas para listagem, detalhes, cadastro, edição e exclusão, totalizando 15 telas de operação, além da tela inicial.

## 12. Armazenamento

Nesta versão acadêmica não existe banco de dados. O backend mantém os registros em arrays JavaScript durante a execução.

Essa escolha segue o escopo da etapa atual do projeto e permite demonstrar a API REST e a integração do frontend sem introduzir persistência adicional.

## 13. Limitações atuais

- os dados não persistem após reiniciar o backend;
- não existe autenticação de usuários;
- não existe controle de estoque ou peças;
- não existe geração de orçamento ou relatório;
- o backend precisa estar disponível para que as telas consultem os dados.

## 14. Melhorias futuras

Possíveis evoluções:

- banco de dados persistente;
- autenticação e perfis de usuário;
- cadastro de serviços e peças;
- controle de estoque;
- histórico de manutenção;
- relatórios;
- publicação do backend em um servidor;
- distribuição do aplicativo em versão de produção.
