import { useContext, useEffect, useState } from "react";
import { TituloPagina } from "@components/comum/Textos";
import { requisicaoGet } from "@src/services/requisicoes";
import { Datas } from "@src/services/funcoes-globais";
import dayjs from 'dayjs';
import CardOpcoes from "@src/components/comum/cardOpcoes";
import ContainerSecundario from "@src/components/comum/containerSecundario";



export default function Dashboard() {

  return (
  <>
    <ContainerSecundario>
      <TituloPagina>Dashboard</TituloPagina>
      <BannerBoasVindas />
 
      <GridDeCards>
      
        <CardOpcoes 
          icone="condominios"
          descricao="Demandas Diarias como entregas e retiradas de equipamentos."
          titulo="Condomínios"
          rota="/condominios"
        />

        <CardOpcoes 
          icone="visitas"
          descricao="Demandas Diarias como entregas e retiradas de equipamentos."
          titulo="Visitas"
          rota="/visitas"
        />

        <CardOpcoes 
          icone="vistorias"
          descricao="Gerencie o cadastro de clientes da sua empresa"
          titulo="Vistorias"
          rota="/vistorias"
        />

        <CardOpcoes 
          icone="chamados"
          descricao="Gerencie o cadastro de clientes da sua empresa"
          titulo="Chamados"
          rota="/chamados"
        />
      </GridDeCards>

    </ContainerSecundario>
    
  </>
)
}

function GridDeCards({ children }: any) {
  return (
    <div
      className="
        grid 
        grid-cols-1 
        sm:grid-cols-2 
        lg:grid-cols-3
        gap-4
        sm:gap-6
      "
    >
      {children}
    </div>
  );
}


function BannerBoasVindas() {
  return (
    <div
        className="relative w-full overflow-hidden  sm:p-8 mb-6 bg-cover bg-center mx-auto shadow-lg rounded-2xl border border-[var(--base-color)] hover:shadow-2xl transition-shadow duration-300 cursor-pointer"

        style={{
          backgroundImage: "url('https://wallpapers.com/images/hd/best-san-francisco-background-ars4uhl07n1qwbti.jpg')",
        }}
        
      >
        <div className="absolute inset-0 bg-[var(--corPrincipal)] opacity-80 "></div>

        <div className="relative p-6 sm:p-8 md:p-20 flex items-center gap-4 sm:gap-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white shadow-md flex items-center justify-center overflow-hidden flex-shrink-0">
            <img src="/iconepng.png" alt="Logo" className="w-12 h-12 sm:w-14 sm:h-14 object-contain" />
          </div>

          <div className="text-left text-white">
            <h2 className="text-xl sm:text-2xl font-bold">Olá, Seja bem-vindo!</h2>
            <p className="text-xs sm:text-sm mt-1">
              Acompanhe as demandas do sistema de forma simples e rápida.
            </p>
          </div>
        </div>
      </div>
  )
}


