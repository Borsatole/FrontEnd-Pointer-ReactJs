import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@src/context/AuthContext";
import { useMenu } from "@src/context/MenuContext";

import { RiHotelFill } from "react-icons/ri";
import { HiOutlineViewGrid, HiLogin } from "react-icons/hi";
import { BiQrScan } from "react-icons/bi";

import Swal from "sweetalert2";
import { OpcaoMenu, OpcaoMenuComSubmenu } from "@components/MenuLateral/OpcaoMenu";
import { BtnFecharMenuLateral } from "@components/MenuLateral/botoesMenu";

import "./MenuLateral.css";
import { requisicaoGet } from "@src/services/requisicoes";

// Tipagem para menus
interface SubMenuItem {
  nome: string;
  rota: string;
  svg?: React.ReactNode;
}

interface MenuItem {
  nome: string;
  rota?: string;
  svg?: React.ReactNode;
  tipo?: "admin";
  submenu?: SubMenuItem[];
}

const MenuLateral = () => {
  const { logout } = useContext(AuthContext);
  const { menuAberto, fecharMenu } = useMenu();

  const [dadosUsuario, setDadosUsuario] = useState({
    avatar: "",
    nome: "",
    email: "",
    tipoDeUsuario: "",
  });

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const RotaApi = import.meta.env.VITE_API;
        const response = await requisicaoGet("/usuarios/Dashboard.php");

        if (response?.data?.InformacoesBasicas) {
          const info = response.data.InformacoesBasicas;
          setDadosUsuario({
            avatar: `${RotaApi}/Backend/usuarios/avatar/${info.Avatar}`,
            nome: info.NomeDoUsuario,
            email: info.email,
            tipoDeUsuario: info.TipoDeUsuario,
          });
        }
      } catch (error) {
        console.error("Erro ao carregar dados do Dashboard:", error);
      }
    };

    carregarDados();
  }, []);

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
      if (result.isConfirmed) logout();
    });
  };

  // Estrutura de menus
  const menus: MenuItem[] = [
    {
      nome: "Dashboard",
      rota: "/",
      svg: <HiOutlineViewGrid size={25} />,
      tipo: "admin",
    },
    {
      nome: "Condomínios",
      rota: "/condominios",
      svg: <RiHotelFill size={25} />,
      tipo: "admin",
    },
    {
      nome: "Registrar Visita",
      rota: "/visitas",
      svg: <BiQrScan size={25} />,
    },
    // Exemplo de submenu (descomentado se precisar)
    // {
    //   nome: "Funcionários",
    //   svg: <HiUsers size={25} />,
    //   submenu: [
    //     { nome: "Contas a pagar", rota: "/financeiro-contas-a-pagar" },
    //     { nome: "Contas a receber", rota: "/financeiro-contas-a-receber" },
    //     { nome: "Contas Fixas", rota: "/financeiro-contas-fixas" },
    //     { nome: "Categorias", rota: "/financeiro-categorias" },
    //   ],
    // },
  ];

  return (
    <aside
      className={`flex flex-col h-screen px-4 py-6 overflow-y-auto corPrincipalBg menu-lateral ${
        menuAberto ? "menu-aberto" : ""
      }`}
    >
      <BtnFecharMenuLateral funcao={fecharMenu} />

      {/* Logo */}
      <div className="flex items-center justify-center mb-6 cursor-pointer">
        <div className="w-full flex justify-center max-w-[100%] p-3 bg-white/10 rounded-lg backdrop-blur-sm">
          <img
            src={`/logo.png`}
            className="w-[60%] h-auto object-contain max-w-[40%]"
            alt="Logo"
          />
        </div>
      </div>

      {/* Menus */}
      <div className="flex flex-col justify-between flex-1">
        <nav className="flex flex-col gap-3">
          {menus.map((menu: MenuItem, index: number) => {
            // Verifica permissão (ex: só admin)
            if (menu.tipo === "admin" && dadosUsuario.tipoDeUsuario !== "admin") return null;

            // Submenu
            if (menu.submenu) {
              return (
                <OpcaoMenuComSubmenu key={index} nome={menu.nome} svg={menu.svg}>
                  {menu.submenu.map((sub: SubMenuItem, i: number) => (
                    <OpcaoMenu key={i} nome={sub.nome} rota={sub.rota} svg={sub.svg} />
                  ))}
                </OpcaoMenuComSubmenu>
              );
            }

            // Menu normal
            return <OpcaoMenu key={index} nome={menu.nome} rota={menu.rota} svg={menu.svg} />;
          })}
        </nav>

        {/* Logout */}
        <div className="mt-auto">
          <hr className="my-6 border-white/10" />
          <OpcaoMenu nome="Sair" svg={<HiLogin size={25} />} onClick={ConfirmSair} />
        </div>
      </div>
    </aside>
  );
};

export default MenuLateral;
