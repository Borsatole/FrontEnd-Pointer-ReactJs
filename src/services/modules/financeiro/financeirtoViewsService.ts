import api from "@services/api/apiClient";

export const FinanceiroViewService = {
  relatorioVisaoGeral(params?: {
    data_minima?: string;
    data_maxima?: string;
  }) {
    return api.get("/financeiro-views/relatorios", {
      params: {
        tipo_relatorio: "visao_geral",
        ...params,
      },
    });
  },
};