import { useEffect, useState } from "react";
import { MdAttachMoney } from "react-icons/md";
import { CgAddR } from "react-icons/cg";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

import { PrimeraLetraMaiuscula } from "@services/funcoes-globais";
import { handleDeletar } from "./Functions";

import LoadingSkeleton from "@components/loader/LoadingSkeleton";
import LoadingSpiner from "@components/loader/LoadingSpiner";
import { requisicaoGet } from "@services/requisicoes";
import { ContaAPagar } from "./tipos";
import { Datas, Valores } from "@src/services/funcoes-globais";
import { Button } from "@components/comum/button";
import ModalEditarProduto from "./ModalEditarProduto";
import ModalAdicionarRegistro from "./ModalAdicionarProduto";
import { FiltroCadastros } from "./FiltroCadastros";
import { MostrarNumeroDeResultados, Rodape } from "@src/components/comum/tabelas";
import TabelaDinamica, { ColunaConfig, AcaoConfig } from "@src/components/comum/TabelaDinamica";

function TabelaContasFixas() {
  const { dataFormatada } = Datas();
  const { dinheiro } = Valores();
  
  const [registros, setRegistros] = useState<ContaAPagar[]>([]);
  const [selectedProduto, setSelectedProduto] = useState<ContaAPagar | null>(null);
  const [pagina, setPagina] = useState(1);
  const [relistar, setRelistar] = useState(false);
  const [queryFiltro, setQueryFiltro] = useState("");

  // Parâmetros de paginação
  const [limitePorPagina, setLimitePorPagina] = useState(7);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [totalResultados, setTotalResultados] = useState(0);

  const [loading, setLoading] = useState(true);
  const [loadingSpiner, setLoadingSpiner] = useState(true);
  const [removendoIds, setRemovendoIds] = useState<number[]>([]);
  const [AbrirModalNovoRegistro, setAbrirModalNovoRegistro] = useState(false);

  // Configuração das colunas da tabela
  const colunas: ColunaConfig<ContaAPagar>[] = [
    {
      key: "nome",
      label: "NOME",
      render: (registro) => PrimeraLetraMaiuscula(registro.nome),
    },
    {
      key: "categoria", 
      label: "CATEGORIA",
      render: (registro) => PrimeraLetraMaiuscula(registro.categoria ?? ""),
    },
    
    {
      key: "data_vencimento",
      label: "DATA VENCIMENTO", 
      render: (registro) => dataFormatada(registro.data_vencimento ?? ""),
    },
    {
      key: "valor",
      label: "VALOR",
      render: (registro) => dinheiro(registro.valor),
    },
    {
      key: "status",
      label: "STATUS",
      render: (registro) => (
        <span
          className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-white text-xs font-semibold ${
            registro.data_pagamento ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {registro.data_pagamento ? "Pago" : "Pendente"}
        </span>
      ),
    },
  ];

  // Configuração das ações da tabela
  const acoes: AcaoConfig<ContaAPagar>[] = [
    {
      icon: <FaEdit className="w-5 h-5 cursor-pointer" />,
      tooltip: "Editar",
      onClick: (registro) => setSelectedProduto(registro),
    },
    {
      icon: <FaTrashAlt className="w-5 h-5 cursor-pointer" />,
      tooltip: "Deletar", 
      onClick: (registro) => handleDeletar({ Registro: registro, setRelistar }),
    },
  ];

  // Função para renderizar o ícone de cada linha
  const iconeItem = () => (
    <div className="bg-[var(--base-color)] rounded-full">
      <MdAttachMoney className="w-12 h-12 p-3" color="var(--corPrincipal)" />
    </div>
  );


  useEffect(() => {
    setLoadingSpiner(true);
    requisicaoGet(`/Financeiro/contas-a-pagar/Read.php?${queryFiltro}&pagina=${pagina}&limite=${limitePorPagina}`)
      .then((response) => {
        if (response?.data.success) {
          setRegistros(response.data.Registros);
          setTotalResultados(response.data.total_registros);
          setTotalPaginas(response.data.total_paginas);
        }
        setLoadingSpiner(false);
        setRelistar(false);
        setLoading(false);
      });
  }, [pagina, limitePorPagina, queryFiltro, relistar]);

  if (loading) return <LoadingSkeleton />;

  return (
    <>
      {/* Botão de criar novo */}
      <div className="flex justify-between">
        <Button onClick={() => setAbrirModalNovoRegistro(true)}>
          <p className="flex items-center gap-2">
            <CgAddR size={20} />
            <span>Criar Novo</span>
          </p>
        </Button>
      </div>

      {/* Filtros e contadores */}
      <FiltroCadastros onFiltrar={setQueryFiltro} />
      <MostrarNumeroDeResultados totalResultados={totalResultados} />

      {/* Tabela dinâmica */}
      <LoadingSpiner loading={loadingSpiner}>
        <TabelaDinamica<ContaAPagar>
          dados={registros}
          colunas={colunas}
          acoes={acoes}
          iconeItem={iconeItem}
          removendoIds={removendoIds}
          keyExtractor={(item) => item.id ?? 0}
          mensagemVazia="Nenhum cadastro encontrado"
          className="text-center divide-y divide-[var(--base-color)] mt-3 rounded-lg"
        />
      </LoadingSpiner>

      {/* Rodapé da tabela */}
      <Rodape
        pagina={pagina}
        limitePorPagina={limitePorPagina}
        registros={registros}
        totalResultados={totalResultados}
        totalPaginas={totalPaginas}
        setPagina={setPagina}
        setLimitePorPagina={setLimitePorPagina}
      />

      {/* Modais */}
      {selectedProduto !== null && (
        <ModalEditarProduto
          selectedProduto={selectedProduto}
          setSelectedProduto={setSelectedProduto}
          registros={registros}
          setRegistros={setRegistros}
          setRelistar={setRelistar}
          setLoadingSpiner={setLoadingSpiner}
        />
      )}

      {AbrirModalNovoRegistro && (
        <ModalAdicionarRegistro
          AbrirModalNovoRegistro={AbrirModalNovoRegistro}
          setAbrirModalNovoRegistro={setAbrirModalNovoRegistro}
          registros={registros}
          setRegistros={setRegistros}
          setRelistar={setRelistar}
          setLoadingSpiner={setLoadingSpiner}
        />
      )}
    </>
  );
}

export default TabelaContasFixas;