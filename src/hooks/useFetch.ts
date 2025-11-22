import { useEffect, useState, useCallback } from "react";
import { requisicaoGet } from "@services/requisicoes";

interface UseFetchProps {
  endpoint: string;
  queryFiltro?: string;
  relistar?: boolean;
  pagina?: number;
  limitePorPagina?: number;
  setLoadingSpiner: React.Dispatch<React.SetStateAction<boolean>>;
  setRegistros: React.Dispatch<React.SetStateAction<any>>;
  setTotalResultados: React.Dispatch<React.SetStateAction<number>>;
  setTotalPaginas: React.Dispatch<React.SetStateAction<number>>;
}

export function useFetch<T>({ endpoint, queryFiltro, relistar, pagina, limitePorPagina, setLoadingSpiner,setRegistros, setTotalResultados, setTotalPaginas}: UseFetchProps) {
  const [data, setData] = useState<T | null>(null);

  const buscarDados = useCallback(async () => {
    setLoadingSpiner(true);
    try {
      const response = await requisicaoGet(`${endpoint}?${queryFiltro}&pagina=${pagina}&limite=${limitePorPagina}`);
      setRegistros(response?.data.registros);
      if(response.data.paginacao) {
        setTotalResultados(response.data.paginacao.total);
        setTotalPaginas(response.data.paginacao.ultimaPagina);
      }
      setData(response?.data ?? null);
    } catch (err) {
      setData(null);
    } finally {
      setLoadingSpiner(false);
    }
  }, [endpoint, queryFiltro, pagina, limitePorPagina]);

  useEffect(() => {
    buscarDados();
  }, [relistar]);
  

  return {data};
}
