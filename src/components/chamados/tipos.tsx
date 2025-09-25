

// export interface Registros {
//   id: number;
//   nome: string;
//   telefone?: string;
//   rua?: string;
//   notificacoes?: Number | string;
//   visitas?: Visitas[]
// }

export interface Registros {
  id?: number;
  condominio?: string;
  titulo: string;
  mensagem: string;
  id_condominio?: number;

}


export interface Chamado {
  id: number;
  titulo?: string;
  id_condominio?: number;
  mensagem?: string;
  lida?: boolean;
  imagem?: JSON;
  data?: string;
}

export interface Visitas {
  id: number;
  id_condominio: number;
  entrada: string;
  saida: string;
}

export interface UltimaVisita {
  id: number;
  entrada: string;
  nome_condominio: string;
}

export interface informacoes {
  id: number;
  nome: string;
  telefone: string;
  rua: string;

}

