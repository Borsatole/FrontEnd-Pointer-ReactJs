import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useMenu } from "../../context/MenuContext";

import { HiOutlineCube } from "react-icons/hi";
import { HiOutlineViewGrid } from "react-icons/hi";
import { HiChartBar } from "react-icons/hi";
import { HiLogin } from "react-icons/hi";

import Swal from "sweetalert2";
import {OpcaoMenu, OpcaoMenuComSubmenu} from "../../components/MenuLateral/OpcaoMenu";
import { BtnFecharMenuLateral } from "../../components/MenuLateral/botoesMenu";

// Estilo
import "./MenuLateral.css";

const MenuLateral = () => {
  const { logout } = useContext(AuthContext);
  const { menuAberto, fecharMenu } = useMenu();

  
  const ConfirmSair = () => {
    Swal.fire({
      title: "Deseja realmente sair?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "var(--corPrincipal)",
      cancelButtonColor: "#929292",
      confirmButtonText: "Sim",
      cancelButtonText: "Não",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
      }
    });
  };

  return (
    <aside
      className={`flex flex-col h-screen px-4 py-6 overflow-y-auto corPrincipalBg menu-lateral ${
        menuAberto ? "menu-aberto" : ""
      }`}
    >
      <BtnFecharMenuLateral funcao={fecharMenu} />
      
      {/* Logo Section */}
      <div className="flex items-center justify-center mb-6 cursor-pointer">
        <div className="w-full flex justify-center max-w-[100%] p-3 bg-white/10 rounded-lg backdrop-blur-sm">
          <img 
            src={`/logo.png`}  
            className="w-[60%] h-auto object-contain max-w-[40%]" 
            alt="Logo" 
          />
        </div>
      </div>

      
      
      <div className="flex flex-col justify-between flex-1">
        <nav className="flex flex-col gap-3">
          <OpcaoMenu nome="Dashboard" svg={<HiOutlineViewGrid size={25} />} rota="/" />


          <OpcaoMenuComSubmenu nome="Financeiro" svg={<HiChartBar size={25} />}>
            <OpcaoMenu nome="Contas a pagar" rota="/financeiro-contas-a-pagar"/>
            <OpcaoMenu nome="Contas a receber" rota="/financeiro-contas-a-receber"/>
            <OpcaoMenu nome="Contas Fixas" rota="/financeiro-contas-fixas"/>
            <OpcaoMenu nome="Categorias" rota="/financeiro-categorias"/>
          </OpcaoMenuComSubmenu>


          <OpcaoMenuComSubmenu nome="Estoque" svg={<HiOutlineCube size={25} />}>
            <OpcaoMenu nome="Produtos" rota="/estoque" />
            <OpcaoMenu nome="Categorias" rota="/estoque-categorias"  />
          </OpcaoMenuComSubmenu>
          
        </nav>

        {/* Logout Section */}
        <div className="mt-auto">
          <hr className="my-6 border-white/10" />
          <OpcaoMenu nome="Sair" svg={<HiLogin size={25} />} onClick={ConfirmSair} />
          
        </div>
      </div>
    </aside>
  );
};

export default MenuLateral;