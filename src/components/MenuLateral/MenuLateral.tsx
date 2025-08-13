import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useMenu } from "../../context/MenuContext";

import { HiOutlineCube } from "react-icons/hi";
import { HiOutlineViewGrid } from "react-icons/hi";


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
      className={`flex flex-col h-screen px-4 py-8 overflow-y-auto corPrincipalBg menu-lateral ${
        menuAberto ? "menu-aberto" : ""
      }`}
    >
      <BtnFecharMenuLateral funcao={fecharMenu} />
      <div className="flex flex-col justify-between flex-1 mt-6">
        <nav className="flex flex-col  pt-4 gap-3">
          <OpcaoMenu nome="Dashboard" svg={<HiOutlineViewGrid size={25} />} rota="/" />
          <OpcaoMenuComSubmenu nome="Estoque" svg={<HiOutlineCube size={25} />}>
            <OpcaoMenu nome="Produtos" rota="/estoque" />
            <OpcaoMenu nome="Categorias" rota="/estoque-categorias"  />
          </OpcaoMenuComSubmenu>

         

          
        </nav>

        <div className="flex items-center ">
          <hr className="my-8 border-[var(--corPrincipal)]" />

          <button
            onClick={ConfirmSair}
            className="flex items-center w-full px-4 py-2 cursor-pointer rounded-lg hvPrincipal"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span className="mx-4 font-medium">Sair</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default MenuLateral;
