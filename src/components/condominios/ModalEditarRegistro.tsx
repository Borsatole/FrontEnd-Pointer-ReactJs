import { useState, useEffect, useRef } from "react";
import { Spinner} from "flowbite-react";
import Modal from "@components/modal/Modal";
import { Registros } from "./tipos";

import { MdDashboard } from "react-icons/md";
import { RiHotelFill } from "react-icons/ri";

import { IoIosNotifications } from "react-icons/io";
import { Tabs, TabConfig } from "../comum/tabs";
import { Notificacoes } from "./ModalEditar/Notificacoes";
import { Informacoes } from "./ModalEditar/Info";


interface ModalEditarProdutoProps {
  selectedProduto: Registros | null;
  setSelectedProduto: React.Dispatch<React.SetStateAction<Registros | null>>;
  registros: Registros[];
  setRegistros: React.Dispatch<React.SetStateAction<Registros[]>>;
  setRelistar: React.Dispatch<React.SetStateAction<boolean>>;
  setLoadingSpiner: React.Dispatch<React.SetStateAction<boolean>>;
}

function ModalEditarRegistro({
  selectedProduto,
  setSelectedProduto,
  registros,
  setRegistros,
  setLoadingSpiner,
  setRelistar,
}: ModalEditarProdutoProps) {
  const [isLoadingInit, setIsLoadingInit] = useState(false);

  const fecharModal = () => setSelectedProduto(null);

  

  if (!selectedProduto) return null;


    // Configuração das tabs usando o tipo TabConfig
  const tabsConfig: TabConfig[] = [
    {
      id: 'dashboard',
      title: "Dashboard",
      icon: <MdDashboard />, // Substitua por: <BarChart3 />
      content: <div className="p-4">Conteúdo do Dashboard</div>
    },
    {
      id: 'notifications',
      title: "Notificações", 
      icon: <IoIosNotifications />,
      content: <Notificacoes
          selectedProduto={selectedProduto}
          setSelectedProduto={setSelectedProduto}
          registros={registros}
          setRegistros={setRegistros}
          setRelistar={setRelistar}
          setLoadingSpiner={setLoadingSpiner}
      />
    },
    
    {
      id: 'informations',
      title: "Informações",
      icon: <RiHotelFill />,
      content: (
        <Informacoes
          selectedProduto={selectedProduto}
          setSelectedProduto={setSelectedProduto}
          registros={registros}
          setRegistros={setRegistros}
          setRelistar={setRelistar}
          setLoadingSpiner={setLoadingSpiner}
        />
      )
    }
  ];

  const handleTabChange = (tabId: string | number) => {
    // console.log('Tab ativa:', tabId);
  };


  if (isLoadingInit) {
    return (
      <Modal IsOpen={true} onClose={fecharModal}>
        <div className="fixed inset-0 flex items-center justify-center">
          <Spinner size="xl" className="fill-[var(--corPrincipal)]" />
        </div>
      </Modal>
    );
  }

  return (
    <Modal IsOpen={true} onClose={fecharModal} className="min-h-[80vh]">
      <div className="p-0">

         <Tabs 
          tabs={tabsConfig}
          defaultActive="dashboard"
          onTabChange={handleTabChange}
        />

      </div>
    </Modal>
  );
}

export default ModalEditarRegistro;



