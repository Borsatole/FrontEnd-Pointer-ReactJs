import { requisicaoDelete, requisicaoPost, requisicaoPut } from "@services/requisicoes";
import Alerta from "@components/comum/alertas";
import { Confirm } from "@components/comum/alertas";
import { useEffect } from "react";


export interface BaseRegistro {
  id?: number | string;
  nome?: string;
  [key: string]: any;
}

interface Create<T extends BaseRegistro> {
    payload: T | FormData;
    endpoint: string;
    antesDeExecutar?: () => void;
    depoisDeExecutar?: () => void;
    registros?: T[];
    setRegistros?: React.Dispatch<React.SetStateAction<T[]>>;
}

export function Create<T extends BaseRegistro>({
  payload,
  antesDeExecutar,
  depoisDeExecutar,
  registros,
  setRegistros,
  endpoint,
}: Create<T>) {

    function atualizarLista(novoRegistro: T) {
    setRegistros?.((prev) => [...(prev ?? []), novoRegistro]);
    }

    if (!payload) return;
    antesDeExecutar?.();

    requisicaoPost(endpoint, payload)
        .then((response) => {
        const msg = response?.data?.message ?? "Erro ao criar a requisição!";

        if (response?.data?.success) {
            // console.log(response?.data);
            
            Alerta("toast", "success", msg);

            {registros && setRegistros && atualizarLista(response?.data?.registro)};
        }
        depoisDeExecutar?.();

        

        })
        .catch((error) => {
        Alerta("toast", "error", `${error.response.data.message}`);
        })
}

export function Update<T extends BaseRegistro>({
  payload,
  antesDeExecutar,
  depoisDeExecutar,
  registros,
  setRegistros,
  endpoint,
}: Create<T>) {

  function atualizarLista(novoRegistro: T) {
    setRegistros?.((prev) =>
      prev?.map((item) =>
        item.id === novoRegistro.id ? novoRegistro : item
      ) ?? []
    );
  }

  if (!payload) return;
  antesDeExecutar?.();

  requisicaoPut(endpoint, payload)
    .then((response) => {
      const msg = response?.data?.message ?? "Erro ao editar a requisição!";

      if (response?.data?.success) {
        Alerta("toast", "success", msg);

        if (registros && setRegistros) {
          atualizarLista(response.data.registro);
        }
      }

      depoisDeExecutar?.();
    })
    .catch((error) => {
      Alerta("toast", "error", `${error.response?.data?.message}`);
    });
}

interface Delete<T extends BaseRegistro> {
  registro?: T;
  registros?: T[];
  setRegistros?: React.Dispatch<React.SetStateAction<T[]>>;
  antesDeExecutar?: () => void,
  depoisDeExecutar?: () => void,
  endpoint: string; // ex: "/Estoque/categoria/deletar-categoria.php"
}

export function Delete<T extends BaseRegistro>({
  registro,
  registros,
  setRegistros,
  antesDeExecutar,
  depoisDeExecutar,
  endpoint,
}: Delete<T>) {

  const executarDelete = async () => {
    antesDeExecutar?.();

    try {
      const response = await requisicaoDelete(endpoint);

      if (response?.data?.success) {
        Alerta("toast", "success", "Registro deletado com sucesso!");

        // Atualizar lista local (opcional)
        if (registros && setRegistros && registro?.id) {
          setRegistros(registros.filter((r) => r.id !== registro.id));
        }

        depoisDeExecutar?.();
      }

    } catch (error) {
      Alerta("toast", "error", "Não foi possível deletar o registro.");
    }
  };

  Confirm({
    text: `Tem certeza que deseja deletar ${registro?.nome ?? "este registro"}?`,
    onConfirm: executarDelete,
    onCancel: () => {},
  });
}



