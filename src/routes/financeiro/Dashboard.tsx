import ContainerSecundario from "@src/components/comum/containerSecundario";
import CardOrders from "@src/components/comum/CardStats";
import GraficoEntradaESaida from "@src/components/financeiro/graficoEntradaESaida";
import SelectMesAno from "@src/components/financeiro/selectMes";
import Tabela from "@src/components/financeiro/Tabela";
import dayjs from "dayjs";
import React, { useEffect, useMemo, useState } from "react";
import { UseTabela } from "@src/components/comum/Tabelas/TabelaContext";
import { useFiltro } from "@src/hooks/useFiltros";
import { useBuscarDados } from "@src/hooks/UseBuscarDadosTabela";
import LoadingSpiner from "@src/components/loader/LoadingSpiner";
import { formatarDinheiro } from "@src/shared/utils/dinheiro";
import { HiTrendingUp } from "react-icons/hi";
import ListarCategorias from "./ListarCategorias";
import ContainerCaixa from "@src/components/comum/ContainerCaixa";
import { FinanceiroViewService } from "@src/services/modules/financeiro/financeirtoViewsService";
import PaginaNaoEncontrada from "@src/components/comum/PaginaNaoEncontrada";

type Registro = {
  id: number;
  tipo: "entrada" | "saida";
  categoria: string;
  valor: number;
  pago: boolean;
  data: string;
};
type TotaisPeriodo = {
  Entradas: number;
  Saidas: number;
  Lucro: number;
};

type RelatorioCondominio = {
  condominio_id: number;
  condominio_nome: string;
  total_entrada: number;
  total_saida: number;
  saldo: number;
  categorias: {
    entrada: Record<string, number>;
    saida: Record<string, number>;
  };
};

function Dashboard() {
  const [mesSelecionado, setMesSelecionado] = useState<number | null>(null);
  const [anoSelecionado, setAnoSelecionado] = useState<number | null>(null);
  const [relatorio, setRelatorio] = useState<RelatorioCondominio[]>([]);
  const [visualizacaoMeses, setVisualizacaoMeses] = useState(3);
  const [dadosVisualizacao, setDadosVisualizacao] = useState<TotaisPeriodo>({
    Entradas: 0,
    Saidas: 0,
    Lucro: 0,
  });

  useEffect(() => {
    console.log(mesSelecionado);
  }, [mesSelecionado]);

  const { filtros, setFiltros, queryString } = useFiltro({
    data_minima: dayjs().startOf("month").format("YYYY-MM-DD"),
    data_maxima: dayjs().endOf("month").format("YYYY-MM-DD"),
  });

  useBuscarDados({
    endpoint: `/financeiro`,
    queryFiltro: queryString,
  });

  useEffect(() => {
    FinanceiroViewService.relatorioVisaoGeral({
      data_minima: filtros.data_minima,
      data_maxima: filtros.data_maxima,
    })
      .then((res) => {
        setRelatorio(res.data.registro);
      })
      .catch(console.error);
  }, [filtros.data_minima, filtros.data_maxima]);

  // useEffect(() => {
  //   console.log(relatorio);
  // }, [relatorio]);

  const {
    registros,
    data,
    loading,
    abrirModalNovoRegistro,
    abrirModalEditarRegistro,
    selectedRegistro,

    setAbrirModalNovoRegistro,
  } = UseTabela();

  useEffect(() => {
    if (data?.totalPorPeriodo) {
      setDadosVisualizacao(data.totalPorPeriodo);
    }
  }, [data]);

  const handlePeriodo = ({ mes, ano }: { mes: number; ano: number }) => {
    const data = dayjs(`${ano}-${mes}-01`);

    setMesSelecionado(Number(mes));
    setAnoSelecionado(Number(ano));

    setFiltros((prev: any) => ({
      ...prev,
      data_minima: data.startOf("month").format("YYYY-MM-DD"),
      data_maxima: data.endOf("month").format("YYYY-MM-DD"),
    }));
  };

  return (
    <LoadingSpiner loading={loading}>
      <SelectMesAno onChange={handlePeriodo} />

      {relatorio.length === 0 ? (
        <ContainerCaixa>
          <div className="py-12 text-center">
            <h3 className="text-lg font-semibold text-gray-600">
              Nenhum lançamento encontrado
            </h3>

            <p className="text-sm text-gray-400 mt-2">
              Não existem movimentações financeiras para o período selecionado.
            </p>
          </div>
        </ContainerCaixa>
      ) : (
        relatorio.map((condominio) => (
          <ContainerCaixa key={condominio.condominio_id}>
            <h2 className="text-lg font-semibold mb-4">
              {condominio.condominio_nome}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <CardOrders
                titulo="Entradas"
                textoRodape="Soma de Entradas"
                valor={formatarDinheiro(condominio.total_entrada)}
                cor="#10b981"
                corRodape="#059669"
                corRodapeHover="#047857"
                icone={<HiTrendingUp />}
              />

              <CardOrders
                titulo="Saídas"
                textoRodape="Soma de Saídas"
                valor={formatarDinheiro(condominio.total_saida)}
                cor="#ef4444"
                corRodape="#b91c1c"
                corRodapeHover="#991b1b"
                icone={<HiTrendingUp />}
              />

              <CardOrders
                titulo="Saldo"
                textoRodape="Saldo Total"
                valor={formatarDinheiro(condominio.saldo)}
                cor="#f1c40f"
                corRodape="#f59e0b"
                corRodapeHover="#d97706"
                icone={<HiTrendingUp />}
              />
            </div>

            <ListarCategorias categorias={condominio.categorias} />
          </ContainerCaixa>
        ))
      )}
    </LoadingSpiner>
  );
}

export default Dashboard;
