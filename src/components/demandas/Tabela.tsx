import { useEffect, useState } from "react";



// LOADERS
import LoadingSkeleton from "@components/loader/LoadingSkeleton";
import LoadingSpiner from "@components/loader/LoadingSpiner";

// TIPOS
import { DadosLocacao } from "@src/components/tipos";

// FUNCOES
import { getIcon } from "@src/components/icons";

// TABELA
import TabelaDinamica, { ColunaConfig, AcaoConfig } from "@src/components/comum/TabelaDinamica";

// MODAIS E FILTROS
// import EditarRegistro from "./DetalhesRegistro";
import ModalAdicionarRegistro from "./NovoRegistro";
import { FiltroCadastros } from "./FiltroRegistro";
import DetalhesRegistro from "./DetalhesRegistro";
import { usePaginacao } from "@src/hooks/UsePaginacao";
import { useDemandas } from "@src/context/DemandasContext";
import DiasSemanaCards from "./DiasSemanaCards";
import { useDiasSemana } from "./useDiasSemana";
import { Delete } from "@src/services/crud2";

import { BsFillArrowDownLeftSquareFill, BsFillArrowUpRightSquareFill } from "react-icons/bs";
import { enviarWhatsapp } from "./whatsapp";
import { buscarDados } from "./BuscarDados";

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
    } = useDemandas();

  {/* Hook que controla a paginacao */}
    const {
      pagina, setPagina,
      queryFiltro, setQueryFiltro,
      limitePorPagina, setLimitePorPagina,
      totalPaginas, setTotalPaginas,
      totalResultados, setTotalResultados
    } = usePaginacao();

    const { dias, selecionado, setSelecionado } = useDiasSemana();

      // Configuração das colunas da tabela
      const colunas: ColunaConfig<DadosLocacao>[] = [
        {
          key: "tipo",
          label: "TIPO",
          render: (registro) => { 
          const isEntrega = registro.data_inicio === selecionado.dataFormatada;

          return (
            <div className="flex items-center justify-center gap-2">
              {isEntrega ? (
                <>
                  <BsFillArrowUpRightSquareFill size={18} className="text-green-600" />
                  <span className="font-medium text-green-700">ENTREGA</span>
                </>
              ) : (
                <>
                  <BsFillArrowDownLeftSquareFill size={18} className="text-blue-600" />
                  <span className="font-medium text-blue-700">COLETA</span>
                </>
              )}
            </div>
          );
        },
        },
        {
          key: "bairro",
          label: "BAIRRO",
          render: (registro) => registro.dados_locacao?.bairro || "-",
        },
        {
          key: "cliente",
          label: "CLIENTE",
          render: (registro) => registro.dados_locacao?.cliente_nome || "-",
        },
      ];
    
      // Configuração das ações da tabela
      const acoes: AcaoConfig<any>[] = [
         {
          icon: <div className="cursor-pointer">{getIcon("whatsapp", 20)}</div>,
          tooltip: "Enviar Whatsapp",
          onClick: (registro) => {
            enviarWhatsapp(registro, selecionado);
          },
        },
        
      ];

      const iconeItem = () => (
    <div className="bg-[var(--base-color)] rounded-lg p-2">
      {getIcon("demandas", 25)}
    </div>
  );
    

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

  useEffect(() => {
      setQueryFiltro(`dia=${selecionado.dataFormatada}`);
    }, [selecionado]);

  {/* Busca Dados da Api */}
  useEffect(() => {
    setLimitePorPagina(500);
    if (!queryFiltro) return;
      buscarDados({endpoint: `/locacoes`,
        queryFiltro, pagina, limitePorPagina, setRegistros, setTotalResultados, setTotalPaginas, setLoadingSpiner, setRelistar, setLoading});
        
  }, [pagina, limitePorPagina, queryFiltro, relistar]);



  if (loading) return <LoadingSkeleton />;
  return (
    <>

    <DiasSemanaCards 
      dias={dias} 
      selecionado={selecionado} 
      setSelecionado={setSelecionado} 
    />

      {/* Listagem Dados */}
      <LoadingSpiner loading={loadingSpiner}>
        <TabelaDinamica<any>
          dados={registros.filter(r => r.status !== "finalizado")}
          colunas={colunas}
          acoes={acoes}
          iconeItem={iconeItem}
          keyExtractor={(item) => item.id ?? 0}
          mensagemVazia="Nenhum registro encontrado"
          className="text-center divide-y divide-[var(--base-color)] mt-3 rounded-lg"
        />
      </LoadingSpiner>
        
      {/* Modais */}
      {abrirModalDetalhesRegistro && selectedRegistro && <DetalhesRegistro/>}
      {abrirModalNovoRegistro && <ModalAdicionarRegistro/>}
    </>
  );
}

export default Tabela;



