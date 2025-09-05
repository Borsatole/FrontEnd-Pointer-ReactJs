import { useEffect, useState } from "react";
import { Button } from "@components/comum/button";
import { handleDeletar, editarRegistro, adicionarRegistro } from "@src/services/Crud";
import {  Registros } from "./tipos";
import { requisicaoGet } from "@services/requisicoes";
import LoadingSpiner from "@components/loader/LoadingSpiner";
import { FaEdit, FaTag, FaTrashAlt } from "react-icons/fa";
import { RiHotelFill } from "react-icons/ri";


import LoadingSkeleton from "@src/components/loader/LoadingSkeleton";
import { PrimeraLetraMaiuscula } from "@src/services/funcoes-globais";

import TabelaDinamica, { ColunaConfig, AcaoConfig } from "@src/components/comum/TabelaDinamica";
import { MostrarNumeroDeResultados, Rodape } from "@src/components/comum/tabelas";
import ModalEditarRegistro from "./ModalEditarRegistro";
import ModalAdicionarRegistro from "./ModalAdicionarRegistro";
import { CgAddR } from "react-icons/cg";



function Tabela() {

  // Estados principais
  const [registros, setRegistros] = useState<Registros[]>([
  {
    id: 0,
    nome: "Belvedere",
    telefone: 14997172257,
    rua: "Rua Belvedere",
    notificacoes: [
      {
        id: 0,
        titulo: "Assembleia marcada",
        mensagem: "A próxima assembleia ocorrerá dia 20/09 às 19h no salão de festas.",
        data: "2025-09-01 18:30",
        lida: false,
      },
      {
        id: 1,
        titulo: "Pagamento em atraso",
        mensagem: "O morador do apto 203 está com a taxa condominial em atraso há 15 dias.",
        data: "2025-09-02 10:15",
        lida: false,
      },
      {
        id: 2,
        titulo: "Manutenção programada",
        mensagem: "A limpeza da caixa d’água será realizada no dia 10/09 das 8h às 12h.",
        data: "2025-09-03 09:00",
        lida: false,
      },
      {
        id: 3,
        titulo: "Ocorrência registrada",
        mensagem: "Foi registrada reclamação de barulho no apto 502 após 23h. Foi registrada reclamação de barulho no apto 502 após 23h. Foi registrada reclamação de barulho no apto 502 após 23h.",
        data: "2025-09-04 23:45",
        lida: false,
      },
      {
        id: 4,
        titulo: "Serviço concluído",
        mensagem: "A troca das lâmpadas do estacionamento foi concluída com sucesso.",
        data: "2025-09-05 14:20",
        lida: true,
      },
    ],
  },
  { id: 1, nome: "Plaza D' España", notificacoes: [] },
  { id: 2, nome: "Piazza San Marco", notificacoes: [] },
  { id: 3, nome: "Park de France", notificacoes: [] },
  { id: 4, nome: "Infante Dom Henrique", notificacoes: [] },
  { id: 5, nome: "Edmundo Pellini", notificacoes: [] },
  { id: 6, nome: "Lumina Home", notificacoes: [] },
  { id: 7, nome: "Lumina Office", notificacoes: [] },
  { id: 8, nome: "Enseada", notificacoes: [] },
  { id: 9, nome: "Enseada", notificacoes: [] },
  { id: 10, nome: "Caiobá", notificacoes: [] },
  { id: 11, nome: "Villagio Belvedere", notificacoes: [] },
  { id: 12, nome: "La Savina", notificacoes: [] },
  { id: 13, nome: "Pasárgada", notificacoes: [] },
  { id: 14, nome: "Premiato", notificacoes: [] },
  { id: 15, nome: "Araucária", notificacoes: [] },
  { id: 16, nome: "Fontainebleau", notificacoes: [] },
]);

  const [selectedProduto, setSelectedProduto] = useState<Registros | null>(null);

  // Estados de paginação
  const [pagina, setPagina] = useState(1);
  const [limitePorPagina, setLimitePorPagina] = useState(10000);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [totalResultados, setTotalResultados] = useState(0);

  // Estados de controle
  const [relistar, setRelistar] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingSpiner, setLoadingSpiner] = useState(true);
  const [removendoIds, setRemovendoIds] = useState<number[]>([]);
  const [AbrirModalNovoRegistro, setAbrirModalNovoRegistro] = useState(false);


  // Configuração das colunas da tabela
  const colunas: ColunaConfig<Registros>[] = [
    {
      key: "nome",
      label: "NOME",
      render: (registro) => PrimeraLetraMaiuscula(registro.nome),
    }

  ];

  // Configuração das ações da tabela
  const acoes: AcaoConfig<Registros>[] = [
    {
      icon: <FaEdit className="w-5 h-5 cursor-pointer" />,
      tooltip: "Editar",
      onClick: (registro) => setSelectedProduto(registro),
    },
    {
      icon: <FaTrashAlt className="w-5 h-5 cursor-pointer" />,
      tooltip: "Deletar",
      onClick: (registro) =>
        handleDeletar({
          registro,
          setRelistar,
          endpoint: "/Estoque/categoria/Delete.php"
        }),
    },
  ];

  // Função para renderizar o ícone de cada linha
  const iconeItem = () => (
    <div className="bg-[var(--base-color)] rounded-full">
      <FaTag className="w-12 h-12 p-3" color="var(--corPrincipal)" />
    </div>
  );

  // Buscar dados da API com filtro
  useEffect(() => {
    setLoadingSpiner(true);

    // Constrói parâmetros da URL com filtro
    const params = new URLSearchParams({
      pagina: pagina.toString(),
      limite: limitePorPagina.toString(),
    });

    requisicaoGet(`/condominios/Read.php?${params.toString()}`)
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
  }, [pagina, limitePorPagina, relistar]);


  if (loading) return <LoadingSkeleton />;
  return (
    <>

      <div className="flex justify-between">
        <Button onClick={() => setAbrirModalNovoRegistro(true)}>
          <p className="flex items-center gap-2">
            <CgAddR size={20} />
            <span>Criar Novo</span></p></Button>
      </div>

      <MostrarNumeroDeResultados totalResultados={totalResultados} />

      <LoadingSpiner loading={loadingSpiner}>
  <div className="grid w-full grid-cols-1 md:grid-cols-3 gap-2 mt-3">
    {registros
      .slice() // copia para não alterar o state original
      .sort((a, b) => (b.notificacoes?.length || 0) - (a.notificacoes?.length || 0))

      .map((registro) => (
        <CardCondominio
          setSelectedProduto={setSelectedProduto}
          key={registro.id}
          Registro={registro}
        />
      ))}
  </div>
</LoadingSpiner>



      {selectedProduto && (
        <ModalEditarRegistro
          selectedProduto={selectedProduto}
          setSelectedProduto={setSelectedProduto}
          registros={registros}
          setRegistros={setRegistros}
          setRelistar={setRelistar}
          setLoadingSpiner={setLoadingSpiner}
        />
      )}



      {/* {AbrirModalNovoRegistro && (
        <ModalAdicionarRegistro
          AbrirModalNovoRegistro={AbrirModalNovoRegistro}
          setAbrirModalNovoRegistro={setAbrirModalNovoRegistro}
          registros={registros}
          setRegistros={setRegistros}
          setRelistar={setRelistar}
          setLoadingSpiner={setLoadingSpiner}
        />
      )} */}





    </>
  )
}

