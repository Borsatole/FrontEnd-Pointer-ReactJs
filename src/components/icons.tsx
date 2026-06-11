import React from "react";
import { MdChecklist, MdDashboard, MdWorkspacePremium } from "react-icons/md";

import { PiWalletFill } from "react-icons/pi";

import { RiCalendarScheduleLine, RiLogoutBoxRFill } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import { TbCategoryPlus, TbEdit } from "react-icons/tb";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineSave } from "react-icons/md";
import {
  FaBuilding,
  FaFilter,
  FaHome,
  FaRegCalendarCheck,
  FaSitemap,
  FaTools,
} from "react-icons/fa";

import { BsGraphDownArrow, BsGraphUpArrow } from "react-icons/bs";

import { FaMoneyBillTransfer, FaTruckFront } from "react-icons/fa6";
import { SiWhatsapp } from "react-icons/si";

export const icons: Record<string, JSX.Element> = {
  dashboard: <MdDashboard />,

  condominios: <FaHome />,
  visitas: <FaRegCalendarCheck />,
  vistorias: <MdChecklist />,
  chamados: <FaTools />,

  permissoes: <FaSitemap />,
  logout: <RiLogoutBoxRFill />,

  // financeiro
  financeiro: <FaMoneyBillTransfer />,
  categorias: <TbCategoryPlus />,
  contasfixas: <RiCalendarScheduleLine />,
  contasapagar: <BsGraphDownArrow />,
  contasareceber: <BsGraphUpArrow />,
  filter: <FaFilter />,

  premium: <PiWalletFill />,

  whatsapp: <SiWhatsapp />,

  adicionar: <IoMdAdd />,
  editar: <TbEdit />,
  deletar: <MdDeleteOutline />,
  salvar: <MdOutlineSave />,
};

export const getIcon = (
  nome: string,
  size: number = 24,
  className = "",
): JSX.Element | null => {
  const icon = icons[nome];
  return icon
    ? React.cloneElement(icon, { size, className: `text-current ${className}` })
    : null;
};

export const getIconComponent = (
  nome: string,
): React.FC<React.SVGProps<SVGSVGElement>> | undefined => {
  const icon = icons[nome];
  if (!icon) return undefined;

  // Retorna um componente que renderiza o ícone com props dinâmicas
  return (props) => React.cloneElement(icon, props);
};

export default icons;
