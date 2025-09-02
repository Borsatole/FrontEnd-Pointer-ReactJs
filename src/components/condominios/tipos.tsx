

export interface Registros {
  id: number;
  nome: string;
  notificacoes: Notificacao[];
}

export interface Notificacao {
  id: number;
  mensagem: string;
  tipo: string;
  data: string;
  visto: boolean;
}

export interface informacoes {
  id: number;
  nome: string;
  rua: string;

}

