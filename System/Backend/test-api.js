const BASE_URL = process.env.API_URL || 'http://localhost:3000';

async function request(method, path, body) {
  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await response.text();
  let data;

  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
  }

  if (!response.ok) {
    throw new Error(`${method} ${path} -> HTTP ${response.status}: ${JSON.stringify(data)}`);
  }

  return data;
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function main() {
  console.log(`Testando API em ${BASE_URL}`);
  console.log('Objetivo: validar as 15 rotas definidas na documentação.\n');

  let cliente;
  let veiculo;
  let ordem;
  let passou = 0;

  async function test(name, fn) {
    process.stdout.write(`- ${name} ... `);
    await fn();
    passou += 1;
    console.log('OK');
  }

  try {
    await test('POST /clientes', async () => {
      cliente = await request('POST', '/clientes', {
        nome: 'Cliente Teste API',
        email: 'teste.api@exemplo.com',
        telefone: '55999999999',
      });
      assert(cliente?.id, 'Cliente criado sem id.');
    });

    await test('GET /clientes', async () => {
      const lista = await request('GET', '/clientes');
      assert(Array.isArray(lista), 'A resposta deveria ser um array.');
      assert(lista.some((item) => item.id === cliente.id), 'Cliente criado não apareceu na listagem.');
    });

    await test('GET /clientes/:id', async () => {
      const item = await request('GET', `/clientes/${cliente.id}`);
      assert(item.id === cliente.id, 'ID retornado diferente do esperado.');
    });

    await test('PUT /clientes/:id', async () => {
      cliente = await request('PUT', `/clientes/${cliente.id}`, {
        nome: 'Cliente Teste API Atualizado',
        email: 'teste.api@exemplo.com',
        telefone: '55888888888',
      });
      assert(cliente.nome.includes('Atualizado'), 'Cliente não foi atualizado.');
    });

    await test('POST /veiculos', async () => {
      veiculo = await request('POST', '/veiculos', {
        clienteId: cliente.id,
        marca: 'Chevrolet',
        modelo: 'Prisma',
        placa: 'API1A23',
        ano: '2008',
      });
      assert(veiculo?.id, 'Veículo criado sem id.');
      assert(veiculo.clienteId === cliente.id, 'Veículo não ficou vinculado ao cliente.');
    });

    await test('GET /veiculos', async () => {
      const lista = await request('GET', '/veiculos');
      assert(Array.isArray(lista), 'A resposta deveria ser um array.');
      assert(lista.some((item) => item.id === veiculo.id), 'Veículo criado não apareceu na listagem.');
    });

    await test('GET /veiculos/:id', async () => {
      const item = await request('GET', `/veiculos/${veiculo.id}`);
      assert(item.id === veiculo.id, 'ID retornado diferente do esperado.');
    });

    await test('PUT /veiculos/:id', async () => {
      veiculo = await request('PUT', `/veiculos/${veiculo.id}`, {
        clienteId: cliente.id,
        marca: 'Chevrolet',
        modelo: 'Prisma Maxx',
        placa: 'API1A23',
        ano: '2008',
      });
      assert(veiculo.modelo === 'Prisma Maxx', 'Veículo não foi atualizado.');
    });

    await test('POST /ordens-servico', async () => {
      ordem = await request('POST', '/ordens-servico', {
        veiculoId: veiculo.id,
        descricao: 'Teste automatizado da ordem',
        valor: 150,
      });
      assert(ordem?.id, 'Ordem criada sem id.');
      assert(ordem.status, 'Ordem criada sem status.');
    });

    await test('GET /ordens-servico', async () => {
      const lista = await request('GET', '/ordens-servico');
      assert(Array.isArray(lista), 'A resposta deveria ser um array.');
      assert(lista.some((item) => item.id === ordem.id), 'Ordem criada não apareceu na listagem.');
    });

    await test('GET /ordens-servico/:id', async () => {
      const item = await request('GET', `/ordens-servico/${ordem.id}`);
      assert(item.id === ordem.id, 'ID retornado diferente do esperado.');
    });

    await test('PUT /ordens-servico/:id', async () => {
      ordem = await request('PUT', `/ordens-servico/${ordem.id}`, {
        veiculoId: veiculo.id,
        descricao: 'Teste automatizado atualizado',
        status: 'Concluída',
        valor: 175,
      });
      assert(ordem.status === 'Concluída', 'Ordem não foi atualizada.');
    });

    await test('DELETE /ordens-servico/:id', async () => {
      await request('DELETE', `/ordens-servico/${ordem.id}`);
    });

    await test('DELETE /veiculos/:id', async () => {
      await request('DELETE', `/veiculos/${veiculo.id}`);
    });

    await test('DELETE /clientes/:id', async () => {
      await request('DELETE', `/clientes/${cliente.id}`);
    });

    console.log(`\nResultado: ${passou}/15 rotas validadas com sucesso.`);
  } catch (error) {
    console.error(`\nFalha após ${passou}/15 testes:`);
    console.error(error instanceof Error ? error.message : error);
    console.error('\nConfirme se o backend está rodando com "npm start" na porta 3000.');
    process.exitCode = 1;
  }
}

main();
