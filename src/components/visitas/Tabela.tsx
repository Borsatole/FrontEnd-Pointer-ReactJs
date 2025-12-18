import { useEffect, useState } from "react";

import dayjs from "dayjs";
import "dayjs/locale/pt-br";

import { formatarDataHumana } from "@src/utils/formatarDataHumana";


// REQUISICOES E CRUD
import { requisicaoGet } from "@services/requisicoes";

// LOADERS
import LoadingSkeleton from "@components/loader/LoadingSkeleton";
import LoadingSpiner from "@components/loader/LoadingSpiner";

// TIPOS

// FUNCOES

import { Button } from "@components/comum/button";
import { getIcon } from "@src/components/icons";

// TABELA
import { MostrarNumeroDeResultados, Rodape } from "@src/components/comum/tabelas";
import TabelaDinamica, { ColunaConfig, AcaoConfig } from "@src/components/comum/TabelaDinamica";

// MODAIS E FILTROS
import ModalEditarRegistro from "@src/components/clientes/EditarRegistro";
import ModalAdicionarRegistro from "./NovoRegistro";

import { FiltroCadastros } from "./FiltroRegistro";
import { Delete } from "@src/services/crud2";
import { usePaginacao } from "@src/hooks/UsePaginacao";
import { useVisitas } from "@src/context/VisitasContext";
import { useParams } from "react-router-dom";

import { FaUser } from "react-icons/fa";
import Modal from '@src/components/modal/Modal';
import { TextArea } from "../comum/input";
import ModalMensagem from "./ModalMensagem";


function Tabela() {

  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  const [abrirModalMensagem, setAbrirModalMensagem] = useState(false);
  const [mensagemSelecionada, setMensagemSelecionada] = useState<string | null>(null);

  dayjs.locale("pt-br");
  

  // Contexto que controla a tabela.tsx
  const {
    registros, setRegistros,
    relistar, setRelistar,
    loadingSpiner, setLoadingSpiner,
    selectedRegistro, setSelectedRegistro,
    abrirModalNovoRegistro, setAbrirModalNovoRegistro,
    abrirModalEditarRegistro, setAbrirModalEditarRegistro
  } = useVisitas();

  // Hook que controla a paginacao
  const {
    pagina, setPagina,
    queryFiltro, setQueryFiltro,
    limitePorPagina, setLimitePorPagina,
    totalPaginas, setTotalPaginas,
    totalResultados, setTotalResultados
  } = usePaginacao();

  


  // Configuração das colunas da tabela
  const colunas: ColunaConfig<any>[] = [
    
    {
      key: "entrada",
      label: "ENTRADA",
      render: (registro) =>
        registro.entrada
          ? formatarDataHumana(registro.entrada)
          : "-",
    },
    {
      key: "saida",
      label: "SAIDA",
      render: (registro) =>
        registro.saida
          ? formatarDataHumana(registro.entrada)
          : "-",
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
    {
      key: "mensagem",
      label: "MENSAGEM",
      render: (registro) => (
        <div className="flex items-center justify-center">
          <span className="underline cursor-pointer"
            onClick={() => {
              setMensagemSelecionada(registro.mensagem);
              setAbrirModalMensagem(true);
            }}
          >
            ver mensagem
          </span>
        </div>
      ),
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
        Delete({registro,registros, setRegistros, endpoint: `/visitas/${registro.id}`,
                antesDeExecutar : () => {
                  setLoadingSpiner(true);
                },
                depoisDeExecutar : () => {
                  setLoadingSpiner(false);
                  // setRelistar(true);
                },
        });
        setSelectedRegistro(null);
      }
        
        
    },
  ];

  // Função para renderizar o ícone de cada linha
  const iconeItem = () => (
    <div className="bg-[var(--base-color)] rounded-lg p-2">
      {getIcon("visitas", 25)}
    </div>
  );



    useEffect(() => {
      buscarDados({
        endpoint: "/visitas",
        queryFiltro: `id_condominio=${id}&${queryFiltro}`,
        pagina,
        limitePorPagina,
        setRegistros,
        setTotalResultados,
        setTotalPaginas,
        setLoadingSpiner,
        setRelistar,
        setLoading
      });
}, [pagina, limitePorPagina, queryFiltro, relistar, id]);


  

  if (loading) return <LoadingSkeleton />;

  return (
    <>
    

      <BotaoNovoRegistro onClick={() => setAbrirModalNovoRegistro(true)} />
      <FiltroCadastros onFiltrar={setQueryFiltro}/>

      

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
      {totalResultados > 0 && (
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


      {abrirModalMensagem && 
      <ModalMensagem
        abrirModalMensagem={abrirModalMensagem} 
        setAbrirModalMensagem={setAbrirModalMensagem} 
        mensagemSelecionada={mensagemSelecionada} 
      />
      }
    </>
  );
}

export default Tabela;


function BotaoNovoRegistro({ onClick }: { onClick: () => void }) {
  return (
    <div className="flex justify-between">
        <Button onClick={onClick} className="mb-3">
          <p className="flex items-center gap-2">
            {getIcon("clientes", 20)}
            <span>Criar Cliente</span>
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
    setRegistros: React.Dispatch<React.SetStateAction<any[]>>;
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
          setTotalResultados(response.data.paginacao.total);
          setTotalPaginas(response.data.paginacao.ultimaPagina);
        }
        setLoadingSpiner(false);
        setRelistar(false);
        setLoading(false);
      });
}


