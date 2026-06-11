import api from "@services/api/apiClient";

export const FinanceiroService = {
  listar(params?: any) {
    return api.get("/financeiro", { params });
  },

  criar(data: any) {
    return api.post("/financeiro", data);
  },

  atualizar(id: number, data: any) {
    return api.put(`/financeiro/${id}`, data);
  },

  deletar(id: number) {
    return api.delete(`/financeiro/${id}`);
  },
};