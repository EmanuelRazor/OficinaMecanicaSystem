# Etapas 3 a 6 — Implementação proposta

Este pacote complementa o estado atual do projeto com base no roadmap existente.

## Etapa 3 — Teste das 15 rotas

Foi adicionado `System/Backend/test-api.js` e o script `npm run test:api`.

O teste percorre as 15 operações documentadas:

### Clientes
1. POST `/clientes`
2. GET `/clientes`
3. GET `/clientes/:id`
4. PUT `/clientes/:id`
5. DELETE `/clientes/:id`

### Veículos
6. POST `/veiculos`
7. GET `/veiculos`
8. GET `/veiculos/:id`
9. PUT `/veiculos/:id`
10. DELETE `/veiculos/:id`

### Ordens de serviço
11. POST `/ordens-servico`
12. GET `/ordens-servico`
13. GET `/ordens-servico/:id`
14. PUT `/ordens-servico/:id`
15. DELETE `/ordens-servico/:id`

O teste cria os registros necessários, valida as respostas e remove os dados de teste em ordem inversa.

## Etapa 4 — Uma tela para cada rota

Foram criadas 15 telas de operação, uma para cada rota:

| Rota | Tela |
|---|---|
| GET `/clientes` | `ClientesListScreen.tsx` |
| GET `/clientes/:id` | `ClienteDetalhesScreen.tsx` |
| POST `/clientes` | `ClienteCadastrarScreen.tsx` |
| PUT `/clientes/:id` | `ClienteEditarScreen.tsx` |
| DELETE `/clientes/:id` | `ClienteExcluirScreen.tsx` |
| GET `/veiculos` | `VeiculosListScreen.tsx` |
| GET `/veiculos/:id` | `VeiculoDetalhesScreen.tsx` |
| POST `/veiculos` | `VeiculoCadastrarScreen.tsx` |
| PUT `/veiculos/:id` | `VeiculoEditarScreen.tsx` |
| DELETE `/veiculos/:id` | `VeiculoExcluirScreen.tsx` |
| GET `/ordens-servico` | `OrdensListScreen.tsx` |
| GET `/ordens-servico/:id` | `OrdemDetalhesScreen.tsx` |
| POST `/ordens-servico` | `OrdemCadastrarScreen.tsx` |
| PUT `/ordens-servico/:id` | `OrdemEditarScreen.tsx` |
| DELETE `/ordens-servico/:id` | `OrdemExcluirScreen.tsx` |

A tela `InicioScreen.tsx` funciona como menu principal e não substitui nenhuma das 15 telas exigidas.

## Etapa 5 — Integração com fetch

A integração foi centralizada em:

- `System/Frontend/config/api.ts`: endereço do backend;
- `System/Frontend/services/api.ts`: chamadas HTTP e tratamento de erros;
- `System/Frontend/types/models.ts`: modelos usados pelo aplicativo;
- `System/Frontend/types/navigation.ts`: tipagem da navegação.

O IP da API não fica mais espalhado nas telas.

## Etapa 6 — Testes e acabamento

O frontend recebeu:

- estados de carregamento;
- mensagens de erro de rede/HTTP;
- atualização das listas ao retornar de cadastro/edição/exclusão;
- pull-to-refresh nas listagens;
- confirmação antes de exclusões;
- seleção visual de cliente para veículo;
- seleção visual de veículo para ordem de serviço;
- tipagem das rotas do React Navigation;
- correção TypeScript para o import de `global.css`;
- atualização do `tailwind.config.js` para também processar componentes compartilhados.

## Observação sobre os dados

O backend continua mantendo os dados somente em memória. Isso foi preservado intencionalmente porque a documentação da Etapa 2 define esse comportamento. Ao reiniciar o servidor, os registros são perdidos.

## Arquitetura de navegação

O pacote mantém React Navigation porque ele já está instalado no projeto e é a arquitetura utilizada pelas telas atuais e pelo roadmap. Não foi introduzida uma migração para Expo Router, pois isso adicionaria dependências e alteraria desnecessariamente a estrutura acadêmica existente.
