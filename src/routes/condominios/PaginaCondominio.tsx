import { useEffect, useState } from "react";
import { Card, Spinner, Tabs, TabItem } from "flowbite-react";
import { 
  FaBuilding, 
  FaPhoneAlt, 
  FaMapMarkerAlt, 
  FaCalendarAlt,
  FaClipboardList,
  FaHeadset,
  FaUserCheck,
  FaEdit
} from "react-icons/fa";
import dayjs from "dayjs";
import CardOrders from "@src/components/comum/StatsLte";

// Exemplo com dados mockados para demonstração
export default function PaginaCondominio() {
  const [registros] = useState({
    nome: "Edifício Residencial Premium",
    rua: "Av. Paulista, 1000 - São Paulo/SP",
    telefone: "(11) 98765-4321",
    dataCriacao: "2020-01-15",
    administrador: "João Silva",
    blocos: 3,
    unidades: 120
  });

  const [visitas] = useState([1, 2, 3, 4, 5]);
  const [chamados] = useState([1, 2, 3]);
  const [vistorias] = useState([1, 2]);

  return (
    <div className="p-4 sm:p-6 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header redesenhado inspirado na imagem */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Card de Perfil/Identificação */}
          <Card className="lg:col-span-4 shadow-lg border-0 bg-[var(--base-variant)]">
            <div className="flex flex-col items-center text-center space-y-4">
              {/* Avatar/Logo do Condomínio */}
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-xl">
                <FaBuilding className="text-5xl text-white" />
              </div>
              
              {/* Nome do Condomínio */}
              <div>
                <h1 className="text-2xl font-bold">
                  {registros.nome}
                </h1>
                <p className="text-smmt-1">
                  Código: #CD{Math.floor(Math.random() * 10000)}
                </p>
              </div>
              
              {/* Botão de Atualização */}
              <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
                <FaEdit />
                Atualizar
              </button>
              
              {/* Informações Principais */}
              <div className="w-full pt-4 border-t border-gray-200 space-y-3 text-left">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Endereço:</span>
                  <span className="text-sm font-semibold">Principal</span>
                </div>
                <div className="flex items-start gap-2">
                  <FaMapMarkerAlt className="mt-1 flex-shrink-0" />
                  <span className="text-sm ">{registros.rua}</span>
                </div>
                
                <div className="flex justify-between items-center pt-2">
                  <span className="text-sm ">Telefone:</span>
                  <span className="text-sm ">{registros.telefone}</span>
                </div>
                
              
                
                
              </div>
            </div>
          </Card>
          
          {/* Área de Estatísticas e Detalhes */}
          <div className="lg:col-span-8 space-y-6">

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            <CardOrders 
              titulo="visitas"
              valor={visitas.length}
              cor="#03a664"
              corRodape="#228572"
              icone={<FaUserCheck className="text-5xl text-white" />}
            />

             <CardOrders 
              titulo="chamados"
              valor={chamados.length}
              cor="#ff840b"
              corRodape="#bc6209"
              icone={<FaHeadset className="text-5xl text-white" />}
            />

            <CardOrders 
              titulo="vistorias"
              valor={vistorias.length || 0}
              cor="#ff0b0b"
              corRodape="#bc6209"
              corRodapeHover="#bc0909"
              icone={<FaClipboardList className="text-5xl text-white" />}
            />
            
          </div>
            
            {/* Abas com conteúdo detalhado */}
            <Card className="shadow-lg border-0 bg-[var(--base-variant)]">
              <Tabs aria-label="Condomínio tabs" variant="underline">
                <TabItem active title="Visitas" icon={FaUserCheck}>
                  <div className="p-4 text-gray-600">
                    <p>Conteúdo da aba de Visitas...</p>
                  </div>
                </TabItem>
                <TabItem title="Chamados" icon={FaHeadset}>
                  <div className="p-4 text-gray-600">
                    <p>Conteúdo da aba de Chamados...</p>
                  </div>
                </TabItem>
                <TabItem title="Vistorias" icon={FaClipboardList}>
                  <div className="p-4 text-gray-600">
                    <p>Conteúdo da aba de Vistorias...</p>
                  </div>
                </TabItem>
              </Tabs>
            </Card>
            
          </div>
          
        </div>

        

      </div>
    </div>
  );
}