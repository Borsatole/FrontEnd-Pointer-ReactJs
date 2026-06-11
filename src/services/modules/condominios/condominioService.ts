import api from "@services/api/apiClient";


export const condominioService = {
  
  

  listar: async (params: any) => {
    const response = await api.get("/condominios", { params });
    return response.data;
  },

  criar: async (data: any) => {
    const response = await api.post("/condominios", data);
    return response.data;
  },

  atualizar: async (id: any, data: any) => {
    const response = await api.put(`/condominios/${id}`, data);
    return response.data;
  },

  deletar: async (id: any) => {
    const response = await api.delete(`/condominios/${id}`);
    return response.data;
  },
};
