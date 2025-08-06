import { useMenu } from "../../context/MenuContext";
import * as React from "react";
import { Link } from "react-router-dom";



interface OpcaoMenuProps {
  nome?: string;
  svg?: React.ReactNode;
  rota?: string;
}

function OpcaoMenu({ nome, svg, rota }: OpcaoMenuProps) {
    const { fecharMenu } = useMenu();
  
  return (
    <Link
      className="flex items-center px-4 py-2 mt-5  rounded-lg hvPrincipal cursor-pointer"
      onClick={fecharMenu}
      to={rota || "#"}
    >
      {svg || ""}
      <span className="mx-4 font-medium">{nome || ""}</span>
    </Link>
  );
}

export default OpcaoMenu;