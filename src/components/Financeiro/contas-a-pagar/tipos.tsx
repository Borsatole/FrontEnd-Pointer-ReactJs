export interface ContaAPagar {
  id?: number;
  nome: string;
  descricao: string;
  valor: number;
  data_pagamento: number;
  data_vencimento: number;
  data_fim?: string;
  categoria?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Categoria {
  id?: number;
  categoria: string;
  setor: string;
}
