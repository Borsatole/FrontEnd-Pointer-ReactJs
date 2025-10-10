import Alerta from "@src/components/comum/alertas";
import { AuthContext } from "@src/context/AuthContext";
import axios from "axios";
import { Alert } from "flowbite-react";
import { useContext } from "react";
const rotaApi = import.meta.env.VITE_API;
import { Navigate, useNavigate } from "react-router-dom";


export async function requisicaoGet(rota: string) {

  const token = localStorage.getItem("token");

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {

    const response = await axios.get(`${rotaApi}${rota}`, config);
    return response;

  } catch (error: any) {

    if (error.response.status === 401) {
      window.location.href = "/";
    }

    if (error.response.status === 403) {
      Alerta("toast", "error", `${error.response.data.message}`);
    }

    return error.response;
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
    return response;

  } catch (error: any) {

    if (error.response.status === 401) {
      window.location.href = "/";
    }

    if (error.response.status === 403) {
      Alerta("toast", "error", `${error.response.data.message}`);
    }

    return error.response;
  }

  

  
}

export async function requisicaoPostSemRedirect(rota: string, dados: Record<string, any> | FormData) {
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
    return response;
  } catch (error: any) {
    // NÃO redireciona - apenas propaga o erro
    throw error;
  }
}


export async function requisicaoPut(rota: string, dados: Record<string, any> | FormData) {
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

  try{
    const response = await axios.put(`${rotaApi}${rota}`, payload, config);
    return response;

  }catch (error: any) {

    if (error.response.status === 401) {
      window.location.href = "/";
    }

    if (error.response.status === 403) {
      Alerta("toast", "error", `${error.response.data.message}`);
    }

    return error.response;
  }

}


export async function requisicaoDelete(rota: string) {
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.delete(`${rotaApi}${rota}`, config);
    return response;  
  }catch (error: any) {

    if (error.response.status === 401) {
      window.location.href = "/";
    }

    if (error.response.status === 403) {
      Alerta("toast", "error", `${error.response.data.message}`);
    }

    return error.response;
  }
  
}