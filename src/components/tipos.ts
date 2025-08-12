export interface Produto {
  id?: number;
  nome: string;
  quantidade: number;
  categoria: string;
  created_at?: string;
  updated_at?: string;
}

export interface Categoria {
  id?: number;
  nome: string;
}
