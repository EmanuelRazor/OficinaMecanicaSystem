# Testes do OficinaMecanicaSystem

## 1. Teste automatizado da API

O backend possui o arquivo:

```text
System/Backend/test-api.js
```

Com a API em execução, abra outro terminal:

```bash
cd System/Backend
npm run test:api
```

O teste percorre as 15 operações principais:

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

O resultado esperado é:

```text
Resultado: 15/15 rotas validadas com sucesso.
```

O teste também confirma que uma nova ordem é criada com o status `Aberta`.

## 2. Roteiro de teste manual

### Clientes

1. Abrir a área de clientes.
2. Cadastrar um cliente.
3. Confirmar que aparece na listagem.
4. Abrir os detalhes.
5. Editar os dados.
6. Confirmar a atualização.
7. Excluir o registro.

### Veículos

1. Cadastrar um cliente.
2. Abrir a área de veículos.
3. Selecionar o cliente proprietário.
4. Cadastrar o veículo.
5. Abrir detalhes.
6. Editar o veículo.
7. Excluir o veículo.

### Ordens de serviço

1. Manter um cliente e um veículo cadastrados.
2. Abrir a área de ordens.
3. Criar uma ordem.
4. Confirmar que o status inicial é `Aberta`.
5. Editar a ordem e alterar o status.
6. Confirmar a atualização.
7. Excluir a ordem.

## 3. Teste de comunicação no Android Emulator

Com o backend em execução, abra no Chrome do emulador:

```text
http://10.0.2.2:3000/clientes
```

Resposta esperada sem clientes:

```json
[]
```

Repita com:

```text
http://10.0.2.2:3000/veiculos
http://10.0.2.2:3000/ordens-servico
```

Se esses endereços responderem, o emulador está alcançando o backend.
