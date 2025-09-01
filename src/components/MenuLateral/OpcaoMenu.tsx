import { useState } from "react";
import { Link } from "react-router-dom";
import { useMenu } from "../../context/MenuContext";

import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi";

interface OpcaoMenuProps {
  nome: string;
  svg?: React.ReactNode;
  rota?: string;
  onClick?: () => void;
}

interface OpcaoMenuComSubmenuProps {
  nome: string;
  svg?: React.ReactNode;
  children: React.ReactNode; 
}

export function OpcaoMenu({ nome, svg, rota, ...rest }: OpcaoMenuProps) {
  const { fecharMenu } = useMenu();

  return (
    <Link
      className="group flex items-center px-4 py-3 
                text-[var(--sidebar-text-color)]

                   hover:bg-[var(--sidebarhover-color)]/10 
                   hover:text-[var(--sidebarhover-text-color)]
                 
                 transition-all duration-200 cursor-pointer 
                 border-l-4 border-transparent hover:border-[var(--corPrincipal)] rounded-r-lg"
      onClick={fecharMenu}
      to={rota || "#"}
      {...rest}
    >
      <div className=" flex items-center justify-center group-hover:text-[var(--corPrincipal)] transition-colors">
        {svg}
      </div>
      <span className="ml-3 font-medium text-sm">{nome}</span>
    </Link>
  );
}

export function OpcaoMenuComSubmenu({ nome, svg, children }: OpcaoMenuComSubmenuProps) {
  const [aberto, setAberto] = useState(false);

  return (
    <div className="mb-1">
      <button
        className="group w-full flex items-center justify-between px-4 py-3  
                  text-[var(--sidebar-text-color)]

                   hover:bg-[var(--sidebarhover-color)]/10 
                   hover:text-[var(--sidebarhover-text-color)] 

                   transition-all duration-200 cursor-pointer border-l-4 border-transparent 
                   hover:border-[var(--corPrincipal)] rounded-r-lg"
        onClick={() => setAberto(!aberto)}
        type="button"
      >
        <div className="flex items-center">
          <div className="w-6 h-6 flex items-center justify-center group-hover:text-[var(--corPrincipal)] transition-colors">
            {svg}
          </div>
          <span className="ml-3 font-medium text-sm">{nome}</span>
        </div>
        <div className={` group-hover:text-[var(--corPrincipal)] transition-all duration-200 ${aberto ? 'rotate-0' : 'rotate-0'}`}>
          {aberto ? <HiOutlineChevronUp className="w-4 h-4" /> : <HiOutlineChevronDown className="w-4 h-4" />}
        </div>
      </button>
      
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
        aberto ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="ml-6 mt-1 border-l-2 ">
          <div className=" space-y-1">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}