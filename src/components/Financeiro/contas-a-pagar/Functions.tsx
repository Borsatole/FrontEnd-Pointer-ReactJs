import { requisicaoDelete,requisicaoPost, requisicaoPut } from "@services/requisicoes";
import { ContaAPagar, NovaContaAPagar} from "./tipos";
import Swal from 'sweetalert2'
import Alerta from "@components/comum/alertas";


export function PrimeraLetraMaiuscula(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function MaxCaracteres(str: string, max: number): string {
  if (str.length > max) return str.slice(0, max) + "...";
  return str;
}

export function gerarPaginas(paginaAtual: number, total: number, max = 5): number[] {
    const paginas = [];
    const metade = Math.floor(max / 2);
    let inicio = Math.max(1, paginaAtual - metade);
    let fim = Math.min(total, inicio + max - 1);
    if (fim - inicio + 1 < max) inicio = Math.max(1, fim - max + 1);
    for (let i = inicio; i <= fim; i++) paginas.push(i);
    return paginas;
}
 
interface Deletar {
  Registro: ContaAPagar
  setRelistar: React.Dispatch<React.SetStateAction<boolean>>
}  
export function handleDeletar({ Registro, setRelistar }: Deletar) {
  Swal.fire({
    title: `Tem certeza que deseja deletar ${Registro.nome || "esse produto"}?`,
    text: "Você não poderá reverter isso!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "var(--corPrincipal)",
    cancelButtonColor: "var(--corPrincipalHover)",
    confirmButtonText: "Sim, deletar!",
    cancelButtonText: "Cancelar"
  }).then((result) => {
    if (result.isConfirmed) {
      // Chama a API para deletar
      requisicaoDelete(`/Financeiro/Contas-a-pagar/Delete.php?id=${Registro.id}`)
        .then((response) => {
          if (response?.data.success) {
            // Atualiza a listagem após sucesso
            setRelistar(true);

            Swal.fire({
              title: "Deletado!",
              text: "Registro deletado com sucesso.",
              icon: "success",
              confirmButtonColor: "var(--corPrincipal)"
            });
          } else {
            Swal.fire({
              title: "Ops!",
              text: response?.data?.message || "Ops! Algo deu errado.",
              icon: "error",
              confirmButtonColor: "var(--corPrincipal)"
            });
          }
        })
        .catch(() => {
          Swal.fire({
            title: "Erro!",
            text: "Não foi possível deletar o registro.",
            icon: "error",
            confirmButtonColor: "var(--corPrincipal)"
          });
        });
    }
  });
}

interface EditarProduto {
  data: ContaAPagar;
  setRelistar: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedProduto: React.Dispatch<React.SetStateAction<ContaAPagar | null>>
  setLoadingSpiner: React.Dispatch<React.SetStateAction<boolean>>
  registros: ContaAPagar[]
  setRegistros: React.Dispatch<React.SetStateAction<ContaAPagar[]>>
}

export async function editarProduto({
  data,
  setRelistar,
  setSelectedProduto,
  setLoadingSpiner,
  registros,
  setRegistros

}: EditarProduto) {
  setLoadingSpiner(true);
  try {
    const response = await requisicaoPut(`/Financeiro/contas-a-pagar/Update.php`, data);

    
    const msg = response?.data?.message ?? 'Erro ao editar a requisição!';

    if (response?.data?.success) {
      console.log(response);
      setRegistros(registros.map((registro) => (registro.id === data.id ? data : registro)));
      setSelectedProduto(null);
      
      Alerta('toast', 'success', msg);
      
    } else {
      Alerta('toast', 'error', msg);
      setRelistar(true);
    }
  } catch {
    Alerta('toast', 'error', 'Erro inesperado ao editar a requisição!');
    setRelistar(true);
  } finally {
    setLoadingSpiner(false);
  }
}


interface NovoProduto {
  data: NovaContaAPagar;
  registros: ContaAPagar[];
  setRegistros: React.Dispatch<React.SetStateAction<ContaAPagar[]>>;
  setRelistar: React.Dispatch<React.SetStateAction<boolean>>;
  setAbrirModalNovoRegistro: React.Dispatch<React.SetStateAction<boolean>>;
  setLoadingSpiner: React.Dispatch<React.SetStateAction<boolean>>
  
  
}
export function adicionarProduto({ data, registros,
        setRegistros,
        setRelistar,
        setAbrirModalNovoRegistro,
        setLoadingSpiner }: NovoProduto) {
  if (!data) return;

  setLoadingSpiner(true);

  requisicaoPost(`/Financeiro/Contas-a-pagar/Create.php`, data)
  
    .then((response) => {
      const msg = response?.data?.message ?? 'Erro ao criar a requisição!';
      if (response?.data?.success) {
        
        Alerta('toast', 'success', msg);
        setRelistar(true);
        setAbrirModalNovoRegistro(false);
      } else {
        Alerta('toast', 'error', msg);
      }
    })
    .catch(() => {
      Alerta('toast', 'error', 'Erro inesperado ao criar a requisição!');
    })
    .finally(() => {
      setLoadingSpiner(false);
    });
}