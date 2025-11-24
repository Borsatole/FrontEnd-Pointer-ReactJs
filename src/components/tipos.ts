export interface SubMenuItem {
    id: number;
    icone?: string;
    nome: string;
    rota: string;
}

export interface MenuItem {
  id: number;
  nome: string;
  rota: string;
  icone: string;
  submenu?: SubMenuItem[];
}

export interface UserData {
  id: number;
  nome: string;
  email: string;
  nivel: string;
  nivel_nome: string;
  ativo: Boolean;
  expirationTime?: EpochTimeStamp | null;
}

export interface Permissao {
  id: number;
  slug?: string;
  descricao: string;
  allow: Boolean;
  created_at?: string;
  updated_at?: string;
  
}

export interface Permissoes {
  id?: number;
  nome: string;
  permissoes?: Permissao[];
  created_at?: string;
  updated_at?: string;
}

export interface Endereco {
  id?: number;
  cliente_id?: number;
  logradouro: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  complemento: string;
  created_at?: string;
  updated_at?: string;
}

export interface Cliente {
  id?: number;
  nome: string;
  razao_social?: any | null;
  enderecos?: Endereco[];
  email: string;
  telefone?: string;
  celular?: string;
  observacao?: string;
  created_at?: string;
  updated_at?: string;
}

export interface DadosLocacao {
  id: number;
  cliente_id: number;
  locacao_id: number;
  locacao_item_id: number;
  endereco_id: number;
  data_inicio: string;
  data_fim: string;
  preco_total: string;
  forma_pagamento: string;
  observacoes: string | null;
  status: string;
  created_at: string;
  updated_at: string;
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string | null;
  bairro: string;
  cidade: string;
  estado: string;
  cliente_nome: string;
  cliente_telefone: string;
  item_nome: string;
  item_categoria: string;
  dados_locacao?: DadosLocacao;
}

export interface ItemEstoque {
  id: number;
  item: string;
  categoria: string;
  preco_diaria: string;
  status: "locado" | "disponivel" | "indisponivel";
  created_at: string;
  updated_at: string;
  dados_locacao: DadosLocacao | null ;
}

export interface GrupoEstoque {
  status: string;
  categoria: string;
  itens: ItemEstoque[];
}

