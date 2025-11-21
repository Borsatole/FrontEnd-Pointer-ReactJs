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


function Tabela() {
  
  const [registros, setRegistros] = useState<GrupoEstoque[]>([]);
  const [selectedProduto, setSelectedProduto] = useState<ItemEstoque | null>(null);
  const [pagina, setPagina] = useState(1);
  const [relistar, setRelistar] = useState(false);
  const [queryFiltro, setQueryFiltro] = useState("");

  // Parâmetros de paginação
  const [limitePorPagina, setLimitePorPagina] = useState(7);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [totalResultados, setTotalResultados] = useState(0);

  const [loading, setLoading] = useState(true);
  const [loadingSpiner, setLoadingSpiner] = useState(true);

  // MODAL NOVO, EDITAR E DETALHES
  const [AbrirModalNovoRegistro, setAbrirModalNovoRegistro] = useState(false);
  const [AbrirModalEditarRegistro, setAbrirModalEditarRegistro] = useState(false);
  const [AbrirModalDetalhesRegistro, setAbrirModalDetalhesRegistro] = useState(false);


  // MODAL NOVA LOCACAO E RETIRADA
  const [AbrirModalRegistrarRetirada, setAbrirModalRegistrarRetirada] = useState(false);
  const [AbrirModalRegistrarLocacao, setAbrirModalRegistrarLocacao] = useState(false);


  // FECHAR MODAIS
 useEffect(() => {
    if (selectedProduto === null) {
      setAbrirModalDetalhesRegistro(false);
      setAbrirModalEditarRegistro(false);
      setAbrirModalRegistrarRetirada(false);
      setAbrirModalRegistrarLocacao(false);
    }
  }, [selectedProduto]);


 
  useEffect(() => {
     setLoadingSpiner(true);
    requisicaoGet(`/estoque?${queryFiltro}&pagina=${pagina}&limite=${limitePorPagina}`)
      .then((response) => {
        if (response?.data.success) {
          console.log(response.data.registros);
          setRegistros(response.data.registros);

          if (response.data.paginacao) {
            setTotalPaginas(response.data.paginacao.ultimaPagina);
            setTotalResultados(response.data.paginacao.total);
          }
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
      <div className="flex justify-items-start gap-1">
        <Button onClick={() => setAbrirModalNovoRegistro(true)} className="mb-3">
          <p className="flex items-center gap-2">
            {getIcon("estoque", 20)}
            <span>Criar Estoque</span>
          </p>
        </Button>

      </div>

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
                setSelectedProduto={setSelectedProduto}
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

      {/* Modal Detalhes */}
      {AbrirModalDetalhesRegistro && selectedProduto && (
        <DetalhesRegistro
          selectedProduto={selectedProduto}
          setSelectedProduto={setSelectedProduto}
        />
      )}

      {/* Modal Registrar Retirada */}
      {AbrirModalRegistrarRetirada && selectedProduto && (
      <RetiradaRegistro
        setRelistar={setRelistar}
        selectedProduto={selectedProduto}
        setSelectedProduto={setSelectedProduto}
      />
      )}

      {AbrirModalNovoRegistro && (
        <ModalAdicionarRegistro
          AbrirModalNovoRegistro={AbrirModalNovoRegistro}
          setAbrirModalNovoRegistro={setAbrirModalNovoRegistro}
          registros={registros}
          selectedProduto={selectedProduto}
          setSelectedProduto={setSelectedProduto}
          setRegistros={setRegistros}
          setRelistar={setRelistar}
          setLoadingSpiner={setLoadingSpiner}
        />
      )}
    </>
  );
}

export default Tabela;