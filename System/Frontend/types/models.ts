export type Cliente = {
  id: string;
  nome: string;
  email?: string;
  telefone?: string;
};

export type ClientePayload = {
  nome: string;
  email: string;
  telefone?: string;
};

export type Veiculo = {
  id: string;
  clienteId: string;
  marca: string;
  modelo: string;
  placa: string;
  ano?: string;
};

export type VeiculoPayload = {
  clienteId: string;
  marca: string;
  modelo: string;
  placa: string;
  ano?: string;
};

export type OrdemServico = {
  id: string;
  veiculoId: string;
  descricao: string;
  status: string;
  valor?: number | string;
};

export type OrdemServicoPayload = {
  veiculoId: string;
  descricao: string;
  status?: string;
  valor?: number;
};
