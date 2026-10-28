# API REST — OficinaMecanicaSystem

## Endereço local

O backend utiliza a porta `3000`.

No computador onde o Node.js está em execução:

```text
http://localhost:3000
```

No Android Emulator, o frontend utiliza por padrão:

```text
http://10.0.2.2:3000
```

## Clientes

### GET /clientes

Lista todos os clientes.

Resposta de exemplo:

```json
[]
```

### GET /clientes/:id

Consulta um cliente pelo ID.

Se o registro não existir:

```json
{
  "erro": "Cliente não encontrado"
}
```

Status: `404`.

### POST /clientes

Cadastra um cliente.

Corpo de exemplo:

```json
{
  "nome": "João Silva",
  "email": "joao@email.com",
  "telefone": "55999999999"
}
```

Status de sucesso: `201`.

### PUT /clientes/:id

Atualiza um cliente existente.

Corpo de exemplo:

```json
{
  "nome": "João Silva",
  "email": "novo@email.com",
  "telefone": "55888888888"
}
```

### DELETE /clientes/:id

Exclui um cliente.

Status de sucesso: `204`.

## Veículos

### GET /veiculos

Lista todos os veículos.

### GET /veiculos/:id

Consulta um veículo pelo ID.

Se o veículo não existir, retorna `404`.

### POST /veiculos

Cadastra um veículo.

Corpo de exemplo:

```json
{
  "clienteId": "ID_DO_CLIENTE",
  "marca": "Chevrolet",
  "modelo": "Prisma",
  "placa": "ABC1D23",
  "ano": "2008"
}
```

O `clienteId` precisa corresponder a um cliente existente.

Caso contrário:

```json
{
  "erro": "Cliente associado inexistente!"
}
```

Status: `400`.

### PUT /veiculos/:id

Atualiza os dados de um veículo.

### DELETE /veiculos/:id

Exclui um veículo.

Status de sucesso: `204`.

## Ordens de serviço

### GET /ordens-servico

Lista as ordens de serviço.

### GET /ordens-servico/:id

Consulta uma ordem pelo ID.

Se a ordem não existir, retorna `404`.

### POST /ordens-servico

Cria uma ordem de serviço.

Corpo de exemplo:

```json
{
  "veiculoId": "ID_DO_VEICULO",
  "descricao": "Troca de óleo e filtros",
  "valor": 250
}
```

O backend define automaticamente:

```json
{
  "status": "Aberta"
}
```

Status de sucesso: `201`.

### PUT /ordens-servico/:id

Atualiza uma ordem de serviço.

Exemplo:

```json
{
  "veiculoId": "ID_DO_VEICULO",
  "descricao": "Troca de óleo e filtros concluída",
  "status": "Concluída",
  "valor": 250
}
```

### DELETE /ordens-servico/:id

Exclui uma ordem de serviço.

Status de sucesso: `204`.

## Resumo das 15 operações

| Método | Rota | Função |
|---|---|---|
| GET | `/clientes` | Listar clientes |
| GET | `/clientes/:id` | Consultar cliente |
| POST | `/clientes` | Cadastrar cliente |
| PUT | `/clientes/:id` | Atualizar cliente |
| DELETE | `/clientes/:id` | Excluir cliente |
| GET | `/veiculos` | Listar veículos |
| GET | `/veiculos/:id` | Consultar veículo |
| POST | `/veiculos` | Cadastrar veículo |
| PUT | `/veiculos/:id` | Atualizar veículo |
| DELETE | `/veiculos/:id` | Excluir veículo |
| GET | `/ordens-servico` | Listar ordens |
| GET | `/ordens-servico/:id` | Consultar ordem |
| POST | `/ordens-servico` | Criar ordem |
| PUT | `/ordens-servico/:id` | Atualizar ordem |
| DELETE | `/ordens-servico/:id` | Excluir ordem |
