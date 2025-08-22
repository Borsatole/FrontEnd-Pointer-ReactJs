import { useEffect, useState } from "react";
import { ThemeProvider, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { CgAddR } from "react-icons/cg";
import { FaCaretDown, FaCaretUp, FaEdit,  FaTrashAlt } from "react-icons/fa";

import {
  PrimeraLetraMaiuscula,
  gerarPaginas,
  handleDeletar
} from "./Functions";

import Tooltip from "@components/tooltip/tooltipwrapper";
import LoadingSkeleton from "@components/loader/LoadingSkeleton";
import LoadingSpiner from "@components/loader/LoadingSpiner";
import { requisicaoGet } from "@services/requisicoes";
import { Categoria } from "./tipos";
import { Button } from "@components/comum/button";
import ModalEditarProduto from "./ModalEditarProduto";
import ModalAdicionarRegistro from "./ModalAdicionarProduto";
import BotaoSeletor from "@src/components/comum/buttonSelected";

function TabelaCategorias() {
  // Estados principais
  const [registros, setRegistros] = useState<Categoria[]>([]);
  const [selectedProduto, setSelectedProduto] = useState<Categoria | null>(null);
  
  // Estados de paginação
  const [pagina, setPagina] = useState(1);
  const [limitePorPagina, setLimitePorPagina] = useState(5);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [totalResultados, setTotalResultados] = useState(0);
  
  // Estados de controle
  const [relistar, setRelistar] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingSpiner, setLoadingSpiner] = useState(true);
  const [removendoIds, setRemovendoIds] = useState<number[]>([]);
  const [AbrirModalNovoRegistro, setAbrirModalNovoRegistro] = useState(false);
  
  // Estado para filtro de setor
  const [setorSelecionado, setSetorSelecionado] = useState<string>("contas_a_pagar");

  // Buscar dados da API com filtro
  useEffect(() => {
    setLoadingSpiner(true);
    
    // Constrói parâmetros da URL com filtro
    const params = new URLSearchParams({
      pagina: pagina.toString(),
      limite: limitePorPagina.toString(),
    });

    // Adiciona filtro de setor se não for "todos"
    if (setorSelecionado !== "todos") {
      params.append("setor", setorSelecionado);
    }
    
    requisicaoGet(`/Financeiro/Categorias/Read.php?${params.toString()}`)
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
  }, [pagina, limitePorPagina, relistar, setorSelecionado]);

  // Reset da página quando mudar o filtro
  useEffect(() => {
    setPagina(1);
  }, [setorSelecionado]);

  // Tema customizado para a tabela
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
          base: "px-6 py-4 group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg",
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
      {/* Cabeçalho com botão de criar novo */}
      <div className="flex justify-between items-center flex-wrap gap-3">
        <Button onClick={() => setAbrirModalNovoRegistro(true)}>
          <p className="flex items-center gap-2">
            <CgAddR size={20} />
            <span>Criar Novo</span>
          </p>
        </Button>
      </div>

      {/* Filtros de Setor */}
      <div className="flex justify-start items-center gap-4 mt-4">
        
        <BotaoSeletor 
          value="contas_a_receber" 
          selectedValue={setorSelecionado} 
          onClick={setSetorSelecionado} 
          label="Contas a Receber" 
        />

        <BotaoSeletor 
          value="contas_a_pagar" 
          selectedValue={setorSelecionado} 
          onClick={setSetorSelecionado} 
          label="Contas a Pagar" 
        />
      </div>

      {/* Contador de resultados */}
      <div className="flex justify-between items-center mt-3">
        <span className="text-lg font-bold text-[var(--text-color)]">
          ({totalResultados}) resultados encontrados
          
        </span>
      </div>

      {/* Tabela principal */}
      <LoadingSpiner loading={loadingSpiner}>
        <div className="w-full overflow-x-auto">
          <ThemeProvider theme={customTheme}>
            <Table className="w-full text-center divide-y divide-[var(--base-color)] mt-3 rounded-lg">
              <TableHead>
                <TableRow>
                  <TableHeadCell>ICONE</TableHeadCell>
                  <TableHeadCell>CATEGORIA</TableHeadCell>
                  <TableHeadCell>SETOR</TableHeadCell>
                  <TableHeadCell>EDITAR</TableHeadCell>
                </TableRow>
              </TableHead>
              
              <TableBody className="divide-y divide-[var(--base-color)]">
                {registros.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">
                      {setorSelecionado === "todos" 
                        ? "Nenhum cadastro encontrado" 
                        : `Nenhum cadastro encontrado para ${PrimeraLetraMaiuscula(setorSelecionado.replaceAll("_", " "))}`
                      }
                    </TableCell>
                  </TableRow>
                ) : (
                  registros.map((registro) => (
                    <TableRow
                      key={String(registro.id ?? "sem-id")}
                      className={`transition-all duration-500 ease-in-out ${
                        removendoIds.includes(registro.id ?? -1) ? "efeito-excluir" : ""
                      }`}
                    >
                      {/* Ícone */}
                      <TableCell className="whitespace-nowrap text-center flex items-center justify-center">
                        <div className={`bg-[var(--base-color)] rounded-full`}>
                          {registro.setor === "contas_a_pagar"? 
                          <FaCaretDown className="w-12 h-12 p-3" color="var(--corPrincipal)" /> : <FaCaretUp className="w-12 h-12 p-3" color="var(--corPrincipal)" />}
                        </div>
                      </TableCell>

                      {/* Categoria */}
                      <TableCell className="whitespace-nowrap font-medium">
                        {PrimeraLetraMaiuscula(registro.categoria)}
                      </TableCell>

                      {/* Setor */}
                      <TableCell className="whitespace-nowrap font-medium">
                        {PrimeraLetraMaiuscula(registro.setor.replaceAll("_", " "))}
                      </TableCell>

                      {/* Ações */}
                      <TableCell className="font-medium">
                        <div className="flex justify-center gap-2">
                          <Tooltip tooltip="Editar">
                            <button
                              className="bg-[var(--corPrincipal)] p-2 rounded-lg text-[var(--text-white)]"
                              onClick={() => setSelectedProduto(registro)}
                            >
                              <FaEdit className="w-5 h-5 cursor-pointer" />
                            </button>
                          </Tooltip>
                          
                          <Tooltip tooltip="Deletar">
                            <button
                              className="bg-[var(--corPrincipal)] p-2 rounded-lg text-[var(--text-white)]"
                              onClick={() => handleDeletar({ Registro: registro, setRelistar })}
                            >
                              <FaTrashAlt className="w-5 h-5 cursor-pointer" />
                            </button>
                          </Tooltip>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </ThemeProvider>
        </div>
      </LoadingSpiner>

      {/* Contador de registros exibidos */}
      <div className="flex w-full flex-wrap justify-end items-center gap-2 mt-6">
        Exibindo {((pagina - 1) * limitePorPagina) + 1} a {Math.min(pagina * limitePorPagina, totalResultados)} de {totalResultados} registros

      </div>

      {/* Paginação - agora sempre visível quando há mais de uma página */}
      {totalPaginas > 1 && (
        <div className="flex flex-wrap justify-center items-center gap-2 mt-6">
          <button
            className="px-3 py-2 rounded-md bg-[var(--corPrincipal)] text-[var(--text-white)] disabled:opacity-50"
            onClick={() => setPagina(1)}
            disabled={pagina <= 1}
          >
            Primeira
          </button>

          {gerarPaginas(pagina, totalPaginas).map((num) => (
            

            
            <button
              key={num}
              className={`px-3 py-2 rounded-md border text-sm ${
                num === pagina
                  ? "bg-[var(--corPrincipal)] text-white font-semibold"
                  : "bg-[var(--corPrincipal)] text-[var(--text-white)] opacity-40"
              }`}
              onClick={() => setPagina(num)}
            >
              {num}
            </button>
          ))}

          <button
            className="px-3 py-2 rounded-md bg-[var(--corPrincipal)] text-[var(--text-white)] disabled:opacity-50"
            onClick={() => setPagina(totalPaginas)}
            disabled={pagina >= totalPaginas}
          >
            Última
          </button>
        </div>
      )}

      {/* Modais */}
      {selectedProduto && (
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

export default TabelaCategorias;