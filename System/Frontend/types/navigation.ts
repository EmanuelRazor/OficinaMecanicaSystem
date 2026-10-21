export type RootStackParamList = {
  Inicio: undefined;

  ClientesLista: undefined;
  ClienteDetalhes: { id: string };
  ClienteCadastrar: undefined;
  ClienteEditar: { id: string };
  ClienteExcluir: { id: string };

  VeiculosLista: undefined;
  VeiculoDetalhes: { id: string };
  VeiculoCadastrar: undefined;
  VeiculoEditar: { id: string };
  VeiculoExcluir: { id: string };

  OrdensLista: undefined;
  OrdemDetalhes: { id: string };
  OrdemCadastrar: undefined;
  OrdemEditar: { id: string };
  OrdemExcluir: { id: string };
};
