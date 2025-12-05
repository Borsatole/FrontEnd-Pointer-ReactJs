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

        <div className="relative p-6 sm:p-8 md:p-20 z-10 flex items-center gap-4 sm:gap-6">
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


function BannerMensalidadeVencida({ diasVencidos }: { diasVencidos: number }) {
  const [fechado, setFechado] = useState(false);

  if (fechado) return null;

  return (
    <div className="relative w-full rounded-2xl overflow-hidden p-6 sm:p-8 mb-6 bg-gradient-to-r from-red-500 to-red-600 shadow-lg border-2 border-red-700">
      
      {/* Botão de fechar */}
      <button
        onClick={() => setFechado(true)}
        className="absolute top-4 right-4 text-white hover:text-red-100 transition-colors z-20"
        aria-label="Fechar alerta"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="relative z-10 flex items-start sm:items-center gap-4 sm:gap-6">
        
        {/* Ícone de alerta */}
        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white shadow-md flex items-center justify-center flex-shrink-0">
          <svg className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>

        <div className="text-left text-white flex-1">
          <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2">
            ⚠️ Pendencia de Pagamento
          </h2>
          <p className="text-xs sm:text-sm mt-1 opacity-95">
            Sua mensalidade está vencida há <strong>{diasVencidos} {diasVencidos === 1 ? 'dia' : 'dias'}</strong>. 
            Regularize sua situação para continuar utilizando o sistema sem interrupções.
          </p>
          
          {/* Botão de ação */}
          <button className="mt-3 sm:mt-4 px-4 sm:px-6 py-2 bg-white text-red-600 font-semibold rounded-lg hover:bg-red-50 transition-colors text-xs sm:text-sm shadow-md">
            Regularizar Pagamento
          </button>
        </div>
      </div>
    </div>
  );
}