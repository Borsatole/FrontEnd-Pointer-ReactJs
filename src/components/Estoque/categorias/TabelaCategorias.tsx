import {useEffect, useState } from "react";



import BarraSuperior from "@components/barraSuperior";
import MenuLateral from "@components/MenuLateral/MenuLateral";
import Container from "@components/comum/container";
import { TituloPagina } from "@components/comum/Textos";
import { Button } from "@components/comum/button";

import {handleDeletar} from "@components/Estoque/categorias/Functions";

import { CgAddR } from "react-icons/cg";
import { Categoria } from "@components/tipos";
import { requisicaoGet } from "@services/requisicoes";
import { Spinner, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, ThemeProvider } from "flowbite-react";
import Tooltip from '@components/tooltip/tooltipwrapper';
import LoadingSpiner from "@components/loader/LoadingSpiner";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { PrimeraLetraMaiuscula } from "@components/Estoque/tabelaprodutos/Functions";
import ModalAdicionarCategoria from "@components/Estoque/categorias/ModalAdicionarCategoria";
import ModalEditarCategoria from "@components/Estoque/categorias/ModalEditarCategoria";
import LoadingSkeleton from "@src/components/loader/LoadingSkeleton";



function TabelaCategorias() {
        const [loading, setLoading] = useState(true);
        const [loadingSpiner, setLoadingSpiner] = useState(true);
        const [categorias, setCategorias] = useState<Categoria[]>([]);
        const [relistar, setRelistar] = useState(false);
    
        const [AbirModalAdicionarCategoria, setAbirModalAdicionarCategoria] = useState(false);
        const [selectedCategoria, setSelectedCategoria] = useState<Categoria | null>(null);
    
    
        useEffect(() => {
            setLoadingSpiner(true);
    
          requisicaoGet('/Estoque/categoria/categorias.php').then((response) => {
            if (response?.data.success) {
              setCategorias(response.data.categorias);
              setLoading(false);
              setLoadingSpiner(false);
              setRelistar(false);
            }
          });
        }, [relistar]);
    
    
    
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

    <div className="flex flex-col gap-2 w-full mb-2">

        <div className="self-start">
          <Button onClick={() => setAbirModalAdicionarCategoria(true)}>
            <p className="flex items-center gap-2">
              <CgAddR size={20} />
              <span>Nova Categoria</span>
            </p>
          </Button>
        </div>

          {categorias.length === 0 ? (
          <p>Não há categorias cadastradas.</p>
          
          
        ) : (
          
          <LoadingSpiner loading={loadingSpiner}>
        <div className="w-full overflow-x-auto h-[70vh]">
        <ThemeProvider theme={customTheme}>
          <Table className="w-full text-center divide-y divide-[var(--base-color)] mt-3  rounded-lg">
            <TableHead>
              <TableRow>
                <TableHeadCell>ICONE</TableHeadCell>
                <TableHeadCell>CATEGORIA</TableHeadCell>
                <TableHeadCell>EDITAR</TableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody className="divide-y divide-[var(--base-color)]">
                {categorias.length === 0 ? (
                  <TableRow className="">
                    <TableCell colSpan={5} className="text-center">
                      Nenhum cadastro encontrado
                    </TableCell>
                  </TableRow>
                ) : null}
              {categorias.map((categoria) => (
                    (() => {
                        return (
                            <TableRow
                        key={String(categoria.id ?? "sem-id")}
                        className={`transition-all duration-500 ease-in-out}`}
                        >
                                <TableCell className="whitespace-nowrap text-center flex items-center justify-center " >
                                <div className="bg-[var(--base-color)] rounded-full">
                                    <CgAddR className="w-12 h-12 p-3" color="var(--corPrincipal)"/>
                                </div>
                                </TableCell>
                                
                                <TableCell className="whitespace-nowrap font-medium">{PrimeraLetraMaiuscula(categoria.nome)}</TableCell>
                                

                                <TableCell className="font-medium">
                        <div className="flex justify-center gap-2">
                            <Tooltip tooltip="Editar Categoria">
                            <button
                                className="bg-[var(--corPrincipal)] p-2 rounded-lg text-[var(--text-white)]"
                                onClick={() => setSelectedCategoria(categoria)}
                            >
                                <FaEdit className="w-5 h-5 cursor-pointer" />
                            </button>
                            </Tooltip>
                            <Tooltip tooltip="Deletar Categoria">
                            <button
                                className="bg-[var(--corPrincipal)] p-2 rounded-lg text-[var(--text-white)]"
                                onClick={() => handleDeletar({categoria, setRelistar})}
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
        )}
      </div>
    
    
    {AbirModalAdicionarCategoria && (
      <ModalAdicionarCategoria 
        setAbrirModalAdicionarCategoria={setAbirModalAdicionarCategoria}
        ModalAdicionarCategoria={AbirModalAdicionarCategoria}
        IsOpen={AbirModalAdicionarCategoria}
        onClose={() => setAbirModalAdicionarCategoria(false)}
        setRelistar={setRelistar}

      />
      
    )}

    {selectedCategoria && (
      <ModalEditarCategoria 
        IsOpen={selectedCategoria !== null}
        onClose={() => setSelectedCategoria(null)}
        setRelistar={setRelistar}
        setSelectedCategoria={setSelectedCategoria}
        selectedCategoria={selectedCategoria}
      />
    )}
    
    </>
  )
}

export default TabelaCategorias