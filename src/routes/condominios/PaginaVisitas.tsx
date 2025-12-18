import { useContext, useEffect, useState } from "react";
import { TituloPagina } from "@components/comum/Textos";
import { requisicaoGet } from "@src/services/requisicoes";
import { Datas } from "@src/services/funcoes-globais";
import dayjs from 'dayjs';
import CardOpcoes from "@src/components/comum/cardOpcoes";
import ContainerSecundario from "@src/components/comum/containerSecundario";
import Tabela from "@src/components/visitas/Tabela";



export default function Visitas() {

  return (
  <>
    <ContainerSecundario>
      <TituloPagina>Visitas</TituloPagina>
      <Tabela />

    </ContainerSecundario>
    
  </>
)
}



