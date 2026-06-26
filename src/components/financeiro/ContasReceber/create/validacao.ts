interface ValidacaoFinanceiroProps {
  condominio: any;
  descricao: string;
  valor: number;
  categoria: any;
  data_movimentacao: string | null;
  forma_pagamento: string;
  status: string;
  tipo_movimentacao: string;
}

export function validarFinanceiro(data: ValidacaoFinanceiroProps): string | null {
  if (!data.condominio) return "O campo condomínio é obrigatório";
  // if (!data.descricao.trim()) return "O campo descrição é obrigatório";
  if (data.valor <= 0) return "O valor deve ser maior que zero";
  if (!data.categoria) return "Categoria é obrigatória";
  if (!data.data_movimentacao) return "Data da movimentação é obrigatória";
  if (!data.forma_pagamento?.trim()) return "Forma de pagamento é obrigatória";
  if (!data.status) return "Status é obrigatório";
  if (!data.tipo_movimentacao) return "Tipo de movimentação é obrigatório";

  return null;
}