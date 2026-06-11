import api from "@services/api/apiClient";


export const categoriasService = {
  
  

  listar: async (params: any) => {
    const response = await api.get("/financeiro-categorias", { params });
    return response.data;
  },

  criar: async (data: any) => {
    const response = await api.post("/financeiro-categorias", data);
    return response.data;
  },

  atualizar: async (id: any, data: any) => {
    const response = await api.put(`/financeiro-categorias/${id}`, data);
    return response.data;
  },

  deletar: async (id: any) => {
    const response = await api.delete(`/financeiro-categorias/${id}`);
    return response.data;
  },
};
