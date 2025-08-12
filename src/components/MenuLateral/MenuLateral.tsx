import { useContext, useState, useEffect } from "react";
import { requisicaoGet } from "../../services/requisicoes";
import { AuthContext } from "../../context/AuthContext";
import { useMenu } from "../../context/MenuContext";

import { HiOutlineCube } from "react-icons/hi";


import Swal from "sweetalert2";
import Loading from "../../components/loader/Loading";
import {OpcaoMenu, OpcaoMenuComSubmenu} from "../../components/MenuLateral/OpcaoMenu";
import { BtnFecharMenuLateral } from "../../components/MenuLateral/botoesMenu";

// Ícones
import MenuLateralDashboard from "../../components/MenuLateral/Icones/Dashboard";
import MenuLateralMeusPedidos from "../../components/MenuLateral/Icones/MeusPedidos";
import MenuLateralPerfil from "../../components/MenuLateral/Icones/menuLateralPerfil";

// Estilo
import "./MenuLateral.css";
import MenuLateralAdmin from "../../components/MenuLateral/Icones/MenuLateralAdmin";

const MenuLateral = () => {
  const { logout } = useContext(AuthContext);
  const { menuAberto, fecharMenu } = useMenu();

  const [loading, setLoading] = useState(false);
  const [dadosMenuLateral, setDadosMenuLateral] = useState({
    avatar: "",
    nome: "",
    email: "",
    tipoDeUsuario: "",
  });

  const ConfirmSair = () => {
    Swal.fire({
      title: "Deseja realmente sair?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#655CC9",
      cancelButtonColor: "#929292",
      confirmButtonText: "Sim",
      cancelButtonText: "Não",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
      }
    });
  };

  if (loading) {
    return (
      <aside className="flex flex-col h-screen px-4 py-8 overflow-y-auto corPrincipalBg menu-lateral">
        <div className="flex items-center justify-center h-full">
          <Loading color="var(--corPrincipal)" />
        </div>
      </aside>
    );
  }

  return (
    <aside
      className={`flex flex-col h-screen px-4 py-8 overflow-y-auto corPrincipalBg menu-lateral ${
        menuAberto ? "menu-aberto" : ""
      }`}
    >
      <BtnFecharMenuLateral funcao={fecharMenu} />
      <div className="flex flex-col justify-between flex-1 mt-6">
        <nav className="flex-1 pt-4">
          {/* <OpcaoMenu
            nome="Dashboard"
            rota="/"
            svg={<MenuLateralDashboard />}
          /> */}
          <OpcaoMenuComSubmenu nome="Estoque" svg={<HiOutlineCube size={25} />}>
            <OpcaoMenu nome="Produtos" rota="/" />
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
