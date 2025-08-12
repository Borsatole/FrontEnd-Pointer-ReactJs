import { useState } from "react";
import { Link } from "react-router-dom";
import { useMenu } from "../../context/MenuContext";

import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi";


interface OpcaoMenuProps {
  nome: string;
  svg?: React.ReactNode;
  rota?: string;
}

interface OpcaoMenuComSubmenuProps {
  nome: string;
  svg?: React.ReactNode;
  children: React.ReactNode; 
}

export function OpcaoMenu({ nome, svg, rota }: OpcaoMenuProps) {
  const { fecharMenu } = useMenu();

  return (
    <Link
      className="flex items-center px-4 py-2 mt-5 rounded-lg hvPrincipal cursor-pointer"
      onClick={fecharMenu}
      to={rota || "#"}
    >
      {svg || ""}
      <span className="mx-4 font-medium">{nome || ""}</span>
    </Link>
  );
}

export function OpcaoMenuComSubmenu({ nome, svg, children }: OpcaoMenuComSubmenuProps) {
  const [aberto, setAberto] = useState(false);

  return (
    <div>
      <button
        className="flex items-center justify-between w-full px-4 py-2  rounded-lg hvPrincipal cursor-pointer transition-all"
        onClick={() => setAberto(!aberto)}
        type="button"
      >
        <div className="flex items-center">
          {svg}
          <span className="mx-3 font-medium">{nome}</span>
        </div>
        <span>{aberto ? <HiOutlineChevronUp />: <HiOutlineChevronDown />}</span>
      </button>
      {aberto && (
        <div className="text-sm flex flex-col  rounded-lg">
          {children}
        </div>
      )}
    </div>
  );
}
