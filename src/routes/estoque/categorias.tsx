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
import TabelaCategorias from "@src/components/Estoque/categorias/TabelaCategorias";


export default function Categorias() {
    
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


  return (
    <>
    <BarraSuperior />
    <Container tipo="principal">
      <MenuLateral />
      <TituloPagina>Categorias de Estoque</TituloPagina>

      <TabelaCategorias />

    </Container>

    </>
  );
}



