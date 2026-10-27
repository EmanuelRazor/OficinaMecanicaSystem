import { API_URL } from "../config/api";
import type {
  Cliente,
  ClientePayload,
  OrdemServico,
  OrdemServicoPayload,
  Veiculo,
  VeiculoPayload,
} from "../types/models";

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

function normalizarCaminho(path: string) {
  return path.startsWith("/") ? path : `/${path}`;
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  let response: Response;

  try {
    response = await fetch(`${API_URL}${normalizarCaminho(path)}`, options);
  } catch {
    throw new Error(
      `Não foi possível conectar à API em ${API_URL}. Verifique se o backend está iniciado e se o dispositivo está na mesma rede.`,
    );
  }

  const texto = await response.text();

  if (!response.ok) {
    let mensagem = `Erro HTTP ${response.status}`;

    if (texto) {
      try {
        const corpo = JSON.parse(texto) as { erro?: string; message?: string };
        mensagem = corpo.erro ?? corpo.message ?? mensagem;
      } catch {
        mensagem = texto;
      }
    }

    throw new ApiError(mensagem, response.status);
  }

  if (!texto) {
    return undefined as T;
  }

  return JSON.parse(texto) as T;
}

function jsonOptions(method: "POST" | "PUT", body: unknown): RequestInit {
  return {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
}

export const api = {
  listarClientes: () => request<Cliente[]>("/clientes"),
  obterCliente: (id: string) => request<Cliente>(`/clientes/${id}`),
  criarCliente: (dados: ClientePayload) =>
    request<Cliente>("/clientes", jsonOptions("POST", dados)),
  atualizarCliente: (id: string, dados: ClientePayload) =>
    request<Cliente>(`/clientes/${id}`, jsonOptions("PUT", dados)),
  excluirCliente: (id: string) =>
    request<void>(`/clientes/${id}`, { method: "DELETE" }),

  listarVeiculos: () => request<Veiculo[]>("/veiculos"),
  obterVeiculo: (id: string) => request<Veiculo>(`/veiculos/${id}`),
  criarVeiculo: (dados: VeiculoPayload) =>
    request<Veiculo>("/veiculos", jsonOptions("POST", dados)),
  atualizarVeiculo: (id: string, dados: VeiculoPayload) =>
    request<Veiculo>(`/veiculos/${id}`, jsonOptions("PUT", dados)),
  excluirVeiculo: (id: string) =>
    request<void>(`/veiculos/${id}`, { method: "DELETE" }),

  listarOrdens: () => request<OrdemServico[]>("/ordens-servico"),
  obterOrdem: (id: string) =>
    request<OrdemServico>(`/ordens-servico/${id}`),
  criarOrdem: (dados: OrdemServicoPayload) =>
    request<OrdemServico>("/ordens-servico", jsonOptions("POST", dados)),
  atualizarOrdem: (id: string, dados: OrdemServicoPayload) =>
    request<OrdemServico>(`/ordens-servico/${id}`, jsonOptions("PUT", dados)),
  excluirOrdem: (id: string) =>
    request<void>(`/ordens-servico/${id}`, { method: "DELETE" }),
};

export function mensagemDeErro(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return "Ocorreu um erro inesperado.";
}
