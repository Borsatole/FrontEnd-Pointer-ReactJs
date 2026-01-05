import { useEffect, useState } from "react";

// REQUISICOES E CRUD
import { requisicaoGet } from "@services/requisicoes";

// LOADERS
import LoadingSkeleton from "@components/loader/LoadingSkeleton";
import LoadingSpiner from "@components/loader/LoadingSpiner";

// FUNCOES
import { MaxCaracteres } from "@src/services/funcoes-globais";
import { LetraMaiuscula } from "@services/funcoes-globais";
import { Button } from "@components/comum/button";
import { getIcon } from "@src/components/icons";

// TABELA
import {
  MostrarNumeroDeResultados,
  Rodape,
} from "@src/components/comum/tabelas";
import TabelaDinamica, {
  ColunaConfig,
  AcaoConfig,
} from "@src/components/comum/TabelaDinamica";

// MODAIS E FILTROS
import ModalEditarRegistro from "@src/components/vistorias/EditarRegistro";
import ModalAdicionarRegistro from "./NovoRegistro";

import { FiltroCadastros } from "./FiltroRegistro";
import { Delete, Read } from "@src/services/crud2";
import { usePaginacao } from "@src/hooks/UsePaginacao";
import { FaUser } from "react-icons/fa";
import { formatarDataHumana } from "@src/utils/formatarDataHumana";
import { useVistorias } from "@src/context/VistoriasContext";
import { useParams } from "react-router-dom";

function Tabela() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  // Contexto que controla a tabela.tsx
  const {
    registros,
    setRegistros,
    relistar,
    setRelistar,
    loadingSpiner,
    setLoadingSpiner,
    selectedRegistro,
    setSelectedRegistro,
    abrirModalNovoRegistro,
    setAbrirModalNovoRegistro,
    abrirModalEditarRegistro,
    setAbrirModalEditarRegistro,
  } = useVistorias();

  // Hook que controla a paginacao
  const {
    pagina,
    setPagina,
    queryFiltro,
    setQueryFiltro,
    limitePorPagina,
    setLimitePorPagina,
    totalPaginas,
    setTotalPaginas,
    totalResultados,
    setTotalResultados,
  } = usePaginacao();

  // Configuração das colunas da tabela
  const colunas: ColunaConfig<any>[] = [
    {
      key: "id",
      label: "ID",
      render: (registro) => registro.id || "-",
    },
    {
      key: "data",
      label: "DATA",
      render: (registro) =>
        registro.created_at ? formatarDataHumana(registro.created_at) : "-",
    },
    {
      key: "condominio",
      label: "CONDOMINIO",
      render: (registro) => registro.condominio_nome,
    },
    {
      key: "responsavel",
      label: "RESPONSAVEL",
      render: (registro) => {
        let responsavel = registro.responsavel_nome || "-";

        return (
          <div className="flex items-center justify-center">
            <span className="w-full text-center flex items-center gap-2 justify-center font-medium text-primary bg-[var(--corPrincipal)] text-[var(--text-white)] px-2 py-1 rounded">
              <FaUser />
              {responsavel.split(" ")[0]}
            </span>
          </div>
        );
      },
    },
  ];

  // Configuração das ações da tabela
  const acoes: AcaoConfig<any>[] = [
    {
      icon: <div className="cursor-pointer">{getIcon("editar", 20)}</div>,
      tooltip: "Editar",
      onClick: (registro) => {
        setSelectedRegistro(registro);
        setAbrirModalEditarRegistro(true);
      },
    },
    {
      icon: <div className="cursor-pointer">{getIcon("deletar", 20)}</div>,
      tooltip: "Excluir",
      onClick: (registro) => {
        Delete({
          registro,
          registros,
          setRegistros,
          endpoint: `/vistorias/${registro.id}`,
          antesDeExecutar: () => {
            setLoadingSpiner(true);
          },
          depoisDeExecutar: () => {
            setLoadingSpiner(false);
            // setRelistar(true);
          },
        });
        setSelectedRegistro(null);
      },
    },
  ];

  // Função para renderizar o ícone de cada linha
  const iconeItem = () => (
    <div className="bg-[var(--base-color)] rounded-lg p-2">
      {getIcon("vistorias", 25)}
    </div>
  );

  useEffect(() => {
    Read({
      endpoint: `/vistorias`,
      queryFiltro: `${id ? `id_condominio=${id}` : ""}`,
      pagina,
      limitePorPagina,
      setRegistros,
      setTotalResultados,
      setTotalPaginas,
      setLoadingSpiner,
      setRelistar,
      setLoading,
    });
  }, [pagina, limitePorPagina, queryFiltro]);

  useEffect(() => {
    if (!relistar) return;

    Read({
      endpoint: `/vistorias`,
      queryFiltro: `${id ? `id_condominio=${id}` : ""}`,
      pagina,
      limitePorPagina,
      setRegistros,
      setTotalResultados,
      setTotalPaginas,
      setLoadingSpiner,
      setRelistar,
      setLoading,
    });
  }, [relistar]);

  if (loading) return <LoadingSkeleton />;
  return (
    <>
      <BotaoNovoRegistro onClick={() => setAbrirModalNovoRegistro(true)} />
      {/* <FiltroCadastros onFiltrar={setQueryFiltro} /> */}

      <div className="flex justify-between items-center m-3">
        <MostrarNumeroDeResultados totalResultados={totalResultados} />
      </div>

      {/* Tabela dinâmica */}
      <LoadingSpiner loading={loadingSpiner}>
        <TabelaDinamica<any>
          dados={registros}
          colunas={colunas}
          acoes={acoes}
          iconeItem={iconeItem}
          keyExtractor={(item) => item.id ?? 0}
          mensagemVazia="Nenhum cadastro encontrado"
          className="text-center divide-y divide-[var(--base-color)] mt-3 rounded-lg"
        />
      </LoadingSpiner>

      {/* Rodapé da tabela */}
      {totalResultados > limitePorPagina && (
        <Rodape
          pagina={pagina}
          limitePorPagina={limitePorPagina}
          registros={registros}
          totalResultados={totalResultados}
          totalPaginas={totalPaginas}
          setPagina={setPagina}
          setLimitePorPagina={setLimitePorPagina}
        />
      )}

      {/* Modais */}

      {abrirModalEditarRegistro && selectedRegistro && <ModalEditarRegistro />}
      {abrirModalNovoRegistro && <ModalAdicionarRegistro />}
    </>
  );
}

export default Tabela;

function BotaoNovoRegistro({ onClick }: { onClick: () => void }) {
  return (
    <div className="flex justify-between">
      <Button onClick={onClick} className="mb-3">
        <p className="flex items-center gap-2">
          {getIcon("vistorias", 20)}
          <span>Nova Vistoria</span>
        </p>
      </Button>
    </div>
  );
}
