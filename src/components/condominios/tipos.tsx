

export interface Registros {
  id: number;
  nome: string;
  telefone?: string | number;
  rua?: string;
  notificacoes: Notificacao[];
}

export interface Notificacao {
  id: number;
  titulo?: string;
  mensagem: string;
  data: string;
  lida: boolean;
}

export interface informacoes {
  id: number;
  nome: string;
  telefone: string;
  rua: string;

}