export default Tabela


interface CardCondominio {
  Registro: Registros;
  setSelectedProduto: React.Dispatch<React.SetStateAction<Registros | null>>;
}

import { Badge, Card, Dropdown, DropdownItem } from "flowbite-react";

export function CardCondominio({
  Registro,
  setSelectedProduto
}: CardCondominio) {
  return (
      <Card className="min-w-[180px] bg-[var(--base-variant)] 
    border-2 border-[var(--base-color)]">
      <div >
      <div className="flex px-4 pt-4">
        <Dropdown inline label="">
          <DropdownItem>
            <a
              href="#"
              className="block px-4 py-2 text-sm "
            >
              Edit
            </a>
          </DropdownItem>
          <DropdownItem>
            <a
              href="#"
              className="block px-4 py-2 text-sm "
            >
              Export Data
            </a>
          </DropdownItem>
          <DropdownItem>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Delete
            </a>
          </DropdownItem>
        </Dropdown>
      </div>
      <div className="flex flex-col items-center">
        <RiHotelFill fill="var(--corPrincipal)" size={50} />

        <h5 className="mb-1 text-xl font-medium ">{Registro.nome}</h5>

        <span className="text-sm text-[var(--text-color)]/50">Visual Designer</span>

        <div className="mt-4 flex flex-col justify-center items-center gap-2 ">
          <Button
            className="flex items-center"
            onClick={() => setSelectedProduto(Registro)}>
            Notificacoes
            <Badge className="ms-2 
            bg-[var(--base-variant)] hover:bg-[var(--base-variant)]
            text-[var(--text-color)] 
            rounded-full px-1.5
            
            ">{Registro.notificacoes?.length || 0}</Badge>
          </Button>
          
          <a href="#" className="flex 
          items-center 
          text-[var(--text-color)]/50
          ">Ver Informaçoes</a>

        </div>
      </div>
      </div>
      </Card>
  );
}
