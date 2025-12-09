import { useEffect, useState } from "react";


// REQUISICOES E CRUD
import { requisicaoGet } from "@services/requisicoes";

// LOADERS
import LoadingSkeleton from "@components/loader/LoadingSkeleton";
import LoadingSpiner from "@components/loader/LoadingSpiner";

// TIPOS
import { Condominio } from "@src/components/tipos";

// FUNCOES
import { Datas, Valores } from "@src/services/funcoes-globais";
import { PrimeraLetraMaiuscula } from "@services/funcoes-globais";
import { Button } from "@components/comum/button";
import { getIcon } from "@src/components/icons";

// TABELA
import { MostrarNumeroDeResultados, Rodape } from "@src/components/comum/tabelas";
import TabelaDinamica, { ColunaConfig, AcaoConfig } from "@src/components/comum/TabelaDinamica";

// MODAIS E FILTROS
// import EditarRegistro from "./DetalhesRegistro";
import ModalAdicionarRegistro from "./NovoRegistro";
import { FiltroCadastros } from "./FiltroRegistro";
import { CardCondominio } from "./CardCondominio";
import DetalhesRegistro from "./DetalhesRegistro";
import RetiradaRegistro from "./RetiradaRegistro";
import { usePaginacao } from "@src/hooks/UsePaginacao";
import { useCondominios } from "@src/context/CondominioContext";
import EditarRegistro from "./EditarRegistro";


function Tabela() {

  {/* Controla Loading do skeleton */}
    const [loading, setLoading] = useState(true);
    

  {/* Contexto que controla a tabela.tsx */}
    const {
      registros, setRegistros,
      relistar, setRelistar,
      loadingSpiner, setLoadingSpiner,
      selectedRegistro, setSelectedRegistro,
      abrirModalNovoRegistro, setAbrirModalNovoRegistro,
      abrirModalEditarRegistro, setAbrirModalEditarRegistro,
      abrirModalDetalhesRegistro, setAbrirModalDetalhesRegistro
    } = useCondominios();

    

  {/* Hook que controla a paginacao */}
    const {
      pagina, setPagina,
      queryFiltro, setQueryFiltro,
      limitePorPagina, setLimitePorPagina,
      totalPaginas, setTotalPaginas,
      totalResultados, setTotalResultados
    } = usePaginacao();

    
  {/* Controla Modais Locais */}
  const [abrirModalRegistrarRetirada, setAbrirModalRegistrarRetirada] = useState(false);
  const [abrirModalRegistrarLocacao, setAbrirModalRegistrarLocacao] = useState(false);

  {/* Fecha Todos Modais Ao Selecionar Registro */}
  useEffect(() => {
      if (selectedRegistro === null) {
        setAbrirModalDetalhesRegistro(false);
        setAbrirModalEditarRegistro(false);
        setAbrirModalRegistrarRetirada(false);
        setAbrirModalRegistrarLocacao(false);

      }
    }, [selectedRegistro]);

  {/* Busca Dados da Api */}
  useEffect(() => {
      setLimitePorPagina(500);
      buscarDados({endpoint: `/condominios`,
        queryFiltro, pagina, limitePorPagina, setRegistros, setTotalResultados, setTotalPaginas, setLoadingSpiner, setRelistar, setLoading});
  }, [pagina, limitePorPagina, queryFiltro, relistar]);


  if (loading) return <LoadingSkeleton />;
  return (
    <>

      {/* Listagem Dados */}
      <LoadingSpiner loading={loadingSpiner}>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {registros.map((registro, i) => (
            <CardCondominio
              key={i}
              item={registro}
              setSelectedRegistro={setSelectedRegistro}
              setAbrirModalNovoRegistro={setAbrirModalNovoRegistro}
              setAbrirModalEditarRegistro={setAbrirModalEditarRegistro}
              setAbrirModalDetalhesRegistro={setAbrirModalDetalhesRegistro}
            />
          ))}
        </div>
        

      </LoadingSpiner>

      {/* Modais */}
      {abrirModalDetalhesRegistro && selectedRegistro && <DetalhesRegistro/>}
      {abrirModalRegistrarRetirada && selectedRegistro && <RetiradaRegistro/>}
      
      {abrirModalEditarRegistro && selectedRegistro && <EditarRegistro/>}
      {abrirModalNovoRegistro && <ModalAdicionarRegistro/>}
    </>
  );
}

export default Tabela;


function BotaoNovoRegistro({ onClick }: { onClick: () => void }) {
  return (
    <div className="flex justify-between">
        <Button onClick={onClick} className="mb-3">
          <p className="flex items-center gap-2">
            {getIcon("estoque", 20)}
            <span>Criar Estoque</span>
          </p>
        </Button>
      </div>
  );
}

function buscarDados({
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
    setRegistros: React.Dispatch<React.SetStateAction<Condominio[]>>;
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