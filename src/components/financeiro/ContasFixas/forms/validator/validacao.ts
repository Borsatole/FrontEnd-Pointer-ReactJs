export function validarRegistro(data: any) {
  if (!data.id_condominio)
    return "O campo condomínio é obrigatório";

  if (!data.descricao?.trim())
    return "O campo descrição é obrigatório";

  if (data.valor <= 0)
    return "O valor deve ser maior que zero";

  if (data.recorrencia < 1)
    return "Recorrência inválida";

  if (!data.id_categoria)
    return "Categoria é obrigatória";

  if (!data.forma_pagamento)
    return "Forma de pagamento é obrigatória";

  if (!data.dia_vencimento)
    return "Dia de vencimento é obrigatório";

  return null;
}