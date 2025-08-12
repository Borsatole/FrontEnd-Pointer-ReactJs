import { requisicaoDelete, requisicaoPost } from "../../../services/requisicoes";
import { Categoria } from "../../tipos";
import Alerta from "../../../components/comum/alertas";
import Swal from "sweetalert2";

const MSG_ERRO_GENERICO = 'Erro inesperado ao processar a requisição!';
const MSG_ERRO_CRIACAO = 'Erro ao criar a requisição!';

interface AdicionarCategoria {
  data: Categoria;
  setRelistar: React.Dispatch<React.SetStateAction<boolean>>;
  setAbrirModalAdicionarCategoria: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Deletar {
  categoria: Categoria;
  setRelistar: React.Dispatch<React.SetStateAction<boolean>>;
}

interface EditarCategoria {
  data: Categoria;
  setRelistar: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedCategoria: React.Dispatch<React.SetStateAction<Categoria | null>>;
}

// Função auxiliar para alertas com Toastify
function alertaToast(type: 'success' | 'error', message: string) {
  Alerta('toast', type, message);
}

// Função auxiliar para alertas SweetAlert2
async function alertaConfirmacaoDelete(categoriaNome: string) {
  return Swal.fire({
    title: `Tem certeza que deseja deletar ${categoriaNome || "essa categoria"}?`,
    text: "Você não poderá reverter isso!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "var(--corPrincipal)",
    cancelButtonColor: "var(--corPrincipalHover)",
    confirmButtonText: "Sim, deletar!",
    cancelButtonText: "Cancelar"
  });
}

export async function adicionarCategoria({
  data,
  setRelistar,
  setAbrirModalAdicionarCategoria,
}: AdicionarCategoria) {
  if (!data || !data.nome) return;

  try {
    const response = await requisicaoPost(`/Estoque/adicionar-categoria.php`, data);
    const msg = response?.data?.message ?? MSG_ERRO_CRIACAO;

    if (response?.data?.success) {
      alertaToast('success', msg);
      setRelistar(true);
      setAbrirModalAdicionarCategoria(false);
    } else {
      alertaToast('error', msg);
    }
  } catch {
    alertaToast('error', MSG_ERRO_GENERICO);
  }
}

export async function handleDeletar({ categoria, setRelistar }: Deletar) {
  const result = await alertaConfirmacaoDelete(categoria.nome);

  if (!result.isConfirmed) return;

  try {
    const response = await requisicaoDelete(`/Estoque/deletar-categoria.php?id=${categoria.id}`);

    if (response?.data?.success) {
      setRelistar(true);
      await Swal.fire({
        title: "Deletado!",
        text: "Registro deletado com sucesso.",
        icon: "success",
        confirmButtonColor: "var(--corPrincipal)"
      });
    } else {
      await Swal.fire({
        title: "Ops!",
        text: response?.data?.message || "Algo deu errado.",
        icon: "error",
        confirmButtonColor: "var(--corPrincipal)"
      });
    }
  } catch {
    await Swal.fire({
      title: "Erro!",
      text: "Não foi possível deletar o registro.",
      icon: "error",
      confirmButtonColor: "var(--corPrincipal)"
    });
  }
}

export async function editarCategoria({
  data,
  setRelistar,
  setSelectedCategoria,
}: EditarCategoria) {
  if (!data || !data.nome) return;

  try {
    const response = await requisicaoPost(`/Estoque/editar-categoria.php`, data);
    const msg = response?.data?.message ?? MSG_ERRO_CRIACAO;

    if (response?.data?.success) {
      alertaToast('success', msg);
      setRelistar(true);
      setSelectedCategoria(null);
    } else {
      alertaToast('error', msg);
    }
  } catch {
    alertaToast('error', MSG_ERRO_GENERICO);
  }
}
