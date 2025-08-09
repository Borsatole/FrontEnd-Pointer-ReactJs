import axios from "axios";


const rotaApi = import.meta.env.VITE_API;

export async function requisicaoGet(rota: string) {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(
      `${rotaApi}${rota}`,
      // { token },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200 && response.data.success === true) {
      return response;
    } else {
      if (response.data.error === "Token inválido" || response.data.error === "Token expirado") {
        window.location.href = "/login";
      }

      return response;
    }
  } catch (error) {
    return null;
  }
}

export async function requisicaoPostSimples(rota: string, dados: Record<string, any>) {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.post(
      `${rotaApi}${rota}`,
      { token, ...dados },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200 && response.data.success === true) {
      return response;
    } else {
      if (response.data.error === "Token inválido") {
        window.location.href = "/login";
      }

      return response;
    }
  } catch (error) {
    return null;
  }
}

export async function requisicaoPost(rota: string, dados: Record<string, any> | FormData) {
  const token = localStorage.getItem("token");

  let config = {
    headers: {
      Authorization: `Bearer ${token}`
    } as Record<string, string>
  };

  let payload: any;

  if (dados instanceof FormData) {
    payload = dados;
  } else {
    config.headers["Content-Type"] = "application/json";
    payload = JSON.stringify(dados);
  }

  try {
    const response = await axios.post(`${rotaApi}${rota}`, payload, config);

    if (response.status === 200 && response.data.success === true) {
      return response;
    } else {
      if (response.data.error === "Token inválido") {
        window.location.href = "/login";
      }

      return response;
    }
  } catch (error) {
    return null;
  }
}



export async function requisicaoPut(rota: string, dados: Record<string, any>) {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.put(
      `${rotaApi}${rota}`,
      { ...dados },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200 && response.data.success === true) {
      return response;
    } else {
      if (response.data.error === "Token inválido") {
        window.location.href = "/login";
      }

      return response;
    }
  } catch (error) {
    return null;
  }
}

export async function requisicaoDelete(rota: string,) {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.delete(`${rotaApi}${rota}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

    });

    if (response.status === 200 && response.data.success === true) {
      return response;
    } else {
      if (response.data.error === "Token inválido") {
        window.location.href = "/login";
      }

      return response;
    }
  } catch (error) {
    return null;
  }
}
