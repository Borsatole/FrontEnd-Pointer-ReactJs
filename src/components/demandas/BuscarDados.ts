import { requisicaoGet } from "@src/services/requisicoes";

export function buscarDados({
    endpoint = "",
    queryFiltro = "",
    pagina = 1,
    limitePorPagina = 7,
    setRegistros,
    setTotalResultados,
    setTotalPaginas,
    setLoadingSpiner,
    setRelistar,
    setLoading,
    
  }: {
    endpoint: string;
    queryFiltro: string;
    pagina: number;
    limitePorPagina: number;
    setRegistros: React.Dispatch<React.SetStateAction<any[]>>;
    setTotalResultados: React.Dispatch<React.SetStateAction<number>>;
    setTotalPaginas: React.Dispatch<React.SetStateAction<number>>;
    setLoadingSpiner: React.Dispatch<React.SetStateAction<boolean>>;
    setRelistar: React.Dispatch<React.SetStateAction<boolean>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  }) {
    setLoadingSpiner(true);
   requisicaoGet(`${endpoint}?${queryFiltro}&pagina=${pagina}&limite=${limitePorPagina}`)
      .then((response) => {
        if (response?.data.success) {
          console.log(response.data);

          setRegistros(response.data.registros);
          if (response.data.paginacao) {

          setTotalResultados(response.data.paginacao.total);
          setTotalPaginas(response.data.paginacao.ultimaPagina);
          }
        }
        setLoadingSpiner(false);
        setRelistar(false);
        setLoading(false);
      });

}