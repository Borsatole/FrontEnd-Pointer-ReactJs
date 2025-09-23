

export interface Registros {
  id: number;
  nome: string;
  telefone?: string;
  rua?: string;
  notificacoes?: Number | string;
  visitas?: Visitas[]
}

export interface Notificacao {
  id: number;
  titulo?: string;
  mensagem?: string;
  lida?: boolean;
  avatar?: string;
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

