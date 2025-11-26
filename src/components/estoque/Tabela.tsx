import { useEffect, useState } from "react";


// REQUISICOES E CRUD
import { requisicaoGet } from "@services/requisicoes";

// LOADERS
import LoadingSkeleton from "@components/loader/LoadingSkeleton";
import LoadingSpiner from "@components/loader/LoadingSpiner";

// TIPOS
import { DadosLocacao, GrupoEstoque, ItemEstoque } from "@src/components/tipos";

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
import CardCacambaEstoque from "./CardCacambaEstoque";
import DetalhesRegistro from "./DetalhesRegistro";
import RetiradaRegistro from "./RetiradaRegistro";
import { usePaginacao } from "@src/hooks/UsePaginacao";
import { useEstoque } from "@src/context/EstoqueContext";
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
    } = useEstoque();

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
    console.log(selectedRegistro);
      if (selectedRegistro === null) {
        setAbrirModalDetalhesRegistro(false);
        setAbrirModalEditarRegistro(false);
        setAbrirModalRegistrarRetirada(false);
        setAbrirModalRegistrarLocacao(false);

      }
    }, [selectedRegistro]);

  {/* Busca Dados da Api */}
  useEffect(() => {
      buscarDados({endpoint: `/estoque`,
        queryFiltro, pagina, limitePorPagina, setRegistros, setTotalResultados, setTotalPaginas, setLoadingSpiner, setRelistar, setLoading});
  }, [pagina, limitePorPagina, queryFiltro, relistar]);


  if (loading) return <LoadingSkeleton />;
  return (
    <>

      {/* Listagem Dados */}
      <LoadingSpiner loading={loadingSpiner}>
        

        {registros.map((registro, i) => (
        <div
          key={i}
          className="grid mt-3 sm:grid-cols-2 md:grid-cols-3 gap-3 md:mx-auto"
        >
          <h1 className="font-bold text-xl col-span-full">
          {registro.categoria}
          </h1>

          {registro.itens.map((item, i) => (
            
            <div key={i}>
              <CardCacambaEstoque
                key={i}
                item={item}
                setSelectedRegistro={setSelectedRegistro}
                setAbrirModalNovoRegistro={setAbrirModalNovoRegistro}
                setAbrirModalDetalhesRegistro={setAbrirModalDetalhesRegistro}
                setAbrirModalRegistrarLocacao={setAbrirModalRegistrarLocacao}
                setAbrirModalRegistrarRetirada={setAbrirModalRegistrarRetirada}
              />
              
            </div>
          ))}
        </div>
        ))}

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
    setRegistros: React.Dispatch<React.SetStateAction<GrupoEstoque[]>>;
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
          // console.log(response.data);

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