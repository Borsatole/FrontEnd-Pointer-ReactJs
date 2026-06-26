interface ValidacaoPrinterProps {
  condominio: any;
  data_inicial: string;
  data_final: string;
}

export function validarPrinter(
  data: ValidacaoPrinterProps,
): string | null {
  if (!data.condominio) {
    return "O campo condomínio é obrigatório";
  }

  if (!data.data_inicial) {
    return "A data inicial é obrigatória";
  }

  if (!data.data_final) {
    return "A data final é obrigatória";
  }

  if (new Date(data.data_inicial) > new Date(data.data_final)) {
    return "A data inicial não pode ser maior que a data final";
  }

  return null;
}