import { requisicaoDelete, requisicaoGet, requisicaoPost, requisicaoPut } from "@services/requisicoes";
import { Produto } from "@components/tipos";
import Swal from 'sweetalert2'
import Alerta from "@components/comum/alertas";


export function PrimeraLetraMaiuscula(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
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
  produto: Produto
  setRelistar: React.Dispatch<React.SetStateAction<boolean>>
}  
export function handleDeletar({ produto, setRelistar }: Deletar) {
  Swal.fire({
    title: `Tem certeza que deseja deletar ${produto.nome || "esse produto"}?`,
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
      requisicaoGet(`/Estoque/deletar-registro.php?id=${produto.id}`)
        .then((response) => {
          if (response?.data.success) {
            console.log(response);
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
  data: Produto;
  setRelistar: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedProduto: React.Dispatch<React.SetStateAction<Produto | null>>
  setLoadingSpiner: React.Dispatch<React.SetStateAction<boolean>>
  produtos: Produto[]
  setProdutos: React.Dispatch<React.SetStateAction<Produto[]>>
}

export async function editarProduto({
  data,
  setRelistar,
  setSelectedProduto,
  setLoadingSpiner,
  produtos,
  setProdutos

}: EditarProduto) {
  setLoadingSpiner(true);
  try {
    const response = await requisicaoPost(`/Estoque/editar-registro.php`, data);

    
    const msg = response?.data?.message ?? 'Erro ao editar a requisição!';

    if (response?.data?.success) {
      setProdutos(produtos.map((produto) => (produto.id === data.id ? data : produto)));
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
  data: Produto;
  produtos: Produto[];
  setProdutos: React.Dispatch<React.SetStateAction<Produto[]>>;
  setRelistar: React.Dispatch<React.SetStateAction<boolean>>;
  setAbrirModalNovoRegistro: React.Dispatch<React.SetStateAction<boolean>>;
  setLoadingSpiner: React.Dispatch<React.SetStateAction<boolean>>
  
  
}
export function adicionarProduto({ data, produtos,
        setProdutos,
        setRelistar,
        setAbrirModalNovoRegistro,
        setLoadingSpiner }: NovoProduto) {
  if (!data) return;

  setLoadingSpiner(true);

  requisicaoPost(`/Estoque/adicionar-registro.php`, data)
  
    .then((response) => {
      console.log(response);
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