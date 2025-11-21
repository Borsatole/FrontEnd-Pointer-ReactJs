import { useEffect, useState } from "react";


// REQUISICOES E CRUD
import { requisicaoGet } from "@services/requisicoes";

// LOADERS
import LoadingSkeleton from "@components/loader/LoadingSkeleton";
import LoadingSpiner from "@components/loader/LoadingSpiner";

// TIPOS
import { Cliente, Permissoes } from "@src/components/tipos";

// FUNCOES
import { Datas, MaxCaracteres, Valores } from "@src/services/funcoes-globais";
import { LetraMaiuscula } from "@services/funcoes-globais";
import { Button } from "@components/comum/button";
import { getIcon } from "@src/components/icons";

// TABELA
import { MostrarNumeroDeResultados, Rodape } from "@src/components/comum/tabelas";
import TabelaDinamica, { ColunaConfig, AcaoConfig } from "@src/components/comum/TabelaDinamica";

// MODAIS E FILTROS
import ModalEditarProduto from "./EditarRegistro";
import ModalAdicionarRegistro from "./NovoRegistro";
import { FiltroCadastros } from "./FiltroRegistro";
import { Delete } from "@src/services/crud2";


function Tabela() {
  const { dataFormatada, dataDeHoje } = Datas();
  const { dinheiro } = Valores();
  
  const [registros, setRegistros] = useState<Cliente[]>([]);
  const [selectedProduto, setSelectedProduto] = useState<Cliente | null>(null);
  const [pagina, setPagina] = useState(1);
  const [relistar, setRelistar] = useState(true);
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
  const colunas: ColunaConfig<Cliente>[] = [
    {
      key: "nome",
      label: "NOME",
      render: (registro) => LetraMaiuscula(MaxCaracteres(registro.nome || registro.razao_social, 30)),
    },
    {
      key: "celular",
      label: "CELULAR",
      render: (registro) => registro.celular || "-",
    },
    {
      key: "endereco",
      label: "BAIRRO",
      render: (registro) => {
        if (!registro.enderecos || registro.enderecos.length === 0) return "-";

        return (
          <div className="text-left">
            {registro.enderecos.map((e, i) => (
              <div key={i}>
                {LetraMaiuscula(MaxCaracteres(`${e.bairro}`, 20))}
              </div>
            ))}
          </div>
        );
      },
    },
    {
      key: "email",
      label: "E-MAIL",
      render: (registro) => registro.email || "-",
    },
  ];

  // Configuração das ações da tabela
  const acoes: AcaoConfig<Cliente>[] = [
    {
      icon: <div className="cursor-pointer">{getIcon("editar", 20)}</div>,
      tooltip: "Editar",
      onClick: (registro) => setSelectedProduto(registro),
    },
    {
      icon: <div className="cursor-pointer">{getIcon("deletar", 20)}</div>,
      tooltip: "Excluir",
      onClick: (registro) => {
        Delete({registro,registros, setRegistros, endpoint: `/clientes/${registro.id}`,
                antesDeExecutar : () => {
                  setLoadingSpiner(true);
                },
                depoisDeExecutar : () => {
                  setLoadingSpiner(false);
                  // setRelistar(true);
                },
        });
        setSelectedProduto(null);
      }
        
        
    },
  ];

  // Função para renderizar o ícone de cada linha
  const iconeItem = () => (
    <div className="bg-[var(--base-color)] rounded-lg p-2">
      {getIcon("clientes", 25)}
    </div>
  );


  useEffect(() => {
    setLoadingSpiner(true);
    requisicaoGet(`/clientes?${queryFiltro}&pagina=${pagina}&limite=${limitePorPagina}`)
      .then((response) => {
        if (response?.data.success) {
          // console.log(response.data);
          setRegistros(response.data.registros);
          setTotalResultados(response.data.paginacao.total);
          setTotalPaginas(response.data.paginacao.ultimaPagina);
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
        <Button onClick={() => setAbrirModalNovoRegistro(true)} className="mb-3">
          <p className="flex items-center gap-2">
            {getIcon("clientes", 20)}
            <span>Criar Cliente</span>
          </p>
        </Button>
      </div>

      {/* Filtros e contadores */}
      <FiltroCadastros onFiltrar={setQueryFiltro}/>

      <div className="flex justify-between items-center m-3">
      <MostrarNumeroDeResultados totalResultados={totalResultados} />
      </div>


      

      {/* Tabela dinâmica */}
      <LoadingSpiner loading={loadingSpiner}>
        <TabelaDinamica<Cliente>
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

export default Tabela;