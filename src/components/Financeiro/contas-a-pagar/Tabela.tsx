import { useEffect, useState } from "react";
import { ThemeProvider, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { MdAttachMoney } from "react-icons/md";
import { CgAddR } from "react-icons/cg";



import {
  PrimeraLetraMaiuscula,
  gerarPaginas,
  handleDeletar
} from "./Functions";


import { FaEdit, FaTrashAlt } from "react-icons/fa";

import Tooltip from "@components/tooltip/tooltipwrapper";
import LoadingSkeleton from "@components/loader/LoadingSkeleton";
import LoadingSpiner from "@components/loader/LoadingSpiner";
import { requisicaoGet } from "@services/requisicoes";
import { ContaAPagar, NovaContaAPagar } from "./tipos";
import { Datas, Valores } from "@src/services/funcoes-globais";
import { Button } from "@components/comum/button";
import ModalEditarProduto from "./ModalEditarProduto";
import ModalAdicionarRegistro from "./ModalAdicionarProduto";
import { FiltroCadastros } from "./FiltroCadastros";


function TabelaContasFixas({}) {
  const { dataFormatada } = Datas();
  const { dinheiro } = Valores();
  const [registros, setRegistros] = useState<ContaAPagar[]>([]);

  const [selectedProduto, setSelectedProduto] = useState<ContaAPagar | null>(null);

  const [pagina, setPagina] = useState(1);
  const [relistar, setRelistar] = useState(false);

  const [queryFiltro, setQueryFiltro] = useState("");

  // Parametros de paginacao
  const [limitePorPagina, setLimitePorPagina] = useState(7);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [totalResultados, setTotalResultados] = useState(0);

  const [loading, setLoading] = useState(true);
  const [loadingSpiner, setLoadingSpiner] = useState(true);

  const [removendoIds, setRemovendoIds] = useState<number[]>([]);

  
  const [AbrirModalNovoRegistro, setAbrirModalNovoRegistro] = useState(false);

  useEffect(() => {
    setLoadingSpiner(true);
    requisicaoGet(`/Financeiro/contas-a-pagar/Read.php?${queryFiltro}`)
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

  }, [pagina, limitePorPagina,queryFiltro, relistar]);

 

  const customTheme = {
    table: {
      root: {
        base: "w-full text-left text-sm text-[var(--text-color)] bg-[var(--base-variant)]",
        shadow: "absolute left-0 top-0 -z-10 h-full w-full rounded-lg bg-white drop-shadow-md dark:bg-black",
        wrapper: "relative",
      },
      body: {
        base: "group/body",
        cell: {
          base:
            "px-6 py-4 group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg",
        },
      },
      head: {
        base: "group/head text-xs uppercase",
        cell: {
          base: "text-[var(--text-color)] bg-[var(--base-variant)] px-6 py-3 group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg dark:bg-gray-700",
        },
      },
      row: {
        base: "group/row",
        striped: "text-[var(--text-color)] bg-[var(--base-variant)]odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700",
      },
    },
  };

  if (loading) return <LoadingSkeleton />;


  return (
    <>
      <div className="flex justify-between">

          <Button onClick={() => setAbrirModalNovoRegistro(true)}>
            <p className="flex items-center gap-2">
            <CgAddR size={20} />
            <span>Criar Novo</span>
          </p>
          </Button>

       

        
      </div>

      

          <FiltroCadastros onFiltrar={setQueryFiltro} />

      <div className="flex justify-between items-center mt-3">
        <span className="text-lg font-semibold text-[var(--text-color)]">
          ({totalResultados}) resultados encontrados
        </span>
      </div>

      <LoadingSpiner loading={loadingSpiner}>

        <div className="w-full overflow-x-auto ">
        <ThemeProvider theme={customTheme}>
          <Table className="w-full text-center divide-y divide-[var(--base-color)] mt-3  rounded-lg">
            <TableHead>
              <TableRow>
                <TableHeadCell>ICONE</TableHeadCell>
                <TableHeadCell>NOME</TableHeadCell>
                <TableHeadCell>CATEGORIA</TableHeadCell>
                <TableHeadCell>DATA VENCIMENTO</TableHeadCell>
                <TableHeadCell>VALOR</TableHeadCell>
                <TableHeadCell>STATUS</TableHeadCell>
                <TableHeadCell>EDITAR</TableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody className="divide-y divide-[var(--base-color)]">
                {registros.length === 0 ? (
                  <TableRow className="">
                    <TableCell colSpan={10} className="text-center">
                      Nenhum cadastro encontrado
                    </TableCell>
                  </TableRow>
                ) : null}
              {registros.map((Registro) => (
  (() => {
    return (
          <TableRow
      key={String(Registro.id ?? "sem-id")}
      className={`transition-all duration-500 ease-in-out   ${
        removendoIds.includes(Registro.id ?? -1) ? "efeito-excluir" : ""
      }`}
    >
            <TableCell className="whitespace-nowrap text-center flex items-center justify-center">
              <div className="bg-[var(--base-color)] rounded-full">
                <MdAttachMoney className="w-12 h-12 p-3" color="var(--corPrincipal)"/>
              </div>
            </TableCell>
            
            <TableCell className="whitespace-nowrap font-medium">
              {PrimeraLetraMaiuscula(Registro.nome)}
            </TableCell>
            
            <TableCell className="whitespace-nowrap font-medium">
              {PrimeraLetraMaiuscula(Registro.categoria ?? "")}
            </TableCell>

            <TableCell className="whitespace-nowrap font-medium">
              {dataFormatada(Registro.data_vencimento ?? "")}
            </TableCell>

            <TableCell className="whitespace-nowrap font-medium">
              {dinheiro(Registro.valor)}
            </TableCell>

            <TableCell className="whitespace-nowrap font-medium">
            <span
              className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-white text-xs font-semibold ${
                Registro.data_pagamento ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {Registro.data_pagamento ? "Pago" : "Pendente"}
            </span>
          </TableCell>

            

            <TableCell className="font-medium">
      <div className="flex justify-center gap-2">
        <Tooltip tooltip="Editar">
          <button
            className="bg-[var(--corPrincipal)] p-2 rounded-lg text-[var(--text-white)]"
            onClick={() => setSelectedProduto(Registro)}
          >
            <FaEdit className="w-5 h-5 cursor-pointer" />
          </button>
        </Tooltip>
        <Tooltip tooltip="Deletar">
          <button
            className="bg-[var(--corPrincipal)] p-2 rounded-lg text-[var(--text-white)]"
            onClick={() => handleDeletar({ Registro, setRelistar })}
          >
            <FaTrashAlt className="w-5 h-5 cursor-pointer" />
          </button>
        </Tooltip>
      </div>
            </TableCell>

            
          </TableRow>
    );
  })()
))}

            </TableBody>
          </Table>
        </ThemeProvider>
        </div>
      </LoadingSpiner>

      {/* Numero de cadastros */}
      <div className="flex w-full flex-wrap justify-end items-center gap-2 mt-6">
        {((pagina - 1) * limitePorPagina) + registros.length} de {totalResultados}
      </div>

      {/* Paginação */}
      <div className="flex flex-wrap justify-center items-center gap-2 mt-6">

        <Button
          onClick={() => setPagina(1)}
          disabled={pagina <= 1}>Primeira</Button>
        

        {gerarPaginas(pagina, totalPaginas).map((num) => (
          <Button
            key={num}
            onClick={() => setPagina(num)}
            className={`px-3 py-2 rounded-md border text-sm ${
              num === pagina
                ? "bg-[var(--corPrincipal)] text-white font-semibold"
                : "bg-[var(--corPrincipal)] text-[var(--text-white)] opacity-40"
            }`}
            >{num}</Button>
        ))}

        <Button
          onClick={() => setPagina(totalPaginas)}
          disabled={pagina >= totalPaginas}
        >
          Última
        </Button>

      </div>

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

    {AbrirModalNovoRegistro === true &&
    <ModalAdicionarRegistro
        AbrirModalNovoRegistro={AbrirModalNovoRegistro}
        setAbrirModalNovoRegistro={setAbrirModalNovoRegistro}
        registros={registros}
        setRegistros={setRegistros}
        setRelistar={setRelistar}
        setLoadingSpiner={setLoadingSpiner}
      />
      }

    </>
  );
}

export default TabelaContasFixas;
