import React from 'react'
import { useState, useEffect, useRef } from "react";
import Modal from "../../components/modal/Modal";
import LoadingSpiner from "../../components/loader/LoadingSpiner";

import { ThemeProvider, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";

import {
    handleDeletar,
  PrimeraLetraMaiuscula,
  
} from "./Functions";

import { Input } from "../../components/comum/input";
import { FormGroup } from "../../components/comum/FormGroup";
import { Button } from "../../components/comum/button";
import { Produto } from "../../components/tipos";
import { requisicaoGet } from "../../services/requisicoes";
import { SelectModificado } from "../../components/comum/select";
import { Spinner } from "flowbite-react";
import { H2 } from '../../components/comum/Textos';

import { CgAddR } from "react-icons/cg";
import Tooltip from '../../components/tooltip/tooltipwrapper';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { Categoria } from "../tipos";
interface ModalCategoriasProps {
    AbrirModalCategorias:boolean,
    setAbrirModalCategorias:React.Dispatch<React.SetStateAction<boolean>>
}

function ModalCategorias({
AbrirModalCategorias,
setAbrirModalCategorias
}:ModalCategoriasProps) {
    const [loading, setLoading] = useState(true);
    const [loadingSpiner, setLoadingSpiner] = useState(true);
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [relistar, setRelistar] = useState(false);


    useEffect(() => {
        setLoadingSpiner(true);

      requisicaoGet('/Estoque/categorias.php').then((response) => {
        if (response?.data.success) {
          setCategorias(response.data.categorias);
          setLoading(false);
          setLoadingSpiner(false);
        }
      });
    }, [relistar]);


    if (!AbrirModalCategorias) return null;

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


    if (loading && categorias.length === 0) {
    return (
      <Modal IsOpen={true} onClose={() => setAbrirModalCategorias(false)}>
        <div className="fixed inset-0 flex items-center justify-center">
          <Spinner size="xl" className="fill-[var(--corPrincipal)]" />
        </div>
      </Modal>
    );
  }

  return (
    <Modal IsOpen={true} onClose={() => setAbrirModalCategorias(false)}>

        <div className="flex flex-col gap-2 items-start w-full mb-2">
          <H2>Categorias</H2>

          <Button onClick={() => setRelistar(true)} >
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
        <div className="w-full overflow-x-auto h-[50vh]">
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
        <Tooltip tooltip="Editar Servidor">
          <button
            className="bg-[var(--corPrincipal)] p-2 rounded-lg text-[var(--text-white)]"
            onClick={() => alert("Editar Servidor")}
          >
            <FaEdit className="w-5 h-5 cursor-pointer" />
          </button>
        </Tooltip>
        <Tooltip tooltip="Deletar Servidor">
          <button
            className="bg-[var(--corPrincipal)] p-2 rounded-lg text-[var(--text-white)]"
            onClick={() => alert("Deletar Servidor")}
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
    </Modal>
  )
}

export default ModalCategorias