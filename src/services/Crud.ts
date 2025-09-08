import { requisicaoDelete, requisicaoPost, requisicaoPut } from "@services/requisicoes";
import Swal from "sweetalert2";
import Alerta from "@components/comum/alertas";

// 🔹 Tipo base para registros (cada tabela pode estender)
export interface BaseRegistro {
  id?: number | string;
  nome?: string; // usado em mensagens amigáveis
  [key: string]: any;
}

// ----------- DELETE -----------
interface Deletar<T extends BaseRegistro> {
  registro: T;
  setRelistar: React.Dispatch<React.SetStateAction<boolean>>;
  endpoint: string; // ex: "/Estoque/categoria/deletar-categoria.php"
}

export function handleDeletar<T extends BaseRegistro>({
  registro,
  setRelistar,
  endpoint,
}: Deletar<T>) {
  Swal.fire({
    title: `Tem certeza que deseja deletar ${registro.nome || "esse registro"}?`,
    text: "Você não poderá reverter isso!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "var(--corPrincipal)",
    cancelButtonColor: "var(--corPrincipalHover)",
    confirmButtonText: "Sim, deletar!",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      requisicaoDelete(`${endpoint}?id=${registro.id}`)
        .then((response) => {
          if (response?.data.success) {
            setRelistar(true);
            Swal.fire({
              title: "Deletado!",
              text: "Registro deletado com sucesso.",
              icon: "success",
              confirmButtonColor: "var(--corPrincipal)",
            });
          } else {
            Swal.fire({
              title: "Ops!",
              text: response?.data?.message || "Ops! Algo deu errado.",
              icon: "error",
              confirmButtonColor: "var(--corPrincipal)",
            });
          }
        })
        .catch(() => {
          Swal.fire({
            title: "Erro!",
            text: "Não foi possível deletar o registro.",
            icon: "error",
            confirmButtonColor: "var(--corPrincipal)",
          });
        });
    }
  });
}

// ----------- EDIT -----------
interface Editar<T extends BaseRegistro> {
  data: T;
  setRelistar: React.Dispatch<React.SetStateAction<boolean>>;
  setSelected: React.Dispatch<React.SetStateAction<T | null>>;
  setLoadingSpiner: React.Dispatch<React.SetStateAction<boolean>>;
  registros: T[];
  setRegistros: React.Dispatch<React.SetStateAction<T[]>>;
  endpoint: string;
}

export async function editarRegistro<T extends BaseRegistro>({
  data,
  setRelistar,
  setSelected,
  setLoadingSpiner,
  registros,
  setRegistros,
  endpoint,
}: Editar<T>) {
  setLoadingSpiner(true);
  try {
    const response = await requisicaoPut(endpoint, data);
    const msg = response?.data?.message ?? "Erro ao editar a requisição!";

    if (response?.data?.success) {
      // setRegistros(registros.map((r) => (r.id === data.id ? data : r)));
      // setSelected(null);
      setRelistar(true);
      Alerta("toast", "success", msg);
    } else {
      Alerta("toast", "error", msg);
      setRelistar(true);
    }
  } catch {
    Alerta("toast", "error", "Erro inesperado ao editar a requisição!");
    setRelistar(true);
  } finally {
    setLoadingSpiner(false);
  }
}

// ----------- CREATE -----------
interface Novo<T extends BaseRegistro> {
  data: T;
  registros?: T[];
  setRegistros?: React.Dispatch<React.SetStateAction<T[]>>;
  setRelistar: React.Dispatch<React.SetStateAction<boolean>>;
  setAbrirModalNovoRegistro: React.Dispatch<React.SetStateAction<boolean>>;
  setLoadingSpiner: React.Dispatch<React.SetStateAction<boolean>>;
  endpoint: string; // ex: "/Estoque/categoria/adicionar-categoria.php"
}

export function adicionarRegistro<T extends BaseRegistro>({
  data,
  setRegistros,
  setRelistar,
  setAbrirModalNovoRegistro,
  setLoadingSpiner,
  endpoint,
}: Novo<T>) {
  if (!data) return;
  setLoadingSpiner(true);

  requisicaoPost(endpoint, data)
    .then((response) => {
      const msg = response?.data?.message ?? "Erro ao criar a requisição!";
      if (response?.data?.success) {
        Alerta("toast", "success", msg);
        setRelistar(true);
        setAbrirModalNovoRegistro(false);
      } else {
        Alerta("toast", "error", msg);
      }
    })
    .catch(() => {
      Alerta("toast", "error", "Erro inesperado ao criar a requisição!");
    })
    .finally(() => {
      setLoadingSpiner(false);
    });
}
