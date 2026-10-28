const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

let clientes = [];
let veiculos = [];
let ordensServico = [];

// CLIENTES
app.get('/clientes', (req, res) => res.json(clientes));

app.get('/clientes/:id', (req, res) => {
  const cliente = clientes.find((item) => item.id === req.params.id);

  if (!cliente) {
    return res.status(404).json({ erro: 'Cliente não encontrado' });
  }

  return res.json(cliente);
});

app.post('/clientes', (req, res) => {
  const novoCliente = {
    id: Date.now().toString(),
    ...req.body,
  };

  clientes.push(novoCliente);
  return res.status(201).json(novoCliente);
});

app.put('/clientes/:id', (req, res) => {
  const index = clientes.findIndex((item) => item.id === req.params.id);

  if (index < 0) {
    return res.status(404).json({ erro: 'Cliente não encontrado' });
  }

  clientes[index] = {
    id: req.params.id,
    ...req.body,
  };

  return res.json(clientes[index]);
});

app.delete('/clientes/:id', (req, res) => {
  clientes = clientes.filter((item) => item.id !== req.params.id);
  return res.status(204).send();
});

// VEÍCULOS
app.get('/veiculos', (req, res) => res.json(veiculos));

app.get('/veiculos/:id', (req, res) => {
  const veiculo = veiculos.find((item) => item.id === req.params.id);

  if (!veiculo) {
    return res.status(404).json({ erro: 'Veículo não encontrado' });
  }

  return res.json(veiculo);
});

app.post('/veiculos', (req, res) => {
  const { clienteId } = req.body;
  const clienteExiste = clientes.some((item) => item.id === clienteId);

  if (!clienteExiste) {
    return res.status(400).json({ erro: 'Cliente associado inexistente!' });
  }

  const novoVeiculo = {
    id: Date.now().toString(),
    ...req.body,
  };

  veiculos.push(novoVeiculo);
  return res.status(201).json(novoVeiculo);
});

app.put('/veiculos/:id', (req, res) => {
  const index = veiculos.findIndex((item) => item.id === req.params.id);

  if (index < 0) {
    return res.status(404).json({ erro: 'Veículo não encontrado' });
  }

  veiculos[index] = {
    id: req.params.id,
    ...req.body,
  };

  return res.json(veiculos[index]);
});

app.delete('/veiculos/:id', (req, res) => {
  veiculos = veiculos.filter((item) => item.id !== req.params.id);
  return res.status(204).send();
});

// ORDENS DE SERVIÇO
app.get('/ordens-servico', (req, res) => res.json(ordensServico));

app.get('/ordens-servico/:id', (req, res) => {
  const ordem = ordensServico.find((item) => item.id === req.params.id);

  if (!ordem) {
    return res.status(404).json({ erro: 'Ordem de serviço não encontrada' });
  }

  return res.json(ordem);
});

app.post('/ordens-servico', (req, res) => {
  const novaOrdem = {
    id: Date.now().toString(),
    ...req.body,
    status: 'Aberta',
  };

  ordensServico.push(novaOrdem);
  return res.status(201).json(novaOrdem);
});

app.put('/ordens-servico/:id', (req, res) => {
  const index = ordensServico.findIndex((item) => item.id === req.params.id);

  if (index < 0) {
    return res.status(404).json({ erro: 'Ordem de serviço não encontrada' });
  }

  ordensServico[index] = {
    id: req.params.id,
    ...req.body,
  };

  return res.json(ordensServico[index]);
});

app.delete('/ordens-servico/:id', (req, res) => {
  ordensServico = ordensServico.filter((item) => item.id !== req.params.id);
  return res.status(204).send();
});

app.listen(PORT, () => {
  console.log('API rodando na porta 3000 🚀');
});
