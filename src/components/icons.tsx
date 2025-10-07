import React from "react";
import {MdDashboard} from "react-icons/md";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { FaUserShield } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";
import { TbEdit } from "react-icons/tb";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineSave } from "react-icons/md";




export const icons: Record<string, JSX.Element> = {
  dashboard: <MdDashboard />,
  permissoes: <FaUserShield />,
  logout: <RiLogoutBoxRFill />,

  adicionar : <IoMdAdd  />,
  editar: <TbEdit />,
  deletar: <MdDeleteOutline />,
  salvar: <MdOutlineSave />
};

export const getIcon = (nome: string, size: number = 24, className = ""): JSX.Element | null => {
  const icon = icons[nome];
  return icon
    ? React.cloneElement(icon, { size, className: `text-current ${className}` })
    : null;
};

export default icons;
