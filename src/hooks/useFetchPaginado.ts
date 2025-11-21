import { useEffect, useState, useCallback } from "react";
import { requisicaoGet } from "@services/requisicoes";

interface UseFetchPaginadoOptions {
  url: string;
  pagina: number;
  limite: number;
  filtro?: string;
  relistar?: boolean;
}

export function useFetchPaginado<T>({
  url,
  pagina,
  limite,
  filtro = "",
  relistar = false,
}: UseFetchPaginadoOptions) {

  const [dados, setDados] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalResultados, setTotalResultados] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(1);

  const carregar = useCallback(() => {
    setLoading(true);

    // Remove barra dupla se existir
    const endpoint = url.startsWith('/') ? url : `/${url}`;
    const query = filtro ? `${filtro}&pagina=${pagina}&limite=${limite}` : `pagina=${pagina}&limite=${limite}`;

    requisicaoGet(`${endpoint}?${query}`)
      .then((response) => {
        if (response?.data.success) {
          setDados(response.data.registros);
          setTotalResultados(response.data.paginacao.total);
          setTotalPaginas(response.data.paginacao.ultimaPagina);
        }
      })
      .catch((error) => {
        console.error("Erro ao carregar dados:", error);
        setDados([]);
      })
      .finally(() => setLoading(false));
  }, [url, pagina, limite, filtro]);

  useEffect(() => {
    carregar();
  }, [carregar, relistar]); // relistar força recarregar

  return {
    dados,
    loading,
    totalResultados,
    totalPaginas,
    setDados,
    carregar
  };
}