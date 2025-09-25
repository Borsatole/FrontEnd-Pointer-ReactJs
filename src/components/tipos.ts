// export interface Produto {
//   id?: number;
//   nome: string;
//   quantidade: number;
//   categoria: string;
//   created_at?: string;
//   updated_at?: string;
// }

// export interface Categoria {
//   id?: number;
//   nome: string;
// }


export interface Imagem {
  id: number;
  nome_imagem: string;
}

export interface Notificacao {

  id: number;
  id_condominio: number;
  nome_condominio: string;
  titulo: string;
  mensagem: string;
  imagens?: Imagem[];
  lida: number;
  data_criacao: string;
  data_atualizacao: string;

};

export interface Condominio {
  id: number;
  nome: string;
  telefone: string;
  rua: string;
  notificacoes?: Notificacao[] | number;
  data_criacao?: string;
  data_atualizacao?: string;
}

export interface Visitas {
  id: number;
  id_condominio: number;
  nome_condominio: string;
  entrada: string;
  saida: string;
  data_criacao: string;
  data_atualizacao: string;
}