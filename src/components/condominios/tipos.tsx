

export interface Registros {
  id: number;
  nome: string;
  telefone?: string;
  rua?: string;
  notificacoes?: Notificacao[];
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

export interface informacoes {
  id: number;
  nome: string;
  telefone: string;
  rua: string;

}

