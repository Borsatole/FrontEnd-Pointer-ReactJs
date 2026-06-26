// LOADERS
import LoadingSpiner from "@components/loader/LoadingSpiner";

// FUNCOES
import { getIcon } from "@src/components/icons";

// TABELA
import TabelaDinamica from "@src/components/comum/TabelaDinamica";

// MODAIS E FILTROS
// import ModalEditarRegistro from "./EditarRegistro";
// import ModalAdicionarRegistro from "./NovoRegistro";

import Novoregistrobtn from "@src/components/comum/Tabelas/Novoregistrobtn";
import { UseTabela } from "@src/components/comum/Tabelas/TabelaContext";
import StatsFinanceiro from "./Stats";
import { FiltroUniversal } from "@src/components/comum/FiltroUniversal";
import { useFiltro } from "@src/hooks/useFiltros";
import dayjs from "dayjs";
import { useBuscarDados } from "@src/hooks/UseBuscarDadosTabela";
import { colunas } from "./tabelaColunas";
import { useTabelaAcoes } from "./tabelaAcoes";
import Paginacao from "@src/components/comum/Paginacao";
import { useNavigate } from "react-router-dom";
import { Condominio } from "@src/components/tipos";
import { useEffect, useState } from "react";
import { condominioService } from "@src/services/modules/condominios/condominioService";

type Config = {
  endpoint: string;
  icone?: string;
};

const config: Config = {
  endpoint: "/financeiro",
  icone: "contasfixas",
};

function Tabela() {
  const navigate = useNavigate();
  const [condominios, setCondominios] = useState<Condominio[]>([]);
  const { filtros, setFiltros, queryString } = useFiltro({
    tipo_movimentacao: "saida",
    data_minima: dayjs().startOf("month").format("YYYY-MM-DD"),
    data_maxima: dayjs().endOf("month").format("YYYY-MM-DD"),
  });

  useBuscarDados({
    endpoint: config.endpoint,
    queryFiltro: queryString,
  });

  // Contexto que controla a tabela.tsx
  const {
    registros,
    data,
    loading,
    abrirModalNovoRegistro,
    abrirModalEditarRegistro,
    selectedRegistro,

    setAbrirModalNovoRegistro,
  } = UseTabela();

  const acoes = useTabelaAcoes({
    endpoint: config.endpoint,
  });

  // Função para renderizar o ícone de cada linha
  const iconeItem = () => (
    <div className="bg-[var(--base-color)]/10 rounded-lg p-2">
      {getIcon("contasfixas", 25)}
    </div>
  );

  useEffect(() => {
    condominioService
      .listar({})
      .then((dados) => {
        console.log(dados);
        setCondominios(dados.registros || []);
      })
      .catch(console.error);
  }, []);

  return (
    <>
      <Novoregistrobtn
        icone={config.icone}
        onClick={() => navigate("/financeiro/pagar/create")}
      />
      <StatsFinanceiro />

      <FiltroUniversal
        filtros={filtros}
        setFiltros={setFiltros}
        expandir={false}
        campos={[
          {
            name: "id_condominio",
            label: "CONDOMINIO",
            type: "select",
            options: condominios,
            labelKey: "nome",
            valueKey: "id",
          },
          {
            name: "data_minima",
            label: "DATA INICIO",
            type: "date",
            defaultValue: dayjs().startOf("month").format("YYYY-MM-DD"),
          },
          {
            name: "data_maxima",
            label: "DATA FIM",
            type: "date",
            defaultValue: dayjs().endOf("month").format("YYYY-MM-DD"),
          },
          {
            name: "descricao",
            label: "DESCRIÇÃO",
            type: "text",
          },
          {
            name: "id_categoria",
            label: "CATEGORIA",
            type: "select",
            options: data?.categorias_saida || [],
            labelKey: "categoria_item",
            valueKey: "id",
          },
          {
            name: "status",
            label: "STATUS",
            type: "select",
            options: [{ status: "Pendente" }, { status: "Concluido" }],
            labelKey: "status",
            valueKey: "status",
          },
        ]}
      />

      {/* Tabela dinâmica */}
      <LoadingSpiner loading={loading}>
        <TabelaDinamica<any>
          dados={registros}
          colunas={colunas}
          acoes={acoes}
          iconeItem={iconeItem}
          keyExtractor={(item) => item.id ?? 0}
          mensagemVazia="Nenhum cadastro encontrado"
          className="text-center divide-y divide-[var(--base-color)] mt-3 rounded-lg"
        />

        <Paginacao />
      </LoadingSpiner>

      {/* Modais */}
      {/* {abrirModalEditarRegistro && selectedRegistro && <ModalEditarRegistro />}
      {abrirModalNovoRegistro && <ModalAdicionarRegistro />} */}
    </>
  );
}

export default Tabela;
